


export interface ScrollTriggerBase {
    el: HTMLElement;
    start: (el: HTMLElement, scrollY: number, scrollX: number) => boolean;
    type: "horizontal" | "vertical";
    scrollYChecker?: () => number;
    scrollXChecker?: () => number;
} 


//export scrolltriggerprops as base + (either instant or non instant)
export type ScrollTriggerProps = ScrollTriggerBase & (ScrollTriggerPropsInstantLayer | ScrollTriggerPropsNonInstantLayer);

interface ScrollTriggerPropsInstantLayer {
    instant: true,
    onFire: (el: HTMLElement) => void;
}

interface ScrollTriggerPropsNonInstantLayer {
    instant: false,
    onUpdate: (el: HTMLElement, scrollY: number, scrollX: number) => void;
    end: (el: HTMLElement, scrollY: number, scrollX: number) => boolean;
}


export interface ScrollTriggerResult {
    destroy : () => void;
    update : () => void;
    
}