import arrow from '../../../assets/goBack.png';

import s from './GoBack.module.css';
import { FC } from 'react';

interface IGoBack {
    onClick: () => void;
}
const GoBack: FC<IGoBack> = ({ onClick }) => {
    return (
        <div className={s.container} >
            <img src={arrow} alt='' onClick={onClick} />
        </div>
    );
};

export default GoBack;
