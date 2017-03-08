// your email here
var cEmail = "znvygb:ivaprag.ivinaybp@yncbfgr.arg";
var cBaseCharCode = "a".charCodeAt(0);
// wow, this is solid crypto ! :p
function buildEmailURL() {
    return (cEmail.replace(/[a-zA-Z]/g, function (c) {
        var lCharCode = ((c.charCodeAt(0) - cBaseCharCode) + 13) % 26 + cBaseCharCode;
        var lResult = String.fromCharCode(lCharCode);
        return lResult;
    }));
}
// DOM manipulation trickery to fool only a very basic crawler
var lDOMMailHref = document.getElementById("mailhref");
if (lDOMMailHref) {
    lDOMMailHref.addEventListener("click", function () { lDOMMailHref.href = buildEmailURL(); });
    lDOMMailHref.addEventListener("mouseleave", function () { lDOMMailHref.href = ""; });
}
//# sourceMappingURL=mailurlBuilder.js.map