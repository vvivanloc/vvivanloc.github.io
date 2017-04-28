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
lPortalInputContainer.style.height = "400px";

let lPortalOutputContainer = document.getElementById(cPortalOutputContainerID);
let lInputApplication = new Application(cPortalInputContainerID);
let lModels = ["cube"];
lInputApplication.addLoadedModels(lModels);
lInputApplication.addPortal(false, false);
lInputApplication.animate();

let lOutputApplicationCanvas = <HTMLCanvasElement>document.getElementById(cPortalOutputContainerID + "canvas");
let lOutputApplication = new Application(cPortalOutputContainerID, lOutputApplicationCanvas);
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

let lOverlapFirst = 10;
let lOverlapLast = window.innerHeight-150;

let lSectionsIDs = ["section1", "section2", "section3", "section4"];
let lDummyCanvas: Array<HTMLElement> = lSectionsIDs.map(
    (item) => {
        let lRoot = document.getElementById(item);
        if (lRoot) {
            let lElements = lRoot.getElementsByClassName("portal-right");
            if (lElements.length > 0) {
                return <HTMLElement>lElements.item(0);
            }
        }

        return null;
    });

let lScroller = new LayoutUtils.ScrollerSpy(lSectionsIDs.concat(["footer"]));
lScroller.addEventListener(LayoutUtils.EventScrolledToVisible.typeID,
    (pEvent: LayoutUtils.EventScrolledToVisible) => {
        {
            console.log("=> showing #" + pEvent.rank);
            lDummyCanvas[pEvent.rank].appendChild(<HTMLElement>lOutputApplicationCanvas);
            lOutputApplication.updateDOMContainer(lDummyCanvas[pEvent.rank]);
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

lScroller.fetchAt(lPortalOutputContainerTop, lOverlapFirst, lOverlapLast);

window.addEventListener('scroll', function (_e) {

    window.requestAnimationFrame(() => {
        lScroller.fetchAt(lPortalOutputContainerTop, lOverlapFirst, lOverlapLast);
    });
}

);

