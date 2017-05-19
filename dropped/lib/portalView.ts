import globalConfig = require("../lib/config");
import ModelLoader = require("../lib/modelLoader")

class PortalView {

    
    private mMeshes: Array<THREE.Mesh>;
    private mTopCentered: boolean;

    // change color according to Portal's
    private mIsOutput: boolean;

    constructor(pTopCentered: boolean=false, pIsOutput: boolean=false) {
        this.mTopCentered = pTopCentered;
        this.mIsOutput = pIsOutput;
    }
    
    moveToWindowPlane(pCamera: THREE.Camera) {
        
        if (!this.mMeshes) {
            return;
        }

        let lNormalizedScreenPos = new THREE.Vector2(1.005, 0.5);
        let lAngle = Math.PI / 2;

        if (this.mTopCentered) {
            lNormalizedScreenPos = new THREE.Vector2(0.5, -0.005);
            lAngle = Math.PI;
        }


        let lOrigin: THREE.Vector3 = new THREE.Vector3(lNormalizedScreenPos.x * 2 - 1, - lNormalizedScreenPos.y * 2 + 1, 0.5);
        pCamera.updateMatrix();
        pCamera.updateMatrixWorld(true);

        lOrigin = lOrigin.unproject(pCamera);
        
        let lDirection: THREE.Vector3 = lOrigin.sub(pCamera.position).normalize();

        let lPerspecAngle = Math.atan(lDirection.z / lDirection.x);
        if (this.mTopCentered) {
            lPerspecAngle = -Math.atan(lDirection.y / lDirection.x);
        }



        let lPosition3D = pCamera.position.clone();
        lPosition3D.add(lDirection.multiplyScalar(15));
        

        this.mMeshes[0].position.set(lPosition3D.x, lPosition3D.y, lPosition3D.z);

        let lOrientationQuad = new THREE.Quaternion();
        lOrientationQuad.setFromAxisAngle(new THREE.Vector3(1, 0, 0), lAngle);

        this.mMeshes[0].quaternion.set(lOrientationQuad.x, lOrientationQuad.y, lOrientationQuad.z, lOrientationQuad.w);

        this.mMeshes[0].quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), lPerspecAngle));


        this.mMeshes[1].position.set(lPosition3D.x, lPosition3D.y, lPosition3D.z);

        this.mMeshes[1].quaternion.set(lOrientationQuad.x, lOrientationQuad.y, lOrientationQuad.z, lOrientationQuad.w);
        this.mMeshes[1].quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), lPerspecAngle));
        this.mMeshes[1].quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2));
    }

    load( pScene: THREE.Scene, pOnLoaded: ()=>void) {
        let p1 = ModelLoader.loadModel(globalConfig.assetPath+"/portal.json");
        p1.then((pValue) => {

            // add mesh to Three.js scene
            const lMesh: THREE.Mesh = pValue;
            if (!pValue) {
                console.log("Cannot read portal model! ");
                return;
            }

            lMesh.scale.set(0.5, 0.8, 0.5);

            let lRingsColor: Array<number> = [0x61D3FD, 0x7BE0F2];
            if (this.mIsOutput) {
                lRingsColor = [0xEAB055, 0xFFB33D];
            }

            lMesh.material = new THREE.MeshPhongMaterial({ color: lRingsColor[0] });
            // lMesh.material.side = THREE.DoubleSide;
            lMesh.material.transparent = true;
            lMesh.material.depthTest = false;
            lMesh.material.depthWrite = false;
            lMesh.castShadow = false;

            lMesh.material.opacity = 0.5;

            pScene.add(lMesh);

            let lMesh2 = lMesh.clone();
            lMesh2.scale.set(0.4, 0.7, 0.4);

            lMesh2.material = new THREE.MeshPhongMaterial({ color: lRingsColor[1] });
            // lMesh2.material.side = THREE.DoubleSide;
            lMesh2.material.transparent = true;
            lMesh2.material.depthTest = false;
            lMesh2.material.opacity = 0.5;
            lMesh2.castShadow = false;

            pScene.add(lMesh2);

            this.mMeshes = [lMesh, lMesh2];

            pOnLoaded();
          //  this.moveToWindowPlane(pCamera);

        }).catch((pReason) => {
            console.log(pReason);
        });
    }

    updateAnimation() {
          if (this.mMeshes) {
            let lAngleInc = 0.005;
            this.mMeshes[0].quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), lAngleInc));
            this.mMeshes[1].quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -lAngleInc * 3));
        }
    }

}

export = PortalView;