import { createContext, useState, useEffect } from 'react';

export const RatesContext = createContext();
export const UnitsContext = createContext();
export const CategoriesContext = createContext();
export const UserContext = createContext();

export const currencies = [
    { code: 'RUB', name: 'Российский рубль', symbol: '₽', isPopular: 0 },
    { code: 'USD', name: 'Доллар США', symbol: '$', isPopular: 1 },
    { code: 'EUR', name: 'Евро', symbol: '€', isPopular: 1 },
    { code: 'GBP', name: 'Фунт стерлингов', symbol: '£', isPopular: 1 },
    { code: 'CNY', name: 'Китайский юань', symbol: '¥', isPopular: 0 },
    { code: 'TRY', name: 'Турецкая лира', symbol: '₺', isPopular: 0 },
    { code: 'JPY', name: 'Японская иена', symbol: '¥', isPopular: 1 },
    { code: 'AED', name: 'Дирхам ОАЭ', symbol: 'د.إ', isPopular: 0 },
    { code: 'AMD', name: 'Армянский драм', symbol: '֏', isPopular: 0 },
    { code: 'AUD', name: 'Австралийский доллар', symbol: 'A$', isPopular: 0 },
    { code: 'AZN', name: 'Азербайджанский манат', symbol: '₼', isPopular: 0 },
    { code: 'BDT', name: 'Така', symbol: '৳', isPopular: 0 },
    { code: 'BHD', name: 'Бахрейнский динар', symbol: '.د.ب', isPopular: 0 },
    { code: 'BOB', name: 'Боливиано', symbol: 'Bs', isPopular: 0 },
    { code: 'BRL', name: 'Бразильский реал', symbol: 'R$', isPopular: 0 },
    { code: 'BYN', name: 'Белорусский рубль', symbol: 'Br', isPopular: 0 },
    { code: 'CAD', name: 'Канадский доллар', symbol: 'C$', isPopular: 0 },
    { code: 'CHF', name: 'Швейцарский франк', symbol: 'Fr', isPopular: 0 },
    { code: 'CUP', name: 'Кубинское песо', symbol: '₱', isPopular: 0 },
    { code: 'CZK', name: 'Чешская крона', symbol: 'Kč', isPopular: 0 },
    { code: 'DKK', name: 'Датская крона', symbol: 'kr', isPopular: 0 },
    { code: 'DZD', name: 'Алжирский динар', symbol: 'د.ج', isPopular: 0 },
    { code: 'EGP', name: 'Египетский фунт', symbol: 'E£', isPopular: 0 },
    { code: 'ETB', name: 'Эфиопский быр', symbol: 'Br', isPopular: 0 },
    { code: 'GEL', name: 'Лари', symbol: '₾', isPopular: 0 },
    { code: 'HKD', name: 'Гонконгский доллар', symbol: 'HK$', isPopular: 0 },
    { code: 'HUF', name: 'Форинт', symbol: 'Ft', isPopular: 0 },
    { code: 'IDR', name: 'Индонезийская рупия', symbol: 'Rp', isPopular: 0 },
    { code: 'INR', name: 'Индийская рупия', symbol: '₹', isPopular: 0 },
    { code: 'IRR', name: 'Иранский риал', symbol: '﷼', isPopular: 0 },
    { code: 'KGS', name: 'Сом', symbol: 'с', isPopular: 0 },
    { code: 'KRW', name: 'Вона', symbol: '₩', isPopular: 0 },
    { code: 'KZT', name: 'Тенге', symbol: '₸', isPopular: 0 },
    { code: 'MDL', name: 'Молдавский лей', symbol: 'L', isPopular: 0 },
    { code: 'MMK', name: 'Кьят', symbol: 'K', isPopular: 0 },
    { code: 'MNT', name: 'Тугрик', symbol: '₮', isPopular: 0 },
    { code: 'NGN', name: 'Найра', symbol: '₦', isPopular: 0 },
    { code: 'NOK', name: 'Норвежская крона', symbol: 'kr', isPopular: 0 },
    { code: 'NZD', name: 'Новозеландский доллар', symbol: 'NZ$', isPopular: 0 },
    { code: 'OMR', name: 'Оманский риал', symbol: 'ر.ع.', isPopular: 0 },
    { code: 'PLN', name: 'Злотый', symbol: 'zł', isPopular: 0 },
    { code: 'QAR', name: 'Катарский риал', symbol: 'ر.ق', isPopular: 0 },
    { code: 'RON', name: 'Румынский лей', symbol: 'lei', isPopular: 0 },
    { code: 'RSD', name: 'Сербский динар', symbol: 'дин.', isPopular: 0 },
    { code: 'SAR', name: 'Саудовский риял', symbol: 'ر.س', isPopular: 0 },
    { code: 'SEK', name: 'Шведская крона', symbol: 'kr', isPopular: 0 },
    { code: 'SGD', name: 'Сингапурский доллар', symbol: 'S$', isPopular: 0 },
    { code: 'THB', name: 'Бат', symbol: '฿', isPopular: 0 },
    { code: 'TJS', name: 'Сомони', symbol: 'SM', isPopular: 0 },
    { code: 'TMT', name: 'Новый туркменский манат', symbol: 'm', isPopular: 0 },
    { code: 'UAH', name: 'Гривна', symbol: '₴', isPopular: 0 },
    { code: 'UZS', name: 'Узбекский сум', symbol: 'soʻm', isPopular: 0 },
    { code: 'VND', name: 'Донг', symbol: '₫', isPopular: 0 },
    { code: 'XDR', name: 'СДР', symbol: 'XDR', isPopular: 0 },
    { code: 'ZAR', name: 'Рэнд', symbol: 'R', isPopular: 0 }
].map(cur => ({
    ...cur,
    text: `${cur.code} - ${cur.name}`
}));



