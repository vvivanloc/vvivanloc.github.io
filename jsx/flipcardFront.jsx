
let FlipcardFront = function (pElements) {

    let _mElements = pElements;

    return {
        render: function () {

         while (_mElements.length>0) {

                let lElement = _mElements[0];

                let lImgSrc = "";
                let lImgAlt = "";
                if (lElement.hasAttribute("data-imgsrc")) {
                    lImgSrc = lElement.getAttribute("data-imgsrc");
                }

                if (lElement.hasAttribute("data-imgalt")) {
                    lImgAlt = lElement.getAttribute("data-imgalt");
                }

                let lImgSrcs= "";
                if (lElement.hasAttribute("data-imgsrcs")) {
                    lImgSrcs = lElement.getAttribute("data-imgsrcs");
                }

                let lImgPath ="";
                if (lElement.hasAttribute("data-imgpath")) {
                    lImgPath = lElement.getAttribute("data-imgpath");
                }
                


                let lContent=lElement.innerHTML;
                lElement.innerHTML="";
                let lNewElement = (
                    <div class="front bigbtn bigbtn-default">
                        <div class="minibtn overlap-lowerright minibtn-plus" ></div>
                        <div>
                            {lImgSrc!==""?<img class="hidden-xs img-responsive center-block" src={lImgSrc} alt={lImgAlt}></img>:""}
                            {lImgSrcs!==""?
                            <div class="hidden-md hidden-lg hidden-sm">
                                <carousel id="frontCarousel" data-imgpath={lImgPath} data-imgsrcs={lImgSrcs} data-controls/>
                            </div>:""}
                        </div>
                        
                        <div class="paddingtop">                            
                            {lContent}
                        </div>
                        
                    </div>
                );
                
                lElement.parentNode.replaceChild(lNewElement, lElement);
            }

        }
    }
}

