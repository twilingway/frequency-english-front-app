import Main from '../../pages/Main/Main';
import Info from '../../shared/ui/Info/Info';
import Loader from '../../assets/Loader.svg';
import Input from '../../shared/ui/Input/Input';
import Button from '../../shared/ui/Button/Button';
import GoBack from '../../shared/ui/GoBack/GoBack';
import { useIndexedDB } from 'react-indexed-db-hook';
import ErrorStep from '../../shared/ui/ErrorStep/ErrorStep';
import {
    ChangeEvent,
    FC,
    memo,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import './MyStepsComponent.css';

export type OrderType = 'FREE' | 'CALLBACK' | 'EDUCATION';

export interface IFirstStepData {
    name: string | ReactNode;
    description?: string;
    type?: OrderType;
}

interface ICreateOrderPayload {
    address: string;
    phone: string;
    name: string;
    orderType: OrderType;
}

const firstStepData: IFirstStepData[] = [
    {
        name: 'БЕСПЛАТНЫЙ ВЫЗОВ',
        description: 'ДЛЯ УЧАСТНИКОВ СВО',
        type: 'FREE',
    },
    {
        name: 'ВЫЗОВ ПО ЗАПРОСУ',
        description: 'ДЛЯ ГРАЖДАНСКИХ ЛИЦ',
        type: 'CALLBACK',
    },
    {
        name: 'ОБУЧЕНИЕ ★',
        description: 'ДЛЯ ПСИХОЛОГОВ',
        type: 'EDUCATION',
    },
];

interface IDbData {
    phone: string;
}

export const backendUrl = 'https://i-exist.twiling.ru/api';

const MyStepsComponent: FC = memo(() => {
    const { getByID, add, update } = useIndexedDB('user');

    const [step, setStep] = useState(1);
    const [orderType, setOrderType] = useState<OrderType>('FREE');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dbPhone, setDbPhone] = useState('');

    useEffect(() => {
        getByID<IDbData>(1).then(
            (user) => {
                if (user) {
                    setDbPhone(user.phone);
                }
            },
            (e) => console.log(e),
        );
    }, [getByID]);

    const isPhoneValid = useMemo(
        () =>
            !RegExp(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/).exec(phone)
                ? 'Введите корректный номер телефона'
                : '',
        [phone],
    );

    const handleButtonClick = useCallback((buttonType?: OrderType) => {
        setOrderType(buttonType ?? 'FREE');
        setStep(2);
    }, []);

    const handleToMainClick = useCallback(() => {
        setOrderType('FREE');
        setStep(1);
    }, []);

    const handleSubmit = useCallback(async () => {
        const payload: ICreateOrderPayload = {
            phone: phone.replace(/\D/g, ''),
            orderType,
            address,
            name,
        };
        setIsLoading(true);
        const response = await fetch(`${backendUrl}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const json = await response.json();
            if (!dbPhone) {
                await add({ phone: json.phone });
                setDbPhone(json.phone);
            } else if (dbPhone !== json.phone) {
                await update({ id: 1, phone: json.phone });
                setDbPhone(json.phone);
            }
            setStep(3);
        } else {
            alert('Ошибка HTTP: ' + response.status);
            setStep(0);
        }
        setIsLoading(false);
        setPhone('');
        setName('');
        setAddress('');
    }, [add, address, dbPhone, name, orderType, phone, update]);

    const handleAddressChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setAddress(event.target.value);
        },
        [],
    );

    const handleNameChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
        },
        [],
    );

    const handlePhoneChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setPhone(event.target.value);
        },
        [],
    );

    const handleMenuClick = useCallback((value: boolean) => {
        setIsOpenMenu(value);
    }, []);

    return (
        <Main
            step={step}
            orderType={orderType}
            isOpenMenu={isOpenMenu}
            onOpenMenu={handleMenuClick}
            phone={dbPhone}
        >
            {step === 0 && <ErrorStep onClick={handleToMainClick} />}
            {step === 1 &&
                firstStepData.map((el) => (
                    <Button
                        step={step}
                        key={el.type}
                        onClick={handleButtonClick}
                        {...el}
                    />
                ))}
            {step === 2 && (
                <>
                    <GoBack onClick={handleToMainClick} />
                    <Input
                        type="text"
                        placeholder="ВВЕДИТЕ ВАШ АДРЕС"
                        description="ПРИМЕР: МОСКВА, УЛ. СТРОИТЕЛЕЙ, ДОМ 5, ПОДЪЕЗД 4"
                        value={address}
                        onChange={handleAddressChange}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="ВВЕДИТЕ НОМЕР ТЕЛЕФОНА"
                        description="ПРИМЕР: +7912 617 27 14"
                        value={phone}
                        onChange={handlePhoneChange}
                        mask="+7 (999) 999-99-99"
                        error={phone && isPhoneValid}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="ВВЕДИТЕ ВАШЕ ИМЯ"
                        description="*КАК БЫ ВЫ ХОТЕЛИ, ЧТОБЫ К ВАМ ОБРАЩАЛИСЬ"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    <Button
                        name={
                            isLoading ? (
                                <img
                                    src={Loader}
                                    alt=""
                                    style={{ width: '36px' }}
                                />
                            ) : (
                                'ОТПРАВИТЬ ЗАЯВКУ'
                            )
                        }
                        step={step}
                        onClick={handleSubmit}
                        disabled={!!isPhoneValid || !name || !address}
                    />
                </>
            )}
            {step === 3 && (
                <>
                    <Info
                        text="ВАША ЗАЯВКА ПРИНЯТА!"
                        description="МЫ СКОРО СВЯЖЕМСЯ С ВАМИ!"
                    />
                    <Button
                        step={step}
                        onClick={handleToMainClick}
                        name="НОВАЯ ЗАЯВКА"
                    />
                </>
            )}
        </Main>
    );
});

export default MyStepsComponent;
