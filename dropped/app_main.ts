import Application = require("app/application");
import SceneObjectsEvents = require("lib/sceneObjectsEvents");
import LayoutUtils = require("lib/layoutUtils");

// overwrite default asset path since app is executed on parent folder
import globalConfig = require("lib/config");
globalConfig.assetPath = "dropped/assets";

// Initialize Three.js
if (!Detector.webgl) Detector.addGetWebGLMessage();

const cPortalInputContainerID = "portalinput";
const cPortalOutputContainerID = "portaloutput";



let lNavBar = document.getElementById("mainNav");

let lPortalInputContainer = document.getElementById(cPortalInputContainerID);
let lPortalOutputContainer = document.getElementById(cPortalOutputContainerID);



// build array of top positions of each section
let lSectionsIDs: Array<string> = ["web", "dmu", "optimization", "researchdevelopment"];



let lInputApplication = new Application(cPortalInputContainerID);
let lModels = ["cube", "a380", "wrench", "bulb"];
lInputApplication.addPortal(false, false);
lInputApplication.enablePhysics = false;
lInputApplication.animate();

let lOutputApplicationCanvas = <HTMLCanvasElement>document.getElementById(cPortalOutputContainerID + "canvas");
let lOutputApplication = new Application(cPortalOutputContainerID, lOutputApplicationCanvas);
lOutputApplication.addPortal(true, true);
lOutputApplication.enablePhysics = false;
lOutputApplication.animate();

//LayoutUtils.alignOnRight(lPortalInputContainer, lPortalOutputContainer);


let lPortalOutputContainerTop = 350;
const cPortalOutputContainerPadding = 20;
if (lNavBar) {
    lPortalOutputContainerTop = lNavBar.getBoundingClientRect().height + cPortalOutputContainerPadding;
}
//LayoutUtils.resize(lPortalOutputContainer, lPortalOutputContainerTop, cPortalOutputContainerPadding, lOutputApplication.onWindowResize);

// trigger input drops upon scrolls
let lTriggeredOnce = false;
let lScrollerInput = new LayoutUtils.ScrollerSpy([cPortalInputContainerID]);
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

let lScrollerOutput = new LayoutUtils.ScrollerSpy(lSectionsIDs.concat(["about"]));

lScrollerOutput.addEventListener(LayoutUtils.EventScrolledToVisible.typeID,
    (pEvent: LayoutUtils.EventScrolledToVisible) => {
        {
            console.log("=> showing #" + pEvent.rank);
            if (pEvent.rank<lDummyCanvas.length) {
                lDummyCanvas[pEvent.rank].appendChild(<HTMLElement>lOutputApplicationCanvas);
                lOutputApplication.updateDOMContainer(lDummyCanvas[pEvent.rank]);
                let lLoadObjects: Array<string> = [lModels[pEvent.rank]];
                lOutputApplication.enablePhysics = false;
                lOutputApplication.clear();
                lOutputApplication.addLoadedModels(lLoadObjects);
                lOutputApplication.enablePhysics = true;
            }
        }

    }
);

// swap output portal between most visible sections
let lOverlapFirst = 10;
let lOverlapLast = window.innerHeight - 150;

// let lPortalInputContainerTop = lPortalInputContainer.getBoundingClientRect().top;
let lVerticalCenteredOffset = lNavBar.getBoundingClientRect().height + (window.innerHeight - lPortalInputContainer.getBoundingClientRect().height) / 2
lScrollerInput.fetchAt(lVerticalCenteredOffset);

window.addEventListener('scroll', function (_e) {

    window.requestAnimationFrame(() => {
        // let lPortalInputContainerTop = lPortalInputContainer.getBoundingClientRect().top;
        let lVerticalCenteredOffset = lNavBar.getBoundingClientRect().height + (window.innerHeight - lPortalInputContainer.getBoundingClientRect().height) / 2
        lScrollerInput.fetchAt(lVerticalCenteredOffset);
        lScrollerOutput.fetchAt(lPortalOutputContainerTop, lOverlapFirst, lOverlapLast);

    });
}

);



let lDummyCanvas: Array<HTMLElement> = lSectionsIDs.map(
    (item) => {
        let lRoot = document.getElementById(item);
        if (lRoot) {
            let lElements = lRoot.getElementsByClassName("portal-right");
            if (lElements.length > 0) {
                return <HTMLElement>lElements.item(0);
            } else {
                console.error("cannot find canvas container for id : " + item);
            }
        }

        return null;
    });

let lScroller = new LayoutUtils.ScrollerSpy(lSectionsIDs);
lScroller.addEventListener(LayoutUtils.EventScrolledToVisible.typeID,
    (pEvent: LayoutUtils.EventScrolledToVisible) => {
        {
            console.log("=> showing #" + pEvent.rank);
            lDummyCanvas[pEvent.rank].appendChild(<HTMLElement>lOutputApplicationCanvas);

            let lLoadObjects: Array<string> = [lModels[pEvent.rank]];
            lOutputApplication.enablePhysics = false;
            lOutputApplication.clear();
            lOutputApplication.addLoadedModels(lLoadObjects);
            lOutputApplication.enablePhysics = true;

            lOutputApplication.onWindowResize();
        }

    }
);

lScroller.addEventListener(LayoutUtils.EventScrolledToHidden.typeID,
    (_pEvent: LayoutUtils.EventScrolledToHidden) => {
        {
            lOutputApplication.onWindowResize();
        }

    }
);



// //resize output portal
// let resizeTimer: NodeJS.Timer;
// window.addEventListener("resize", () => {
//     if (resizeTimer) {
//         clearTimeout(resizeTimer);
//     }
//     resizeTimer = setTimeout(function () {


//         if (lNavBar) {
//             lPortalOutputContainerTop = lNavBar.getBoundingClientRect().height + cPortalOutputContainerPadding;
//         }

  
//             lPortalInputContainer.style.left = "0px";

//             // resize with container on right column
//             lPortalInputContainer.style.top =  "0px";
//             //const lContainerHeight = window.innerHeight - pTop - pPaddingBot;
//             //pContainer.style.height = lContainerHeight.toString() + "px";


//         resizeTimer = null;
//     }, 250);

// })

// trigger scroll on portal traversal
let lSections: Array<HTMLElement> = lSectionsIDs.map((item) => { return document.getElementById(item); });
lInputApplication.getSceneObjects().addEventListener(SceneObjectsEvents.EventTeleported.typeID,
    (pEvent: SceneObjectsEvents.EventTeleported) => {

        let lObjectName = <string>(pEvent.objectName as string);

        // find current most visible section
        let lSectionTops: Array<number> = lSections.map((item) => { return LayoutUtils.getBoundingAbsoluteLeftTopCorner(item).top; });

        // scroll to section 
        let lIdx = lModels.indexOf(lObjectName);
        let lScrollPosY = lSectionTops[lIdx] - (window.innerHeight - lSections[lIdx].getBoundingClientRect().height) / 2 + lNavBar.getBoundingClientRect().height;
        LayoutUtils.smoothScrollTop(lScrollPosY, 1000);
        //window.scrollTo(0,lScrollPosY);
        console.log(lSectionTops)
        console.log("scrollTo:" + lSectionTops[lIdx])

        // update output portal
        let lLoadObjects: Array<string> = [lObjectName];
        lOutputApplication.enablePhysics = false;
        lOutputApplication.clear();
        lOutputApplication.addLoadedModels(lLoadObjects);
        lOutputApplication.enablePhysics = true;
    });
