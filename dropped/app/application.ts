/// <reference path="../thirdparty/three/index.d.ts" />
/// <reference path="../thirdparty/cannon/cannon.d.ts" />

import globalConfig = require("lib/config");

import SceneObjects = require("lib/sceneObjects");
import SceneObjectsEvents = require("lib/sceneObjectsEvents");
import Marker = require("lib/marker");
import PhysicsModelLoader = require("lib/physicsModelLoader");
import PortalView = require("lib/portalView");




class Application {
    private mWorld: CANNON.World;

    private mCamera: THREE.PerspectiveCamera;
    private mScene: THREE.Scene;
    private mRenderer: THREE.WebGLRenderer;

    private mDOMContainer: HTMLElement;

    //To be synced
    private mSceneObjects: SceneObjects;

    private mMarker: Marker;

    private mPortalView: PortalView;

    private mDOMContainerIsHovered: boolean;
    enablePhysics: boolean;

    private mFps: number;
    private mPhysicsDeltaTime: number;

    constructor(pDOMContainedID: string, pCanvas ?: HTMLCanvasElement) {
        this.mSceneObjects = new SceneObjects({ mass: 2, startHeight: 7, objectHeight: 2 });

        this.enablePhysics = true;

        this.buildCannonWorld();
        this.buildThreeJsScene(pDOMContainedID, pCanvas);

        this.mSceneObjects.addEventListener(SceneObjectsEvents.EventAllHidden.typeID, () => { setTimeout(this.resetSimulation(), 1000); });
        this.mDOMContainerIsHovered = false;

        this.mFps = 60;
        if (navigator.userAgent.indexOf("Firefox") > 0) {
            // limit to x fps due to Firefox underwhelming performances :(
            this.mFps = 60;
        }

        this.mPhysicsDeltaTime = 1 / this.mFps;

        this.onWindowResize();
    }


    addPortal(pTopCentered: boolean, pIsOutput: boolean) {
        this.mPortalView = new PortalView(pTopCentered, pIsOutput);

        //create animated halo
        this.mPortalView.load(this.mScene, () => { this.onWindowResize(); });

    }

    getSceneObjects(): SceneObjects {
        return this.mSceneObjects;
    }

    private buildCannonWorld() {
        // Setup our world
        this.mWorld = new CANNON.World();
        this.mWorld.quatNormalizeSkip = 0;
        this.mWorld.quatNormalizeFast = false;

        this.mWorld.gravity.set(0, -9.8, 0);
        this.mWorld.broadphase = new CANNON.NaiveBroadphase();

        // Create a plane
        //let groundShape = new CANNON.Box(new CANNON.Vec3(10, 5, 4));
        let groundShape = new CANNON.Plane();
        let groundBody = new CANNON.Body({ mass: 0 });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        //groundBody.position.set(0, -4, 3);
        this.mWorld.addBody(groundBody);


    }

