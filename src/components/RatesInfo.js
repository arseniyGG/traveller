import { useContext, useState } from 'react';
import { RatesContext } from '../Config';
import Button from './Button';

export default function RatesInfo() {
    const { rates, currencies } = useContext(RatesContext);
    const [showAllCurrencies, setShowAllCurrencies] = useState(false);

    const filteredCurrencies = showAllCurrencies
        ? currencies
        : currencies.filter(currency => currency.isPopular === 1);

    function toggleAllCurrencies() {
        setShowAllCurrencies(!showAllCurrencies);
    };

    return (
        <div className="rates-info">
            <h4>{showAllCurrencies ? "Текущие курсы всех валют к рублю:" : "Текущие курсы популярных валют к рублю:"}</h4>
            <div className="rates-grid">
                {filteredCurrencies.map(curr => (
                    <div key={curr.code} className="rate-item">
                        <span className="rate-code">{curr.code}:</span>
                        <span className="rate-value">
                            {rates[curr.code] ? rates[curr.code].toFixed(2) : '0.00'} ₽
                        </span>
                    </div>
                ))}
            </div>
            <Button type="show-all-btn" handler={toggleAllCurrencies} caption={showAllCurrencies ? "Скрыть валюты" : "Больше валют"} />
        </div>
    )
}