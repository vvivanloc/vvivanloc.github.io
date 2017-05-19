// @flow

let SponsorPanel = function (pElements, pConfig) {

    let _mElements = pElements;

    let _mConfig = {
        imgpath: "",
        tooltip: false,
        height: 50,
        marginbottom: "0px",
        margintop: "0px",
        caption: false
    };

    if (pConfig) {
        _mConfig["imgpath"] = pConfig["imgpath"] ? pConfig["imgpath"] : _mConfig["imgpath"];
        _mConfig["tooltip"] = pConfig["tooltip"] ? pConfig["tooltip"] : _mConfig["tooltip"];
        _mConfig["height"] = pConfig["height"] ? pConfig["height"] : _mConfig["height"];
        _mConfig["marginbottom"] = pConfig["marginbottom"] ? pConfig["marginbottom"] : _mConfig["marginbottom"];
        _mConfig["margintop"] = pConfig["margintop"] ? pConfig["margintop"] : _mConfig["margintop"];
        _mConfig["caption"] = pConfig["caption"] ? pConfig["caption"] : _mConfig["caption"];
    }

    function buildImage(pImgName, pImgPath, pMarginBottom, pAddMargin) {
        return (<img style={"max-height: 100%; max-width: 100%; margin-bottom:" + (pMarginBottom) + ";" + (pAddMargin ? "margin-right:10px;" : "")} src={pImgPath + "/" + pImgName + ".png"} alt={pImgName}></img>);
    }

    function tooltipImage(pImgName, pImgPath, pMarginBottom, pAddMargin) {
        return (<a href="#" data-toggle="tooltip" title={pImgName}>{buildImage(pImgName, pImgPath, pMarginBottom, pAddMargin)}</a>);
    }


    function buildImageSpan(pImgNames, pConfig) {
        let lImageSpans = []
        const lNbImages = pImgNames.length;
        if (lNbImages === 0 || pImgNames[0] === "") {
            return lImageSpans;
        }

        let lImgs = [];
        let lIsLastImage = false;
        for (let i = 0; i < lNbImages; i++) {
            lIsLastImage = i === lNbImages - 1;
            lImgs.push(pConfig["tooltip"] ?
                tooltipImage(pImgNames[i], pConfig["imgpath"], pConfig["marginbottom"], !lIsLastImage) :
                buildImage(pImgNames[i], pConfig["imgpath"], pConfig["marginbottom"], !lIsLastImage));
        }

        lImageSpans.push(<span style="height:inherit;">{lImgs}</span>);

        return lImageSpans;
    }

    function buildCaption(pImgNames, pConfig) {
        if (pConfig["caption"]) {
            return (
                <div class="hidden-md hidden-lg"><i>{pImgNames.join(" ")}</i></div>
            );
        } else {
            return "";
        }
    }

    return {
        render: function () {

            while (_mElements.length > 0) {

                let lElement = _mElements[0];

                let lImgNames = [];

                if (lElement.hasAttribute("data-names")) {
                    lImgNames = lElement.getAttribute("data-names").split(";");
                }


                let lConfig = Object.assign({}, _mConfig);

                if (lElement.hasAttribute("data-imgpath")) {
                    lConfig["imgpath"] = lElement.getAttribute("data-imgpath");
                }

                lConfig["tooltip"] = lElement.hasAttribute("data-tooltip") ? true : lConfig["tooltip"];

                lConfig["marginbottom"] = lElement.hasAttribute("data-marginbottom") ? lElement.getAttribute("data-marginbottom") : lConfig["marginbottom"];
                lConfig["margintop"] = lElement.hasAttribute("data-margintop") ? lElement.getAttribute("data-margintop") : lConfig["margintop"];

                lConfig["caption"] = lElement.hasAttribute("data-caption") ? true : lConfig["caption"];

                let lContent = lElement.innerHTML;
                lElement.innerHTML = "";


                let lNewElement = (
                    <span style={"display:inline-block; height:" + lConfig["height"] + "px;margin-top:"+lConfig["margintop"]}>
                        {buildImageSpan(lImgNames, lConfig)}
                        {buildCaption(lImgNames, lConfig)}
                    </span>
                );

                lElement.parentNode.replaceChild(lNewElement, lElement);
            }

        }
    }
}

