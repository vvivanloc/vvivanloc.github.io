import Application = require("app/application");

// Initialize Three.js
if (!Detector.webgl) Detector.addGetWebGLMessage();

let lLoadObjects = ["cube", "a380", "wrench", "bulb"];
let lApplication = new Application("container");
lApplication.addPortal(false, false);
lApplication.addLoadedModels(lLoadObjects);
lApplication.animate();
//lApplication.enablePhysics = false;
//lApplication.startPhysics();

//setInterval(() => {lApplication.resetSimulation();},20000) ;