# React Sneakers

Інтернет-магазин кросівок з можливістю додавання товарів у корзину, обране та оформлення замовлень.

![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.7-CA4245?logo=reactrouter&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)

## Функціонал

- Перегляд каталогу кросівок
- Пошук товарів за назвою
- Додавання/видалення товарів з корзини
- Додавання/видалення товарів з обраного
- Оформлення замовлення
- Перегляд історії замовлень

## Технології

- **React 19** — UI бібліотека
- **React Router 7** — маршрутизація
- **Axios** — HTTP-запити
- **TailwindCSS 3** — утилітарні CSS-класи
- **Sass** — CSS-модулі для компонентів
- **React Content Loader** — скелетони під час завантаження
- **MockAPI** — бекенд для зберігання даних

## Структура проекту

```
src/
├── api.js                  # API endpoints
├── context.js              # React Context
├── App.js                  # Кореневий компонент
├── components/
│   ├── Card/               # Картка товару
│   ├── Drawer/             # Бічна корзина
│   ├── Header.jsx          # Шапка сайту
│   ├── Info.jsx             # Інфо-блок корзини
│   └── Empty.jsx           # Порожній стан сторінки
├── hooks/
│   └── useCard.js          # Хук для роботи з корзиною
└── pages/
    ├── Home.jsx            # Головна сторінка
    ├── Favorites.jsx       # Обране
    └── Orders.jsx          # Замовлення
```

## Запуск

```bash
# Встановити залежності
npm install

# Запустити dev-сервер
npm start
```

Додаток буде доступний за адресою [http://localhost:3000](http://localhost:3000).

## Скрипти

| Команда         | Опис                        |
| --------------- | --------------------------- |
| `npm start`     | Запуск dev-сервера          |
| `npm run build` | Збірка для продакшену       |
| `npm test`      | Запуск тестів               |
