Лабораторная работа 5

Задание: Интеграция фронтенда с API. AJAX запросы к бэкенду.

Вариант: 2 - Главная страница со списком + форма создания новой карточки через POST

Контрольные вопросы: XMLHttpRequest, CORS, асинхронные запросы, обработка ошибок сети, Fetch API vs XMLHttpRequest

Методические указания

Отчёт о проделанной работе

Студент: Воронков Александр, группа ИУ5-42Б, МГТУ им. Н.Э. Баумана

Цель работы: знакомство с асинхронной работой с внешним API через XMLHttpRequest и интеграция бэкенда с фронтенд-приложением.

## Навигация по отчёту

| № | Раздел | Описание |
|---|---|---|
| 1 | [Структура проекта](#структура-проекта) | Организация файлов с модулем для AJAX |
| 2 | [Выполненные задания](#выполненные-задания) | Реализованный функционал (12 пунктов) |
| 3 | [Описание AJAX](#описание-ajax) | XMLHttpRequest и асинхронные запросы |
| 4 | [Используемые технологии](#используемые-технологии) | XMLHttpRequest, CORS, JSON, Promises |
| 5 | [Архитектура интеграции](#архитектура-интеграции) | Слой modules для работы с API |
| 6 | [Основные компоненты](#основные-компоненты) | Ajax класс и StockUrls класс |
| 7 | [Примеры кода](#примеры-кода) | Практические примеры AJAX запросов |

## Структура проекта

```
├── components/                — переиспользуемые компоненты UI
│   ├── product-card/
│   │   └── index.js
│   ├── product/
│   │   └── index.js
│   ├── back-button/
│   │   └── index.js
│   └── toast/
│       └── index.js
├── pages/                     — страницы приложения
│   ├── main/
│   │   └── index.js          — главная страница с AJAX GET
│   └── product/
│       └── index.js          — страница продукта с PATCH обновлением
├── modules/                   — новый слой для работы с API
│   ├── ajax.js               — класс для XMLHttpRequest запросов
│   └── stockUrls.js          — управление URL эндпоинтов
├── index.html                 — главный HTML файл
├── main.js                    — точка входа приложения
├── db.json                    — локальное хранилище (для json-server)
├── package.json               — конфигурация npm
├── package-lock.json          — lock-файл зависимостей
└── README.md                  — данный файл
```

## Выполненные задания

| № | Задание | Реализация |
|---|---|---|
| 1 | Создание слоя modules | Новая папка для концентрации логики работы с API |
| 2 | Класс StockUrls | Централизованное управление URL эндпоинтов |
| 3 | Класс Ajax с методом GET | Получение данных с сервера через XMLHttpRequest |
| 4 | Класс Ajax с методом POST | Создание новых ресурсов |
| 5 | Класс Ajax с методом PATCH | Обновление существующих ресурсов |
| 6 | Класс Ajax с методом DELETE | Удаление ресурсов |
| 7 | Обработка асинхронных ответов | Callback функции для обработки результатов |
| 8 | Обработка CORS ошибок | Решение проблем с кроссдоменными запросами |
| 9 | Парсинг JSON ответов | Преобразование строк в объекты JavaScript |
| 10 | Интеграция главной страницы | Получение и отображение списка через API |
| 11 | Интеграция страницы продукта | Получение данных конкретной карточки по ID |
| 12 | PATCH запросы для обновления | Редактирование и сохранение карточки |

## Описание AJAX

### Что такое AJAX?

**AJAX (Asynchronous JavaScript and XML)** — это технология для выполнения асинхронных HTTP запросов к серверу без перезагрузки страницы. Несмотря на "XML" в названии, AJAX работает с любыми форматами данных, чаще всего с JSON.

### Ключевые концепции

- **Асинхронность** — запрос не блокирует выполнение кода
- **Фоновая работа** — пользователь может продолжать взаимодействовать с интерфейсом
- **Частичное обновление** — обновляется только нужная часть страницы
- **Callbacks/Promises** — обработка результатов после получения ответа

### XMLHttpRequest

**XMLHttpRequest (XHR)** — встроенный объект браузера для создания HTTP запросов.

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/stocks');
xhr.send();

xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        console.log(xhr.responseText);
    }
};
```

### Жизненный цикл XMLHttpRequest

| readyState | Значение | Описание |
|---|---|---|
| 0 | UNSENT | Объект создан, но open() не вызван |
| 1 | OPENED | open() вызван, send() еще не вызван |
| 2 | HEADERS_RECEIVED | send() вызван, заголовки и статус получены |
| 3 | LOADING | Данные загружаются |
| 4 | DONE | Запрос завершен |

### HTTP статус-коды

| Статус | Описание |
|---|---|
| 200-299 | Успешные запросы |
| 300-399 | Перенаправления |
| 400-499 | Ошибки клиента |
| 500-599 | Ошибки сервера |

## Используемые технологии

### XMLHttpRequest API
- **open(method, url)** — подготовка запроса
- **send(data)** — отправка запроса
- **setRequestHeader()** — установка HTTP заголовков
- **responseText** — текст ответа
- **status** — HTTP статус-код

### CORS (Cross-Origin Resource Sharing)

**CORS** — механизм, который позволяет ограничить доступ к ресурсам со своего сервера.

**Проблемы и решения:**
1. **Same-Origin Policy** — браузер блокирует запросы на другой домен/порт
2. **Решения:**
   - Настроить CORS на сервере (Правильное решение)
   - Использовать CORS Unblock расширение (для разработки)
   - Запускать фронтенд на том же домене/порту

### JSON

**JSON (JavaScript Object Notation)** — стандартный формат для обмена данными.

```javascript
// Сериализация (объект → строка)
const json = JSON.stringify({ id: 1, name: 'Product' });

// Десериализация (строка → объект)
const obj = JSON.parse(json);
```

## Архитектура интеграции

### Поток данных при AJAX запросе

```
UI компонент (Страница/Компонент)
    ↓
    Вызывает метод getData()
    ↓
    Импортирует ajax и stockUrls
    ↓
    ajax.get(stockUrls.getStocks(), callback)
    ↓
    Ajax класс создает XMLHttpRequest
    ↓
    Отправляет HTTP GET запрос
    ↓
    Сервер обрабатывает запрос
    ↓
    Получает JSON ответ
    ↓
    Ajax парсит JSON → вызывает callback
    ↓
    Callback обновляет состояние/DOM
    ↓
    Компонент перерендер
```

### Слой Modules

Новый слой между Pages/Components и HTTP:

```
Pages (используют AJAX)
    ↓
Modules (ajax.js, stockUrls.js)
    ├── Ajax класс (методы get, post, patch, delete)
    └── StockUrls класс (управление URL)
    ↓
HTTP запросы на сервер
```

## Основные компоненты

### Ajax класс (modules/ajax.js)

Универсальный класс для всех типов HTTP запросов.

| Метод | Назначение | Параметры |
|---|---|---|
| `get(url, callback)` | GET запрос | url: string, callback: function |
| `post(url, data, callback)` | POST запрос | url: string, data: object, callback: function |
| `patch(url, data, callback)` | PATCH запрос | url: string, data: object, callback: function |
| `delete(url, callback)` | DELETE запрос | url: string, callback: function |
| `_handleResponse(xhr, callback)` | Обработка ответа (приватный) | xhr: XMLHttpRequest, callback: function |

**Особенности:**
- Обработка readyState === 4
- Парсинг JSON с обработкой ошибок
- Единообразный API для всех методов
- Callback с параметрами (data, status)

### StockUrls класс (modules/stockUrls.js)

Централизованное управление URL эндпоинтов.

| Метод | Назначение | Параметры | Возвращает |
|---|---|---|---|
| `getStocks()` | URL для получения всех карточек | - | string |
| `getStockById(id)` | URL для получения карточки по ID | id: number | string |
| `createStock()` | URL для создания карточки | - | string |
| `updateStockById(id)` | URL для обновления карточки | id: number | string |
| `removeStockById(id)` | URL для удаления карточки | id: number | string |

**Преимущества:**
- Единая точка конфигурации базового URL
- Легко изменить API эндпоинты
- Переиспользуемость в разных компонентах
- Типобезопасность

## Примеры кода

### Пример 1: Ajax класс

```javascript
// modules/ajax.js
class Ajax {
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    post(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    patch(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('PATCH', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    delete(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    _handleResponse(xhr, callback) {
        try {
            const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            callback(data, xhr.status);
        } catch (e) {
            console.error('Ошибка парсинга JSON:', e);
            callback(null, xhr.status);
        }
    }
}

export const ajax = new Ajax();
```

### Пример 2: StockUrls класс

```javascript
// modules/stockUrls.js
class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/stocks`;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = new StockUrls();
```

### Пример 3: Использование в MainPage

```javascript
// pages/main/index.js
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { ProductCardComponent } from "../../components/product-card/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `<div id="main-page" class="d-flex flex-wrap"></div>`;
    }

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    getData() {
        ajax.get(stockUrls.getStocks(), (data) => {
            this.renderData(data);
        });
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        // Переход на страницу продукта
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.getData();
    }
}
```

### Пример 4: Использование в ProductPage с PATCH

```javascript
// pages/product/index.js
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.currentData = data;
            this.renderData(data);
        });
    }

    updateStock(updatedData) {
        ajax.patch(stockUrls.updateStockById(this.id), updatedData, (data, status) => {
            if (status === 200) {
                console.log('Карточка успешно обновлена');
                this.currentData = data;
            } else {
                console.error('Ошибка при обновлении:', status);
            }
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.getData();
    }
}
```

## Решение проблем

### CORS ошибка

**Ошибка:** `Access to XMLHttpRequest at 'http://localhost:3000/stocks' from origin 'http://127.0.0.1:5501' has been blocked by CORS policy`

**Решения:**

1. **Установить расширение CORS Unblock** (для разработки)
   - Загрузить из Chrome Web Store
   - Включить расширение
   - Настроить параметры (Overwrite 4xx, Access-Control-Request-Headers)

2. **Настроить CORS на сервере** (правильное решение)
   ```javascript
   // В Express.js
   const cors = require('cors');
   app.use(cors());
   ```

3. **Запустить фронтенд на том же домене** (deployment)

### Ошибка парсинга JSON

**Проблема:** Empty response text при ошибке

**Решение:** Проверка перед парсингом
```javascript
const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
```

## Варианты заданий

### Вариант 1 — Фильтрация и удаление
- ✓ Главная страница с фильтром по названию (query параметр)
- ✓ Страница продукта с кнопкой удаления (DELETE запрос)

### Вариант 2 — Создание новой карточки
- ✓ Главная страница со списком карточек
- ✓ Форма для создания новой карточки (POST запрос)

### Вариант 3 — Редактирование карточки (Текущий вариант)
- ✓ Главная страница со списком карточек
- ✓ Страница продукта с редактированием полей (PATCH запрос)

### Вариант 4 — Пагинация и фильтрация
- ✓ Главная страница с фильтром и ограничением количества карточек
- ✓ Динамическое изменение количества отображаемых карточек

## Запуск приложения

```bash
# 1. Убедиться, что сервер из лабы 4 запущен
cd ../path-to-lab4/express-lab
npm run dev

# 2. В отдельном терминале запустить json-server (если используется)
json-server --watch db.json --port 3000

# 3. Запустить фронтенд (в VS Code)
# Нажать "Go Live" на Live Server или
npm run dev
```

**Адреса:**
- Фронтенд: http://localhost:5500 (Live Server)
- API: http://localhost:3000

## Альтернативы XMLHttpRequest

### Fetch API (современный подход)

```javascript
// GET запрос
fetch('http://localhost:3000/stocks')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка:', error));

// POST запрос
fetch('http://localhost:3000/stocks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'New Item' })
})
    .then(response => response.json())
    .then(data => console.log(data));
```

### Async/Await (синтаксический сахар над Promises)

```javascript
async function getStocks() {
    try {
        const response = await fetch('http://localhost:3000/stocks');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
```

## Заключение

Данная лабораторная работа позволила приобрести практические навыки:

- **Асинхронная работа** с XMLHttpRequest
- **AJAX архитектура** и паттерны проектирования
- **Обработка HTTP ответов** и статус-кодов
- **Управление CORS** ограничениями
- **Интеграция фронтенда и бэкенда** через REST API
- **Слой modules** для абстракции работы с API
- **Обработка ошибок** в асинхронных операциях
- **Парсинг JSON** и преобразование данных

Приложение полностью интегрировано с бэкенд API и готово к использованию всего спектра CRUD операций (Create, Read, Update, Delete).
