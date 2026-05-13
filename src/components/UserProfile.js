import { useState, useContext, useEffect } from 'react';
import { UserContext, defaultCategories } from '../Config';
import '../components/css/UserProfile.css';
import Button from './Button';
import Input from './Input';

export default function UserProfile() {
    const { currentUser, users, saveUserData, switchUser, deleteUser } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [userStats, setUserStats] = useState({});

    const handleCreateUserConfig = {
        type: "text",
        value: newUserName,
        changeHandler: (e) => setNewUserName(e.target.value),
        caption: "Имя нового пользователя",
        maxLength: "20"
    }

    useEffect(() => {
        const stats = {};
        Object.keys(users).forEach(username => {
            const userData = users[username];
            const totalExpenses = userData.expenses?.reduce((sum, exp) => sum + (exp.amount), 0);
            stats[username] = {
                expenseCount: userData.expenses?.length,
                totalExpenses: totalExpenses.toFixed(2)
            };
        });
        setUserStats(stats);
    }, [users]);

    const handleCreateUser = (e) => {
        e.preventDefault();
        if (newUserName && !users[newUserName]) {
            saveUserData(newUserName, {
                expenses: [],
                categories: [...defaultCategories],
                budgetLimit: 0,
                createdAt: Date.now()
            });
            switchUser(newUserName);
            setIsOpen(false);
            setNewUserName('');
        }
    };

    function formatDate(timestamp) {
        return new Date(timestamp).toLocaleDateString();
    };

    return (
        <div className="user-profile">
            <Button type="user-profile-button" handler={() => setIsOpen(!isOpen)}>
                <span className="user-icon">👤</span>
                <span className="user-name">{currentUser}</span>
                <span className="dropdown-icon">{isOpen ? '▲' : '▼'}</span>
            </Button>
            {isOpen && (
                <div className="user-dropdown">
                    <div className="user-list">
                        <h4>Пользователи</h4>
                        {Object.keys(users).map(username => (
                            <div key={username} className={`user-item ${currentUser === username ? 'active' : ''}`}>
                                <div className="user-item-info" onClick={() => {
                                    switchUser(username);
                                    setIsOpen(false);
                                }}>
                                    <span className="user-item-name">{username}</span>
                                    <span className="user-item-stats">
                                        {userStats[username]?.expenseCount} расходов
                                        {userStats[username]?.expenseCount > 0 &&
                                            ` | ${userStats[username]?.totalExpenses} ₽`}
                                    </span>
                                    {username !== 'default' && (
                                        <span className="user-item-date">Создан: {formatDate(users[username]?.createdAt)}</span>
                                    )}
                                </div>
                                {username !== 'default' && (
                                    <Button type="delete-user-btn" handler={() => setShowDeleteConfirm(username)}>×</Button>
                                )}
                            </div>
                        ))}
                    </div>
                    {showDeleteConfirm && (
                        <div className="delete-confirm">
                            <p>Удалить пользователя "{showDeleteConfirm}"?</p>
                            <p className="delete-warning">Все расходы будут безвозвратно удалены!</p>
                            <div className="delete-actions">
                                <Button type="confirm-delete" handler={() => { deleteUser(showDeleteConfirm); setShowDeleteConfirm(null); }}>Удалить</Button>
                                <Button type="cancel-delete" handler={() => setShowDeleteConfirm(null)}>Отмена</Button>
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleCreateUser} className="create-user-form">
                        <Input options={handleCreateUserConfig} />
                        <Button type="submit" disabled={!newUserName}>Создать</Button>
                    </form>
                    <div className="user-info">
                        <small>
                            Текущий пользователь: <strong>{currentUser}</strong><br />
                            Всего пользователей: {Object.keys(users).length}
                        </small>
                    </div>
                </div>
            )}
        </div>
    );
}