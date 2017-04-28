
import MarkerView = require("lib/markerView");
import JointConstraint = require("lib/jointConstraint");
import SceneObjects = require("lib/sceneObjects");

class Marker {
    private mView: MarkerView;
    private mJointConstraint: JointConstraint;

    private mClosestDistance = -1.0;
    private mCamera: THREE.PerspectiveCamera;
    private mConstraintDown = false;
    private mRaycaster: THREE.Raycaster;

    private mSceneObjects: SceneObjects;

    constructor(pScene: THREE.Scene, pCamera: THREE.PerspectiveCamera, pWorld: CANNON.World, pSceneObjects: SceneObjects) {
        this.mView = new MarkerView(pScene);
        this.mJointConstraint = new JointConstraint(pWorld);
        this.mCamera = pCamera;
        this.mRaycaster = new THREE.Raycaster();
        this.mSceneObjects = pSceneObjects;
    }

    private projectOntoPlane(pScreenPosPercentage: THREE.Vector2, pCamera: THREE.Camera, pDistanceFromCamera: number): THREE.Vector3 {

        let lOrigin: THREE.Vector3 = new THREE.Vector3((pScreenPosPercentage.x) * 2 - 1, - (pScreenPosPercentage.y) * 2 + 1, 0.5); // z = 0.5 important!
        lOrigin.unproject(pCamera);

        let lDirection: THREE.Vector3 = lOrigin.sub(pCamera.position).normalize();

        let lContactPoint = pCamera.position.clone();
        lContactPoint.add(lDirection.multiplyScalar(pDistanceFromCamera));
        return lContactPoint;
    }

    private hover(pScreenPosPercentage: THREE.Vector2) {

        let entity = this.findNearestIntersectingObject(pScreenPosPercentage, this.mCamera, this.mSceneObjects.mMeshes);
        if (entity) {
            let lClosestDistance = entity.distance;
            let pos = this.projectOntoPlane(pScreenPosPercentage, this.mCamera, lClosestDistance);
            this.mView.hover(pos);
        } else {
            this.mView.hide();
        }

    }
    // pScreenPosPercentage : client coordinate / client size
    move(pScreenPosPercentage: THREE.Vector2, pEnableHover: boolean) {
        // Move and project on the plane

        if (this.mJointConstraint.hasMouseConstraint()) {
            let pos = this.projectOntoPlane(pScreenPosPercentage, this.mCamera, this.mClosestDistance);
            if (pos) {
                this.mView.move(pos);
                this.mJointConstraint.move(pos);
            }
        } else {
            if (pEnableHover) {
                this.hover(pScreenPosPercentage);
            } else {
                this.mView.hide();
            }
        }
    }



    private findNearestIntersectingObject(pScreenPosPercentage: THREE.Vector2, camera: THREE.Camera, objects: Array<THREE.Object3D>): THREE.Intersection | undefined {
        // Get the picking ray from the point
        //getRayCasterFromScreenCoord(pScreenPos, camera);

        // Function that returns a raycaster to use to find intersecting objects
        // in a scene given screen pos and a camera
        let lNormalizedScreenPos = new THREE.Vector2();
        // Get 3D point form the client x y
        lNormalizedScreenPos.x = (pScreenPosPercentage.x) * 2 - 1;
        lNormalizedScreenPos.y = -(pScreenPosPercentage.y) * 2 + 1;

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


    // pScreenPosPercentage : client coordinate / client size
    put(pScreenPosPercentage: THREE.Vector2) {
        // Find mesh from a ray
        let entity = this.findNearestIntersectingObject(pScreenPosPercentage, this.mCamera, this.mSceneObjects.mMeshes);
        if (!entity) {
            return;
        }
        if (!(entity.object instanceof THREE.Mesh)) {
            return;
        }
        let pos = entity.point;
        if (pos && entity.object.name !== "ground") {
            this.mClosestDistance = entity.distance;
            this.mConstraintDown = true;
            // Set marker on contact point
            this.mView.move(pos);

            let idx = this.mSceneObjects.mMeshes.indexOf(entity.object);
            if (idx !== -1) {
                this.mJointConstraint.add(pos, this.mSceneObjects.mBodies[idx]);
            }
        }


    }

    remove(pScreenPosPercentage: THREE.Vector2, pEnableHover: boolean) {
        this.mConstraintDown = false;
        // remove the marker
        if (pEnableHover) {
            this.hover(pScreenPosPercentage);
        } else {
            this.mView.hide();
        }
        // Send the remove mouse joint to server
        this.mJointConstraint.remove();
    }

    use3DModel(pUse: boolean, pScene: THREE.Scene, ) {
        this.mView.use3DModel(pUse, pScene);
    }
}

export = Marker;