export const weightUnits = [
    { code: 'kg', name: 'Килограмм', baseUnit: 'g', factor: 1000 },
    { code: 'g', name: 'Грамм', baseUnit: 'g', factor: 1 },
    { code: 'mg', name: 'Миллиграмм', baseUnit: 'g', factor: 0.001 },
    { code: 'lb', name: 'Фунт', baseUnit: 'g', factor: 453.59237 },
    { code: 'oz', name: 'Унция', baseUnit: 'g', factor: 28.3495 },
    { code: 't', name: 'Тонна', baseUnit: 'g', factor: 1000000 },
    { code: 'ct', name: 'Карат', baseUnit: 'g', factor: 0.2 }
];

export const distanceUnits = [
    { code: 'km', name: 'Километр', baseUnit: 'm', factor: 1000 },
    { code: 'm', name: 'Метр', baseUnit: 'm', factor: 1 },
    { code: 'cm', name: 'Сантиметр', baseUnit: 'm', factor: 0.01 },
    { code: 'mm', name: 'Миллиметр', baseUnit: 'm', factor: 0.001 },
    { code: 'mi', name: 'Миля', baseUnit: 'm', factor: 1609.344 },
    { code: 'yd', name: 'Ярд', baseUnit: 'm', factor: 0.9144 },
    { code: 'ft', name: 'Фут', baseUnit: 'm', factor: 0.3048 },
    { code: 'in', name: 'Дюйм', baseUnit: 'm', factor: 0.0254 },
    { code: 'nmi', name: 'Морская миля', baseUnit: 'm', factor: 1852 }
];

export const volumeUnits = [
    { code: 'l', name: 'Литр', baseUnit: 'l', factor: 1 },
    { code: 'ml', name: 'Миллилитр', baseUnit: 'l', factor: 0.001 },
    { code: 'm3', name: 'Кубический метр', baseUnit: 'l', factor: 1000 },
    { code: 'gal', name: 'Галлон (США)', baseUnit: 'l', factor: 3.78541 },
    { code: 'gal_uk', name: 'Галлон (Великобритания)', baseUnit: 'l', factor: 4.54609 },
    { code: 'qt', name: 'Кварта (США)', baseUnit: 'l', factor: 0.946353 },
    { code: 'pt', name: 'Пинта (США)', baseUnit: 'l', factor: 0.473176 },
    { code: 'cup', name: 'Чашка', baseUnit: 'l', factor: 0.236588 },
    { code: 'fl_oz', name: 'Жидкая унция (США)', baseUnit: 'l', factor: 0.0295735 },
    { code: 'tbsp', name: 'Столовая ложка', baseUnit: 'l', factor: 0.0147868 },
    { code: 'tsp', name: 'Чайная ложка', baseUnit: 'l', factor: 0.00492892 }
];

export const defaultCategories = [
    { code: 'food', name: 'Еда', color: '#FF6B6B', icon: '🍔' },
    { code: 'accommodation', name: 'Проживание', color: '#4ECDC4', icon: '🏨' },
    { code: 'transport', name: 'Транспорт', color: '#45B7D1', icon: '🚗' },
    { code: 'entertainment', name: 'Развлечения', color: '#96CEB4', icon: '🎮' },
    { code: 'shopping', name: 'Покупки', color: '#FFEAA7', icon: '🛍️' },
    { code: 'other', name: 'Прочее', color: '#D4A5A5', icon: '📦' }
];

export function createNewRates(data) {
    const newRates = { RUB: 1 };

    Object.keys(data.Valute).forEach(key => {
        const valute = data.Valute[key];
        newRates[valute.CharCode] = valute.Value / valute.Nominal;
    });

    return newRates;
}

export function convertWeight(value, fromUnit, toUnit) {
    const from = weightUnits.find(u => u.code === fromUnit);
    const to = weightUnits.find(u => u.code === toUnit);

    if (!from || !to) return 0;

    const grams = value * from.factor;
    return grams / to.factor;
}

export function convertDistance(value, fromUnit, toUnit) {
    const from = distanceUnits.find(u => u.code === fromUnit);
    const to = distanceUnits.find(u => u.code === toUnit);

    if (!from || !to) return 0;

    const meters = value * from.factor;
    return meters / to.factor;
}

