import Application = require("app/application");
import SceneObjectsEvents = require("lib/sceneObjectsEvents");

// Initialize Three.js
if (!Detector.webgl) Detector.addGetWebGLMessage();

let lApplicationLeft = new Application("containerLeft");
lApplicationLeft.addLoadedModels(["cube", "a380", "wrench", "bulb"]);
lApplicationLeft.addPortal(false,false);
lApplicationLeft.animate();

let lApplicationRight = new Application("containerRight");
lApplicationRight.addPortal(true, true);
lApplicationRight.enablePhysics = false;
lApplicationRight.animate();
lApplicationLeft.getSceneObjects().addEventListener(SceneObjectsEvents.EventTeleported.typeID, (pEvent: SceneObjectsEvents.EventTeleported) => {
    let lObjectName: string = "";    
    if ("objectName" in pEvent) {
        lObjectName = <string>(pEvent.objectName as string);
        let lLoadObjects: Array<string> = [lObjectName];
        lApplicationRight.enablePhysics = false;
        lApplicationRight.clear();
        lApplicationRight.addLoadedModels(lLoadObjects);        
        lApplicationRight.enablePhysics = true;
        
    }
   
    
})


//lApplication.startPhysics();

//setInterval(() => {lApplication.resetSimulation();},20000) ;