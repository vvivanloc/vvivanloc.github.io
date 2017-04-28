// see http://stackoverflow.com/questions/30430982/can-i-use-jsx-without-react-to-inline-html-in-script
// and also https://www.holtwick.de/blog/jsx-without-react.html
/**
 * Include this script in your HTML to use JSX compiled code without React.
 */
var React = {
    createElement: function (pTag, pAttrs, ...pChildren) {

        var lElement = document.createElement(pTag);

        for (var lName in pAttrs) {
            if (lName && pAttrs.hasOwnProperty(lName)) {
                var lValue = pAttrs[lName];
                if (lValue === true) {
                    lElement.setAttribute(lName, lName);
                } else if (lValue !== false && lValue != null) {
                    lElement.setAttribute(lName, lValue.toString());
                }
            }
        }

        function isString(pObject) {
            return (Object.prototype.toString.call(pObject) === '[object String]');
        }

        function appendObject(pElement, pChild) {
            if (!pChild) {
             //   throw "Item to append from array cannot be undefined";
            }
            if (Array.isArray(pChild)) {
                for (var i = 0; i < pChild.length; i++) {
                    var lChildItem = pChild[i];
                    appendObject(pElement, lChildItem);
                    //appendTextOrNode(element, lChildItem);
                }
            } else {
                if (isString(pChild)) {
                    pElement.appendChild(document.createTextNode(pChild.toString()));
                } else {
                    pElement.appendChild(pChild);
                }
            }
        }

        // jsquirk : use varags and not pChildren to ensure all pChildren are examined
        for (var i = 2; i < arguments.length; i++) {
            var lChild = arguments[i];
            appendObject(lElement, lChild);
        }

        return lElement;
    }

}
