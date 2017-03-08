// your email here
const cEmail: string = "znvygb:ivaprag.ivinaybp@yncbfgr.arg";
const cBaseCharCode = "a".charCodeAt(0);

// wow, this is solid crypto ! :p
function buildEmailURL(): string {    
    return (cEmail.replace(/[a-zA-Z]/g,
        function (c: string): string {            
            const lCharCode: number = ((c.charCodeAt(0)-cBaseCharCode) + 13) % 26 + cBaseCharCode;
            const lResult: string = String.fromCharCode(lCharCode);
            return lResult;
        }));
}

// DOM manipulation trickery to fool only a very basic crawler
let lDOMMailHref= <HTMLAnchorElement> document.getElementById("mailhref");
if (lDOMMailHref) {
    lDOMMailHref.addEventListener("click",()=> {lDOMMailHref.href = buildEmailURL();})    
    lDOMMailHref.addEventListener("mouseleave",()=> {lDOMMailHref.href = "";})    
}

