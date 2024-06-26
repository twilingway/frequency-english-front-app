// import OrderItem from '../OrderItem/OrderItem';
import { FC } from 'react';
import { OrderType } from '../../../features/MyStepsComponent/MyStepsComponent';

import s from './OrdersList.module.css';

export type OrderStatus = 'NEW' | 'WORK' | 'PSYCHOLOGIST' | 'CANCELLED' | 'EXECUTED' | 'DELETED' ;

export interface IOrder {
    address: string;
    createdAt: string;
    id: number;
    name: string;
    orderStatus: OrderStatus;
    orderType: OrderType;
    phone: string;
    updatedAt: string;
    userId: string | null;
}

interface IOrdersList {
    phone: string;
}
const OrdersList: FC<IOrdersList> = () => {
    // const [orders, setOrders] = useState<IOrder[]>([])

    // useEffect(() => {
    //     if (phone) {
    //         fetch(`${backendUrl}/order/${phone}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json;charset=utf-8',
    //             },
    //         }).then(async (response) => {
    //             if (response.ok) {
    //                 const json = await response.json();
    //                 setOrders(json)
    //             }
    //         });
    //     }
    // }, [phone]);

    return (
        <div className={s.container}>
            {/*<div className={s.title}>МОИ ЗАЯВКИ</div>*/}
            {/*<div className={s.content}>*/}
            {/*    {!orders.length && 'Заявки отсутствуют'}*/}
            {/*    {orders.map((el) => <OrderItem key={el.id} order={el} />)}*/}
            {/*</div>*/}
            <div className={s.title}>ТЕЛЕФОН ДЛЯ СВЯЗИ:</div>
            <a href="tel:+79995941007" className={s.phone}>+7-999-59-41-007</ a>
            <a
                className={s.consent}
                href="https://disk.yandex.ru/d/NGU8_mh2lmttvg"
                target="_blank"
                rel="noopener noreferrer"
            >
                СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ
            </a>
        </div>
    );
};

export default OrdersList;
