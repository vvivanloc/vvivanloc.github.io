// Initialize Three.js
if (!Detector.webgl) Detector.addGetWebGLMessage();




class MarkerView {

    private mMesh: THREE.Mesh;

    constructor(pScene: THREE.Scene) {
        let lMarkerMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        let shape = new THREE.SphereGeometry(0.2, 8, 8);
        this.mMesh = new THREE.Mesh(shape, lMarkerMaterial);
        this.mMesh.castShadow = true;
        pScene.add(this.mMesh);
        this.hide();
    }

    update(pPoint3D: THREE.Vector3) {
        if (this.mMesh) {
            this.mMesh.visible = true;
            this.mMesh.position.copy(pPoint3D);
        }
    }

    hide() {
        if (this.mMesh) {
            this.mMesh.visible = false;
        }
    }
}

class JointConstraint {

    private mConstrainedBody: CANNON.Body;
    private mPointConstraint: CANNON.Constraint;
    private mWorld: CANNON.World;
    private mJointBody: CANNON.Body;


    constructor(pWorld: CANNON.World) {
        this.mWorld = pWorld;

        // Joint body
        let shape = new CANNON.Sphere(0.1);
        this.mJointBody = new CANNON.Body({ mass: 0 });
        this.mJointBody.addShape(shape);
        this.mJointBody.collisionFilterGroup = 0;
        this.mJointBody.collisionFilterMask = 0;
        this.mWorld.addBody(this.mJointBody);
    }

    hasMouseConstraint(): boolean {
        return this.mPointConstraint !== undefined;
    }

    add(pPoint3D: THREE.Vector3, body: CANNON.Body) {
        // The cannon body constrained by the mouse joint
        this.mConstrainedBody = body;

        // Vector to the clicked point, relative to the body
        let v1 = new CANNON.Vec3(pPoint3D.x, pPoint3D.y, pPoint3D.z).vsub(this.mConstrainedBody.position);

        // Apply anti-quaternion to vector to transform it into the local body coordinate system
        let antiRot = this.mConstrainedBody.quaternion.inverse();
        let pivot = antiRot.vmult(v1); // pivot is not in local body coordinates

        // Move the cannon click marker particle to the click position
        this.mJointBody.position.set(pPoint3D.x, pPoint3D.y, pPoint3D.z);

        // Create a new constraint
        // The pivot for the jointBody is zero
        this.mPointConstraint = new CANNON.PointToPointConstraint(this.mConstrainedBody, pivot, this.mJointBody, new CANNON.Vec3(0, 0, 0));

        // Add the constriant to world
        this.mWorld.addConstraint(this.mPointConstraint);
    }

    // This functions moves the transparent joint body to a new postion in space
    move(pPoint3D: THREE.Vector3) {
        if (this.mPointConstraint) {
            // Move the joint body to a new position
            this.mJointBody.position.set(pPoint3D.x, pPoint3D.y, pPoint3D.z);
            this.mPointConstraint.update();
        }
    }

    remove() {
        // Remove constriant from world
        this.mWorld.removeConstraint(this.mPointConstraint);
        this.mPointConstraint = undefined;
    }

}



class Marker {
    private mView: MarkerView;
    private mJointConstraint: JointConstraint;

    private mClosestDistance = -1.0;
    private mCamera: THREE.PerspectiveCamera;
    private mConstraintDown = false;
    private mRaycaster: THREE.Raycaster;


    //To be synced
    private mMeshes: Array<THREE.Mesh> = [];
    private mBodies: Array<CANNON.Body> = [];



    constructor(pScene: THREE.Scene, pCamera: THREE.PerspectiveCamera, pWorld: CANNON.World, pMeshes: Array<THREE.Mesh>, pBodies: Array<CANNON.Body>) {
        this.mView = new MarkerView(pScene);
        this.mJointConstraint = new JointConstraint(pWorld);
        this.mCamera = pCamera;
        this.mRaycaster = new THREE.Raycaster();
        this.mMeshes = pMeshes;
        this.mBodies = pBodies;
    }

    private projectOntoPlane(pScreenPos: THREE.Vector2, camera: THREE.Camera): THREE.Vector3 {

        let vector = new THREE.Vector3();
        let dir = new THREE.Vector3();
        if (camera instanceof THREE.OrthographicCamera) {
            vector.set((pScreenPos.x / window.innerWidth) * 2 - 1, - (pScreenPos.y / window.innerHeight) * 2 + 1, - 1); // z = - 1 important!
            vector.unproject(camera);
            dir.set(0, 0, - 1).transformDirection(camera.matrixWorld);

        } else if (camera instanceof THREE.PerspectiveCamera) {
            vector.set((pScreenPos.x / window.innerWidth) * 2 - 1, - (pScreenPos.y / window.innerHeight) * 2 + 1, 0.5); // z = 0.5 important!
            vector.unproject(camera);
            dir = vector.sub(camera.position).normalize();
        }

        let contactpoint = camera.position.clone();
        contactpoint.add(dir.multiplyScalar(this.mClosestDistance));
        return contactpoint;
    }

