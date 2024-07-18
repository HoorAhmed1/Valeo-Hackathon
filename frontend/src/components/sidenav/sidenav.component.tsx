import { useState, useRef, useEffect, MouseEvent } from "react";
import { Brand, LinksContainer, SideNavContainer } from "./sidenav.styles";
import { TbLayoutBoard } from "react-icons/tb";
import SideNavItem, {
    SideNavItemProps,
    SubItemProps,
} from '../sidenav-item/sidenav-item.component';
import { FaTimeline } from "react-icons/fa6";
import { SiCodeblocks } from "react-icons/si";

import { useLocation } from "react-router-dom";
export default function SideNav() {

     const [sideNavOpen, setSideNavOpen] = useState(false);
     const sideNavRef = useRef<HTMLElement>(null);
     const verticalNavRef = useRef<HTMLElement>(null);
     const [hidden, setHidden] = useState(false);
     const location = useLocation();

     const [navItems, setNavItems] = useState<SideNavItemProps[]>([
        {
            icon: <TbLayoutBoard />,
            path: '/board',
            text: 'Board',
            id: 1,
            active:true
        },
        {
            icon: <FaTimeline />,
            path: '/timeline',
            text: 'Timeline',
            id: 2,
        },        {
            icon: <SiCodeblocks />,
            path: '/blocklog',
            text: 'Blocklog',
            id: 3,
        },
    ])

        useEffect(() => {
            if (sideNavOpen) {
                document.body.classList.add('overflow-hidden');
            } else {
                document.body.classList.remove('overflow-hidden');
            }
        }, [sideNavOpen]);
        const handleToggleExtend = (
            event: React.MouseEvent,
            id: string | number,
        ) => {
            event.preventDefault();
            let newItems = navItems.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        extended: !item.extended,
                    };
                }
                return item;
            });
            setNavItems(newItems);
        };
        useEffect(() => {
            let targetItemId = navItems.find(
                (item) => item.path === location.pathname,
            )?.id;
            if (!targetItemId) return; // No match
        
            let newItems = navItems.map((item) => {
                if (item.id === targetItemId) {
                    return {
                        ...item,
                        active: true,
                    };
                } else {
                    return {
                        ...item,
                        active: false,
                    };
                }
            });
        
            setNavItems(newItems);
        }, [location.pathname]);
        
return (    <>
    {!hidden && (
        <SideNavContainer sideNavOpen={sideNavOpen} ref={sideNavRef}>
           <Brand>CLONE</Brand>
           <LinksContainer>
           {navItems.map((link) => (
                            <SideNavItem
                                {...link}
                                key={link.text}
                                toggleExtend={(event: React.MouseEvent) =>
                                    handleToggleExtend(event, link.id)
                                }
                            />
                        ))}
           </LinksContainer>
        </SideNavContainer>)}
</>
)
}