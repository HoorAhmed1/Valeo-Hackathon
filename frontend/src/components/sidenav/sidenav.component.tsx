import { useState, useRef, useEffect } from "react";
import { SideNavContainer } from "./sidenav.styles";

export default function SideNav() {
        /**
     * This is for mobile view only. To handle the side nav open and close
     * and to prevent the body from scrolling when the side nav is open.
     */
     /**
     * This is for mobile view only. To handle the side nav open and close
     */
     const [sideNavOpen, setSideNavOpen] = useState(false);
     const sideNavRef = useRef<HTMLElement>(null);
     const verticalNavRef = useRef<HTMLElement>(null);
     const [hidden, setHidden] = useState(false);

 
     useEffect(() => {
         const screenClickHandler = (e: MouseEvent) => {
             /**
              * This is for mobile view only. If the click is not on the side nav
              * then close the side nav.
              */
             if (sideNavRef.current !== (e.target as HTMLElement)) {
                 setSideNavOpen(false);
             }
         };
         window.addEventListener('click', screenClickHandler);
         return () => {
             window.removeEventListener('click', screenClickHandler);
         };
     }, []);
        useEffect(() => {
            if (sideNavOpen) {
                document.body.classList.add('overflow-hidden');
            } else {
                document.body.classList.remove('overflow-hidden');
            }
        }, [sideNavOpen]);
return (    <>
    {!hidden && (
        <SideNavContainer sideNavOpen={sideNavOpen} ref={sideNavRef}>

        </SideNavContainer>)}
</>
)
}