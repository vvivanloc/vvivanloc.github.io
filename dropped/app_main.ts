import Application = require("app/application");
import SceneObjectsEvents = require("lib/sceneObjectsEvents");
import LayoutUtils = require("lib/layoutUtils");

import globalConfig = require("lib/config");


const cPortalInputContainerID = "portalinput";
const cPortalOutputContainerID = "portaloutput";

let lPortalInputContainer = document.getElementById(cPortalInputContainerID);

const lMaxNbImages = 6;

function buildTooltip(): Array<string> {
    let lTooltipImgSrcs = new Array();

    for (let i = 0; i < lMaxNbImages; i++) {
        lTooltipImgSrcs.push("img/tooltip/" + i + ".png");
    }

    return lTooltipImgSrcs;
}

let lTooltipImgSrcs = buildTooltip();
const cTooltipButtonID = "portalinput_tooltip_button";
const cTooltipContainerID = "portalinput_tooltip_img";
let lTooltipImgElement: HTMLImageElement = <HTMLImageElement>document.getElementById(cTooltipContainerID);
let i = 0;
const lLongerSlideRanks = [2, 5];
function runTooltip() {

    if (!lTooltipImgElement.parentElement.classList.contains("hidden")) {
        lTooltipImgElement.src = lTooltipImgSrcs[i];
        if (i < lMaxNbImages - 1) {
            i++;
        }
        else {
            i = 0;
        }
        setTimeout(runTooltip, (lLongerSlideRanks.indexOf(i - 1) !== -1) ? 1000 : 500);
    }
}



let lTooltipButton = document.getElementById(cTooltipButtonID);
lTooltipButton.addEventListener("click", () => {
    if (lTooltipImgElement.parentElement.classList.contains("hidden")) {
        lTooltipImgElement.parentElement.classList.remove("hidden");
        if (lTooltipImgElement) {
            runTooltip();
        }
    } else {
        lTooltipImgElement.parentElement.classList.add("hidden");
        
    }
});

// Initialize Three.js if WebGL is available
if (!Detector.webgl) {

    // hide all canvases
    let lPortalOuts = document.getElementsByClassName("portal-right");
    for (let i = 0; i < lPortalOuts.length; i++) {
        let lElement: HTMLElement = <HTMLElement>lPortalOuts[i];
        lElement.style.display = "none";
    }

    // getElementsByClassName is evaluated dynamically 
    let lPortalOutSiblings = document.getElementsByClassName("col-sm-12 col-md-9");
    while (lPortalOutSiblings.length > 0) {
        let lElement: HTMLElement = <HTMLElement>lPortalOutSiblings[0];
        lElement.className = "col-sm-12 col-md-12";
    }

} else {

    lPortalInputContainer.classList.remove("hidden");

    // overwrite default asset path since app is executed on parent folder
    globalConfig.assetPath = "dropped/assets";


    let lNavBar = document.getElementById("mainNav");


    // let lPortalOutputContainer = document.getElementById(cPortalOutputContainerID);



    // build array of top positions of each section
    let lSectionsIDs: Array<string> = ["web", "dmu", "optimization", "researchdevelopment"];



    let lInputApplication = new Application(cPortalInputContainerID);
    let lModels = ["cube", "a380", "wrench", "bulb"];
    lInputApplication.addPortal(false, false);
    lInputApplication.enablePhysics = false;
    lInputApplication.useAnimatedMarker(true);
    lInputApplication.animate();

    let lOutputApplicationCanvas = <HTMLCanvasElement>document.getElementById(cPortalOutputContainerID + "canvas");
    let lOutputApplication = new Application(cPortalOutputContainerID, lOutputApplicationCanvas);
    lOutputApplication.addPortal(true, true);
    lOutputApplication.enablePhysics = false;
    lOutputApplication.useAnimatedMarker(true);
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
                if (pEvent.rank < lDummyCanvas.length) {
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
    let lOverlapFirst = -0;
    let lOverlapLast = window.innerHeight - 0;

    // let lPortalInputContainerTop = lPortalInputContainer.getBoundingClientRect().top;
    const cOverlapFirstInputOffset = 400;
    let lVerticalCenteredOffset = lNavBar.getBoundingClientRect().height + (window.innerHeight - lPortalInputContainer.getBoundingClientRect().height) / 2 + cOverlapFirstInputOffset;
    lScrollerInput.fetchAt(lVerticalCenteredOffset);

    window.addEventListener('scroll', function (_e) {

        window.requestAnimationFrame(() => {
            // let lPortalInputContainerTop = lPortalInputContainer.getBoundingClientRect().top;
            let lVerticalCenteredOffset = lNavBar.getBoundingClientRect().height + (window.innerHeight - lPortalInputContainer.getBoundingClientRect().height) / 2  + cOverlapFirstInputOffset;
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

    // trigger scroll on portal traversal
    let lSections: Array<HTMLElement> = lSectionsIDs.map((item) => { return document.getElementById(item); });
    lInputApplication.getSceneObjects().addEventListener(SceneObjectsEvents.EventTeleported.typeID,
        (pEvent: SceneObjectsEvents.EventTeleported) => {

            let lObjectName = <string>(pEvent.objectName as string);

            // find current most visible section
            let lSectionTops: Array<number> = lSections.map((item) => { return LayoutUtils.getBoundingAbsoluteLeftTopCorner(item).top; });

            // scroll to section 
            let lIdx = lModels.indexOf(lObjectName);
            let lScrollPosY = lSectionTops[lIdx] - (window.innerHeight - lSections[lIdx].getBoundingClientRect().height - lNavBar.getBoundingClientRect().height * 1.1) / 2;
            // - lNavBar.getBoundingClientRect().height*0.75
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
}