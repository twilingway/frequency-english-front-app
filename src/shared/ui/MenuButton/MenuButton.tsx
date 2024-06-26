import { FC, memo } from 'react';
import cn from 'classnames';

import s from './MenuButton.module.css';

interface IMenuButton {
    isOpen: boolean;
    onClick: (value: boolean) => void;
}
const MenuButton: FC<IMenuButton> = memo(({ onClick, isOpen }) => {
    const checkHandler = () => {
        onClick(!isOpen);
    }

    return (
        <div className={s.navContainer}>
            <input className={s.checkbox} type="checkbox" checked={isOpen} onChange={checkHandler} />
            <div className={s.lines}>
                <span className={cn(s.line, s.line1, {[s.checked]: isOpen})} />
                <span className={cn(s.line, s.line2, {[s.checked]: isOpen})} />
                <span className={cn(s.line, s.line3, {[s.checked]: isOpen})} />
            </div>
        </div>
    );
});

export default MenuButton;
