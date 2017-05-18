
// align with both containers on right
export function alignOnRight(pPortalInputContainer: HTMLElement, pPortalOutputContainer: HTMLElement) {
    pPortalOutputContainer.style.left
        = (pPortalInputContainer.getBoundingClientRect().width + pPortalInputContainer.getBoundingClientRect().left - pPortalOutputContainer.getBoundingClientRect().width).toString() + "px";
}

// resize with container on right column
export function resize(pContainer: HTMLElement, pTop: number, pPaddingBot: number, pResizeCallback?: () => void) {

    pContainer.style.top = pTop.toString() + "px";
    const lContainerHeight = window.innerHeight - pTop - pPaddingBot;
    pContainer.style.height = lContainerHeight.toString() + "px";

    if (pResizeCallback) {
        pResizeCallback();
    }
}



// event emitted when scroll at given section
export class EventScrolledToVisible implements THREE.Event {
    type: string;
    target: string;
    rank: number;
    static readonly typeID: string = "scrolledToVisible";
    constructor(rank: number) {
        this.type = EventScrolledToVisible.typeID;
        this.rank = rank;
    }
}

// event emitted when scroll and nothing is reached
export class EventScrolledToHidden implements THREE.Event {
    type: string;
    target: string;
    static readonly typeID: string = "scrolledToHidden";
    constructor() {
        this.type = EventScrolledToHidden.typeID;
    }
}


export class ScrollerSpy extends THREE.EventDispatcher {

    private mPreviousFound = -1;
    private mIsVisible: boolean;
    private mSections: Array<HTMLElement>;
    constructor(pElementIDs: Array<string>) {
        super();
        this.mPreviousFound = -1;
        this.mIsVisible = false;
        this.mSections = pElementIDs.map((item) => {
            let lElement = document.getElementById(item);
            if (!lElement) {
                console.error("cannot find HTMLElement by id :'" + item + "'");
            }
            return lElement
        });
    }

    fetchAt(pContainerTop: number, pOverlapFirst = 0, pOverlapLast = 0) {

        const lNbClientBoundingRects = this.mSections.length;
        let lClientBoundingRects: Array<ClientRect> = this.mSections.map((item) => { return item.getBoundingClientRect(); });

        // hide if out of bound
        if (lClientBoundingRects[0].top > (pContainerTop + pOverlapFirst)) {
            // console.log("scroll more :"+lClientTops[0] +">"+ (pContainerTop + pOverlapFirst));
            if (this.mIsVisible) {
                this.hide();
            }

        } else if (lClientBoundingRects[lNbClientBoundingRects - 1].top < pOverlapLast) {
            // console.log("scroll less :"+lClientTops[lNbClientBoundingRects - 1] +"<"+ (window.innerHeight - pOverlapLast));
            if (this.mIsVisible) {
                this.hide();
            }

        } else {

            this.mIsVisible = true;

            // find current most visible section
            let lMinDist = Number.MAX_VALUE;
            let lFound = 0;
            for (let i = 0; i < lNbClientBoundingRects; i++) {
                let lCurrDist = lClientBoundingRects[i].top + lClientBoundingRects[i].height/2;
                if (lCurrDist > 0 && lCurrDist < lMinDist) {
                    lFound = i;
                    lMinDist = lCurrDist;
                }
            }

            // update output portal upon scroll pos
            if (this.mPreviousFound != lFound) {
                this.dispatchEvent(new EventScrolledToVisible(lFound));
                this.mPreviousFound = lFound;
            }

        }
    }

    hide() {
        this.mPreviousFound = -1;
        this.dispatchEvent(new EventScrolledToHidden());
        this.mIsVisible = false;
    }
}



/* smoothScroll
// http://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation
// scrollTargetY: the target scrollY property of the window
// speed: scroll speed in pixels per second
// easing: easing equation to use */
export function smoothScrollTop(pScrollTargetTop: number = 0, pSpeed: number = 2000, pEasingMethod: string = "easeOutSine") {

    let scrollY = window.scrollY || document.documentElement.scrollTop,
        currentTime = 0;

    // min time .1, max time .8 seconds
    let time = Math.max(.1, Math.min(Math.abs(scrollY - pScrollTargetTop) / pSpeed, .8));

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    let easingEquations: { [key: string]: (pos: number) => number } = {
        easeOutSine: function (pos: number) {
            return Math.sin(pos * (Math.PI / 2));
        },
        easeInOutSine: function (pos: number) {
            return (-0.5 * (Math.cos(Math.PI * pos) - 1));
        },
        easeInOutQuint: function (pos: number) {
            if ((pos /= 0.5) < 1) {
                return 0.5 * Math.pow(pos, 5);
            }
            return 0.5 * (Math.pow((pos - 2), 5) + 2);
        }
    };

    // add animation loop
    function tick() {
        currentTime += 1 / 60;

        let p = currentTime / time;
        let t = easingEquations[pEasingMethod](p);

        if (p < 1) {
            requestAnimationFrame(tick);

            window.scrollTo(0, scrollY + ((pScrollTargetTop - scrollY) * t));
        } else {
            console.log('scroll done');
            window.scrollTo(0, pScrollTargetTop);
        }
    }

    // call it once to get started
    tick();
}



export interface TopLeftCorner {
    top: number;
    left: number;
}

export function getBoundingAbsoluteLeftTopCorner(pElement: HTMLElement): TopLeftCorner {
    const box = pElement.getBoundingClientRect();

    const body = document.body;
    const docElem = document.documentElement;

    const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    const clientTop = docElem.clientTop || body.clientTop || 0;
    const clientLeft = docElem.clientLeft || body.clientLeft || 0;

    const top = box.top + scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) }
}