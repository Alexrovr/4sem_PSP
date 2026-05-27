# Портал вакансий. Миграция на fetch, сборка и развертывание фронтенда

**Студент:** Воронков Александр

**Группа:** ИУ5-42

## Навигация

- [Цель](#цель)
- [План](#план)
- [Часть 1. Миграция на Fetch](#часть-1-миграция-на-fetch)
  - [Введение в Promise](#введение-в-promise)
  - [Использование Promise](#использание-promise)
  - [Async/Await в JavaScript](#asyncawait-в-javascript)
  - [Fetch API и примеры использования](#fetch-api-и-примеры-использования)
- [Часть 2. Сборка и развертывание](#часть-2-сборка-и-развертывание)
  - [Сборка фронтенда через Vite](#сборка-фронтенда-через-vite)
  - [Развертывание приложения](#развертывание-приложения)
- [Архитектура приложения](#архитектура-приложения)
- [Дополнительные материалы](#дополнительные-материалы)

## Цель

Лабораторная работа состоит из 2-х частей:

### Часть 1: Миграция на Fetch API
Первая часть заключается в замене механизма взаимодействия с API сервером: вместо использованного ранее `XMLHttpRequest`, переходим на современный метод `fetch`. В ходе выполнения необходимо:
- Изучить асинхронное программирование в JavaScript
- Разобраться с промисами (Promise)
- Освоить синтаксис `async/await`
- Реализовать взаимодействие с API через `fetch`
- Получать данные с сервера и выводить их в интерфейс

### Часть 2: Сборка и развертывание фронтенда
Вторая часть заключается в:
- Использовании системы сборки Vite для оптимизации клиентской части
- Развертывании приложения с единой точкой входа
- Раздаче фронтенда как статических файлов

## План

### Часть 1: Миграция на Fetch
1. Введение в `Promise` - понимание асинхронных операций
2. Использование `Promise` - методы `.then()`, `.catch()`, `.finally()`
3. `Async/Await` - синтаксический сахар для работы с промисами
4. `Fetch API` - выполнение HTTP запросов
5. Миграция существующего кода на `fetch`

### Часть 2: Сборка и развертывание
1. Установка и конфигурация `Vite`
2. Разработка в режиме dev-сервера
3. Сборка приложения для production
4. Развертывание с помощью `json-server`

---

## Часть 1. Миграция на Fetch

### Введение в Promise

**Promise** - это специальный объект в JavaScript, используемый для обработки отложенных (асинхронных) вычислений.

#### Зачем нужны Promise?

Когда мы выполняем запрос на сервер для получения данных, эта операция требует времени:
- Время на передачу запроса до сервера (~3 сек)
- Время на обработку данных на сервере (~2 сек)
- Время на получение ответа обратно (~3 сек)
- **Итого: ~8 секунд**

Если бы мы выполняли такую операцию синхронно (ожидая результат), остальной код не выполнялся бы в течение этого времени. Promise позволяет выполнять операции неблокирующим способом.

#### Состояния Promise

Promise может находиться в одном из трех состояний:

1. **Pending** (ожидание) - начальное состояние, результат еще неизвестен
2. **Fulfilled** (выполнен) - операция успешно завершена, результат получен
3. **Rejected** (отклонен) - произошла ошибка при выполнении операции

#### Синтаксис создания Promise

```javascript
const promise = new Promise((resolve, reject) => {
    // resolve - функция для перевода в состояние fulfilled
    // reject - функция для перевода в состояние rejected

    // Пример: асинхронная операция
    setTimeout(() => {
        if (Math.random() > 0.5) {
            resolve('Успех!'); // fulfilled
        } else {
            reject('Ошибка!'); // rejected
        }
    }, 1000);
});
```

### Использование Promise

#### Методы Promise

**1. `.then()` - обработка успешного результата**

```javascript
promise.then(
    function(result) {
        console.log('Успех:', result);
    },
    function(error) {
        console.log('Ошибка:', error);
    }
);
```

**2. `.catch()` - обработка ошибок**

```javascript
promise
    .then(result => console.log('Успех:', result))
    .catch(error => console.log('Ошибка:', error));
```

**3. `.finally()` - выполнение кода в любом случае**

```javascript
promise
    .then(result => console.log('Успех:', result))
    .catch(error => console.log('Ошибка:', error))
    .finally(() => console.log('Операция завершена'));
```

#### Пример использования Promise

```javascript
const promise = new Promise((resolve, reject) => {
    const random = Math.random() * 100;

    setTimeout(() => {
        if (random > 20) {
            resolve(`Число ${random.toFixed(2)} больше 20`);
        } else {
            reject(`Число ${random.toFixed(2)} меньше 20`);
        }
    }, 2000);
});

promise
    .then(result => console.log('✓ ' + result))
    .catch(error => console.log('✗ ' + error))
    .finally(() => console.log('Done'));
```

### Async/Await в JavaScript

`Async/await` - это синтаксический сахар для работы с Promise, делающий код более читаемым и похожим на синхронный.

#### Синтаксис

```javascript
async function getData() {
    try {
        // await приостанавливает выполнение до завершения Promise
        const result = await somePromise;
        console.log('Результат:', result);
        return result;
    } catch (error) {
        // Перехватываем ошибки как в синхронном коде
        console.log('Ошибка:', error);
    } finally {
        // Выполняется в любом случае
        console.log('Завершено');
    }
}
```

#### Сравнение: Promise vs Async/Await

**Promise:**
```javascript
function getUser() {
    return fetch('/api/user')
        .then(response => response.json())
        .then(user => {
            console.log(user);
            return user;
        })
        .catch(error => console.error(error));
}
```

**Async/Await:**
```javascript
async function getUser() {
    try {
        const response = await fetch('/api/user');
        const user = await response.json();
        console.log(user);
        return user;
    } catch (error) {
        console.error(error);
    }
}
```

### Fetch API и примеры использования

`Fetch` - это современный способ выполнения HTTP запросов в браузере. Это функция, которая возвращает Promise.

#### Основной синтаксис

```javascript
fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка:', error));
```

#### GET запрос

```javascript
async function getStocks() {
    try {
        const response = await fetch('http://localhost:3000/stocks');
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return null;
    }
}
```

#### POST запрос

```javascript
async function createStock(stockData) {
    try {
        const response = await fetch('http://localhost:3000/stocks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stockData)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const newStock = await response.json();
        console.log('Создана вакансия:', newStock);
        return newStock;
    } catch (error) {
        console.error('Ошибка при создании:', error);
        return null;
    }
}
```

#### Реализация в проекте

В проекте создан класс `Api` (файл [modules/api.js](modules/api.js)), который инкапсулирует логику работы с fetch:

```javascript
class Api {
    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("GET ошибка:", error);
            return null;
        }
    }

    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return {
                data: response.ok ? await response.json() : null,
                status: response.status
            };
        } catch (error) {
            console.error("POST ошибка:", error);
            return { data: null, status: 500 };
        }
    }
}
```

---

## Часть 2. Сборка и развертывание

### Сборка фронтенда через Vite

**Vite** - это современная, быстрая система сборки для фронтенд приложений.

#### Установка

```bash
# Установка зависимостей
npm install

# Установка Vite (уже в devDependencies)
```

#### Конфигурация (vite.config.js)

```javascript
export default {
    build: {
        outDir: './public',
        emptyOutDir: true,
    },
};
```

Эта конфигурация:
- **outDir: './public'** - собранные файлы сохраняются в папку `public`
- **emptyOutDir: true** - папка `public` очищается перед каждой сборкой

#### Команды NPM

В `package.json` определены команды для работы с Vite:

```json
{
    "scripts": {
        "dev": "vite",           // Запуск dev-сервера
        "build": "vite build",   // Сборка для production
        "preview": "vite preview" // Превью production-сборки
    }
}
```

#### Режимы работы

**Dev-режим (разработка):**
```bash
npm run dev
```
- Запускает локальный сервер на `http://localhost:5173`
- Включает горячую перезагрузку (HMR)
- Не оптимизирует код

**Production-сборка:**
```bash
npm run build
```
- Минифицирует и оптимизирует код
- Генерирует хеши для файлов (кэширование)
- Сохраняет результаты в папку `public`

### Развертывание приложения

#### Архитектура

```
┌─────────────────────────────────┐
│   Браузер (порт 3000)           │
│  - Загружает HTML/CSS/JS        │
│  - Выполняет запросы API        │
└──────────────┬──────────────────┘
               │
               │ HTTP
               ▼
┌─────────────────────────────────┐
│   JSON Server (порт 3000)       │
│  - Раздает статику (public/)    │
│  - Обрабатывает API запросы     │
│  - Работает с db.json           │
└─────────────────────────────────┘
```

#### Запуск приложения

```bash
# Сначала собираем фронтенд
npm run build

# Затем запускаем JSON Server со статикой
npm start
```

Команда `npm start` запускает:
```bash
json-server --watch db.json --static ./public
```

Это означает:
- **--watch db.json** - следит за изменениями в базе данных
- **--static ./public** - раздает файлы из папки `public` как статику
- Приложение доступно по адресу `http://localhost:3000`

#### Структура папок

**До сборки:**
```
├── index.html
├── main.js
├── db.json
├── package.json
├── vite.config.js
├── components/
│   ├── back-button/
│   ├── product/
│   ├── product-card/
│   └── toast/
├── modules/
│   ├── api.js
│   ├── router.js
│   └── stockUrls.js
└── pages/
    ├── create/
    ├── main/
    └── product/
```

**После сборки (`npm run build`):**
```
├── db.json
├── public/
│   ├── index.html
│   ├── assets/
│   │   ├── index-XXXXX.js (минифицированный)
│   │   └── index-XXXXX.css (минифицированный)
│   └── ... другие файлы
```

---

## Архитектура приложения

### Структура проекта

```
4sem_PSP/
├── 📄 index.html              - Главная HTML страница
├── 📄 main.js                 - Точка входа приложения
├── 📄 db.json                 - Базовая данные вакансий
├── 📄 vite.config.js          - Конфигурация Vite
├── 📄 package.json            - Зависимости и скрипты
│
├── 📁 modules/                - Модули приложения
│   ├── api.js                 - Класс для работы с fetch
│   ├── router.js              - Система маршрутизации
│   └── stockUrls.js           - Константы URL
│
├── 📁 pages/                  - Страницы приложения
│   ├── main/                  - Список вакансий
│   ├── product/               - Детали вакансии
│   └── create/                - Форма создания вакансии
│
└── 📁 components/             - Переиспользуемые компоненты
    ├── back-button/           - Кнопка "назад"
    ├── product/               - Карточка вакансии
    ├── product-card/          - Компонент карточки
    └── toast/                 - Уведомления
```

### Основные модули

#### Api (modules/api.js)
Класс для работы с HTTP запросами через `fetch`:
- `get(url)` - GET запрос
- `post(url, data)` - POST запрос
- Обработка ошибок и JSON парсирование

#### Router (modules/router.js)
Система маршрутизации приложения:
- `addRoute(path, PageClass)` - регистрация маршрута
- `navigate(path)` - переход по маршруту
- Поддержка hash-based routing

#### Pages
Основные страницы приложения:
- **MainPage** - отображает список вакансий
- **ProductPage** - показывает детали вакансии по ID
- **CreatePage** - форма для создания новой вакансии

### Поток данных

```
┌────────────────────────┐
│   Пользователь         │
│  (взаимодействие)      │
└────────────┬───────────┘
             │ Клик
             ▼
┌────────────────────────┐
│   Router               │
│  (маршрутизация)       │
└────────────┬───────────┘
             │ Выбрать Page
             ▼
┌────────────────────────┐
│   Page Component       │
│  (отображение)         │
└────────────┬───────────┘
             │ Запрос данных
             ▼
┌────────────────────────┐
│   Api Module (fetch)   │
│  (HTTP запросы)        │
└────────────┬───────────┘
             │ Запрос
             ▼
┌────────────────────────┐
│   JSON Server          │
│  (db.json)             │
└────────────────────────┘
```

---

## Дополнительные материалы

### Полезные ссылки

- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN: Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)
- [Vite Documentation](https://vitejs.dev/)
- [JSON Server](https://github.com/typicode/json-server)

### Использованные технологии

| Технология | Версия | Назначение |
|------------|--------|-----------|
| Vite | 8.0.13 | Система сборки |
| JSON Server | 1.0.0 | Backend и статика |
| Bootstrap | 5.3.8 | CSS фреймворк |
| Node.js | - | Среда выполнения |

### Команды для разработки

```bash
# Установка зависимостей
npm install

# Разработка с горячей перезагрузкой
npm run dev

# Сборка для production
npm run build

# Превью production-версии
npm run preview

# Запуск полного приложения (после build)
npm start
```

### Результаты

Приложение полностью функционально и включает:
- 📋 Отображение списка вакансий с фильтрацией
- 🔍 Просмотр деталей вакансии
- ➕ Создание новых вакансий
- 🔄 Синхронизация с JSON Server
- 📱 Адаптивный интерфейс на Bootstrap
- ⚡ Оптимизированная сборка для production

---

**Дата завершения:** май 2026
**Статус:** ✅ Завершено
