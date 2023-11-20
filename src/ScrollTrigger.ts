import { ScrollTriggerProps, ScrollTriggerResult } from "./types";

export default function(props: ScrollTriggerProps): ScrollTriggerResult {
    
    const scrollYChecker = (() => window.scrollY) || props.scrollYChecker;
    const scrollXChecker = (() => window.scrollX) || props.scrollYChecker;

    let listener: () => void = () => null;
    if (props.instant) {
        listener = () => {
            if (props.start(props.el, scrollXChecker(), scrollYChecker())){
                props.onFire(props.el);
            }
        }
    }
    else {
        let started: boolean = false;
        listener = () => {
            if (!started && props.start(props.el, scrollYChecker(), scrollXChecker())){
                started = true;
            }

            if (started){
                if (!props.end(props.el, scrollYChecker(), scrollXChecker())){
                    props.onUpdate(props.el, scrollYChecker(), scrollXChecker());
                }
            }
            
        }
    }

    document.addEventListener("scroll", listener);

    return {
        destroy: () => {
            document.removeEventListener("scroll", listener);
        },
        update: () => {
            listener();
        }
    }

}