    move(pScreenPos: THREE.Vector2) {
        // Move and project on the plane
        if (this.mJointConstraint.hasMouseConstraint()) {
            let pos = this.projectOntoPlane(pScreenPos, this.mCamera);
            if (pos) {
                this.mView.update(pos);
                this.mJointConstraint.move(pos);
            }
        }
    }



    private findNearestIntersectingObject(pScreenPos: THREE.Vector2, camera: THREE.Camera, objects: Array<THREE.Object3D>): THREE.Intersection | undefined {
        // Get the picking ray from the point
        //getRayCasterFromScreenCoord(pScreenPos, camera);

        // Function that returns a raycaster to use to find intersecting objects
        // in a scene given screen pos and a camera
        let lNormalizedScreenPos = new THREE.Vector2();
        // Get 3D point form the client x y
        lNormalizedScreenPos.x = (pScreenPos.x / window.innerWidth) * 2 - 1;
        lNormalizedScreenPos.y = -(pScreenPos.y / window.innerHeight) * 2 + 1;

        this.mRaycaster.setFromCamera(lNormalizedScreenPos, camera);


        // Find the closest intersecting object
        // Now, cast the ray all render objects in the scene to see if they collide. Take the closest one.
        let hits = this.mRaycaster.intersectObjects(objects);
        let closest = undefined;
        if (hits.length > 0) {
            closest = hits[0];
        }

        // console.log("findNearestIntersectingObject " + clientX + clientY + closest);
        return closest;
    }


    put(pScreenPos: THREE.Vector2) {
        // Find mesh from a ray
        let entity = this.findNearestIntersectingObject(pScreenPos, this.mCamera, this.mMeshes);
        if (!entity) {
            return;
        }
        if (!(entity.object instanceof THREE.Mesh)) {
            return;
        }
        let pos = entity.point;
        if (pos && entity.object.geometry instanceof THREE.BoxGeometry) {
            this.mClosestDistance = entity.distance;
            this.mConstraintDown = true;
            // Set marker on contact point
            this.mView.update(pos);

            let idx = this.mMeshes.indexOf(entity.object);
            if (idx !== -1) {
                this.mJointConstraint.add(pos, this.mBodies[idx]);
            }
        }


    }

    remove() {
        this.mConstraintDown = false;
        // remove the marker
        this.mView.hide();
        // Send the remove mouse joint to server
        this.mJointConstraint.remove();
    }

}


class Application {
    private mWorld: CANNON.World;
    private mPhysicsDeltaTime = 1 / 60;

    private mCamera: THREE.PerspectiveCamera;
    private mScene: THREE.Scene;
    private mRenderer: THREE.WebGLRenderer;



    private mNbCubes = 3;
    private mDOMContainer: HTMLElement;

    //To be synced
    private mMeshes: Array<THREE.Mesh> = [];
    private mBodies: Array<CANNON.Body> = [];

    private mMarker: Marker;

    constructor() {
        this.buildCannonWorld();
        this.buildThreeJsScene();
        this.animate();
    }



    buildCannonWorld() {
        // Setup our world
        this.mWorld = new CANNON.World();
        this.mWorld.quatNormalizeSkip = 0;
        this.mWorld.quatNormalizeFast = false;

        this.mWorld.gravity.set(0, -9.8, 0);
        this.mWorld.broadphase = new CANNON.NaiveBroadphase();

        // Create boxes
        let mass = 5;
        let boxShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
        for (let i = 0; i < this.mNbCubes; i++) {
            let boxBody = new CANNON.Body({ mass: mass });
            boxBody.addShape(boxShape);
            boxBody.position.set(0, 5*i+5, 0);
            this.mWorld.addBody(boxBody);
            this.mBodies.push(boxBody);
        }

        // Create a plane
        let groundShape = new CANNON.Box(new CANNON.Vec3(10, 5, 1));
        let groundBody = new CANNON.Body({ mass: 0 });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        groundBody.position.set(0,-1,3);
        this.mWorld.addBody(groundBody);


    }

