import { FC } from 'react';
import { IOrder } from '../OrdersList/OrdersList';

import s from './OrderItem.module.css';

const orderTypes = {
    FREE: 'БЕСПЛАТНЫЙ ВЫЗОВ',
    CALLBACK: 'ВЫЗОВ ПО ЗАПРОСУ',
    EDUCATION: 'ОБУЧЕНИЕ ★',
}

const orderStatuses = {
    NEW: 'новый',
    WORK: 'взят в работу оператором',
    PSYCHOLOGIST: 'назначен психолог',
    CANCELLED: 'отменен',
    EXECUTED: 'исполнен',
    DELETED: 'удален',
}

interface IOrderItem {
    order: IOrder;
}
const OrderItem: FC<IOrderItem> = ({ order }) => {
    return (
        <div className={s.orderItem}>
            <div className={s.type}>{orderTypes[order.orderType]}</div>
            <div className={s.status}>{orderStatuses[order.orderStatus].toUpperCase()}</div>
        </div>
    );
};

export default OrderItem;
