import { FC, memo } from 'react';
import cn from 'classnames';
import MenuItemContainer from '../MenuItemContainer/MenuItemContainer';
import {
    IFirstStepData,
    OrderType,
} from '../../../features/MyStepsComponent/MyStepsComponent';

import s from './Button.module.css';

interface IButton extends IFirstStepData {
    step: number;
    onClick?: (type?: OrderType) => void;
    disabled?: boolean;
}
const Button: FC<IButton> = memo(
    ({ step, type, name, disabled, description, onClick }) => {
        const handleClick = () => {
            if (onClick) {
                onClick(type);
            }
        };
        return (
            <MenuItemContainer isLarge={!!description}>
                <button
                    className={cn(s.name, { [s.orange]: step > 1 })}
                    onClick={handleClick}
                    disabled={disabled}
                >
                    {name}
                </button>
                {description && (
                    <div className={s.description}>{description}</div>
                )}
            </MenuItemContainer>
        );
    },
);

export default Button;
