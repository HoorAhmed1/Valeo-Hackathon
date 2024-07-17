import { AnimatePresence } from 'framer-motion';

import {
    ItemContainer,
    MainItemContent,

} from './sidenav-item.styles';

export type SideNavItemProps = {
    id: number;
    /**
     * The text to display
     */
    text: string;
    /**
     * Icon to display on the left of the text
     */
    icon?: JSX.Element;
    /**
     * The route to go to when clicking the item
     */
    path: string;
    /**
     * Is item is active
     */
    active?: boolean;
} & (Extendable | Partial<Extendable>);

type Extendable = {
    extendable: boolean;
    extended: boolean;
    subItems: SubItemProps[];
    toggleExtend: (event: React.MouseEvent) => void;
};

export type SubItemProps = Pick<
    SideNavItemProps,
    'text' | 'id' | 'active' | 'path' | 'icon'
>;

export default function SideNavItem({
    icon,
    path,
    text,
    active,
    extendable,
    extended,
    subItems,
    toggleExtend,
}: Omit<SideNavItemProps, 'id'>) {
    const handleClickExtendableItem = (event: React.MouseEvent) => {
        if (subItems && subItems[0]) {
            event.stopPropagation();
            event.preventDefault();
            toggleExtend && toggleExtend(event);
        }
    };

    return (
        <ItemContainer to={path} active={active}>
            <MainItemContent onClick={handleClickExtendableItem}>
                {icon}
                {text}
            </MainItemContent>
        </ItemContainer>
    );
}
