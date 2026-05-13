import { useState, useEffect, useContext } from 'react';
import './css/UnitConverter.css';
import Button from './Button';
import Select from './Select';
import { UnitsContext } from '../Config';
import ConverterForm from './ConverterForm';
import Input from './Input';
import Error from './Error';
import ConverterCard from './ConverterCard';
import SelectorsGroup from './SelectorsGroup';
import ConvertResult from './ConverterResult';

export default function UnitConverter() {
    const { weightUnits, distanceUnits, volumeUnits, convertWeight, convertDistance, convertVolume } = useContext(UnitsContext);

    const categories = [
        { key: 'weight', name: 'Вес', units: weightUnits },
        { key: 'distance', name: 'Расстояние', units: distanceUnits },
        { key: 'volume', name: 'Объём', units: volumeUnits }
    ]

    const [category, setCategory] = useState(categories[0].key || 'weight');
    const [amount, setAmount] = useState('0');
    const [fromUnit, setFromUnit] = useState('');
    const [toUnit, setToUnit] = useState('');
    const [result, setResult] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const units = getUnitsByCategory();
        if (units.length > 0) {
            setFromUnit(units[0].code);
            setToUnit(units.length > 1 ? units[1].code : units[0].code);
        }
    }, [category]);

    useEffect(() => {
        convertUnits();
    }, [amount, fromUnit, toUnit, category]);

    function getUnitsByCategory() {
        const categoryMap = {
            weight: weightUnits,
            distance: distanceUnits,
            volume: volumeUnits
        };

        let options = categoryMap[category].map(cat => {
            cat.text = `${cat.code} - ${cat.name}`;
            return cat;
        })

        return options;
    }

    const inputConfig = {
        type: "number",
        value: amount,
        changeHandler: (e) => setAmount(e.target.value),
        focusHandler: (e) => e.target.select(),
        minimal: "0",
        step: "0.01",
        caption: "Введите значение"
    };

    const fromSelectConfig = {
        type: "select-group",
        header: "Из единицы:",
        value: fromUnit,
        handler: (e) => setFromUnit(e.target.value),
        options: getUnitsByCategory()
    };

    const toSelectConfig = {
        type: "select-group",
        header: "В единицу:",
        value: toUnit,
        handler: (e) => setToUnit(e.target.value),
        options: getUnitsByCategory()
    };

    function convertUnits() {
        setError('');

        if (!amount || isNaN(amount) || amount < 0) {
            setError('Пожалуйста, введите корректное значение');
            setResult(0);
            return;
        }

        try {
            let converted = 0;

            switch (category) {
                case 'weight':
                    converted = convertWeight(parseFloat(amount), fromUnit, toUnit);
                    break;
                case 'distance':
                    converted = convertDistance(parseFloat(amount), fromUnit, toUnit);
                    break;
                case 'volume':
                    converted = convertVolume(parseFloat(amount), fromUnit, toUnit);
                    break;
                default:
                    converted = 0;
            }

            setResult(converted);
        } catch (err) {
            setError('Ошибка при конвертации');
        }
    }

    function swapUnits() {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    }

    function formatNumber(num) {
        return new Intl.NumberFormat('ru-RU', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
        }).format(num);
    }

    return (
        <ConverterCard type="unit">
            <>
                <div className="category-selector">
                    {categories.map(({ key, name }) => (
                        <Button
                            key={key}
                            type={`category-btn ${category === key ? 'active' : ''}`}
                            handler={() => setCategory(key)}
                            caption={name}
                        />
                    ))}
                </div>

                <ConverterForm type="converter-form" purpose="input-group" caption="Значение:">
                    <Input options={inputConfig} />
                </ConverterForm>

                <SelectorsGroup type="unit">
                    <Select options={fromSelectConfig} />

                    <Button type="swap-btn" handler={swapUnits} caption="⇄" />

                    <Select options={toSelectConfig} />
                </SelectorsGroup>

                {error && <Error type="error-message" message={error} />}

                <ConvertResult handler={formatNumber(result)} toVariable={toUnit} />
            </>
        </ConverterCard>
    );
}