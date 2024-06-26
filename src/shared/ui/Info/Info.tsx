import { FC } from 'react';
import MenuItemContainer from '../MenuItemContainer/MenuItemContainer';

import s from './Info.module.css';

interface IInfo {
    text: string;
    description?: string;
}
const Info: FC<IInfo> = ({ text, description }) => {
    return (
        <MenuItemContainer>
            <div className={s.infoBlock}>{text}</div>
            <div className={s.description}>{description}</div>
        </MenuItemContainer>
    );
};

export default Info;
