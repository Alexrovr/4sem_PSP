# Домашнее задание 1. Часть 2. Интеграция 3D моделей с Three.js

**Автор:** Воронков Александр
**Группа:** ИУ5-42
**Вариант:** 6

## Навигация

- [Цель](#цель)
- [Описание задания](#описание-задания)
- [Three.js основы](#threejs-основы)
  - [Что такое Three.js?](#что-такое-threejs)
  - [Основные компоненты сцены](#основные-компоненты-сцены)
  - [Загрузка GLB моделей](#загрузка-glb-моделей)
- [Интеграция в проект](#интеграция-в-проект)
  - [Структура файлов](#структура-файлов)
  - [Подготовка страницы ProductPage](#подготовка-страницы-productpage)
  - [Реализация 3D просмотра](#реализация-3d-просмотра)
- [Примеры кода](#примеры-кода)
  - [Инициализация сцены](#инициализация-сцены)
  - [Загрузка модели](#загрузка-модели)
  - [Управление камерой](#управление-камерой)
- [Поиск и подготовка 3D моделей](#поиск-и-подготовка-3d-моделей)
- [Тестирование и отладка](#тестирование-и-отладка)
- [Дополнительные материалы](#дополнительные-материалы)

---

## Цель

Вторая часть домашнего задания заключается в интеграции 3D визуализации на страницу просмотра подробной информации о вакансии/услуге (страница ProductPage).

**Задача:** Добавить 3D модель (формат .glb) на страницу "Подробнее" (product/detail view), используя библиотеку **Three.js**.

**Что практикуем:**
- Работа с Three.js для создания 3D сцен в браузере
- Загрузка и отображение 3D моделей (формат GLB)
- Управление камерой и интерактивное взаимодействие с 3D объектами
- Интеграция 3D элементов в существующий веб-интерфейс
- Оптимизация производительности 3D графики

---

## Описание задания

### Основное требование

На странице ProductPage (страница подробнее для каждой вакансии/услуги) необходимо:

1. ✅ Добавить контейнер для 3D сцены
2. ✅ Загружать и отображать 3D модель в формате `.glb`
3. ✅ Реализовать интерактивное управление: вращение, приближение/отдаление
4. ✅ Модель должна быть по теме портала (рабочее место, офис, товар и т.д.)
5. ✅ Использовать одну универсальную модель для всех вакансий (или разные по теме)

### Структура страницы ProductPage

```
┌─────────────────────────────────────────┐
│         Информация о вакансии            │
│  (title, salary, description, image)    │
├──────────────────┬──────────────────────┤
│                  │                      │
│  Картинка товара │  3D модель           │
│                  │  (Three.js)          │
│                  │                      │
│                  │  - Вращение мышью    │
│                  │  - Масштабирование   │
│                  │  - Сброс позиции     │
│                  │                      │
└──────────────────┴──────────────────────┘
```

---

## Three.js основы

### Что такое Three.js?

**Three.js** - это популярная JavaScript библиотека для создания и отображения 3D графики в браузере с использованием WebGL.

#### Преимущества Three.js:

- 🎨 Простой и интуитивный API
- 📦 Встроенная поддержка загрузки различных форматов моделей (GLB, GLTF, OBJ, FBX и т.д.)
- 🎬 Поддержка анимаций и материалов
- ⚡ Хорошая производительность
- 🌍 Большое сообщество и документация

#### Когда использовать Three.js:

- 3D визуализация товаров в интернет-магазине
- Интерактивные 3D сцены и приложения
- Архитектурные визуализации
- Игры в браузере
- Симуляции и научные визуализации

### Основные компоненты сцены

Любая 3D сцена в Three.js состоит из нескольких элементов:

```javascript
// 1. Сцена (Scene) - контейнер для всех 3D объектов
const scene = new THREE.Scene();

// 2. Камера (Camera) - "глаз" наблюдателя
const camera = new THREE.PerspectiveCamera(
    75,                              // field of view (FOV)
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1,                             // near plane
    1000                             // far plane
);
camera.position.z = 5;

// 3. Рендерер (Renderer) - отрисовывает сцену
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Объекты (Objects) - геометрия + материал
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 5. Освещение (Lighting)
const light = new THREE.PointLight(0xffffff);
light.position.set(10, 10, 10);
scene.add(light);

// 6. Анимация (Animation Loop)
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
```

### Загрузка GLB моделей

GLB (Graphics Language Transmission Format Binary) - это бинарный формат для хранения 3D моделей с текстурами и анимациями.

#### Процесс загрузки:

1. **Импортируем GLTFLoader** - специальный загрузчик для GLTF/GLB файлов
2. **Создаем экземпляр загрузчика**
3. **Загружаем модель асинхронно**
4. **Добавляем модель в сцену**
5. **Масштабируем и позиционируем** по необходимости

```javascript
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@r128/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@r128/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

// Загружаем модель
loader.load(
    'models/office.glb',                    // Путь к модели
    (gltf) => {
        // Успешно загружено
        const model = gltf.scene;

        // Масштабируем и позиционируем
        model.scale.set(2, 2, 2);
        model.position.y = -1;

        scene.add(model);
    },
    (progress) => {
        // Прогресс загрузки
        console.log((progress.loaded / progress.total * 100) + '% loaded');
    },
    (error) => {
        // Обработка ошибки
        console.error('Error loading model:', error);
    }
);
```

---

## Интеграция в проект

### Структура файлов

```
4sem_PSP/
├── index.html
├── main.js
├── package.json
├── components/
├── modules/
├── pages/
│   ├── product/
│   │   └── index.js          # Страница ProductPage
│   └── ...
├── public/
│   └── models/               # 📁 НОВАЯ ПАПКА для 3D моделей
│       ├── office.glb        # Модель рабочего места
│       ├── desk.glb          # Модель стола
│       └── workspace.glb     # Модель офиса
└── ...
```

### Подготовка страницы ProductPage

#### HTML структура

Добавляем контейнер для 3D сцены в компоненту ProductPage:

```html
<div class="product-container">
    <div class="product-info">
        <img src="..." alt="Превью">
        <h2>Название вакансии</h2>
        <p>Описание...</p>
    </div>

    <!-- 🆕 Контейнер для 3D модели -->
    <div class="product-3d-viewer">
        <div id="canvas-container" class="canvas-3d"></div>
        <div class="controls">
            <button id="reset-view">🔄 Сбросить вид</button>
            <button id="zoom-in">🔍+ Увеличить</button>
            <button id="zoom-out">🔍- Уменьшить</button>
        </div>
        <div id="loading" class="loading">Загрузка 3D модели...</div>
    </div>
</div>
```

#### CSS стили

```css
.product-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 2rem;
}

.product-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.product-3d-viewer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: #f0f0f0;
    border-radius: 8px;
    padding: 1rem;
}

.canvas-3d {
    width: 100%;
    height: 400px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    position: relative;
}

.controls {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

.controls button {
    padding: 0.5rem 1rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
}

.controls button:hover {
    background: #764ba2;
}

.loading {
    text-align: center;
    padding: 2rem;
    color: #666;
}

@media (max-width: 768px) {
    .product-container {
        grid-template-columns: 1fr;
    }

    .canvas-3d {
        height: 300px;
    }
}
```

### Реализация 3D просмотра

Создаем модуль для управления 3D сценой:

```javascript
// modules/viewer3d.js

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@r128/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@r128/examples/jsm/loaders/GLTFLoader.js';

export class Viewer3D {
    constructor(containerElement, modelPath) {
        this.container = containerElement;
        this.modelPath = modelPath;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.model = null;
        this.controls = {};

        this.init();
    }

    init() {
        // Получаем размеры контейнера
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        // 1. Создаем сцену
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);

        // 2. Создаем камеру
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 5);

        // 3. Создаем рендерер
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // 4. Добавляем освещение
        this.setupLighting();

        // 5. Загружаем модель
        this.loadModel();

        // 6. Обработчики событий
        this.setupEventListeners();

        // 7. Запускаем анимацию
        this.animate();
    }

    setupLighting() {
        // Окружающее освещение
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Направленный свет
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 10);
        this.scene.add(directionalLight);

        // Точечный свет
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(-10, 10, 5);
        this.scene.add(pointLight);
    }

    loadModel() {
        const loader = new GLTFLoader();

        loader.load(
            this.modelPath,
            (gltf) => {
                this.model = gltf.scene;

                // Масштабируем модель
                this.model.scale.set(2, 2, 2);

                // Центрируем модель
                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());
                this.model.position.sub(center);
                this.model.position.y = box.getSize(new THREE.Vector3()).y / 2;

                this.scene.add(this.model);

                // Скрываем индикатор загрузки
                const loadingElement = this.container.nextElementSibling;
                if (loadingElement && loadingElement.classList.contains('loading')) {
                    loadingElement.style.display = 'none';
                }
            },
            (progress) => {
                const percent = (progress.loaded / progress.total * 100).toFixed(0);
                console.log(`Loading: ${percent}%`);
            },
            (error) => {
                console.error('Ошибка загрузки модели:', error);
                if (this.container.nextElementSibling) {
                    this.container.nextElementSibling.textContent = 'Ошибка загрузки 3D модели';
                }
            }
        );
    }

    setupEventListeners() {
        // Вращение мышью
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        this.renderer.domElement.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        this.renderer.domElement.addEventListener('mousemove', (e) => {
            if (isDragging && this.model) {
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;

                this.model.rotation.y += deltaX * 0.01;
                this.model.rotation.x += deltaY * 0.01;

                previousMousePosition = { x: e.clientX, y: e.clientY };
            }
        });

        this.renderer.domElement.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Колесо мыши для зума
        this.renderer.domElement.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomSpeed = 0.1;
            if (e.deltaY > 0) {
                this.camera.position.z += zoomSpeed;
            } else {
                this.camera.position.z = Math.max(2, this.camera.position.z - zoomSpeed);
            }
        });
    }

    resetView() {
        if (this.model) {
            this.model.rotation.set(0, 0, 0);
            this.camera.position.set(0, 0, 5);
        }
    }

    zoomIn() {
        this.camera.position.z = Math.max(2, this.camera.position.z - 0.5);
    }

    zoomOut() {
        this.camera.position.z += 0.5;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Небольшое автоматическое вращение
        if (this.model) {
            this.model.rotation.y += 0.001;
        }

        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

    dispose() {
        this.renderer.dispose();
        this.container.removeChild(this.renderer.domElement);
    }
}
```

---

## Примеры кода

### Инициализация сцены

```javascript
// pages/product/index.js

import { Viewer3D } from '../../modules/viewer3d.js';

export class ProductPage {
    constructor(element, product) {
        this.element = element;
        this.product = product;
        this.viewer3d = null;
    }

    render() {
        const html = `
            <div class="product-container">
                <div class="product-info">
                    <img src="${this.product.img}" alt="${this.product.title}">
                    <h2>${this.product.title}</h2>
                    <p class="salary">${this.product.salary}</p>
                    <p class="description">${this.product.desc}</p>
                    <button class="btn-apply">Откликнуться</button>
                </div>

                <div class="product-3d-viewer">
                    <div id="canvas-container" class="canvas-3d"></div>
                    <div class="controls">
                        <button id="reset-view">🔄 Сбросить</button>
                        <button id="zoom-in">🔍+</button>
                        <button id="zoom-out">🔍-</button>
                    </div>
                    <div id="loading" class="loading">Загрузка 3D модели...</div>
                </div>
            </div>
        `;

        this.element.innerHTML = html;

        // Инициализируем 3D просмотр
        this.init3dViewer();
    }

    init3dViewer() {
        const canvasContainer = this.element.querySelector('#canvas-container');
        const modelPath = './models/office.glb'; // Путь к модели

        this.viewer3d = new Viewer3D(canvasContainer, modelPath);

        // Кнопки управления
        this.element.querySelector('#reset-view').addEventListener('click', () => {
            this.viewer3d.resetView();
        });

        this.element.querySelector('#zoom-in').addEventListener('click', () => {
            this.viewer3d.zoomIn();
        });

        this.element.querySelector('#zoom-out').addEventListener('click', () => {
            this.viewer3d.zoomOut();
        });

        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            this.viewer3d.resize();
        });
    }

    destroy() {
        if (this.viewer3d) {
            this.viewer3d.dispose();
        }
    }
}
```

### Загрузка модели

```javascript
// Простой пример загрузки одной модели для всех товаров
const modelUrls = {
    default: './models/office.glb',
    alternate: './models/workspace.glb'
};

function getModelForProduct(product) {
    // Можно выбирать модель в зависимости от категории товара
    if (product.category === 'IT') {
        return modelUrls.default;
    }
    return modelUrls.alternate;
}
```

### Управление камерой

```javascript
class CameraController {
    constructor(camera) {
        this.camera = camera;
        this.defaultPosition = { x: 0, y: 0, z: 5 };
    }

    lookAt(target) {
        this.camera.lookAt(target);
    }

    resetPosition() {
        this.camera.position.copy(this.defaultPosition);
    }

    orbit(deltaX, deltaY) {
        // Реализация орбитального движения
        const spherical = new THREE.Spherical().setFromVector3(this.camera.position);
        spherical.theta -= deltaX * 0.01;
        spherical.phi -= deltaY * 0.01;
        spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
        this.camera.position.setFromSpherical(spherical);
    }
}
```

---

## Поиск и подготовка 3D моделей

### Где найти готовые GLB модели?

#### Бесплатные ресурсы с GLB моделями:

1. **Poly Haven** (https://polyhaven.com/models)
   - Бесплатные высококачественные модели
   - Все модели CC0 (можно использовать в коммерческих проектах)

2. **Sketchfab** (https://sketchfab.com)
   - Огромная библиотека моделей
   - Фильтр по лицензии и формату
   - Поиск по ключевым словам

3. **Poly Pizza** (https://poly.pizza)
   - Специализированная поисковая система для GLB моделей
   - Быстрая загрузка и предпросмотр

4. **TurboSquid** (https://www.turbosquid.com)
   - Профессиональные модели
   - Как платные, так и бесплатные варианты

#### Рекомендуемые модели для портала вакансий:

- 🏢 **Office/Workspace** - офисное помещение или рабочее место
- 💼 **Desk** - рабочий стол
- 💻 **Computer** - компьютер или ноутбук
- 📦 **Box/Package** - коробка или товар
- 🏪 **Store** - магазин или витрина

### Подготовка модели

#### Оптимизация GLB файла:

1. **Размер файла**
   - Идеально: 5-10 MB (для веб-приложения)
   - Максимум: 20 MB
   - Способы снижения: уменьшение полигонов, сжатие текстур

2. **Масштабирование**
   - Убедитесь, что модель имеет разумные размеры
   - Используйте инструменты типа Blender для нормализации

3. **Текстуры**
   - Убедитесь, что текстуры встроены в файл (.glb формат)
   - Проверьте, что пути к текстурам корректны

#### Инструменты для работы с моделями:

- **Blender** (бесплатно) - редактирование, оптимизация, экспорт
- **Three.js Editor** (веб-инструмент) - быстрая проверка модели
- **gltf-transform** (CLI) - оптимизация GLB файлов

---

## Тестирование и отладка

### Проверка загрузки модели

```javascript
// Добавить в консоль логирования
loader.load(
    modelPath,
    (gltf) => {
        console.log('✅ Модель успешно загружена');
        console.log('Scene:', gltf.scene);
        console.log('Animations:', gltf.animations);
    },
    (progress) => {
        console.log(`📊 Загружено: ${(progress.loaded / progress.total * 100).toFixed(0)}%`);
    },
    (error) => {
        console.error('❌ Ошибка загрузки:', error);
    }
);
```

### Частые проблемы и решения

| Проблема | Решение |
|----------|---------|
| Модель не видна | Проверьте позицию камеры и масштаб модели |
| Модель черная | Добавьте освещение в сцену |
| Медленная загрузка | Оптимизируйте GLB файл, используйте сжатие |
| Модель неправильно ориентирована | Используйте Blender для коррекции ориентации |
| CORS ошибка при загрузке | Убедитесь, что сервер настроен правильно |

### Отладка в браузере

```javascript
// Вывести информацию об объекте
console.log('Object properties:');
console.log('- Position:', model.position);
console.log('- Rotation:', model.rotation);
console.log('- Scale:', model.scale);
console.log('- BoundingBox:', new THREE.Box3().setFromObject(model));
```

---

## Дополнительные материалы

### Полезные ресурсы

| Ресурс | Ссылка |
|--------|--------|
| Three.js Документация | https://threejs.org/docs/ |
| Three.js Примеры | https://threejs.org/examples/ |
| GLTF Формат | https://www.khronos.org/gltf/ |
| GLTFLoader API | https://threejs.org/docs/#examples/en/loaders/GLTFLoader |
| Poly Haven Модели | https://polyhaven.com/models |
| Sketchfab Поиск | https://sketchfab.com/search?q=office&type=models |

### Следующие шаги

После завершения этого задания вы сможете:

1. ✅ Интегрировать 3D объекты в веб-приложения
2. ✅ Управлять 3D сценами и камерами
3. ✅ Работать с различными форматами 3D моделей
4. ✅ Оптимизировать 3D графику для веб
5. ✅ Создавать интерактивные 3D пользовательские интерфейсы

### Рекомендованное расширение функционала

После базовой реализации можно добавить:

- 🎨 **Изменение материалов** - выбор цвета/текстуры
- 🎬 **Анимации** - проигрывание встроенных анимаций модели
- 📸 **Скриншоты** - сохранение снимков 3D вида
- 🎯 **Разные модели** - по категориям товаров
- 🔦 **Управление светом** - изменение освещения сцены
- ⚙️ **Параметры качества** - выбор разрешения рендера

---

**Статус:** ✅ Готово к выполнению
