import './css/BudgetPlanner.css';
import { useState, useMemo, useContext, useEffect } from 'react';
import { RatesContext, CategoriesContext, defaultCategories, UserContext } from '../Config';
import { translateToEnglish } from '../translation.js';
import Button from './Button';
import Input from './Input.js';
import Select from './Select.js';
import ExportToCSV from './ExportToCSV.js';

export default function BudgetPlanner() {
    const { rates, currencies } = useContext(RatesContext);
    const { categories, addCategory, deleteCategory } = useContext(CategoriesContext);
    const { currentUser, getUserData, saveUserData } = useContext(UserContext);
    const [isTranslating, setIsTranslating] = useState(false);
    const [expenses, setExpenses] = useState(() => {
        const userData = getUserData(currentUser);
        return userData.expenses || [];
    });
    const [newExpense, setNewExpense] = useState({
        description: '',
        amount: '',
        currency: '',
        category: ''
    });
    const [budgetLimit, setBudgetLimit] = useState(() => {
        const userData = getUserData(currentUser);
        return userData.budgetLimit;
    });
    const [showForm, setShowForm] = useState(false);
    const [budgetInput, setBudgetInput] = useState(() => {
        const userData = getUserData(currentUser);
        const limit = userData.budgetLimit;
        return limit !== undefined && limit !== null ? limit.toString() : '0';
    });
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showCategoryManager, setShowCategoryManager] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: '',
        icon: '',
        color: '#6700e6'
    });

    useEffect(() => {
        const userData = getUserData(currentUser);
        const savedExpenses = userData.expenses;
        const savedBudgetLimit = userData.budgetLimit;

        setExpenses(savedExpenses);
        setBudgetLimit(savedBudgetLimit);
        setBudgetInput(savedBudgetLimit !== undefined ? savedBudgetLimit.toString() : '0');
    }, [currentUser]);

    useEffect(() => {
        const userData = getUserData(currentUser);
        saveUserData(currentUser, {
            ...userData,
            expenses: expenses,
            budgetLimit: budgetLimit
        });
    }, [expenses, budgetLimit]);

    const total = useMemo(() => {
        return expenses.reduce((acc, expense) => {
            const amountInRub = expense.currency === 'RUB'
                ? expense.amount
                : expense.amount * (rates[expense.currency]);
            return acc + amountInRub;
        }, 0);
    }, [expenses, rates]);

    const categoryTotals = useMemo(() => {
        return categories.map(cat => {
            const categoryTotal = expenses
                .filter(e => e.category === cat.code)
                .reduce((sum, e) => {
                    const amountInRub = e.currency === 'RUB' ? e.amount : e.amount * (rates[e.currency]);
                    return sum + amountInRub;
                }, 0);

            return {
                ...cat,
                total: categoryTotal,
                hasExpenses: categoryTotal > 0,
                isDefault: defaultCategories.some(d => d.code === cat.code)
            };
        });
    }, [expenses, rates, categories]);

    const budgetInputConfig = {
        type: "number",
        value: budgetInput,
        changeHandler: handleBudgetChange,
        focusHandler: (e) => e.target.select(),
        minimal: "0",
        step: "1000",
        caption: "Введите лимит"
    };

    const newExpenseDescInputConfig = {
        type: "text",
        value: newExpense.description,
        changeHandler: (e) => setNewExpense({ ...newExpense, description: e.target.value }),
        focusHandler: (e) => e.target.select(),
        caption: "Описание"
    };

    const newExpenseAmountInputConfig = {
        type: "number",
        value: newExpense.amount,
        changeHandler: (e) => setNewExpense({ ...newExpense, amount: e.target.value }),
        focusHandler: (e) => e.target.select(),
        caption: "Сумма"
    };

    const newCategoryNameInputConfig = {
        type: "text",
        value: newCategory.name,
        changeHandler: (e) => setNewCategory({ ...newCategory, name: e.target.value }),
        caption: "Например: Здоровье, Образование..."
    }

    const newCategoryColorInputConfig = {
        type: "color",
        value: newCategory.color,
        changeHandler: (e) => setNewCategory({ ...newCategory, color: e.target.value }),
    }

    const selectCurrencyConfig = {
        value: newExpense.currency,
        handler: (e) => setNewExpense({ ...newExpense, currency: e.target.value }),
        options: currencies.slice(0, 7).map(cur => {
            cur.text = `${cur.code} - ${cur.name}`;
            return cur;
        })
    };

    const selectCategoryConfig = {
        value: newExpense.category,
        handler: (e) => setNewExpense({ ...newExpense, category: e.target.value }),
        options: categories.map(cat => ({
            code: cat.code,
            text: `${cat.icon} ${cat.name}`,
            value: cat.code
        }))
    };

    function handleBudgetChange(e) {
        const value = e.target.value;
        setBudgetInput(value);

        if (value !== '' && value !== null) {
            const numValue = parseFloat(value);
            if (!isNaN(numValue) && numValue >= 0) {
                setBudgetLimit(numValue);
                const userData = getUserData(currentUser);
                saveUserData(currentUser, {
                    ...userData,
                    budgetLimit: numValue
                });
            }
        }
    }

    function addExpense(e) {
        e.preventDefault();

        if (!newExpense.description || !newExpense.amount) {
            alert('Заполните все поля!');
            return;
        }

        if (!newExpense.category) {
            alert('Выберите категорию!');
            return;
        }

        if (isNaN(newExpense.amount) || parseFloat(newExpense.amount) <= 0) {
            alert('Введите корректную сумму!');
            return;
        }

        const expense = {
            id: Date.now(),
            description: newExpense.description,
            amount: parseFloat(newExpense.amount),
            currency: newExpense.currency,
            category: newExpense.category,
            date: new Date().toISOString()
        };

        setExpenses(prevExpenses => [...prevExpenses, expense]);

        setNewExpense({
            description: '',
            amount: '',
            currency: 'RUB',
            category: 'food'
        });
        setShowForm(false);
    };

    function deleteExpense(id) {
        if (window.confirm('Удалить этот расход?')) {
            setExpenses(prevExpenses => prevExpenses.filter(e => e.id !== id));
        }
    };

    function openForm() {
        setNewExpense({
            description: '',
            amount: '',
            currency: 'RUB',
            category: 'food'
        });
        setShowForm(!showForm);
        setShowCategoryForm(false);
        setShowCategoryManager(false);
    }

    function openCategoryForm() {
        setShowCategoryForm(!showCategoryForm);
        setShowForm(false);
        setShowCategoryManager(false);
    }

    function openCategoryManager() {
        setShowCategoryManager(!showCategoryManager);
        setShowForm(false);
        setShowCategoryForm(false);
    }

    async function handleAddCategory(e) {
        e.preventDefault();

        if (!newCategory.name) {
            alert('Введите название категории');
            return;
        }

        const isDuplicate = categories.some(cat =>
            cat.name.toLowerCase() === newCategory.name.toLowerCase()
        );

        if (isDuplicate) {
            alert(`Категория "${newCategory.name}" уже существует! Пожалуйста, введите другое название.`);
            return;
        }

        setIsTranslating(true);

        try {
            const englishCode = await translateToEnglish(newCategory.name);

            let finalCode = englishCode;
            let counter = 1;
            while (categories.some(cat => cat.code === finalCode)) {
                finalCode = `${englishCode}_${counter}`;
                counter++;
            }

            const category = {
                code: finalCode,
                name: newCategory.name,
                icon: newCategory.icon || '📌',
                color: newCategory.color || '#6700e6'
            };

            addCategory(category);

            setNewCategory({
                name: '',
                icon: '',
                color: '#6700e6'
            });
            setShowCategoryForm(false);

            alert(`Категория "${category.name}" добавлена!`);

        } catch (error) {
            console.error('Error adding category:', error);
            alert('Произошла ошибка при создании категории. Попробуйте еще раз.');
        } finally {
            setIsTranslating(false);
        }
    }

    function handleDeleteCategory(categoryCode, categoryName) {
        const category = categoryTotals.find(c => c.code === categoryCode);

        if (category.isDefault) {
            alert('Нельзя удалить стандартную категорию');
            return;
        }

        if (category.hasExpenses) {
            alert(`Нельзя удалить категорию "${categoryName}", так как есть расходы на сумму ${formatCurrency(category.total)}. Сначала удалите или измените эти расходы.`);
            return;
        }

        if (window.confirm(`Удалить категорию "${categoryName}"?`)) {
            deleteCategory(categoryCode);
        }
    }

    function formatCurrency(amount, currency = 'RUB') {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    function getCategoryColor(categoryId) {
        const category = categories.find(c => c.code === categoryId);
        return category ? category.color : '#D4A5A5';
    }

    function getCategoryIcon(categoryId) {
        const category = categories.find(c => c.code === categoryId);
        return category ? category.icon : '📦';
    }

    function getBudgetStatus() {
        if (budgetLimit === 0) {
            return { text: 'Лимит не установлен', color: '#999', emoji: '⚠️' };
        }

        const percent = (total / budgetLimit) * 100;

        if (percent > 100) return { text: 'Превышен!', color: '#ff4444', emoji: '⚠️' };
        if (percent > 70) return { text: 'Близок к лимиту', color: '#ffbb33', emoji: '⚡' };
        return { text: 'В пределах нормы', color: '#00C851', emoji: '✅' };
    }

    const remainingPercent = useMemo(() => {
        if (budgetLimit === 0) return 0;
        const remaining = Math.max(budgetLimit - total, 0);
        return (remaining / budgetLimit) * 100;
    }, [budgetLimit, total]);

    function clearAllExpenses() {
        if (window.confirm('Очистить все расходы? Это действие нельзя отменить.')) {
            setExpenses([]);
        }
    };

    const activeCategories = useMemo(() => {
        return categoryTotals.filter(cat => cat.total > 0);
    }, [categoryTotals]);

    const availableIcons = ['📌', '🍔', '🏨', '🚗', '🎮', '🛍️', '📦', '💡', '🎓', '💊', '🎁', '✈️', '📱', '💻', '🎬', '⚽', '📚', '🎵', '👕', '💄'];

    return (
        <div className="converter-card budget-card">
            <div className="budget-header">
                <h2>💰 Планировщик бюджета</h2>
                <div className="budget-header-controls">
                    {expenses.length > 0 && (
                        <>
                            <Button handler={clearAllExpenses} type="clear-btn">🗑️ Очистить все</Button>
                            <ExportToCSV expenses={expenses} total={total} budgetLimit={budgetLimit} categories={categories}
                            />
                        </>
                    )}
                </div>
            </div>
            <div className="budget-summary">
                <div className="budget-progress">
                    <div className="budget-info">
                        <span>Потрачено: {formatCurrency(total)}</span>
                        <span className="budget-status" style={{ color: getBudgetStatus().color }}>
                            {getBudgetStatus().emoji} {getBudgetStatus().text}
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{
                            width: `${remainingPercent}%`,
                            backgroundColor: getBudgetStatus().color
                        }} />
                    </div>
                </div>
                <div className="budget-controls">
                    <div className="budget-input-container">
                        <label className="budget-label">
                            Лимит бюджета:
                        </label>
                        <div className="budget-input-wrapper">
                            <Input options={budgetInputConfig} />
                            <span className="budget-currency">₽</span>
                        </div>
                        <div className="budget-stats">
                            <span>Осталось: {formatCurrency(budgetLimit - total)}</span>
                            <span className="budget-percent">
                                {budgetLimit > 0 ? ((Math.max(budgetLimit - total, 0) / budgetLimit) * 100).toFixed(1) : 0}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="expense-buttons">
                <Button type={showForm ? 'cancel-expense-btn' : 'add-expense-btn'} handler={openForm}>
                    {showForm ? '✕ Отмена' : '+ Добавить расход'}
                </Button>
                <Button type={showCategoryForm ? 'cancel-expense-btn' : 'add-category-btn'} handler={openCategoryForm}>
                    {showCategoryForm ? '✕ Отмена' : '📂 + Новая категория'}
                </Button>
                <Button type="manage-categories-btn" handler={openCategoryManager}>
                    {showCategoryManager ? '✕ Закрыть' : '⚙️ Управление категориями'}
                </Button>
            </div>
            {showCategoryForm && (
                <form className="category-form" onSubmit={handleAddCategory}>
                    <div className="category-form-group">
                        <label>Название категории:</label>
                        <Input options={newCategoryNameInputConfig} />
                    </div>
                    <div className="category-form-group">
                        <label>Иконка:</label>
                        <div className="icon-selector">
                            {availableIcons.map(icon => (
                                <Button
                                    key={icon}
                                    type={`icon-option ${newCategory.icon === icon ? 'selected' : ''}`}
                                    handler={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setNewCategory({ ...newCategory, icon })
                                    }}>{icon}</Button>
                            ))}
                        </div>
                    </div>
                    <div className="category-form-group">
                        <label>Нажмите и выберите цвет:</label>
                        <Input options={newCategoryColorInputConfig} />
                    </div>
                    <div className="category-form-actions">
                        <Button type="save-btn" handler={handleAddCategory} disabled={isTranslating}>✅ Создать</Button>
                        <Button type="cancel-btn" handler={() => setShowCategoryForm(false)}>Отмена</Button>
                    </div>
                </form>
            )}
            {showCategoryManager && (
                <div className="category-manager">
                    <h4>📋 Управление категориями</h4>
                    <p className="manager-hint">Категории без расходов можно удалить</p>
                    <div className="category-list">
                        {categoryTotals.map(cat => (
                            <div key={cat.code} className={`category-manager-item ${cat.isDefault ? 'default-category' : ''} ${cat.hasExpenses ? 'has-expenses' : 'no-expenses'}`}>
                                <div className="category-manager-info">
                                    <span className="category-manager-icon" style={{ backgroundColor: cat.color }}>
                                        {cat.icon}
                                    </span>
                                    <div className="category-manager-details">
                                        <div className="category-manager-name">
                                            {cat.name}
                                            {cat.isDefault && <span className="default-badge">Стандартная</span>}
                                            {cat.hasExpenses && <span className="expenses-badge">Есть траты: {formatCurrency(cat.total)}</span>}
                                            {!cat.hasExpenses && !cat.isDefault && <span className="empty-badge">Нет трат</span>}
                                        </div>
                                    </div>
                                </div>
                                {!cat.isDefault && !cat.hasExpenses && (
                                    <Button type="delete-category-btn" handler={() => handleDeleteCategory(cat.code, cat.name)}>🗑️ Удалить</Button>
                                )}
                                {!cat.isDefault && cat.hasExpenses && (
                                    <span className="cannot-delete-hint" title="Сначала удалите расходы в этой категории">🔒 Нельзя удалить</span>
                                )}
                                {cat.isDefault && (
                                    <span className="default-hint">📌 Стандартная</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <Button type="close-manager-btn" handler={() => setShowCategoryManager(false)}>Закрыть</Button>
                </div>
            )}
            {showForm && (
                <form className="expense-form">
                    <Input options={newExpenseDescInputConfig} />
                    <Input options={newExpenseAmountInputConfig} />

                    <Select options={selectCurrencyConfig} />
                    <div className="category-select-wrapper">
                        <Select options={selectCategoryConfig} />
                    </div>

                    <Button handler={addExpense} type="save-btn">✅ Сохранить</Button>
                </form>
            )}
            <div className="expenses-list">
                <h3>Список расходов</h3>
                {expenses.length === 0 ? (
                    <div className="empty-list">
                        <div className="empty-emoji">📭</div>
                        <p>Пока нет расходов. Добавьте первый!</p>
                    </div>
                ) : (
                    expenses
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(expense => (
                            <div key={expense.id} className="expense-item">
                                <div
                                    className="expense-category-color"
                                    style={{ backgroundColor: getCategoryColor(expense.category) }}
                                />
                                <div className="expense-icon">
                                    {getCategoryIcon(expense.category)}
                                </div>
                                <div className="expense-info">
                                    <div className="expense-description">{expense.description}</div>
                                    <div className="expense-meta">
                                        {new Date(expense.date).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="expense-amount">
                                    {formatCurrency(expense.amount, expense.currency)}
                                </div>
                                <Button type="delete-btn" handler={() => deleteExpense(expense.id)}>✕</Button>
                            </div>
                        ))
                )}
            </div>
            <div className="category-summary">
                <h4>Расходы по категориям:</h4>
                <div className="category-bars">
                    {activeCategories.length === 0 ? (
                        <div className="empty-categories">
                            <span className="empty-emoji">📊</span>
                            <p>Нет данных по категориям. Добавьте расходы!</p>
                        </div>
                    ) : (
                        activeCategories.map(cat => (
                            <div key={cat.code} className="category-bar-item">
                                <div className="category-bar-label">
                                    <span>
                                        <span className="category-icon">{cat.icon}</span>
                                        {cat.name}
                                    </span>
                                    <span className="category-amount">
                                        {formatCurrency(cat.total)} ({((cat.total / total) * 100).toFixed(1)}%)
                                    </span>
                                </div>
                                <div className="category-bar">
                                    <div
                                        className="category-bar-fill"
                                        style={{
                                            width: `${(cat.total / total) * 100}%`,
                                            backgroundColor: cat.color
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}