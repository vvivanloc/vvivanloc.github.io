import SceneObjects = require("../lib/sceneObjects")
import ModelLoader = require("../lib/modelLoader")

class PhysicsModelLoader {
    private mScene: THREE.Scene;
    private mWorld: CANNON.World;
    private mSceneObjects: SceneObjects;


    constructor(pScene: THREE.Scene, pWorld: CANNON.World, pSceneObjects: SceneObjects) {
        this.mScene = pScene;
        this.mWorld = pWorld;
        this.mSceneObjects = pSceneObjects;

    }


    load(pPath: string, pFilename: string) {


        let p1 = ModelLoader.loadModel(pPath + "/" + pFilename + ".json");
        let p2 = ModelLoader.loadModel(pPath + "/" + pFilename + ".hull.json");
        Promise.all([p1, p2]).then((pValues) => {

            // add mesh to Three.js scene
            const lMesh: THREE.Mesh = pValues[0];
            if (!pValues[0] || !pValues[1]) {
                console.log("Cannot read model or hull properly! ");
            }

            lMesh.name = pFilename;

            this.mScene.add(lMesh);

            // add hull to CANNON world
            const lHullMesh: THREE.Mesh = pValues[1];
            const lGeometry = <THREE.Geometry>lHullMesh.geometry;

            let lCannonVerts: Array<CANNON.Vec3> = lGeometry.vertices.map(function (v) {
                return new CANNON.Vec3(v.x, v.y, v.z)
            });

            let lCannonFaces: Array<Array<number>> = lGeometry.faces.map(function (f) {
                return [f.a, f.b, f.c];
            });

            let shape = new CANNON.ConvexPolyhedron(lCannonVerts, lCannonFaces);
            let lBody = new CANNON.Body({mass:1});
            lBody.addShape(shape);
            this.mWorld.addBody(lBody);

            this.mSceneObjects.push(lMesh, lBody);

        }).catch((pReason) => {
            console.log(pReason);
        });






    }
}

export = PhysicsModelLoader;