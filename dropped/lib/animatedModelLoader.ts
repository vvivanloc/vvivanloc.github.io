
export function loadModel(pFilename: string): Promise<THREE.Mesh> {
    let lPromise = new Promise<THREE.Mesh>((resolve, reject) => {
        let loader = new THREE.JSONLoader();
        loader.load(pFilename,
            function (pParsedGeometry, pParsedMaterials) {
                if (!pParsedGeometry) {
                    reject("Mesh empty");
                }

                if (pParsedGeometry.animations) {
                    let lMaterial: THREE.MeshBasicMaterial;
                    if (pParsedMaterials) {
                        pParsedMaterials.forEach(function (material) {
                            let lPhongMaterial = <THREE.MeshPhongMaterial>(material);
                            lPhongMaterial.skinning = true;
                        });
                    } else {
                        lMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, skinning: true });
                        // lMaterial.skinning = true;
                    }
                    let lMesh = new THREE.SkinnedMesh(pParsedGeometry, lMaterial);

                    lMesh.castShadow = true;

                    let lAnimMixer = new THREE.AnimationMixer(lMesh);
                    let lAnimAction = lAnimMixer.clipAction(pParsedGeometry.animations[0]);

                    lAnimAction.setEffectiveWeight(1);

                    lAnimAction.setLoop(THREE.LoopRepeat, 10);
                    lAnimAction.clampWhenFinished = false;
                    lAnimAction.enabled = true;
                    lAnimAction.play();
                    resolve(lMesh);
                } else {
                    let lMaterial: THREE.MeshBasicMaterial;
                    if (pParsedMaterials) {
                        // pParsedMaterials.forEach(function (material) {
                        //     let lPhongMaterial = <THREE.MeshPhongMaterial>(material);
                        //     lPhongMaterial.skinning = true;
                        // });
                    } else {
                        lMaterial = new THREE.MeshPhongMaterial({ color: 0x888888});
                        // lMaterial.skinning = true;
                    }
                    let lMesh = new THREE.Mesh(pParsedGeometry, lMaterial);
                    resolve(lMesh);
                }
            },
            function (_event: ProgressEvent) {

            },
            function (event: ErrorEvent) {
                reject(event.error);
            })
    });
    return lPromise;
}


