
// @ts-nocheck

// import { UUID } from './thirdparty/uuid.js';

let FlipcardBack = function (pElements) {

    let _mElements = pElements;

    function _buildTabs(pTabElements) {
        let lTabButtons = [];
        let lTabContents = [];

        let lID = UUID.generate();

        let i = 0;

        // get active tab rank
        let lActiveTabRank = 0;
        for (let lTabElement of pTabElements) {


            if (lTabElement.hasAttribute("data-active")) {
                lActiveTabRank = i;
                break;
            }
            i++;
        }

        // build items
        i = 0;
        for (let lTabElement of pTabElements) {

            let lLabel = lTabElement.hasAttribute("data-label") ?
                lTabElement.getAttribute("data-label") : "";

            let lCarouselImgPath = lTabElement.hasAttribute("data-imgpath") ?
                lTabElement.getAttribute("data-imgpath") : "";

            let lCarouselImgSrcs = lTabElement.hasAttribute("data-imgsrcs") ?
                lTabElement.getAttribute("data-imgsrcs") : "";

            let lTabContent = lTabElement.innerHTML;
            lTabElement.innerHTML = "";

            lTabButtons.push(
                <li class={i === lActiveTabRank ? "active" : ""}><a data-toggle="tab" href={"#" + lID + "_" + i}>{lLabel}</a>
                </li>
            );
            //<div id={lID + "-carousel-" + i} data-imgpath={lCarouselImgPath} data-imgsrcs={lCarouselImgSrcs} data-controls></div>
            //{lTabContent}
            lTabContents.push(
                <div id={lID + "_" + i} class= {(i === lActiveTabRank ? "tab-pane fade in active" : "tab-pane fade")}>
                    {lCarouselImgSrcs !== "" ?
                        <carousel id={lID + "-carousel-" + i} data-imgpath={lCarouselImgPath} data-imgsrcs={lCarouselImgSrcs} data-controls></carousel>
                        :
                        ""
                    }
                    <div class="paddingtop">
                        {lTabContent}
                    </div>
                </div>
            )
            i++;
        }

        return {
            buttons: lTabButtons,
            contents: lTabContents
        }
    }

    return {
        render: function () {

            while (_mElements.length > 0) {

                let lElement = _mElements[0];

                let lTabElements = lElement.getElementsByTagName("tab");
                let lTabs = _buildTabs(lTabElements);


                let lNewElement = (
                    <div class="back">
                        <div class="minibtn overlap-lowerright minibtn-minus"></div>    
                        <div class="panel panel-default">
                            
                             
                            <div class="panel-body">
                                <div style="padding-top:5px;"></div>
                                <ul class="nav nav-pills nav-justified">
                                    {lTabs.buttons}
                                </ul>

                                <div class="tab-content paddingtop">
                                    {lTabs.contents}
                                </div>
                            
                            </div>
                            
                        </div>
                        
                    </div>);

                lElement.parentNode.replaceChild(lNewElement, lElement);
            }


        }
    }
}
