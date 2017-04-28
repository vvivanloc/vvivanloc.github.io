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
let lPortalInputContainerHeight = 400;
lPortalInputContainer.style.height = lPortalInputContainerHeight.toString() + "px";

let lPortalOutputContainer = document.getElementById(cPortalOutputContainerID);

lPortalOutputContainer.style.display = "hidden";


let lInputApplication = new Application(cPortalInputContainerID);

let lModels = ["cube", "a380", "wrench", "bulb"];

lInputApplication.enablePhysics = false;
lInputApplication.addPortal(false, false);
lInputApplication.animate();

let lTriggeredOnce = false;

let lOutputApplicationCanvas = <HTMLCanvasElement>document.getElementById(cPortalOutputContainerID + "canvas");
let lOutputApplication = new Application(cPortalOutputContainerID, lOutputApplicationCanvas);
lOutputApplication.addPortal(true, true);
lOutputApplication.enablePhysics = false;
lOutputApplication.animate();

LayoutUtils.alignOnRight(lPortalInputContainer, lPortalOutputContainer);

let lPortalOutputContainerTop = 350;
const cPortalOutputContainerPadding = 20;
if (lNavBar) {
    lPortalOutputContainerTop = lNavBar.getBoundingClientRect().height + cPortalOutputContainerPadding;
}
LayoutUtils.resize(lPortalOutputContainer, lPortalOutputContainerTop, cPortalOutputContainerPadding, lOutputApplication.onWindowResize);

let lOverlapFirst = 10;
let lOverlapLast = window.innerHeight-150;

let lScrollerInput = new LayoutUtils.ScrollerSpy(["section0"]);
lScrollerInput.addEventListener(LayoutUtils.EventScrolledToVisible.typeID,
    (_pEvent: LayoutUtils.EventScrolledToVisible) => {
        {
            if (!lTriggeredOnce) {
                lInputApplication.enablePhysics = false;
                lInputApplication.clear();
                lInputApplication.addLoadedModels(lModels);
                lInputApplication.enablePhysics = true;
                lTriggeredOnce = true;
            }
        }
    }
);

let lScrollerOutput = new LayoutUtils.ScrollerSpy(["section1", "section2", "section3", "section4", "footer"]);
lScrollerOutput.addEventListener(LayoutUtils.EventScrolledToVisible.typeID,
    (pEvent: LayoutUtils.EventScrolledToVisible) => {
        {
            lPortalOutputContainer.style.display = "block";
            lOutputApplication.onWindowResize();
            let lLoadObjects: Array<string> = [lModels[pEvent.rank]];
            lOutputApplication.enablePhysics = false;
            lOutputApplication.clear();
            lOutputApplication.addLoadedModels(lLoadObjects);
            lOutputApplication.enablePhysics = true;
        }

    }
);

lScrollerOutput.addEventListener(LayoutUtils.EventScrolledToHidden.typeID,
    (_pEvent: LayoutUtils.EventScrolledToHidden) => {
        {
            lPortalOutputContainer.style.display = "none";
        }
    }
);

lScrollerOutput.hide();
lScrollerInput.fetchAt(lPortalInputContainerHeight * 1.5, 0, 0);

window.addEventListener('scroll', function (_e) {

    window.requestAnimationFrame(() => {
        lScrollerInput.fetchAt(lPortalInputContainerHeight * 1.5, 0, 0);
        lScrollerOutput.fetchAt(lPortalOutputContainerTop, lOverlapFirst, lOverlapLast);

    });
}

);

