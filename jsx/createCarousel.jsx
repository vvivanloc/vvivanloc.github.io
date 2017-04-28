

function buildCarousel(pTarget, pPath, pFilenames, pTitles, pCaptions) {

    var lCarouselIndicators = [];
    var lCarouselInners = [];
    var lTarget ="#"+pTarget;
    for (var i = 0; i < pFilenames.length; i++) {

        // create indicators
        lCarouselIndicators.push(            
            <li data-target={lTarget} data-slide-to="0" class={i === 0 ? "active" : ""} ></li>
        )

        // create images
        var lCompletePath = pPath + "/" + pFilenames[i];
        lCarouselInners.push(
            <div class={i === 0 ? "item active" : "item"}>
                <img src={lCompletePath} alt={i < pTitles.length ? pTitles[i] : ""} class="img-rounded img-responsive center-block"></img>

                {pTitles.length > 0 ?
                    <div class="carousel-caption">
                        {i < pTitles.length ? <h4>{pTitles[i]}</h4> : ""}
                        <small>{i < pCaptions.length ? pCaptions[i] : ""}</small>
                    </div>
                    :
                    ""
                }


            </div>)
    }

    return {
        indicators: lCarouselIndicators,
        inners: lCarouselInners
    }
}

var lElements = document.getElementsByTagName('carousel');
for (lElement of lElements) {

    
    var lTarget = lElement.id;
    var lImageFilenames = [];
    var lAssetPath = "../img/portfolio";
    var lTitles = [];
    var lCaptions = [];

    if (lElement.hasAttribute("data-imgpath")) {
        lAssetPath=lElement.getAttribute("data-imgpath");
    }

    if (lElement.hasAttribute("data-imgsrcs")) {
        lImageFilenames=lElement.getAttribute("data-imgsrcs").split(";")
    }

    if (lElement.hasAttribute("data-titles")) {
        lTitles=lElement.getAttribute("data-titles").split(";")
    }

    if (lElement.hasAttribute("data-captions")) {
        lCaptions=lElement.getAttribute("data-captions").split(";")
    }

    let lCarousel = buildCarousel(lTarget, lAssetPath, lImageFilenames, lTitles, lCaptions);
    lElement.appendChild(
        <div id={lTarget} class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                {lCarousel.indicators}
            </ol>
            <div class="carousel-inner" role="listbox">
                {lCarousel.inners}
            </div>
        </div>
    );

}