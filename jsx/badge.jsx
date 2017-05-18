// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
//import ReactDOM from 'react-dom'

// @flow

let Badge = function (pElements, pConfig) {

    let _mElements = pElements;

    let _mConfig = {
        label: "",
        tooltip_pre: "",
        tooltip_post: "",
        backgroundcolor: "#dddddd"
    };

    if (pConfig) {
        _mConfig["label"] = pConfig["label"] ? pConfig["label"] : _mConfig["label"];
        _mConfig["tooltip_pre"] = pConfig["tooltip_pre"] ? pConfig["tooltip_pre"] : _mConfig["tooltip_pre"];
        _mConfig["tooltip_post"] = pConfig["tooltip_post"] ? pConfig["tooltip_post"] : _mConfig["tooltip_post"];
        _mConfig["backgroundcolor"] = pConfig["backgroundcolor"] ? pConfig["backgroundcolor"] : _mConfig["backgroundcolor"];
    }

    return {
        render: function () {

            while (_mElements.length > 0) {

                let lElement = _mElements[0];

                let lBadgeValue = lElement.innerHTML;
                lElement.innerHTML = "";

                let lConfigToolTip = "";
                if (_mConfig["tooltip_pre"] !== "") {
                    let lConfigToolTipPost = "";
                    if (_mConfig["tooltip_post"] !== "") {
                        lConfigToolTipPost = " " + lBadgeValue + " " + _mConfig["tooltip_post"] + (lBadgeValue > 1 ? "s" : "");
                    }

                    lConfigToolTip = _mConfig["tooltip_pre"] + lConfigToolTipPost;
                }

                let lToolTip = lElement.hasAttribute("data-tooltip") ?
                    lElement.getAttribute("data-tooltip") : lConfigToolTip;

                const lBackgroundColor = "background-color: " + _mConfig["backgroundcolor"] + ";";

                let lInnerBadge = "";

                if (lBadgeValue !== "") {
                    lInnerBadge =
                        <span class="label" style={"font-size:15px;" + lBackgroundColor}>
                            <span>{_mConfig["label"]}</span>
                            <span style="display: inline-block; width: 6px"></span>
                            <span class="badge">{lBadgeValue}</span>
                        </span>
                        ;
                }
                else {
                    lInnerBadge =
                        <span class="label" style={"font-size:15px;" + lBackgroundColor}>
                            <span>{_mConfig["label"]}</span>
                        </span>
                        ;
                }


                let lNewElement = (lInnerBadge);
                if (lToolTip !== "") {
                    lNewElement = (
                        <a href="#" data-toggle="tooltip" title={lToolTip}>
                            {lInnerBadge}
                        </a>
                    );
                }

                //see http://stackoverflow.com/questions/4606547/why-does-replacechild-behave-oddly-when-replacing-one-kind-of-element-with-ano
                lElement.parentNode.replaceChild(lNewElement, lElement);
            }

        }
    }
}

