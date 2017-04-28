import Application = require("app/application");
import LayoutUtils = require("lib/layoutUtils");
import SceneObjectsEvents = require("lib/sceneObjectsEvents");

// // overwrite default asset path since app is executed on parent folder
// import globalConfig = require("lib/config");
// globalConfig.assetPath = "dropped/assets";

// Initialize Three.js
if (!Detector.webgl) Detector.addGetWebGLMessage();

const cPortalInputContainerID = "portalinput";
const cPortalOutputContainerID = "portaloutput";

let lNavBar = document.getElementById("mainNav");

let lPortalInputContainer = document.getElementById(cPortalInputContainerID);
let lPortalInputContainerTop = 400;
lPortalInputContainer.style.height = lPortalInputContainerTop.toString() + "px";

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
    (_pEvent: LayoutUtils.EventScrolledToVisible) => {
        {
            lOutputApplication.onWindowResize();

        }

    }
);

lScrollerOutput.addEventListener(LayoutUtils.EventScrolledToHidden.typeID,
    (_pEvent: LayoutUtils.EventScrolledToHidden) => {
        {

        }
    }
);

lScrollerOutput.hide();
lScrollerInput.fetchAt(lPortalInputContainerTop * 1.5);

window.addEventListener('scroll', function (_e) {

    window.requestAnimationFrame(() => {
        lScrollerInput.fetchAt(lPortalInputContainerTop * 1.5);
        lScrollerOutput.fetchAt(lPortalOutputContainerTop, lOverlapFirst, lOverlapLast);

    });
}

);



let lSections: Array<HTMLElement> = ["section1", "section2", "section3", "section4"].map((item) => { return document.getElementById(item); });

lInputApplication.getSceneObjects().addEventListener(SceneObjectsEvents.EventTeleported.typeID,
    (pEvent: SceneObjectsEvents.EventTeleported) => {

        let lObjectName = <string>(pEvent.objectName as string);

        // find current most visible section
        let lSectionTops: Array<number> = lSections.map((item) => { return LayoutUtils.getBoundingAbsoluteLeftTopCorner(item).top; });

        // scroll to section 
        let lIdx = lModels.indexOf(lObjectName);
        let lScrollPosY=lSectionTops[lIdx]-(window.innerHeight-lSections[lIdx].getBoundingClientRect().height)/2;
        LayoutUtils.smoothScrollTop(lScrollPosY,1000);
        //window.scrollTo(0,lScrollPosY);
        console.log(lSectionTops)
        console.log("scrollTo:" + lSectionTops[lIdx])

        // update output portal
        let lLoadObjects: Array<string> = [lObjectName];
        lOutputApplication.enablePhysics = false;
        lOutputApplication.clear();
        lOutputApplication.addLoadedModels(lLoadObjects);
        lOutputApplication.enablePhysics = true;
    })