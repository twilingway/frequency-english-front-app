import cn from 'classnames';
import { FC, memo, ReactNode } from 'react';
import MenuButton from '../../shared/ui/MenuButton/MenuButton';
import OrdersList from '../../shared/ui/OrdersList/OrdersList';

import s from './Main.module.css';

interface IMain {
    children?: ReactNode;
    isOpenMenu: boolean;
    onOpenMenu: (value: boolean) => void;
    phone: string;
    step?: number;
    orderType?: string;
}
const Main: FC<IMain> = memo(({ children, step, orderType, onOpenMenu, isOpenMenu, phone }) => {
    return (
        <div className={cn(s.container, {[s.second]: step === 2, [s.third]: step === 3})}>
            <MenuButton onClick={onOpenMenu} isOpen={isOpenMenu} />
            <div className={cn(s.logo, {[s.ribbonLogo]: step === 3 && orderType === 'FREE'})} />
            {isOpenMenu ? <OrdersList phone={phone} /> : (
                <>
                    <div className={s.content}>
                        {children}
                    </div>
                    <div className={s.handsLogo} />
                </>
                )}
        </div>
    );
});

export default Main;
