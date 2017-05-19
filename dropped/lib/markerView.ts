
import globalConfig = require("../lib/config");
import AnimatedModelLoader = require("../lib/animatedModelLoader")

const cDefaultColor = 0x008800;
const cMovingColor = 0x880000;

export enum State {
    move = 0,
    pick = 1,
    hover = 2,
    hide = 3,
    undef = 4
}

export class MarkerView {

    private mDefaultMesh: THREE.Mesh;
    private mMovingMesh: THREE.Mesh;
    private mPickingMesh: THREE.Mesh;
    private mCurrentMesh: THREE.Mesh;
    private mUseDefaultMesh: boolean;

    private mState: State;


    constructor(pScene: THREE.Scene) {
        let lMarkerMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        let shape = new THREE.SphereGeometry(0.2, 8, 8);
        this.mDefaultMesh = new THREE.Mesh(shape, lMarkerMaterial);
        this.mDefaultMesh.castShadow = true;

        this.mCurrentMesh = this.mDefaultMesh;
        this.mUseDefaultMesh = true;

        this.mState = State.undef;
        pScene.add(this.mDefaultMesh);

        this.setState(State.hide);
    }

    private updateMesh(pMesh: THREE.Mesh, pPoint3D: THREE.Vector3) {
        if (pMesh) {
            pMesh.position.copy(pPoint3D);
        }
    }

    setState(pState: State) {
        if (this.mState !== pState) {
            this.mState = pState;


            switch (this.mState) {
                case State.pick: {
                    if (this.mUseDefaultMesh) {
                        this.setVisibleMesh(this.mDefaultMesh, true);

                    } else {
                        this.setCurrentMesh(true);
                    }
                    break;
                }
                case State.hover:
                    {
                        if (this.mUseDefaultMesh) {

                        } else {
                            this.setCurrentMesh(false);
                            this.setColor(this.mCurrentMesh, cDefaultColor);
                        }

                        break;
                    }



                case State.move:
                    {
                        if (this.mUseDefaultMesh) {

                        } else {
                            this.setCurrentMesh(false);
                            this.setColor(this.mCurrentMesh, cMovingColor);
                        }

                        break;
                    }
                case State.hide:
                default: {
                    if (this.mUseDefaultMesh) {
                        this.setVisibleMesh(this.mDefaultMesh, false);
                    } else {
                        this.setVisibleMesh(this.mPickingMesh, false);
                        this.setVisibleMesh(this.mMovingMesh, false);
                    }
                }

            }

        }
    }

    private setCurrentMesh(pPicking: boolean) {
        if (pPicking) {
            this.mCurrentMesh = this.mPickingMesh;
            this.setVisibleMesh(this.mPickingMesh, true);
            this.setVisibleMesh(this.mMovingMesh, false);
        } else {
            this.mCurrentMesh = this.mMovingMesh;
            this.setVisibleMesh(this.mPickingMesh, false);
            this.setVisibleMesh(this.mMovingMesh, true);
        }


    }


    updateMeshPosition(pPoint3D: THREE.Vector3) {
        if (this.mUseDefaultMesh) {
            this.updateMesh(this.mDefaultMesh, pPoint3D);
        } else {
            this.updateMesh(this.mCurrentMesh, pPoint3D);
        }
    }




    private setVisibleMesh(pMesh: THREE.Mesh, pVisible: boolean) {
        if (pMesh) {
            pMesh.visible = pVisible;
        }
    }

    private setColor(pMesh: THREE.Mesh, pColor: number) {

        if (!pMesh) {
            return;
        }
        
        if (!pMesh.material) {
            return;
        }

        let lPhongMaterial = <THREE.MeshPhongMaterial>(pMesh.material);
        lPhongMaterial.color.setHex(pColor);

    }



    use3DModel(pUse: boolean, pScene: THREE.Scene) {
        this.mUseDefaultMesh = !pUse;


        function setColorAndScale(pMesh: THREE.Mesh, pColor: number) {

            pMesh.scale.set(5, 5, 5);

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
                let p1 = AnimatedModelLoader.loadModel(globalConfig.assetPath + "/handGrab.json");

                p1.then((pValue) => {

                    // add mesh to Three.js scene
                    const lMesh: THREE.Mesh = pValue;
                    if (!pValue) {
                        console.log("Cannot read animated 3D marker model! ");
                        return;
                    }
                    setColorAndScale(lMesh, cDefaultColor);

                    const lQuad = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI * 0.85);
                    lMesh.quaternion.set(lQuad.x, lQuad.y, lQuad.z, lQuad.w);
                    lMesh.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI * 0.25));
                    lMesh.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0.5));

                    this.mMovingMesh = lMesh;
                    this.mMovingMesh.visible = false;
                    pScene.add(lMesh);

                }).catch((pReason) => {
                    console.log(pReason);
                });
            }

            if (!this.mPickingMesh) {
                let p1 = AnimatedModelLoader.loadModel(globalConfig.assetPath + "/handPick.json");

                p1.then((pValue) => {

                    // add mesh to Three.js scene
                    const lMesh: THREE.Mesh = pValue;
                    if (!pValue) {
                        console.log("Cannot read animated 3D marker model! ");
                        return;
                    }
                    setColorAndScale(lMesh, cDefaultColor);

                    const lQuad = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI * 0.5);
                    lMesh.quaternion.set(lQuad.x, lQuad.y, lQuad.z, lQuad.w);
                    lMesh.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI * 0.25));
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

