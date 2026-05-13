import { useState, useEffect, useContext } from 'react';
import './css/CurrencyConverter.css';
import Button from './Button';
import Select from './Select';
import { RatesContext } from '../Config';
import ConverterForm from './ConverterForm';
import Input from './Input';
import Error from './Error';
import ConverterCard from './ConverterCard';
import SelectorsGroup from './SelectorsGroup';
import ConvertResult from './ConverterResult';
import RatesInfo from './RatesInfo';

export default function CurrencyConverter() {
    const { rates, currencies } = useContext(RatesContext);
    const [amount, setAmount] = useState('0');
    const [fromCurrency, setFromCurrency] = useState('RUB');
    const [toCurrency, setToCurrency] = useState('USD');
    const [result, setResult] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        convertCurrency();
    }, [amount, fromCurrency, toCurrency, rates]);

    const inputConfig = {
        type: "number",
        value: amount,
        changeHandler: (e) => setAmount(e.target.value),
        focusHandler: (e) => e.target.select(),
        minimal: "0",
        step: "0.01",
        caption: "Введите сумму"
    };

    const fromSelectConfig = {
        type: "select-group",
        header: "Из валюты:",
        value: fromCurrency,
        handler: (e) => setFromCurrency(e.target.value),
        options: currencies
    };

    const toSelectConfig = {
        type: "select-group",
        header: "В валюту:",
        value: toCurrency,
        handler: (e) => setToCurrency(e.target.value),
        options: currencies
    };

    function convertCurrency() {
        setError('');

        if (!amount || isNaN(amount) < 0) {
            setError('Пожалуйста, введите корректную сумму');
            setResult(0);
            return;
        }

        try {
            const amountInRub = fromCurrency === 'RUB' ? amount : amount * rates[fromCurrency];
            const converted = toCurrency === 'RUB' ? amountInRub : amountInRub / rates[toCurrency];

            setResult(converted);
        } catch (err) {
            setError('Ошибка при конвертации');
        }
    };

    function swapCurrencies() {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    function formatNumber(num) {
        return new Intl.NumberFormat('ru-RU', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    };

    return (
        <ConverterCard type="currency">
            <>
                <ConverterForm type="converter-form" purpose="input-group" caption="Сумма:">
                    <Input options={inputConfig} />
                </ConverterForm>

                <SelectorsGroup type="currency">
                    <Select options={toSelectConfig} />

                    <Button type="swap-btn" handler={swapCurrencies} caption="⇄" />

                    <Select options={fromSelectConfig} />
                </SelectorsGroup>

                {error && <Error type="error-message" message={error} />}

                <ConvertResult handler={formatNumber(result)} toVariable={toCurrency} />

                <RatesInfo />
            </>
        </ConverterCard>
    );
}