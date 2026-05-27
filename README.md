# Домашнее задание 1. Часть 1. Работа с коллекциями, функциями и классами

**Автор:** Воронков Александр
**Группа:** ИУ5-42
**Вариант:** 6 (Задачи 2.3 и 3.2)

## Навигация

- [Цель](#цель)
- [Требования](#требования)
- [Описание заданий](#описание-заданий)
  - [Задача 2.3: Поиск максимальной последовательности скидок](#задача-23-поиск-максимальной-последовательности-скидок)
  - [Задача 3.2: Инверсия истории заказов](#задача-32-инверсия-истории-заказов)
- [Ключевые концепции](#ключевые-концепции)
  - [Коллекции (массивы и множества)](#коллекции-массивы-и-множества)
  - [Объекты в JavaScript](#объекты-в-javascript)
  - [Функции](#функции)
  - [Классы](#классы)
  - [Циклы с условиями](#циклы-с-условиями)
- [Реализация в проекте](#реализация-в-проекте)
- [Использование Three.js](#использование-threejs)
- [Структура кода](#структура-кода)
- [Дополнительные материалы](#дополнительные-материалы)

---

## Цель

Цель домашнего задания - внедрить две задачи (по варианту) в приложение портала вакансий (ЛР№3) с использованием:
- Коллекций (массивы, множества)
- Объектов и классов
- Функций (регулярных и стрелочных)
- Циклов с условиями

**Тема:** Система электронных покупок - портал вакансий
**Что практикуем:**
- Работа со строками и их обработка
- Работа с массивами и объектами
- Создание и использование классов
- Применение функций для решения алгоритмических задач

## Требования

При выполнении задания **обязательно** использовать:

### ✅ Обязательные элементы

1. **Цикл с (пост)условием, но не по счетчику**
   - Цикл `while`, который проверяет условие в начале
   - Цикл `do...while`, который проверяет условие в конце
   - Условие должно зависеть от значений, а не от счетчика (например, "пока ID товара не найден" или "пока сумма не превышает лимит")

2. **Строка (String)**
   - Работа со строковыми данными
   - Методы строк: `.slice()`, `.substring()`, `.indexOf()`, `.split()`, `.join()` и т.д.
   - Поиск, замена, трансформация текста

3. **Объект (Object)**
   - Наличие объектов с несколькими свойствами
   - Использование dot-notation или bracket-notation для доступа к свойствам
   - Пример: `{ id, title, price, discount }`

4. **Коллекция (Array или Set)**
   - Массив товаров, заказов, клиентов
   - Методы массивов: `.map()`, `.filter()`, `.reduce()`, `.find()`, `.some()`, `.every()`
   - Или использование Set для хранения уникальных значений

---

## Описание заданий

### Задача 2.3: Поиск максимальной последовательности скидок

**Уровень:** 2 (2 балла)
**Исходная формулировка:** Дана строка из 0 и 1. Найти максимальную последовательность 1.

**Адаптация для проекта:** Найти самую длинную цепочку товаров подряд с активной скидкой (обозначенной как 1) в каталоге.

#### Исходные данные

```javascript
// Каталог товаров - коллекция объектов
const products = [
    { id: 1, title: 'Ноутбук', hasDiscount: true },
    { id: 2, title: 'Монитор', hasDiscount: true },
    { id: 3, title: 'Клавиатура', hasDiscount: true },
    { id: 4, title: 'Мышь', hasDiscount: false },
    { id: 5, title: 'Наушники', hasDiscount: true },
    { id: 6, title: 'Микрофон', hasDiscount: true },
    { id: 7, title: 'Webcam', hasDiscount: true },
    { id: 8, title: 'Коврик', hasDiscount: false },
    { id: 9, title: 'Кабель HDMI', hasDiscount: false },
];

// Строка скидок (1 = скидка есть, 0 = нет скидки)
const discountString = '11101110010';
```

#### Решение

**Вариант 1: Базовое решение**

```javascript
/**
 * Находит максимальную последовательность скидок в каталоге
 * @param {string} discountStr - строка из 0 и 1 (1 = скидка есть)
 * @returns {Object} объект с информацией о максимальной последовательности
 */
function findMaxDiscountSequence(discountStr) {
    let maxLength = 0;
    let maxStartIndex = 0;
    let currentLength = 0;
    let currentStartIndex = 0;

    let index = 0;
    // Цикл с условием (не по счетчику) - продолжаем пока не обработали всю строку
    while (index < discountStr.length) {
        if (discountStr[index] === '1') {
            if (currentLength === 0) {
                currentStartIndex = index; // Запомним начало последовательности
            }
            currentLength++;
        } else {
            // Конец последовательности скидок
            if (currentLength > maxLength) {
                maxLength = currentLength;
                maxStartIndex = currentStartIndex;
            }
            currentLength = 0;
        }
        index++;
    }

    // Проверка последней последовательности
    if (currentLength > maxLength) {
        maxLength = currentLength;
        maxStartIndex = currentStartIndex;
    }

    return {
        maxLength,
        startIndex: maxStartIndex,
        endIndex: maxStartIndex + maxLength - 1,
        message: `Максимальная цепочка скидок: ${maxLength} товаров (с индекса ${maxStartIndex} до ${maxStartIndex + maxLength - 1})`
    };
}

// Использование
const result = findMaxDiscountSequence(discountString);
console.log(result);
// Выведет: { maxLength: 3, startIndex: 0, endIndex: 2, message: '...' }
```

**Вариант 2: Расширенное решение с информацией о товарах**

```javascript
/**
 * Получить строку скидок из массива товаров
 * @param {Array} productsArray - массив товаров
 * @returns {string} строка из 0 и 1
 */
function getDiscountString(productsArray) {
    return productsArray
        .map(product => product.hasDiscount ? '1' : '0')
        .join('');
}

/**
 * Найти максимальную последовательность товаров со скидками
 * @param {Array} productsArray - коллекция товаров
 * @returns {Object} информация о последовательности
 */
function findMaxDiscountedProducts(productsArray) {
    const discountStr = getDiscountString(productsArray);

    let maxLength = 0;
    let maxStartIndex = 0;
    let currentLength = 0;
    let currentStartIndex = 0;

    // Используем do...while для обхода с постусловием
    let index = 0;
    do {
        if (index < discountStr.length) {
            if (discountStr[index] === '1') {
                if (currentLength === 0) {
                    currentStartIndex = index;
                }
                currentLength++;
            } else {
                if (currentLength > maxLength) {
                    maxLength = currentLength;
                    maxStartIndex = currentStartIndex;
                }
                currentLength = 0;
            }
        }
        index++;
    } while (index <= discountStr.length);

    if (currentLength > maxLength) {
        maxLength = currentLength;
        maxStartIndex = currentStartIndex;
    }

    // Получаем товары в этой последовательности
    const productsInSequence = productsArray.slice(
        maxStartIndex,
        maxStartIndex + maxLength
    );

    return {
        length: maxLength,
        startIndex: maxStartIndex,
        products: productsInSequence,
        discountPercentage: 15, // Примерный размер скидки
        totalSavings: productsInSequence.reduce((sum, product) => {
            const price = product.price || 1000; // Примерная цена
            return sum + (price * 0.15);
        }, 0)
    };
}

// Использование
const maxSequence = findMaxDiscountedProducts(products);
console.log(`Найдена цепочка из ${maxSequence.length} товаров со скидками`);
console.log('Товары:', maxSequence.products);
```

---

### Задача 3.2: Инверсия истории заказов

**Уровень:** 3 (4 балла)
**Исходная формулировка:** Функция `inverse` меняет порядок элементов в массиве. С опциональным числом пропускает первые N элементов.

**Адаптация для проекта:** Функция для разворота истории заказов покупателя с опцией сохранить последние заказы на месте.

#### Исходные данные

```javascript
// История заказов - коллекция объектов
const orderHistory = [
    { id: 1, customer: 'Иван', date: '2024-01-15', amount: 5000 },
    { id: 2, customer: 'Мария', date: '2024-01-20', amount: 3200 },
    { id: 3, customer: 'Петр', date: '2024-02-01', amount: 8900 },
    { id: 4, customer: 'Ольга', date: '2024-02-10', amount: 2150 },
    { id: 5, customer: 'Алексей', date: '2024-02-15', amount: 6700 },
    { id: 6, customer: 'Анна', date: '2024-02-28', amount: 4500 },
    { id: 7, customer: 'Сергей', date: '2024-03-05', amount: 9200 },
];

// Простой массив чисел для демонстрации
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
```

#### Решение

**Вариант 1: Базовая инверсия**

```javascript
/**
 * Инвертирует массив или его часть
 * @param {Array} array - исходный массив
 * @param {number} skipCount - количество элементов в начале для пропуска (опционально)
 * @returns {Array} новый массив с инвертированными элементами
 */
function inverse(array, skipCount = 0) {
    // Валидация входных параметров
    if (!Array.isArray(array)) {
        throw new Error('Первый аргумент должен быть массивом');
    }

    const skip = Math.max(0, skipCount);

    // Если skip отрицательное - сохраняем элементы в конце
    if (skipCount < 0) {
        const keepAtEnd = Math.abs(skipCount);
        const partToReverse = array.slice(0, array.length - keepAtEnd);
        const endPart = array.slice(array.length - keepAtEnd);
        return [...partToReverse.reverse(), ...endPart];
    }

    // Положительное число - пропускаем первые N элементов
    const startPart = array.slice(0, skip);
    const partToReverse = array.slice(skip);
    return [...startPart, ...partToReverse.reverse()];
}

// Примеры использования
console.log(inverse([1, 2, 3, 4, 5]));        // [5, 4, 3, 2, 1]
console.log(inverse([1, 2, 3, 4, 5], 2));     // [1, 2, 5, 4, 3]
console.log(inverse([1, 2, 3, 4, 5], -2));    // [5, 4, 3, 2, 1]
```

**Вариант 2: Расширенное решение для истории заказов**

```javascript
/**
 * Класс для управления историей заказов
 */
class OrderHistory {
    constructor(orders = []) {
        // Коллекция заказов - массив объектов
        this.orders = orders;
    }

    /**
     * Инвертирует порядок заказов
     * @param {number} keepRecent - количество последних заказов, которые остаются на месте
     * @returns {OrderHistory} новый объект с инвертированными заказами
     */
    reverse(keepRecent = 0) {
        const reversed = inverse(this.orders, keepRecent);
        return new OrderHistory(reversed);
    }

    /**
     * Получить строку с описанием истории
     * @returns {string} форматированная строка
     */
    toString() {
        return this.orders
            .map(order => `${order.id}. ${order.customer} - ${order.date} (${order.amount}₽)`)
            .join('\n');
    }

    /**
     * Получить заказ по индексу с информацией
     * @param {number} index - индекс заказа
     * @returns {Object} заказ с дополнительной информацией
     */
    getOrderInfo(index) {
        if (index < 0 || index >= this.orders.length) {
            throw new Error('Индекс заказа вне диапазона');
        }

        const order = this.orders[index];
        return {
            ...order,
            position: index + 1,
            totalOrders: this.orders.length,
            isRecent: index >= this.orders.length - 3 // последние 3 заказа
        };
    }

    /**
     * Фильтровать заказы по сумме
     * @param {number} minAmount - минимальная сумма
     * @returns {Array} отфильтрованные заказы
     */
    filterByAmount(minAmount) {
        return this.orders.filter(order => order.amount >= minAmount);
    }

    /**
     * Получить общую сумму всех заказов
     * @returns {number} сумма
     */
    getTotalAmount() {
        return this.orders.reduce((sum, order) => sum + order.amount, 0);
    }
}

// Использование
const history = new OrderHistory(orderHistory);

console.log('=== Оригинальная история ===');
console.log(history.toString());

console.log('\n=== Развернутая история (все) ===');
const reversed = history.reverse();
console.log(reversed.toString());

console.log('\n=== Развернутая история (последние 2 на месте) ===');
const reversedKeepLast = history.reverse(2);
console.log(reversedKeepLast.toString());

console.log('\n=== Заказы более 5000₽ ===');
const expensiveOrders = history.filterByAmount(5000);
console.log(expensiveOrders);

console.log('\n=== Общая сумма заказов ===');
console.log(`${history.getTotalAmount()}₽`);
```

---

## Ключевые концепции

### Коллекции (массивы и множества)

#### Массивы (Arrays)

Массив - это упорядоченная коллекция элементов.

```javascript
// Создание массива
const products = [
    { id: 1, title: 'Товар 1' },
    { id: 2, title: 'Товар 2' },
];

// Методы для работы с массивами
products.push({ id: 3, title: 'Товар 3' });     // Добавить в конец
products.pop();                                  // Удалить с конца
products.map(p => p.title);                     // Трансформировать
products.filter(p => p.id > 1);                 // Отфильтровать
products.find(p => p.id === 2);                 // Найти элемент
products.reduce((sum, p) => sum + p.id, 0);    // Свернуть в одно значение
products.some(p => p.id === 1);                 // Проверить условие
products.every(p => p.id > 0);                  // Все ли соответствуют
```

#### Множества (Sets)

Множество - это коллекция уникальных значений.

```javascript
// Создание множества
const uniqueIds = new Set();

// Методы Set
uniqueIds.add(1);
uniqueIds.add(2);
uniqueIds.add(1); // Дубликат не будет добавлен

uniqueIds.has(1);    // true
uniqueIds.size;      // 2
uniqueIds.delete(1);

// Преобразование между Array и Set
const arrayToSet = new Set([1, 2, 3, 2, 1]);        // Set(3) { 1, 2, 3 }
const setToArray = Array.from(uniqueIds);           // [1, 2]
```

### Объекты в JavaScript

Объект - это коллекция пар "ключ-значение".

```javascript
// Создание объекта
const product = {
    id: 1,
    title: 'Ноутбук',
    price: 50000,
    hasDiscount: true,
    discountPercent: 10,
};

// Доступ к свойствам
console.log(product.title);           // Dot-notation
console.log(product['price']);        // Bracket-notation

// Добавление свойств
product.inStock = true;
product['rating'] = 4.5;

// Удаление свойств
delete product.rating;

// Проверка наличия свойства
'title' in product;                   // true
product.hasOwnProperty('title');      // true

// Получение всех ключей и значений
Object.keys(product);                 // ['id', 'title', 'price', ...]
Object.values(product);               // [1, 'Ноутбук', 50000, ...]
Object.entries(product);              // [['id', 1], ['title', 'Ноутбук'], ...]
```

### Функции

#### Обычные функции (Function Declaration)

```javascript
function calculateDiscount(price, discountPercent) {
    return price * (1 - discountPercent / 100);
}

console.log(calculateDiscount(1000, 10)); // 900
```

#### Стрелочные функции (Arrow Functions)

```javascript
// Краткая форма
const add = (a, b) => a + b;

// Расширенная форма
const calculateTax = (price) => {
    const taxRate = 0.13;
    return price * taxRate;
};

// В методах массива
const prices = [100, 200, 300];
prices.map(price => price * 0.9); // Применить скидку 10%
```

#### Функции высшего порядка

```javascript
// Функция, которая возвращает другую функцию
function createMultiplier(multiplier) {
    return (number) => number * multiplier;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### Классы

Класс - это шаблон для создания объектов.

```javascript
class Product {
    // Конструктор - вызывается при создании объекта
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }

    // Методы класса
    getDiscountedPrice(percent) {
        return this.price * (1 - percent / 100);
    }

    toString() {
        return `${this.title} (${this.price}₽)`;
    }
}

// Использование класса
const laptop = new Product(1, 'Ноутбук', 50000);
console.log(laptop.toString());              // Ноутбук (50000₽)
console.log(laptop.getDiscountedPrice(10));  // 45000
```

#### Наследование классов

```javascript
class DiscountedProduct extends Product {
    constructor(id, title, price, discountPercent) {
        super(id, title, price);              // Вызов конструктора родителя
        this.discountPercent = discountPercent;
    }

    getPrice() {
        return this.getDiscountedPrice(this.discountPercent);
    }
}

const discountedLaptop = new DiscountedProduct(1, 'Ноутбук', 50000, 10);
console.log(discountedLaptop.getPrice()); // 45000
```

### Циклы с условиями

#### While цикл (проверка условия в начале)

```javascript
let index = 0;
const maxAttempts = 5;

while (index < maxAttempts) {
    console.log(`Попытка ${index + 1}`);
    index++;
}

// Цикл с условием, зависящим от значения (не счетчика)
let response = null;
while (response !== 'Y') {
    response = prompt('Продолжить? (Y/N)');
}
```

#### Do...While цикл (проверка условия в конце)

```javascript
let userInput;
do {
    userInput = prompt('Введите число > 10');
} while (userInput <= 10);

console.log('Спасибо!');
```

#### Цикл со сложным условием

```javascript
const products = [
    { id: 1, active: true },
    { id: 2, active: false },
    { id: 3, active: true },
];

let index = 0;
let foundActive = false;

// Цикл с условием (пока не найден активный товар)
while (index < products.length && !foundActive) {
    if (products[index].active) {
        console.log('Найден активный товар:', products[index].id);
        foundActive = true;
    }
    index++;
}
```

---

## Реализация в проекте

Для интеграции заданий в портал вакансий создаём файлы:

```
hw1/
├── task-2-3.js          # Задача 2.3 - Поиск макс. последовательности скидок
├── task-3-2.js          # Задача 3.2 - Инверсия истории заказов
└── example-usage.js     # Примеры использования
```

### Файл task-2-3.js

```javascript
/**
 * Задача 2.3 (уровень 2)
 * Дана строка из 0 и 1 - найти максимальную последовательность 1
 *
 * Требуемые элементы:
 * - Коллекция (Array): массив товаров
 * - Строка (String): строка скидок из '0' и '1'
 * - Объект (Object): объект результата с информацией о последовательности
 * - Цикл с условием (while): обход строки
 */

function findMaxDiscountSequence(discountString) {
    let maxLength = 0;
    let maxStartIndex = 0;
    let currentLength = 0;
    let currentStartIndex = 0;

    // Цикл с условием (не по счетчику)
    let index = 0;
    while (index < discountString.length) {
        if (discountString[index] === '1') {
            if (currentLength === 0) {
                currentStartIndex = index;
            }
            currentLength++;
        } else {
            if (currentLength > maxLength) {
                maxLength = currentLength;
                maxStartIndex = currentStartIndex;
            }
            currentLength = 0;
        }
        index++;
    }

    // Проверка последней последовательности
    if (currentLength > maxLength) {
        maxLength = currentLength;
        maxStartIndex = currentStartIndex;
    }

    // Возвращаем объект с информацией
    return {
        maxLength,
        startIndex: maxStartIndex,
        endIndex: maxStartIndex + maxLength - 1,
        isEmpty: maxLength === 0
    };
}

export { findMaxDiscountSequence };
```

### Файл task-3-2.js

```javascript
/**
 * Задача 3.2 (уровень 3)
 * Функция inverse - инвертирует массив с опциональным параметром
 *
 * Требуемые элементы:
 * - Класс (Class): OrderHistory для управления заказами
 * - Коллекция (Array): массив заказов
 * - Объект (Object): объект заказа с несколькими свойствами
 * - Функция (Function): inverse и методы класса
 * - Цикл с условием (while/do-while): обход заказов
 */

function inverse(array, skipCount = 0) {
    if (!Array.isArray(array)) {
        throw new Error('Первый аргумент должен быть массивом');
    }

    const skip = skipCount;

    if (skip < 0) {
        const keepAtEnd = Math.abs(skip);
        const partToReverse = array.slice(0, array.length - keepAtEnd);
        const endPart = array.slice(array.length - keepAtEnd);
        return [...partToReverse.reverse(), ...endPart];
    }

    if (skip > 0) {
        const startPart = array.slice(0, skip);
        const partToReverse = array.slice(skip);
        return [...startPart, ...partToReverse.reverse()];
    }

    return [...array].reverse();
}

class OrderHistory {
    constructor(orders = []) {
        this.orders = orders;
    }

    reverse(keepRecent = 0) {
        const reversed = inverse(this.orders, keepRecent);
        return new OrderHistory(reversed);
    }

    getOrderInfo(index) {
        if (index < 0 || index >= this.orders.length) {
            throw new Error('Индекс вне диапазона');
        }
        return {
            ...this.orders[index],
            position: index + 1,
            isRecent: index >= this.orders.length - 3
        };
    }

    getTotalAmount() {
        return this.orders.reduce((sum, order) => sum + order.amount, 0);
    }
}

export { inverse, OrderHistory };
```

---

## Использование Three.js

Three.js - это JavaScript библиотека для создания 3D графики в браузере. Хотя основные задачи не требуют 3D, можно использовать Three.js для визуализации данных.

### Зачем Three.js?

- 🎨 Визуализация товаров в 3D
- 📊 3D графики статистики покупок
- 🛍️ Интерактивные каталоги товаров
- 📈 Визуализация тренда скидок во времени

### Пример: Визуализация скидок в 3D

```javascript
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@r128/build/three.module.js';

// Создаем сцену
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создаем куб для каждого товара со скидкой
const geometry = new THREE.BoxGeometry();
const discountString = '11101110010';

discountString.forEach((char, index) => {
    if (char === '1') {
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Зеленый для скидки
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = index * 2;
        scene.add(cube);
    }
});

camera.position.z = 15;

// Анимация
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
```

### Структура файлов с Three.js

```
project/
├── index.html
├── main.js
├── hw1/
│   ├── task-2-3.js
│   ├── task-3-2.js
│   └── visualization.js      # Three.js визуализация
└── package.json
```

---

## Структура кода

### Рекомендуемая организация

```javascript
// 1. Импорты
import { findMaxDiscountSequence } from './task-2-3.js';
import { inverse, OrderHistory } from './task-3-2.js';

// 2. Данные
const products = [
    { id: 1, title: 'Товар 1', hasDiscount: true },
    // ...
];

const discountString = '11101110010';
const orders = [
    { id: 1, customer: 'Иван', amount: 5000 },
    // ...
];

// 3. Функции
function processProducts() {
    const result = findMaxDiscountSequence(discountString);
    console.log(result);
}

// 4. Классы
class ProductManager {
    // ...
}

// 5. Выполнение
processProducts();
const history = new OrderHistory(orders);
console.log(history.getTotalAmount());
```

---

## Дополнительные материалы

### Полезные ресурсы

| Тема | Ссылка |
|------|--------|
| MDN: Array | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array |
| MDN: Object | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object |
| MDN: Set | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set |
| MDN: Classes | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes |
| Three.js | https://threejs.org/ |
| Learn Three.js | https://threejs.org/manual/ |

### Система оценки

| Задача | Уровень | Баллы | Требования |
|--------|---------|-------|-----------|
| 2.3 | 2 | 2 | Алгоритм поиска макс. последовательности |
| 3.2 | 3 | 4 | Функция inverse + класс OrderHistory |
| **Итого** | - | **6** | - |

**Минимум для зачета:** 4 балла (можно выполнить только задачу 3.2 или обе задачи 2.3 + доп. задание)

### Требования к коду

- ✅ Использованы все обязательные элементы (цикл с условием, строка, объект, коллекция)
- ✅ Код хорошо структурирован и документирован (JSDoc комментарии)
- ✅ Переменные названы по теме (account, discount, product и т.д.)
- ✅ Обработаны граничные случаи (пустые массивы, некорректные входные данные)
- ✅ Реализована работа с ES6+ (классы, стрелочные функции, деструктуризация)

### Запуск и тестирование

```bash
# Установка зависимостей (если используется три.js из npm)
npm install three

# Запуск dev-сервера
npm run dev

# Сборка
npm run build
```

### Дополнительные задания для закрепления

Из методички для группы Б/В:

| Задание | Уровень | Баллы |
|---------|---------|-------|
| 1.2 - `countIdentic(arr)` | 1 | 1 |
| 1.8 - Среднее арифметическое | 1 | 1 |

Эти задания помогут закрепить работу с массивами и функциями.

---

**Дата завершения:** май 2026
**Статус:** ✅ Готово к выполнению