    buildThreeJsScene() {

        this.mDOMContainer = document.createElement('div');
        document.body.appendChild(this.mDOMContainer);

        // scene
        this.mScene = new THREE.Scene();
        this.mScene.fog = new THREE.Fog(0x000000, 500, 10000);

        // camera
        this.mCamera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.5, 10000);
        this.mCamera.position.set(10, 2, 0);
        this.mCamera.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
        this.mScene.add(this.mCamera);

        // lights
        let light;
        this.mScene.add(new THREE.AmbientLight(0x666666));

        light = new THREE.DirectionalLight(0xffffff, 1.75);
        let d = 20;

        light.position.set(d, d, d);

        light.castShadow = true;
        light.shadow.camera.visible = true;

        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;

        this.mScene.add(light);

        // floor
        let floorGeometry = new THREE.PlaneGeometry(20, 10, 1, 1);
        //geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ) );
        let floorMaterial = new THREE.MeshLambertMaterial({ color: 0x777777 });

        //THREE.ColorUtils.adjustHSV( material.color, 0, 0, 0.9 );
        let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
        floorMesh.castShadow = true;
        floorMesh.position.setZ(3);
        floorMesh.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
        floorMesh.receiveShadow = true;
        this.mScene.add(floorMesh);

        // cubes
        let cubeGeo = new THREE.BoxGeometry(1, 1, 1, 2, 2);
        let cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
        for (let i = 0; i < this.mNbCubes; i++) {
            let cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial);
            cubeMesh.castShadow = true;
            this.mMeshes.push(cubeMesh);
            this.mScene.add(cubeMesh);
        }

        this.mRenderer = new THREE.WebGLRenderer({ antialias: true });
        this.mRenderer.setSize(window.innerWidth, window.innerHeight);
        this.mRenderer.setClearColor(this.mScene.fog.color);

        this.mDOMContainer.appendChild(this.mRenderer.domElement);

        this.mRenderer.gammaInput = true;
        this.mRenderer.gammaOutput = true;
        this.mRenderer.shadowMap.enabled = true;

        this.mMarker = new Marker(this.mScene, this.mCamera, this.mWorld, this.mMeshes, this.mBodies);

        window.addEventListener('resize', this.onWindowResize, false);

        window.addEventListener("mousemove", this.onMouseMove, false);
        window.addEventListener("touchmove", this.onTouchMove, false);

        window.addEventListener("mousedown", this.onMouseDown, false);
        window.addEventListener("touchstart", this.onTouchDown, false);

        window.addEventListener("mouseup", this.onMouseUp, false);
        window.addEventListener("touchend", this.onTouchUp, false);


    }


    onMouseMove = (e: MouseEvent) => {
        // console.log("onMouseMove " + e.clientX, e.clientY);
        this.mMarker.move(new THREE.Vector2(e.clientX, e.clientY));

    }

    onTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        let touches = e.changedTouches;
        if (touches.length > 0) {
            this.mMarker.move(new THREE.Vector2(touches[0].clientX, touches[0].clientY));
        }
    }


    onMouseDown = (e: MouseEvent) => {
        // console.log("onMouseDown " + e.clientX, e.clientY);
        this.mMarker.put(new THREE.Vector2(e.clientX, e.clientY));
    }

    onTouchDown = (e: TouchEvent) => {
        e.preventDefault();
        let touches = e.changedTouches;
        if (touches.length > 0) {
            this.mMarker.put(new THREE.Vector2(touches[0].clientX, touches[0].clientY));
        }
    }


    onMouseUp = (_e: MouseEvent) => {
        this.mMarker.remove();
    }

    onTouchUp = (_e: TouchEvent) => {
        this.mMarker.remove();
    }


    onWindowResize() {
        this.mCamera.aspect = window.innerWidth / window.innerHeight;
        this.mCamera.updateProjectionMatrix();
        this.mRenderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.updatePhysics();
        this.render();
    }

    updatePhysics() {
        this.mWorld.step(this.mPhysicsDeltaTime);
        for (let i = 0; i !== this.mMeshes.length; i++) {
            const lBody = this.mBodies[i];
            this.mMeshes[i].position.set(lBody.position.x, lBody.position.y, lBody.position.z);
            this.mMeshes[i].quaternion.set(lBody.quaternion.x, lBody.quaternion.y, lBody.quaternion.z, lBody.quaternion.w);

            if (lBody.position.z < -5) {
                console.log("Object "+i+" dropped!");
            }
        }
    }

    render() {
        this.mRenderer.render(this.mScene, this.mCamera);
    }


}

let lApplication = new Application();
