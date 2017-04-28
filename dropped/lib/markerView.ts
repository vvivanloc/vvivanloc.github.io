
import globalConfig = require("lib/config");
import AnimatedModelLoader = require("lib/animatedModelLoader")

class MarkerView {

    private mDefaultMesh: THREE.Mesh;
    private mMovingMesh: THREE.Mesh;
    private mPickingMesh: THREE.Mesh;
    private mUseDefaultMesh: boolean;

    constructor(pScene: THREE.Scene) {
        let lMarkerMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        let shape = new THREE.SphereGeometry(0.2, 8, 8);
        this.mDefaultMesh = new THREE.Mesh(shape, lMarkerMaterial);
        this.mDefaultMesh.castShadow = true;
        this.mUseDefaultMesh = true;
        pScene.add(this.mDefaultMesh);
        this.hide();
    }

    private updateMesh(pMesh: THREE.Mesh, pPoint3D: THREE.Vector3) {
        if (pMesh) {
            pMesh.position.copy(pPoint3D);
        }
    }

    move(pPoint3D: THREE.Vector3) {
        if (this.mUseDefaultMesh) {
            this.setVisibleMesh(this.mDefaultMesh, true);
            this.updateMesh(this.mDefaultMesh, pPoint3D);            
        } else {
            this.setVisibleMesh(this.mMovingMesh, false);
            this.setVisibleMesh(this.mPickingMesh, true);
            this.updateMesh(this.mPickingMesh, pPoint3D);
        }

    }

     hover(pPoint3D: THREE.Vector3) {
        if (this.mUseDefaultMesh) {
            
        } else {
            this.setVisibleMesh(this.mPickingMesh, false);
            this.setVisibleMesh(this.mMovingMesh, true);
            this.updateMesh(this.mMovingMesh, pPoint3D);
        }

    }

    private setVisibleMesh(pMesh: THREE.Mesh, pVisible: boolean) {
        if (pMesh) {
            pMesh.visible = pVisible;
        }
    }
    hide() {
        if (this.mUseDefaultMesh) {
            this.setVisibleMesh(this.mDefaultMesh, false);
        } else {
            this.setVisibleMesh(this.mPickingMesh, false);
            this.setVisibleMesh(this.mMovingMesh, false);
        }
    }

    use3DModel(pUse: boolean, pScene: THREE.Scene) {
        this.mUseDefaultMesh = !pUse;


        function setColorAndScale(pMesh: THREE.Mesh, pColor: number) {

            pMesh.scale.set(7, 7, 7);
            
            //pMesh.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0.3));
            let lPhongMaterial = <THREE.MeshPhongMaterial>(pMesh.material);
            lPhongMaterial.color = new THREE.Color(pColor);
            pMesh.material.transparent = true;
            pMesh.material.opacity = 0.5;
            pMesh.material.depthTest = false;
        }

        if (pUse) {
            this.mDefaultMesh.visible = false;

            if (!this.mMovingMesh) {
                let p1 = AnimatedModelLoader.loadModel(globalConfig.assetPath+"/handGrab.json");

                p1.then((pValue) => {

                    // add mesh to Three.js scene
                    const lMesh: THREE.Mesh = pValue;
                    if (!pValue) {
                        console.log("Cannot read animated 3D marker model! ");
                        return;
                    }
                    setColorAndScale(lMesh,0x008800);

                    const lQuad = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI*0.85);
                    lMesh.quaternion.set(lQuad.x, lQuad.y, lQuad.z, lQuad.w);
                    lMesh.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI*0.25));
                    lMesh.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0.5));

                    this.mMovingMesh = lMesh;
                    this.mMovingMesh.visible = false;
                    pScene.add(lMesh);

                }).catch((pReason) => {
                    console.log(pReason);
                });
            }

            if (!this.mPickingMesh) {
                let p1 = AnimatedModelLoader.loadModel(globalConfig.assetPath+"/handPick.json");

                p1.then((pValue) => {

                    // add mesh to Three.js scene
                    const lMesh: THREE.Mesh = pValue;
                    if (!pValue) {
                        console.log("Cannot read animated 3D marker model! ");
                        return;
                    }
                    setColorAndScale(lMesh,0x880000);

                    const lQuad = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI*0.5);
                    lMesh.quaternion.set(lQuad.x, lQuad.y, lQuad.z, lQuad.w);
                    lMesh.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI*0.25));
                    lMesh.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -0.5));

                    this.mPickingMesh = lMesh;
                    this.mPickingMesh.visible = false;
                    pScene.add(lMesh);

                }).catch((pReason) => {
                    console.log(pReason);
                });
                
            }

 
        }

    }
}

export = MarkerView;