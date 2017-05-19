// @ts-nocheck

/* build a Bootstrap carousel 

attributes 

- imgpath: path of images 
- imgsrcs: filenames of images (separated by ';')
- titles & captions: add some titles & captions (separated by ';')
- controls: replace tiny bullets by big buttons

*/

// import { UUID } from './thirdparty/uuid.js';

let Carousel = function (pElements) {

    let _mElements = pElements;

    function _buildImage(pImagePath, pTitle) {
        return (
            <img src={pImagePath} alt={pTitle} class="img-rounded img-responsive center-block"></img>
        );
    }
    function _buildCarousel(pTarget, pPath, pFilenames, pTitles, pCaptions) {

        let lCarouselIndicators = [];
        let lCarouselInners = [];

        for (let i = 0; i < pFilenames.length; i++) {

            // create indicators
            lCarouselIndicators.push(
                <li data-target={"#" + pTarget} data-slide-to={i} class={i === 0 ? "active" : ""} ></li>
            )

            // create images
            let lCompletePath = pPath + "/" + pFilenames[i];
            lCarouselInners.push(
                <div class={(i === 0 ? "active" : " ")+" item item-image"}>
                    {_buildImage(lCompletePath, i < pTitles.length ? pTitles[i] : "")}
                    {pTitles.length > 0 ?
                        <div class="carousel-caption">
                            {i < pTitles.length ? <h4>{pTitles[i]}</h4> : ""}
                            <small>{i < pCaptions.length ? pCaptions[i] : ""}</small>
                        </div>
                        :
                        ""
                    }
                </div>);
        }

        return {
            indicators: lCarouselIndicators,
            inners: lCarouselInners
        }
    }

    return {

        render: function () {

            while (_mElements.length > 0) {

                let lElement = _mElements[0];

                let lTarget = lElement.id + "-" + UUID.generate();

                let lAssetPath = lElement.hasAttribute("data-imgpath") ?
                    lElement.getAttribute("data-imgpath") : "";

                let lImageFilenames = lElement.hasAttribute("data-imgsrcs") ?
                    lElement.getAttribute("data-imgsrcs").split(";") : [];

                let lTitles = lElement.hasAttribute("data-titles") ?
                    lElement.getAttribute("data-titles").split(";") : [];

                let lCaptions = lElement.hasAttribute("data-captions") ?
                    lElement.getAttribute("data-captions").split(";") : [];

                let lNewElement;
                if (lImageFilenames.length === 1) {
                    //simply add an image without any carousel for a single entry
                    lNewElement = (
                        _buildImage(lAssetPath+ "/" + lImageFilenames[0], (lTitles.length >= lImageFilenames.length ? lTitles[0]: "") 
                    ));

                } else {

                    let lShowControls = lElement.hasAttribute("data-controls") ? true : false;

                    let lCarousel = _buildCarousel(lTarget, lAssetPath, lImageFilenames, lTitles, lCaptions);
                    lNewElement = (
                        <div id={lTarget} class="carousel slide" data-ride="carousel">
                            {lShowControls ? "" : <ol class="carousel-indicators">{lCarousel.indicators}</ol>}

                            <div class="carousel-inner" role="listbox">
                                {lCarousel.inners}
                            </div>
                            {lShowControls ? <a class="carousel-control left" href={"#" + lTarget} data-slide="prev" ><div class="vertical-center"><div class="horizontal-center">&lsaquo;</div></div></a> : ""}
                            {lShowControls ? <a class="carousel-control right" href={"#" + lTarget} data-slide="next" ><div class="vertical-center"><div class="horizontal-center">&rsaquo;</div></div></a> : ""}

                        </div>
                    );

                }

                lElement.parentNode.replaceChild(lNewElement, lElement);
            }


        }
    }
}




