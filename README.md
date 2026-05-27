Лабораторная работа 4

Задание: Создание бэкенда на Express.js. REST API приложения.

Вариант: 6 - Дополнительное задание по выбору (по вариантам)

Контрольные вопросы: REST архитектура, HTTP методы и статус-коды, Express.js middleware, слоистая архитектура приложения, JSON и работа с файлами

Методические указания

Отчёт о проделанной работе

Студент: Воронков Александр, группа ИУ5-42Б, МГТУ им. Н.Э. Баумана

Цель работы: знакомство с разработкой бэкенда веб-приложений с использованием Express.js и реализация REST API сервиса.

## Навигация по отчёту

| № | Раздел | Описание |
|---|---|---|
| 1 | [Структура проекта](#структура-проекта) | Организация папок и слоёв архитектуры |
| 2 | [Выполненные задания](#выполненные-задания) | Реализованный функционал (12 пунктов) |
| 3 | [Описание архитектуры](#описание-архитектуры) | Слоистая архитектура: Routes, Controllers, Services |
| 4 | [Используемые технологии](#используемые-технологии) | Express.js, Node.js, npm, JSON хранилище |
| 5 | [REST API эндпоинты](#rest-api-эндпоинты) | Полный набор CRUD операций |
| 6 | [Основные компоненты](#основные-компоненты) | Таблица слоёв и их ответственность |
| 7 | [Примеры кода](#примеры-кода) | Практические примеры реализации |

## Структура проекта

```
express-lab/
├── src/
│   ├── index.js                    — точка входа сервера (главный файл)
│   ├── routes/
│   │   └── stocks.js              — маршруты для ресурса stocks
│   ├── controllers/
│   │   └── stocksController.js    — обработчики запросов
│   ├── services/
│   │   ├── stocksService.js       — бизнес-логика работы с stocks
│   │   └── fileService.js         — работа с файловой системой
│   └── data/
│       └── stocks.json            — хранилище данных
├── .gitignore                      — исключения для git
├── package.json                    — конфигурация npm проекта
├── package-lock.json               — lock-файл зависимостей
└── README.md                       — данный файл
```

## Выполненные задания

| № | Задание | Реализация |
|---|---|---|
| 1 | Инициализация npm проекта | `npm init` с установкой зависимостей |
| 2 | Установка Express.js | `npm install express` и nodemon для разработки |
| 3 | Создание базового сервера | Слушание порта 3000, обработка запросов |
| 4 | Реализация REST API | Полный набор CRUD операций для stocks |
| 5 | Слой данных (FileService) | Чтение/запись JSON файла с обработкой ошибок |
| 6 | Слой бизнес-логики (Service) | findAll, findOne, create, update, remove методы |
| 7 | Слой обработки запросов (Controller) | Валидация данных и формирование response |
| 8 | Маршрутизация (Routes) | express.Router для организации эндпоинтов |
| 9 | Middleware для парсинга JSON | express.json() для обработки тела запроса |
| 10 | Обработка ошибок | Error handler middleware и валидация данных |
| 11 | Логирование запросов | Middleware для логирования метода, пути и времени |
| 12 | Тестирование через Postman | Проверка всех эндпоинтов (GET, POST, PATCH, DELETE) |

## Описание архитектуры

Приложение использует **Слоистую архитектуру (Layered Architecture)**, разделяя ответственность между компонентами для улучшения масштабируемости и тестируемости.

### Поток обработки запроса

```
1. HTTP Request приходит на Express приложение
   ↓
2. Middleware цепочка (парсинг JSON, логирование)
   ↓
3. Router выбирает соответствующий маршрут
   ↓
4. Controller обрабатывает запрос и валидирует данные
   ↓
5. Service выполняет бизнес-логику
   ↓
6. FileService выполняет операции с файлом
   ↓
7. Service возвращает результат в Controller
   ↓
8. Controller формирует HTTP Response
   ↓
9. Response отправляется клиенту
```

### Слои архитектуры

#### Routes (src/routes/stocks.js)
- Определение HTTP маршрутов (GET, POST, PATCH, DELETE)
- Связывание URL с методами контроллера
- Определение параметров пути и query-параметров

#### Controllers (src/controllers/stocksController.js)
- Получение данных из req (body, params, query)
- Валидация входных данных
- Вызов методов service
- Формирование HTTP ответа с правильным статус-кодом

#### Services (src/services/stocksService.js)
- Бизнес-логика работы с данными
- Фильтрация, поиск, создание, обновление, удаление
- Управление идентификаторами
- Взаимодействие с fileService

#### FileService (src/services/fileService.js)
- Чтение JSON файла с обработкой ошибок
- Сохранение данных в JSON файл
- Сериализация/десериализация данных

### Преимущества слоистой архитектуры

✓ **Разделение ответственности** — каждый слой отвечает за одно
✓ **Тестируемость** — слои можно тестировать отдельно
✓ **Переиспользуемость** — сервисы используются от разных контроллеров
✓ **Масштабируемость** — легко добавлять новые функции и слои
✓ **Легкость миграции** — можно заменить FileService на БД без изменения Controller

## Используемые технологии

### Node.js и npm
- **Node.js** — среда выполнения для JavaScript на сервере
- **npm** — пакетный менеджер для управления зависимостями
- **nodemon** — автоматический перезапуск сервера при изменении кода

### Express.js
- **HTTP Framework** — минималистичный фреймворк для создания веб-приложений
- **Router** — система маршрутизации для организации эндпоинтов
- **Middleware** — цепочка функций для обработки запросов
- **JSON Parser** — встроенный middleware для парсинга JSON

### Хранение данных
- **JSON файл** — простое хранилище для демонстрационных целей
- **FileSystem API** — встроенный модуль Node.js для работы с файлами

### HTTP и REST
- **REST архитектура** — стиль проектирования API
- **HTTP методы** — GET, POST, PATCH, DELETE
- **HTTP статус-коды** — 200, 201, 400, 404, 500
- **JSON формат** — стандарт для обмена данными

## REST API эндпоинты

### GET /stocks/ — Получение всех карточек

```http
GET http://localhost:3000/stocks/
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "src": "https://example.com/image.jpg",
    "title": "Финансовый инструмент 1",
    "text": "Описание инструмента"
  },
  ...
]
```

### GET /stocks?title=query — Поиск по названию

```http
GET http://localhost:3000/stocks?title=финансы
```

**Query параметры:**
- `title` — (опционально) строка для фильтрации по названию

**Response (200 OK):** Массив отфильтрованных карточек

### GET /stocks/:id — Получение карточки по ID

```http
GET http://localhost:3000/stocks/1
```

**Path параметры:**
- `:id` — уникальный идентификатор карточки

**Response (200 OK):**
```json
{
  "id": 1,
  "src": "...",
  "title": "...",
  "text": "..."
}
```

**Response (404 Not Found):**
```json
{ "error": "Карточка не найдена" }
```

### POST /stocks — Создание новой карточки

```http
POST http://localhost:3000/stocks
Content-Type: application/json

{
  "src": "https://example.com/image.jpg",
  "title": "Новый инструмент",
  "text": "Описание"
}
```

**Request body:**
```json
{
  "src": "string",      // URL изображения (обязательно)
  "title": "string",    // Название (обязательно)
  "text": "string"      // Описание (обязательно)
}
```

**Response (201 Created):**
```json
{
  "id": 5,
  "src": "...",
  "title": "...",
  "text": "..."
}
```

**Response (400 Bad Request):**
```json
{ "error": "Не все поля заполнены" }
```

### PATCH /stocks/:id — Обновление карточки

```http
PATCH http://localhost:3000/stocks/1
Content-Type: application/json

{
  "title": "Обновленное название"
}
```

**Request body:** Объект с полями для обновления (все поля опциональны)

**Response (200 OK):** Обновленный объект карточки

**Response (404 Not Found):**
```json
{ "error": "Карточка не найдена" }
```

### DELETE /stocks/:id — Удаление карточки

```http
DELETE http://localhost:3000/stocks/1
```

**Response (204 No Content):** (пусто)

**Response (404 Not Found):**
```json
{ "error": "Карточка не найдена" }
```

## Основные компоненты

### FileService — Слой доступа к данным

| Метод | Назначение | Параметры |
|---|---|---|
| `readData(filePath)` | Чтение данных из JSON файла | filePath: string |
| `writeData(filePath, data)` | Запись данных в JSON файл | filePath: string, data: array |

**Особенности:**
- Обработка ошибок при чтении/записи файла
- Возврат пустого массива при ошибке чтения
- Форматированный вывод JSON (отступы 2 пробела)

### StocksService — Слой бизнес-логики

| Метод | Назначение | Параметры | Возвращает |
|---|---|---|---|
| `init(filePath)` | Инициализация с путем к файлу | filePath: string | void |
| `findAll(title)` | Получить все карточки (опционально фильтр) | title?: string | array |
| `findOne(id)` | Найти карточку по ID | id: number | object \| undefined |
| `create(stockData)` | Создать новую карточку | stockData: object | object |
| `update(id, stockData)` | Обновить карточку | id: number, stockData: object | object \| null |
| `remove(id)` | Удалить карточку | id: number | boolean |

**Особенности:**
- Автоматическое генерирование ID (max_id + 1)
- Фильтрация по названию (case-insensitive)
- Частичное обновление (merge объектов)
- Возврат null/false при отсутствии ресурса

### StocksController — Слой обработки запросов

| Метод | HTTP метод | Маршрут | Валидация |
|---|---|---|---|
| `getAllStocks` | GET | /stocks | Query параметр title |
| `getStockById` | GET | /stocks/:id | Парсинг ID в число |
| `createStock` | POST | /stocks | Проверка всех полей |
| `updateStock` | PATCH | /stocks/:id | Проверка существования |
| `deleteStock` | DELETE | /stocks/:id | Проверка существования |

**Особенности:**
- Валидация входных данных
- Правильные HTTP статус-коды (201, 204, 400, 404)
- JSON ответы с описанием ошибок
- Преобразование строковых параметров в числа

## Примеры кода

### Пример 1: FileService

```javascript
const fs = require('fs');

const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Ошибка чтения файла:', err);
        return [];
    }
};

const writeData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Ошибка записи файла:', err);
    }
};

module.exports = { readData, writeData };
```

### Пример 2: StocksService методы

```javascript
const findAll = (title) => {
    const stocks = fileService.readData(dataFilePath);
    if (title) {
        return stocks.filter(stock =>
            stock.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return stocks;
};

const create = (stockData) => {
    const stocks = fileService.readData(dataFilePath);
    const newId = stocks.length > 0
        ? Math.max(...stocks.map(s => s.id)) + 1
        : 1;

    const newStock = { id: newId, ...stockData };
    stocks.push(newStock);
    fileService.writeData(dataFilePath, stocks);

    return newStock;
};
```

### Пример 3: Controller с валидацией

```javascript
const createStock = (req, res) => {
    const { src, title, text } = req.body;

    // Валидация
    if (!src || !title || !text) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }

    const newStock = stocksService.create({ src, title, text });
    res.status(201).json(newStock);
};

const getStockById = (req, res) => {
    const id = parseInt(req.params.id);
    const stock = stocksService.findOne(id);

    if (!stock) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }

    res.json(stock);
};
```

### Пример 4: Express сервер с middleware

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для логирования
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Маршруты
app.use('/stocks', stocksRouter);

// Обработчик 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
```

## npm Скрипты

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

- `npm start` — запуск сервера в production режиме
- `npm run dev` — запуск с автоматической перезагрузкой при изменении кода

## Тестирование API

### Способы тестирования:

1. **Postman** — графический интерфейс для тестирования запросов
2. **curl** — командная строка
3. **VS Code REST Client** — расширение для VS Code
4. **Thunder Client** — альтернатива Postman

### Пример curl команд:

```bash
# GET все карточки
curl http://localhost:3000/stocks/

# GET с фильтром
curl "http://localhost:3000/stocks?title=финансы"

# POST новую карточку
curl -X POST http://localhost:3000/stocks \
  -H "Content-Type: application/json" \
  -d '{"src":"https://example.com/img.jpg","title":"Test","text":"Description"}'

# PATCH обновление
curl -X PATCH http://localhost:3000/stocks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# DELETE удаление
curl -X DELETE http://localhost:3000/stocks/1
```

## Установка и запуск

```bash
# Перейти в папку проекта
cd express-lab

# Установить зависимости
npm install

# Запуск в режиме разработки
npm run dev

# Или запуск в production
npm start
```

После запуска сервер будет доступен по адресу `http://localhost:3000`

## Дополнительные возможности расширения

### Возможные доп. задания (вариант 6):

- ✓ Добавить логирование с использованием [morgan](https://www.npmjs.com/package/morgan)
- ✓ Реализовать валидацию данных с [express-validator](https://express-validator.github.io/)
- ✓ Добавить документацию API через Swagger/OpenAPI
- ✓ Подключить базу данных (SQLite, PostgreSQL) через Sequelize или Prisma
- ✓ Добавить JWT аутентификацию через jsonwebtoken
- ✓ Реализовать unit тесты с Jest или Mocha
- ✓ Настроить CORS для работы с фронтенд-приложением
- ✓ Добавить WebSocket для real-time обновлений

## Заключение

Данная лабораторная работа позволила приобрести практические навыки:

- **Разработка бэкенда** с использованием Express.js
- **REST архитектура** и проектирование API
- **Слоистая архитектура** для организации кода
- **HTTP методы и статус-коды** для правильной работы с клиентом
- **Middleware и цепочка обработки** в Express
- **Работа с файловой системой** и JSON данными
- **Валидация входных данных** и обработка ошибок
- **Тестирование API** с использованием инструментов

Приложение полностью функционально и может быть расширено дополнительными возможностями, сохраняя чистоту архитектуры благодаря слоистому подходу.
