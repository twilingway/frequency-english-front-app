import { FC, memo } from 'react';
import MenuItemContainer from '../MenuItemContainer/MenuItemContainer';

import s from './ErrorStep.module.css';

interface IErrorStep {
    onClick?: () => void;
}
const ErrorStep: FC<IErrorStep> = memo(({ onClick }) => {
    return (
        <MenuItemContainer>
            <div className={s.errorBlock}>ОШИБКА</div>
            <button className={s.toMainButton} onClick={onClick}>
                ПРОБОВАТЬ СНОВА
            </button>
        </MenuItemContainer>
    );
});

export default ErrorStep;