export function convertVolume(value, fromUnit, toUnit) {
    const from = volumeUnits.find(u => u.code === fromUnit);
    const to = volumeUnits.find(u => u.code === toUnit);

    if (!from || !to) return 0;

    const liters = value * from.factor;
    return liters / to.factor;
}

export function RatesProvider({ children }) {
    const [rates, setRates] = useState(() => {
        const initialRates = {
            RUB: 1,
            USD: 0,
            EUR: 0,
            GBP: 0,
            CNY: 0,
            TRY: 0,
            JPY: 0
        };

        const newCurrencies = [
            'AED', 'AMD', 'AUD', 'AZN', 'BDT', 'BHD', 'BOB', 'BRL', 'BYN',
            'CAD', 'CHF', 'CUP', 'CZK', 'DKK', 'DZD', 'EGP', 'ETB', 'GEL',
            'HKD', 'HUF', 'IDR', 'INR', 'IRR', 'KGS', 'KRW', 'KZT', 'MDL',
            'MMK', 'MNT', 'NGN', 'NOK', 'NZD', 'OMR', 'PLN', 'QAR', 'RON',
            'RSD', 'SAR', 'SEK', 'SGD', 'THB', 'TJS', 'TMT', 'UAH', 'UZS',
            'VND', 'XDR', 'ZAR'
        ];

        newCurrencies.forEach(code => {
            initialRates[code] = 0;
        });

        return initialRates;
    });

    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
            try {
                const parsed = JSON.parse(savedUsers);
                Object.keys(parsed).forEach(username => {
                    if (!parsed[username].categories) {
                        parsed[username].categories = [...defaultCategories];
                    }
                });
                return parsed;
            } catch (e) {
                return {
                    default: {
                        expenses: [],
                        categories: [...defaultCategories],
                        lastUpdated: Date.now()
                    }
                };
            }
        }
        return {
            default: {
                expenses: [],
                categories: [...defaultCategories],
                lastUpdated: Date.now()
            }
        };
    });

    const [currentUser, setCurrentUser] = useState(() => {
        const savedCurrentUser = localStorage.getItem('currentUser');
        return savedCurrentUser || 'default';
    });

    const categories = (() => {
        const userData = users[currentUser];
        if (userData && userData.categories && userData.categories.length > 0) {
            return userData.categories;
        }
        return defaultCategories;
    })();

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem('currentUser', currentUser);
    }, [currentUser]);

    function saveUserData(username, data) {
        setUsers(prev => ({
            ...prev,
            [username]: {
                ...prev[username],
                ...data,
                lastUpdated: Date.now()
            }
        }));
    };

    function getUserData(username) {
        return users[username] || {
            expenses: [],
            categories: defaultCategories
        };
    };

    const updateCategories = (newCategories) => {
        const userData = getUserData(currentUser);
        saveUserData(currentUser, {
            ...userData,
            categories: newCategories
        });
    };

    const addCategory = (category) => {
        const userData = getUserData(currentUser);
        const currentCategories = userData.categories || defaultCategories;
        const newCategories = [...currentCategories, category];
        updateCategories(newCategories);
        return category;
    };

    const deleteCategory = (categoryCode) => {
        if (defaultCategories.some(cat => cat.code === categoryCode)) {
            return false;
        }

        const userData = getUserData(currentUser);
        const currentCategories = userData.categories || defaultCategories;
        const newCategories = currentCategories.filter(cat => cat.code !== categoryCode);
        updateCategories(newCategories);
        return true;
    };

    function switchUser(username) {
        setCurrentUser(username);
    };

    function deleteUser(username) {
        if (username === 'default') return;

        const newUsers = { ...users };
        delete newUsers[username];
        setUsers(newUsers);

        if (currentUser === username) {
            setCurrentUser('default');
        }
    };

    useEffect(() => {
        let needsUpdate = false;
        const updatedUsers = { ...users };

        Object.keys(updatedUsers).forEach(username => {
            if (!updatedUsers[username].categories || updatedUsers[username].categories.length === 0) {
                updatedUsers[username] = {
                    ...updatedUsers[username],
                    categories: defaultCategories
                };
                needsUpdate = true;
            }
        });

        if (needsUpdate) {
            setUsers(updatedUsers);
        }
    }, []);

    return (
        <RatesContext.Provider value={{ rates, setRates, currencies }}>
            <UnitsContext.Provider value={{
                weightUnits,
                distanceUnits,
                volumeUnits,
                convertWeight,
                convertDistance,
                convertVolume
            }}>
                <CategoriesContext.Provider value={{
                    categories: categories,
                    setCategories: updateCategories,
                    addCategory,
                    deleteCategory,
                    defaultCategories
                }}>
                    <UserContext.Provider value={{
                        currentUser,
                        users,
                        saveUserData,
                        getUserData,
                        switchUser,
                        deleteUser
                    }}>
                        {children}
                    </UserContext.Provider>
                </CategoriesContext.Provider>
            </UnitsContext.Provider>
        </RatesContext.Provider>
    );
}