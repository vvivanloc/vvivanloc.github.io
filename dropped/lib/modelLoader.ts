
export function loadModel(pFilename: string): Promise<THREE.Mesh> {
    let lPromise = new Promise<THREE.Mesh>((resolve, reject) => {
        let loader = new THREE.JSONLoader();
        loader.load(pFilename,
            function (pParsedGeometry, pParsedMaterials) {
                if (!pParsedGeometry) {
                    reject("Mesh empty");
                }
                let lMaterial: THREE.Material;
                if (pParsedMaterials) {
                    lMaterial = new THREE.MultiMaterial(pParsedMaterials);
                } else {
                    lMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
                }
                let lMesh = new THREE.Mesh(pParsedGeometry, lMaterial);

                lMesh.castShadow = true;
                resolve(lMesh);
            },
            function (_event: ProgressEvent) {

            },
            function (event: ErrorEvent) {
                reject(event.error);
            })
    });
    return lPromise;
}