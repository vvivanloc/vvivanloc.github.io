// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
//import ReactDOM from 'react-dom'

// import { UUID } from './thirdparty/uuid.js';


// @flow

let AnimatedTooltip = function (pElements) {

    let _mElements = pElements;


    const cTooltipClass = "animated-tooltip";
    const cTooltipButtonClass = "minibtn-tip";

    function buildTooltip(pAssetPath, pNbImages) {
        let lTooltipImgSrcs = [];

        for (let i = 0; i < pNbImages; i++) {
            lTooltipImgSrcs.push(pAssetPath + "/" + i + ".png");
        }

        return lTooltipImgSrcs;
    }

    function initTooltip(pElementID, pAssetPath, pNbImages, pSlowFrames) {
        let lTooltipImgSrcs = buildTooltip(pAssetPath, pNbImages);

        let lTooltipElement = document.getElementById(pElementID);
        if (!lTooltipElement) {
            return;
        }

        let lTooltipImgElement = lTooltipElement.getElementsByTagName("img")[0];
        let lTooltipImgParent;

        if (lTooltipImgElement) {
            if (lTooltipImgElement.parentElement) {
                lTooltipImgParent = lTooltipImgElement.parentElement;
            }
        } else {
            console.error("cannot found image element");
        }

        if (!lTooltipImgParent) {
            console.error("cannot found image parent element");
        }

        let lShownRank = 0;
        let lNbRepeats=0;
        const cMaxRepeats = 3;
        let lRepeating=false;
        let lLastRepeat=false;
        function runTooltip() {

            if (!lTooltipImgParent) {
                return;
            }

            if (!lTooltipImgParent.classList.contains("hidden")) {
                lTooltipImgElement.src = lTooltipImgSrcs[lShownRank];

                // first time repeating
                if ((pSlowFrames.indexOf(lShownRank) !== -1) && (!lRepeating)) {
                    lRepeating=true;
                    lNbRepeats===0; 
                    lLastRepeat=false;
                }
                let lDelay = 1000;
                // stop repeating after number of iterations
                if (lRepeating) {
                    if (lNbRepeats===cMaxRepeats*2) {
                        lRepeating=false;
                        lNbRepeats=0;
                        
                    }                    
                    lNbRepeats++;
                    lDelay = 500;
                }

                // flip between next/previous
                if (lRepeating) {
                    if (lLastRepeat) { 
                        lShownRank--;
                    } else {
                        lShownRank++;
                    }
                    lLastRepeat=!lLastRepeat;
                } else {
                    if (lShownRank < pNbImages - 1) {
                        lShownRank++;
                    }
                    else {
                        lShownRank = 0;
                    }
                }
                setTimeout(runTooltip, lDelay);
            }
        }

        let lTooltipButton = lTooltipElement.getElementsByClassName(cTooltipButtonClass)[0];
        if (lTooltipButton) {
            lTooltipButton.addEventListener("click", () => {

                if (lTooltipImgParent) {

                    if (lTooltipImgParent.classList.contains("hidden")) {
                        lTooltipImgParent.classList.remove("hidden");
                        if (lTooltipImgElement) {
                            runTooltip();
                        }
                    } else {
                        lTooltipImgParent.classList.add("hidden");

                    }
                }

            }
            );
        }
    }



    return {
        render: function () {

            while (_mElements.length > 0) {

                let lElement = _mElements[0];

                let lAssetPath = lElement.hasAttribute("data-imgpath") ?
                    lElement.getAttribute("data-imgpath") : "";

                let lNbImages = lElement.hasAttribute("data-nbimgs") ?
                    Number(lElement.getAttribute("data-nbimgs")) : 0;

                let lSlowFrames = [];
                if (lElement.hasAttribute("data-slowranks")) {
                    let lArrayStr="";
                    lArrayStr = lElement.getAttribute("data-slowranks");
                    lSlowFrames = lArrayStr.split(";").map((item)=>{return Number(item);});
                }

                let lElementId = "animatedtooltip" + "-" + UUID.generate();

                let lNewElement = (
                    <div id={lElementId}>
                        <div class={cTooltipButtonClass + " minibtn overlap-lowerleft"}>
                        </div>
                        
                        <div class="overlap-lowerleft-tooltip hidden">
                            <div class="arrow-up"></div>
                            <img src={lAssetPath + "/0.png"} class="panel noborder panel-default img-responsive img-responsive-smaller paddinglittle box-shadow backgroundgray" />
                        </div>
                    </div>
                );

                lElement.parentNode.replaceChild(lNewElement, lElement);
                initTooltip(lElementId,lAssetPath, lNbImages, lSlowFrames);
            }

            

        }
    }
}

