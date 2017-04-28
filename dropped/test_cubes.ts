import Application = require("app/application");

// Initialize Three.js
if (!Detector.webgl) Detector.addGetWebGLMessage();


let lApplication = new Application("container");
lApplication.addCubes(3);
lApplication.animate();

//lApplication.enablePhysics = false;
//lApplication.startPhysics();

//setInterval(() => {lApplication.resetSimulation();},20000) ;