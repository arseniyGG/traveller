import { useState, useEffect, createContext, useContext } from 'react';
import CurrencyConverter from './components/CurrencyConverter';
import ThemeToggle from './components/ThemeToggle';
import './App.css';
import Button from './components/Button';
import { RatesProvider, RatesContext, createNewRates } from './Config';
import UnitConverter from './components/UnitConverter';
import BudgetPlanner from './components/BudgetPlanner';
import UserProfile from './components/UserProfile';

export const ThemeContext = createContext();

function AppContent() {
    const [activeTab, setActiveTab] = useState('currency');
    const [lastUpdate, setLastUpdate] = useState(null);
    const [error, setError] = useState('');
    const { rates, setRates } = useContext(RatesContext);

    useEffect(() => {
        fetchRates();
    }, []);

    async function fetchRates() {
        setError('');

        try {
            const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js', {
                cache: 'reload'
            });

            if (!response.ok) {
                throw new Error('Ошибка загрузки курсов');
            }

            const data = await response.json();
            const newRates = createNewRates(data);

            setRates(newRates);
            setLastUpdate(new Date(data.Date));
        } catch (err) {
            setError(err.message);
            console.error('Ошибка при загрузке курсов:', err);
        }
    }

    return (
        <div className="app">
            <header>
                <div className="header-content">
                    <h1>Калькулятор для путешественника</h1>
                    <div className="header-controls">
                        <UserProfile />
                        <ThemeToggle />
                    </div>
                </div>
                <div className="rates-status">
                    {error && <span className="error">{error}</span>}
                    {lastUpdate && (
                        <div>
                            Курсы от: {lastUpdate.toLocaleString()}
                        </div>
                    )}
                </div>
            </header>
            <nav className="tabs">
                <Button type={`tab ${activeTab === 'currency' ? 'active' : ''}`} handler={() => setActiveTab('currency')} caption="💱 Конвертер валют" />
                <Button type={`tab ${activeTab === 'units' ? 'active' : ''}`} handler={() => setActiveTab('units')} caption="📏 Конвертер единиц" />
                <Button type={`tab ${activeTab === 'budget' ? 'active' : ''}`} handler={() => setActiveTab('budget')} caption="💰 Планировщик бюджета" />
            </nav>
            <main className="main-content">
                {activeTab === 'currency' && <CurrencyConverter />}
                {activeTab === 'units' && <UnitConverter />}
                {activeTab === 'budget' && <BudgetPlanner />}
            </main>
        </div>
    );
}

export default function App() {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    function toggleTheme() {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <RatesProvider>
                <AppContent />
            </RatesProvider>
        </ThemeContext.Provider>
    );
}