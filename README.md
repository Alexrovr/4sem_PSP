Лабораторная работа 3

Задание: Создание простого веб-приложения. Верстка и архитектура на JavaScript.

Вариант: 6 - Тема: Финансы, Компонент: Всплывающие сообщения (Toasts)

Контрольные вопросы: npm и package.json, модульная архитектура проекта, компоненты и страницы, работа с DOM через JavaScript, обработчики событий

Методические указания

Отчёт о проделанной работе

Студент: Воронков Александр, группа ИУ5-42Б, МГТУ им. Н.Э. Баумана

Цель работы: знакомство с инструментами построения веб-приложений (Node.js, npm, Bootstrap) и принципами структурирования фронтенд-проектов на JavaScript.

## Навигация по отчёту

| № | Раздел | Описание |
|---|---|---|
| 1 | [Структура проекта](#структура-проекта) | Организация файлов, папок и модулей |
| 2 | [Выполненные задания](#выполненные-задания) | Реализованный функционал (12 пунктов) |
| 3 | [Описание архитектуры](#описание-архитектуры) | Pages, Components и модульная организация |
| 4 | [Используемые технологии](#используемые-технологии) | Node.js, npm, Bootstrap, ES6 modules |
| 5 | [Структура приложения](#структура-приложения) | Pages, Components и их взаимодействие |
| 6 | [Основные компоненты](#основные-компоненты) | Таблица компонентов и их функциональности |
| 7 | [Работа с DOM и событиями](#работа-с-dom-и-событиями) | API для манипуляции элементами |

## Структура проекта

```
├── node_modules/              — установленные npm-пакеты
├── components/                — переиспользуемые компоненты
│   ├── product-card/
│   │   └── index.js          — карточка товара
│   ├── product/
│   │   └── index.js          — детальное отображение товара
│   ├── back-button/
│   │   └── index.js          — кнопка возврата
│   └── toast/
│       └── index.js          — всплывающее сообщение
├── pages/                     — страницы приложения
│   ├── main/
│   │   └── index.js          — главная страница (список товаров)
│   └── product/
│       └── index.js          — страница детального просмотра товара
├── .gitignore                 — файл исключений git
├── index.html                 — главный HTML файл
├── main.js                    — точка входа приложения (ES6 module)
├── package.json               — конфигурация npm проекта
├── package-lock.json          — lock-файл зависимостей
└── README.md                  — данный файл
```

## Выполненные задания

| № | Задание | Реализация |
|---|---|---|
| 1 | Инициализация npm проекта | `npm init` и настройка package.json |
| 2 | Установка Bootstrap | `npm install bootstrap` для стилизации |
| 3 | Создание структуры Pages/Components | Разделение на переиспользуемые части |
| 4 | Главная страница (MainPage) | Отображение списка товаров с данными |
| 5 | Компонент карточки (ProductCardComponent) | Отображение товара в списке с обработчиком |
| 6 | Обработчики событий на карточках | Переход на страницу детального просмотра |
| 7 | Страница продукта (ProductPage) | Детальное отображение выбранного товара |
| 8 | Компонент продукта (ProductComponent) | Рендеринг карточки товара на странице продукта |
| 9 | Кнопка возврата (BackButtonComponent) | Навигация с страницы товара на главную |
| 10 | Всплывающие сообщения (ToastComponent) | Уведомления об операциях и событиях |
| 11 | Использование data-атрибутов | Передача информации через DOM элементы |
| 12 | Навигация между страницами | Функциональное переключение страниц |

## Описание архитектуры

Приложение построено на основе компонентной архитектуры с четким разделением на Pages и Components.

### Концепция Pages (Страницы)

Pages представляют собой полные экраны приложения:
- **MainPage** — главная страница со списком финансовых инструментов/товаров
- **ProductPage** — страница с детальной информацией о выбранном товаре

Каждая страница:
- Принимает `parent` элемент для рендеринга
- Содержит метод `render()` для отрисовки
- Может передавать обработчики событий в компоненты
- Управляет своим состоянием через методы типа `getData()`

### Концепция Components (Компоненты)

Components — это переиспользуемые блоки интерфейса:
- **ProductCardComponent** — карточка товара на главной странице
- **ProductComponent** — подробное отображение товара
- **BackButtonComponent** — кнопка навигации
- **ToastComponent** — всплывающие уведомления

Каждый компонент:
- Независим и переиспользуем
- Имеет методы `getHTML()` и `render()`
- Может содержать `addListeners()` для обработки событий
- Принимает данные через параметры `render(data)`

### Взаимодействие Pages и Components

```
MainPage (страница)
  ├── рендерит ProductCardComponent для каждого товара
  └── обрабатывает клики через clickCard(e)
      └── передает cardId в ProductPage

ProductPage (страница)
  ├── рендерит BackButtonComponent
  ├── рендерит ProductComponent с данными
  ├── обрабатывает клики BackButton через clickBack()
  └── показывает Toast при определенных действиях
```

## Используемые технологии

### Node.js и npm
- **Node.js** — среда выполнения JavaScript на серверной стороне
- **npm** — пакетный менеджер для установки зависимостей
- **package.json** — файл конфигурации проекта и зависимостей
- **package-lock.json** — файл фиксации версий зависимостей

### Bootstrap 5
- **CSS Framework** — готовые стили и компоненты
- **Grid System** — гибкая система сеток (flexbox)
- **Components** — кнопки, карточки, уведомления (toasts)
- **Utilities** — вспомогательные классы для стилизации

### JavaScript (ES6+)
- **ES6 Modules** — `import`/`export` для модульной архитектуры
- **Class-based архитектура** — использование классов для Pages и Components
- **Template Literals** — многострочные строки для HTML разметки
- **Arrow Functions** — стрелочные функции в обработчиках событий
- **forEach** — итерация по массивам данных

### DOM API
- **document.getElementById()** — получение элементов по ID
- **document.querySelectorAll()** — выборка элементов по селектору
- **.insertAdjacentHTML()** — вставка HTML кода в DOM
- **.addEventListener()** — подписка на события
- **.innerHTML** — изменение содержимого элемента

## Структура приложения

### Инициализация приложения

```javascript
// main.js — точка входа
import {MainPage} from "./pages/main/index.js";

const root = document.getElementById('root');
const mainPage = new MainPage(root);
mainPage.render();
```

### Жизненный цикл страницы

```
1. Создание экземпляра Page
   ↓
2. Вызов render()
   ├── Очистка parent.innerHTML
   ├── Вставка основной разметки getHTML()
   ├── Получение данных getData()
   └── Рендеринг дочерних компонентов
       └── Для каждого элемента данных:
           ├── Создание экземпляра Component
           ├── Передача данных в component.render(data)
           └── Добавление обработчиков addListeners()
```

### Обработка событий

```javascript
// На странице
clickCard(e) {
    const cardId = e.target.dataset.id;

    // Переход на страницу продукта
    const productPage = new ProductPage(this.parent, cardId);
    productPage.render();
}

// В компоненте карточки
addListeners(data, listener) {
    document
        .getElementById(`click-card-${data.id}`)
        .addEventListener("click", listener);
}

// Использование в render
render(data, listener) {
    const html = this.getHTML(data);
    this.parent.insertAdjacentHTML('beforeend', html);
    this.addListeners(data, listener);
}
```

## Основные компоненты

| Компонент | Назначение | Используется на |
|---|---|---|
| **ProductCardComponent** | Отображение товара в виде карточки Bootstrap | MainPage |
| **ProductComponent** | Детальное отображение товара | ProductPage |
| **BackButtonComponent** | Кнопка для возврата на предыдущую страницу | ProductPage |
| **ToastComponent** | Всплывающие уведомления об операциях | Все страницы |

### Пример: ProductCardComponent

```javascript
export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 300px;">
                <img src="${data.src}" class="card-img-top" alt="${data.title}">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <button
                        class="btn btn-primary"
                        id="click-card-${data.id}"
                        data-id="${data.id}">
                        Подробнее
                    </button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
```

### Пример: ToastComponent (Вариант 6)

```javascript
export class ToastComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(message, type = 'success') {
        return `
            <div class="toast ${type}" role="alert">
                <div class="toast-header">
                    <strong class="me-auto">${type === 'success' ? 'Успех' : 'Информация'}</strong>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
    }

    render(message, type = 'success') {
        const html = this.getHTML(message, type);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
```

## Работа с DOM и событиями

### Получение элементов

```javascript
// По ID
const element = document.getElementById('id');

// По селектору (один элемент)
const element = document.querySelector('.class');

// По селектору (все элементы)
const elements = document.querySelectorAll('[data-id]');
```

### Вставка HTML

```javascript
// Добавить в конец
parent.insertAdjacentHTML('beforeend', html);

// Добавить в начало
parent.insertAdjacentHTML('afterbegin', html);
```

### Подписка на события

```javascript
// Способ 1: через onclick (не рекомендуется)
element.onclick = function() { };

// Способ 2: addEventListener (рекомендуется)
element.addEventListener('click', function(e) {
    console.log(e.target.dataset.id);
});

// Способ 3: стрелочная функция с bind
element.addEventListener('click', this.handleClick.bind(this));
```

### Data-атрибуты

```javascript
// HTML
<button data-id="123" data-type="product">Button</button>

// JavaScript
const id = element.dataset.id;     // "123"
const type = element.dataset.type; // "product"
```

## Практические примеры кода

### Пример 1: Итерация по данным и рендеринг компонентов

```javascript
render() {
    this.parent.innerHTML = '';
    const html = this.getHTML();
    this.parent.insertAdjacentHTML('beforeend', html);

    const data = this.getData();
    data.forEach((item) => {
        const productCard = new ProductCardComponent(this.pageRoot);
        productCard.render(item, this.clickCard.bind(this));
    });
}
```

### Пример 2: Обработчик события с данными

```javascript
clickCard(e) {
    const cardId = e.target.dataset.id;

    const productPage = new ProductPage(this.parent, cardId);
    productPage.render();
}
```

### Пример 3: Очистка и переврисовка страницы

```javascript
render() {
    // Очищаем содержимое родителя
    this.parent.innerHTML = '';

    // Вставляем новую разметку
    const html = this.getHTML();
    this.parent.insertAdjacentHTML('beforeend', html);

    // Рендерим компоненты внутри
    const component = new SomeComponent(this.pageRoot);
    component.render(data);
}
```

## Использованные npm пакеты

| Пакет | Версия | Назначение |
|---|---|---|
| bootstrap | ^5.x | CSS Framework с готовыми компонентами |

## Заключение

Данная лабораторная работа позволила приобрести практические навыки:

- **Работа с npm и package.json** для управления зависимостями
- **Модульная архитектура** на JavaScript с ES6 модулями
- **Компонентная архитектура** на базе Pages и Components
- **Структурирование проекта** для удобства разработки и масштабирования
- **Работа с Bootstrap** для быстрой верстки интерфейсов
- **Обработка событий** и навигация между страницами
- **Принципы OOP** через классы и взаимодействие объектов

Приложение полностью функционально и может быть расширено дополнительными страницами, компонентами и функциональностью благодаря модульной архитектуре.
