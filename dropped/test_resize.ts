import Application = require("app/application");
import LayoutUtils = require("lib/layoutUtils");
// import SceneObjectsEvents = require("lib/sceneObjectsEvents");

// // overwrite default asset path since app is executed on parent folder
// import globalConfig = require("lib/config");
// globalConfig.assetPath = "dropped/assets";

// Initialize Three.js
if (!Detector.webgl) Detector.addGetWebGLMessage();

const cPortalInputContainerID = "portalinput";
const cPortalOutputContainerID = "portaloutput";

let lNavBar = document.getElementById("mainNav");

let lPortalInputContainer = document.getElementById(cPortalInputContainerID);
lPortalInputContainer.style.height = "300px";

let lPortalOutputContainer = document.getElementById(cPortalOutputContainerID);
lPortalOutputContainer.style.display = "block";


let lInputApplication = new Application(cPortalInputContainerID);
let lModels = ["cube"];
lInputApplication.addLoadedModels(lModels);
lInputApplication.addPortal(false, false);
lInputApplication.animate();

let lOutputApplication = new Application(cPortalOutputContainerID);
lOutputApplication.addLoadedModels(lModels);
lOutputApplication.addPortal(true, true);
lOutputApplication.animate();

LayoutUtils.alignOnRight(lPortalInputContainer, lPortalOutputContainer);

let lPortalOutputContainerTop = 350;
const cPortalOutputContainerPadding = 20;
if (lNavBar) {
    lPortalOutputContainerTop = lNavBar.getBoundingClientRect().height + cPortalOutputContainerPadding;
}
LayoutUtils.resize(lPortalOutputContainer, lPortalOutputContainerTop, cPortalOutputContainerPadding, lOutputApplication.onWindowResize);


let resizeTimer: NodeJS.Timer;
window.addEventListener("resize", () => {
    if (resizeTimer) {
        clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function () {
        LayoutUtils.alignOnRight(lPortalInputContainer, lPortalOutputContainer);

        if (lNavBar) {
            lPortalOutputContainerTop = lNavBar.getBoundingClientRect().height + cPortalOutputContainerPadding;
        }

        LayoutUtils.resize(lPortalOutputContainer, lPortalOutputContainerTop, cPortalOutputContainerPadding, lOutputApplication.onWindowResize);
        resizeTimer = null;
    }, 250);

})

