# ✈️ Traveller Calculator

> Многофункциональный калькулятор для путешественников: конвертер валют, планировщик бюджета, конвертер единиц измерения и профиль пользователя.

## 📐 Архитектура

- **Frontend**: React 18 (Create React App)
- **State Management**: React Hooks (useState, useEffect)
- **Стили**: CSS Modules (компонентный подход)
- **Локализация**: Кастомный i18n (translation.js)
- **Темизация**: Light/Dark theme (ThemeToggle)
- **API интеграция**: Fetch API / Axios (курсы валют)

> ⚠️ **Примечание**: Приложение работает полностью на клиентской стороне (client-side). Серверная часть и база данных отсутствуют — все данные хранятся локально или загружаются из внешних API.

## 📁 Структура проекта
Traveller-calculator/
│
├── public/
│ └── index.html # Точка входа HTML
│
├── src/
│ ├── components/ # React компоненты
│ │ ├── BudgetPlanner.js # 📊 Планировщик бюджета (24KB)
│ │ ├── CurrencyConverter.js # 💱 Конвертер валют (4KB)
│ │ ├── UnitConverter.js # 📏 Конвертер единиц (6KB)
│ │ ├── UserProfile.js # 👤 Профиль пользователя (6KB)
│ │ ├── ExportToCSV.js # 📎 Экспорт данных в CSV (3KB)
│ │ ├── ThemeToggle.js # 🌓 Переключатель темы
│ │ ├── Button.js # 🔘 Универсальная кнопка
│ │ ├── Input.js # 📝 Поле ввода
│ │ ├── Select.js # 📋 Выпадающий список
│ │ ├── SelectorsGroup.js # 👥 Группа селекторов
│ │ ├── ConverterCard.js # 💳 Карточка конвертера
│ │ ├── ConverterForm.js # 📄 Форма конвертера
│ │ ├── RatesInfo.js # ℹ️ Информация о курсах
│ │ └── Error.js # ⚠️ Компонент ошибки
│ │
│ ├── components/css/ # Стили компонентов
│ │ ├── BudgetPlanner.css # (19KB)
│ │ ├── CurrencyConverter.css
│ │ ├── UnitConverter.css
│ │ ├── UserProfile.css
│ │ └── ...
│ │
│ ├── App.js # 🧩 Главный компонент
│ ├── App.css # Глобальные стили
│ ├── index.js # 🚀 Точка входа React
│ ├── index.css # Базовые стили
│ ├── Config.js # ⚙️ Конфигурация (15KB)
│ └── translation.js # 🌍 Локализация (i18n)
│
├── .gitignore # Игнорируемые файлы Git
├── package.json # Зависимости проекта
└── package-lock.json # Фиксация версий

text

## 🔄 Взаимодействие компонентов

```mermaid
graph LR
    User[👤 Пользователь] --> App[App.js]
    App --> Budget[BudgetPlanner]
    App --> Currency[CurrencyConverter]
    App --> Unit[UnitConverter]
    App --> Profile[UserProfile]
    
    Budget --> API[Внешние API<br/>курсы валют]
    Currency --> API
    
    App --> Theme[ThemeToggle]
    App --> Export[ExportToCSV]
🎯 Основные функции
Модуль	Функционал
BudgetPlanner	Планирование расходов на поездку, расчет бюджета
CurrencyConverter	Конвертация валют по актуальным курсам
UnitConverter	Перевод единиц измерения (расстояние, вес, объем)
UserProfile	Настройки пользователя и сохранение предпочтений
ExportToCSV	Экспорт данных в CSV файл
🚀 Запуск проекта
bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build
🌐 Внешние зависимости
API курсов валют (для CurrencyConverter)
