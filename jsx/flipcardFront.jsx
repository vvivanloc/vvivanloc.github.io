
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

                let lContent=lElement.innerHTML;
                lElement.innerHTML="";
                let lNewElement = (
                    <div class="front bigbtn bigbtn-default">
                        <div class="minibtn overlap-lowerright minibtn-plus" ></div>
                        <div>
                            {lImgSrc!==""?<img class="img-responsive center-block" src={lImgSrc} alt={lImgAlt}></img>:""}
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