    private buildThreeJsScene(pDOMContainedID: string, pCanvas?: HTMLCanvasElement) {

        this.mDOMContainer = document.getElementById(pDOMContainedID);
        if (!this.mDOMContainer) {
            console.error("No DOM element with ID=" + pDOMContainedID);
            return;
        }

        // scene
        this.mScene = new THREE.Scene();
        this.mScene.fog = new THREE.Fog(0x000000, 500, 10000);

        // camera
        this.mCamera = new THREE.PerspectiveCamera(30, this.mDOMContainer.clientWidth / this.mDOMContainer.clientHeight, 0.5, 10000);
        this.mCamera.position.set(15, 2, 0);
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
        let floorGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
        //geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ) );
        let floorMaterial = new THREE.MeshLambertMaterial({ color: 0x777777 });

        //THREE.ColorUtils.adjustHSV( material.color, 0, 0, 0.9 );
        let groundMesh = new THREE.Mesh(floorGeometry, floorMaterial);
        groundMesh.name = "ground";
        groundMesh.castShadow = true;
        groundMesh.position.setZ(3);
        groundMesh.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
        groundMesh.receiveShadow = true;
        this.mScene.add(groundMesh);

        if (pCanvas) {
            this.mRenderer = new THREE.WebGLRenderer({ antialias: true, canvas: pCanvas });
        } else {
            this.mRenderer = new THREE.WebGLRenderer({ antialias: true });
        }
        this.mRenderer.setSize(this.mDOMContainer.clientWidth, this.mDOMContainer.clientHeight);
        this.mRenderer.setClearColor(this.mScene.fog.color);

        this.mDOMContainer.appendChild(this.mRenderer.domElement);

        this.mRenderer.gammaInput = true;
        this.mRenderer.gammaOutput = true;
        this.mRenderer.shadowMap.enabled = true;

        this.mMarker = new Marker(this.mScene, this.mCamera, this.mWorld, this.mSceneObjects);


        let lResizeTimer: NodeJS.Timer;
        window.addEventListener("resize",
            () => {
                if (lResizeTimer) {
                    clearTimeout(lResizeTimer);
                }
                lResizeTimer = setTimeout( () => {
                    console.log("resize canvas");
                    this.onWindowResize();
                    lResizeTimer = null;
                }, 250);
            }, false);

        // to prevent drag problems, the mouse events are bound to window (always emitting mousemove)
        // and not to mDOMContainer (stopping abruptly on the DOM edge :( )

        window.addEventListener("mousemove", this.onMouseMove, false);

        // touch events are not plagued with this problem ?
        window.addEventListener("touchmove", this.onTouchMove, false);

        window.addEventListener("mousedown", this.onMouseDown, false);
        window.addEventListener("touchstart", this.onTouchDown, false);

        window.addEventListener("mouseup", this.onMouseUp, false);
        window.addEventListener("touchend", this.onTouchUp, false);

        this.mDOMContainer.addEventListener("mouseover",this.onMouseOver)
    }



    addLoadedModels(pObjectFilenames: Array<string>) {


        let lModelLoader = new PhysicsModelLoader(this.mScene, this.mWorld, this.mSceneObjects);
        for (let lFilename of pObjectFilenames) {
            lModelLoader.load(globalConfig.assetPath, lFilename);
        }
    }

