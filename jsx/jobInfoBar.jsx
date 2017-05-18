
let JobInfoBar = function (pElements) {

    let _mElements = pElements;

    return {
        render: function () {

            while (_mElements.length > 0) {

                let lElement = _mElements[0];

                let lRank = "";
                if (lElement.hasAttribute("data-rank")) {
                    lRank = lElement.getAttribute("data-rank");
                }

                let lDate = "";
                if (lElement.hasAttribute("data-date")) {
                    lDate = lElement.getAttribute("data-date");
                }

                let lDuration = "";
                if (lElement.hasAttribute("data-duration")) {
                    lDuration = lElement.getAttribute("data-duration");
                }


                let lTeam = "";
                if (lElement.hasAttribute("data-team")) {
                    lTeam = lElement.getAttribute("data-team");
                }

                let lEmployer = "";
                if (lElement.hasAttribute("data-employer")) {
                    lEmployer = lElement.getAttribute("data-employer");
                }

                let lClients = "";
                if (lElement.hasAttribute("data-clients")) {
                    lClients = lElement.getAttribute("data-clients");
                }


                let lContent = lElement.innerHTML;
                lElement.innerHTML = "";
                let lNewElement = (
                    <div class="jobinfobar">
                        <span style="display:inline-block;margin-top:5px;">
                            <rank>{lRank}</rank>
                        </span><span style="display:inline-block;margin-top:5px;">
                            <duration data-tooltip={lDate}>{lDuration}</duration>
                        </span><span style="display:inline-block;margin-top:5px;">
                            <team>{lTeam}</team>
                        </span>
                        <sponsorpanel data-names={lEmployer}></sponsorpanel>
                        {lClients!==""?<span>pour</span>:""}
                        {lClients!==""?<sponsorpanel data-names={lClients}></sponsorpanel>:""}
                    </div>

                );

                lElement.parentNode.replaceChild(lNewElement, lElement);
            }

        }
    }
}

