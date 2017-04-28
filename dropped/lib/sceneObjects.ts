import SceneObjectsEvents = require("lib/sceneObjectsEvents");

class PhysicsStartParameters {
    mass: number = 1;
    startHeight: number = 5;
    objectHeight: number = 1;
}

enum State {
    nominal = 0,
    outOfBounds = 1,
    teleported = 2
}



class SceneObjects extends THREE.EventDispatcher {
    mMeshes: Array<THREE.Mesh> = [];
    mBodies: Array<CANNON.Body> = [];
    mStates: Array<State> = [];
    mWorld: CANNON.World;
    private mPhysicsStartParameters: PhysicsStartParameters;

    constructor(pPhysicsStartParameters: PhysicsStartParameters) {
        super();

        this.mMeshes = [];
        this.mBodies = [];
        this.mStates = [];
        this.mPhysicsStartParameters = pPhysicsStartParameters;
    }

    push(pMesh: THREE.Mesh, pBody: CANNON.Body) {
        let lStartPosition = new THREE.Vector3(0, this.mPhysicsStartParameters.startHeight + this.mPhysicsStartParameters.objectHeight * this.mMeshes.length, 0);
        pMesh.position.set(lStartPosition.x, lStartPosition.y, lStartPosition.z);
        pBody.mass = this.mPhysicsStartParameters.mass;
        pBody.position.set(lStartPosition.x, lStartPosition.y, lStartPosition.z);

        this.mMeshes.push(pMesh);
        this.mBodies.push(pBody);
        this.mStates.push(State.nominal);
    }

    //Correct way to change a body's position and orientation?
    //https://github.com/schteppe/cannon.js/issues/215

    resetBody(body: CANNON.Body) {
        // Position
        body.position.setZero();
        body.previousPosition.setZero();
        body.interpolatedPosition.setZero();
        body.initPosition.setZero();

        // orientation
        body.quaternion.set(0, 0, 0, 1);
        body.initQuaternion.set(0, 0, 0, 1);
        //body.previousQuaternion.set(0, 0, 0, 1);
        body.interpolatedQuaternion.set(0, 0, 0, 1);

        // Velocity
        body.velocity.setZero();
        body.initVelocity.setZero();
        body.angularVelocity.setZero();
        body.initAngularVelocity.setZero();

        // Force
        body.force.setZero();
        body.torque.setZero();

        // Sleep state reset
        body.sleepState = 0;
        body.timeLastSleepy = 0;
        //body._wakeUpAfterNarrowphase = false;
    }
    resetPosition() {
        for (let i = 0; i !== this.mMeshes.length; i++) {
            let lStartPosition = new THREE.Vector3(0, this.mPhysicsStartParameters.startHeight + this.mPhysicsStartParameters.objectHeight * i, 0);


            this.resetBody(this.mBodies[i]);
            this.mMeshes[i].position.set(lStartPosition.x, lStartPosition.y, lStartPosition.z);
            this.mBodies[i].position.set(lStartPosition.x, lStartPosition.y, lStartPosition.z);

            this.mBodies[i].updateMassProperties();
            this.mBodies[i].updateInertiaWorld(new CANNON.Vec3(0, 0, 0));
            this.mBodies[i].updateSolveMassProperties();
            this.mStates[i] = State.nominal;
        }
    }

    sync(pMesh: THREE.Mesh, pBody: CANNON.Body) {
        pMesh.position.set(pBody.position.x, pBody.position.y, pBody.position.z);
        pMesh.quaternion.set(pBody.quaternion.x, pBody.quaternion.y, pBody.quaternion.z, pBody.quaternion.w);
    }


    
    syncAll(pCamera: THREE.Camera) {

        if (!pCamera) {
            console.error("No camera");
            return;
        }
        let lFrustum = new THREE.Frustum();
        lFrustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(pCamera.projectionMatrix, pCamera.matrixWorldInverse));


        for (let i = 0; i !== this.mMeshes.length; i++) {
            this.sync(this.mMeshes[i], this.mBodies[i]);

        }


        for (let i = 0; i !== this.mMeshes.length; i++) {


            if (this.mStates[i] === State.nominal || this.mStates[i] === State.outOfBounds) {
                const lBodyPosition = this.mBodies[i].position;
                if (lBodyPosition.z < -5) {
                    console.log("Object #" + i + " '" + this.mMeshes[i].name + "' teleported!");
                    this.mStates[i] = State.teleported;
                    let lEventTeleported = new SceneObjectsEvents.EventTeleported(this.mMeshes[i].name);
                    this.dispatchEvent(lEventTeleported);
                } else if (lBodyPosition.z > -5 && lBodyPosition.y < 3 && !lFrustum.containsPoint(new THREE.Vector3(lBodyPosition.x, lBodyPosition.y, lBodyPosition.z))) {
                    console.log("Object #" + i + " '" + this.mMeshes[i].name + "' out of bounds!");
                    this.mStates[i] = State.outOfBounds;
                }


            }
        }

        if (this.mMeshes.length > 0) {
            let j = 0;
            for (let i = 0; i !== this.mMeshes.length; i++) {
                if (this.mStates[i] === State.outOfBounds ||
                    this.mStates[i] === State.teleported) {
                    j++;
                }
            }
            if (j === this.mMeshes.length) {
                console.log("We are screwed");
                //if (!this.mEventDispatchedOnce) {

                this.dispatchEvent(new SceneObjectsEvents.EventAllHidden());
                // this.mEventDispatchedOnce = true;
                //}
            }
        }
    }




}


export = SceneObjects;