    addCubes(pNbCubes: number = 3) {


        // Create boxes
        let mass = 5;
        let boxShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));

        // cubes
        let cubeGeo = new THREE.BoxGeometry(1, 1, 1, 2, 2);
        let cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });


        for (let i = 0; i < pNbCubes; i++) {
            let boxBody = new CANNON.Body({ mass: mass });
            boxBody.addShape(boxShape);
            boxBody.position.set(0, 5 * i + 5, 0);
            this.mWorld.addBody(boxBody);

            let cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial);
            cubeMesh.castShadow = true;
            cubeMesh.name = "cube_" + i.toString();
            this.mScene.add(cubeMesh);

            this.mSceneObjects.push(cubeMesh, boxBody);
        }

    }

    clear() {
        for (let i = 0; i !== this.mSceneObjects.mMeshes.length; i++) {
            this.mWorld.remove(this.mSceneObjects.mBodies[i]);
            this.mScene.remove(this.mSceneObjects.mMeshes[i]);
        }
        this.mSceneObjects.mMeshes = [];
        this.mSceneObjects.mBodies = [];
        this.mSceneObjects.mStates = [];
    }

    private touchWindowToPercentagePos(pDOMClientPos: THREE.Vector2): THREE.Vector2 {
        const lContainerRect = this.mDOMContainer.getBoundingClientRect();
        return new THREE.Vector2(
            (pDOMClientPos.x - lContainerRect.left) / this.mDOMContainer.clientWidth,
            (pDOMClientPos.y - lContainerRect.top) / this.mDOMContainer.clientHeight);
    }

    // recalculate DOM client from window client pos
    private mouseWindowToPercentagePos(pWindowClientPos: THREE.Vector2): THREE.Vector2 {
        const lContainerRect = this.mDOMContainer.getBoundingClientRect();
        // console.log("onMouseMove " + (pWindowClientPos.x - lContainerRect.left) + "," + (pWindowClientPos.y - lContainerRect.top));
        return new THREE.Vector2(
            (pWindowClientPos.x - lContainerRect.left) / this.mDOMContainer.clientWidth,
            (pWindowClientPos.y - lContainerRect.top) / this.mDOMContainer.clientHeight);
    }

    private onMouseMove = (e: MouseEvent) => {

        e.preventDefault();

        this.mMarker.move(this.mouseWindowToPercentagePos(new THREE.Vector2(e.clientX, e.clientY)), true);


    }

    private onTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        let touches = e.changedTouches;
        if (touches.length > 0) {
            this.mMarker.move(this.touchWindowToPercentagePos(new THREE.Vector2(touches[0].clientX, touches[0].clientY)), false);
        }
    }


    private onMouseDown = (e: MouseEvent) => {

        e.preventDefault();
        // console.log("onMouseDown " + (e.clientX-lContainerRect.left) +","+(e.clientY-lContainerRect.top));
        this.mMarker.put(this.mouseWindowToPercentagePos(new THREE.Vector2(e.clientX, e.clientY)));
    }

    private onTouchDown = (e: TouchEvent) => {
        e.preventDefault();
        let touches = e.changedTouches;
        if (touches.length > 0) {

            this.mMarker.put(this.touchWindowToPercentagePos(new THREE.Vector2(touches[0].clientX, touches[0].clientY)));
        }
    }


    private onMouseUp = (e: MouseEvent) => {
        e.preventDefault();
        // console.log("onMouseUp " + (e.clientX-lContainerRect.left) +","+(e.clientY-lContainerRect.top));
        this.mMarker.remove(this.mouseWindowToPercentagePos(new THREE.Vector2(e.clientX, e.clientY)), true);
    }

    private onTouchUp = (e: TouchEvent) => {
        let touches = e.changedTouches;
        if (touches.length > 0) {
            this.mMarker.remove(this.touchWindowToPercentagePos(new THREE.Vector2(touches[0].clientX, touches[0].clientY)), false);
        }
    }

    onMouseOver = () => { 
        this.mDOMContainerIsHovered = true;
     }
    onWindowResize = () => {
        if (!this.mDOMContainer) {
            console.error("invalid contained");
            return;
        }

        this.mCamera.aspect = this.mDOMContainer.clientWidth / this.mDOMContainer.clientHeight;
        this.mCamera.updateProjectionMatrix();
        this.mRenderer.setSize(this.mDOMContainer.clientWidth, this.mDOMContainer.clientHeight);
        if (this.mPortalView) {
            this.mPortalView.moveToWindowPlane(this.mCamera);
        }
    }

    updateDOMContainer(pElement: HTMLElement) {
        if (this.mDOMContainer) {
            this.mDOMContainer.removeEventListener("mouseover", this.onMouseOver);
        }
        this.mDOMContainer = pElement;
        this.mDOMContainer.addEventListener("mouseover", this.onMouseOver )
    }

    animate = () => {
        if (!this.mDOMContainer) {
            console.error("No DOM container!");
            return;
        }

        setTimeout(() => {
            requestAnimationFrame(this.animate);

            if (this.mPortalView) {
                this.mPortalView.updateAnimation();
            }
            if (this.enablePhysics) {
                this.updatePhysics();
            }
            this.render();

        }, 1000 / this.mFps);
    }

    private updatePhysics() {
        this.mWorld.step(this.mPhysicsDeltaTime);
        this.mSceneObjects.syncAll(this.mCamera);
    }

    private render() {
        this.mRenderer.render(this.mScene, this.mCamera);
    }

    resetSimulation() {
        this.mSceneObjects.resetPosition();
    }

    useAnimatedMarker(pUse: boolean) {
        this.mMarker.use3DModel(pUse, this.mScene);
    }
}

export = Application;