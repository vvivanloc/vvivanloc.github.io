// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
//import ReactDOM from 'react-dom'

// @flow

let Hello = function (pElements) {
    const title = "Hello World";

    let _mElements = pElements;

    return {
        render: function () {
           
            while (_mElements.length>0) {

                let lElement = _mElements[0];

                let lNewElement = (
                    <div>
                        <h1>{title}</h1>
                        <p>This is a template written in JSX by Babel jsx compiler and finally
                injected into a web page using a script</p>
                    </div>
                );

                //see http://stackoverflow.com/questions/4606547/why-does-replacechild-behave-oddly-when-replacing-one-kind-of-element-with-ano
                lElement.parentNode.replaceChild(lNewElement, lElement);
            }

        }
    }
}

