import { FC, ReactNode } from 'react';

import s from './MenuItemContainer.module.css';
import cn from 'classnames';

interface IMenuItemContainer {
    isLarge?: boolean;
    children?: ReactNode;
}
const MenuItemContainer: FC<IMenuItemContainer> = ({ isLarge, children }) => {
    return (
        <div className={cn(s.container, {[s.large]: isLarge})}>
            {children}
        </div>
    );
};

export default MenuItemContainer;
