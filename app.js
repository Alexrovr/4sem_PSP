import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { IDBManager } from './idb.js';

// Предустановленные статические модели (включая парные)
const presetModels = [
    { id: 'p1', name: 'Машина', files: ['./models/car.glb'] },
    { id: 'p2', name: 'Дерево 1', files: ['./models/tree1.glb'] },
    { id: 'p3', name: 'Дерево 2', files: ['./models/tree2.glb'] },
    { id: 'p4', name: 'Машина + Дерево', files: ['./models/car.glb', './models/tree.glb'], isPair: true }
];

class GalleryApp {
    constructor() {
        this.grid = document.getElementById('gallery-grid');
        this.uploadForm = document.getElementById('upload-form');
        this.fileInput = document.getElementById('file-input');
        this.loader = new GLTFLoader();
    }

    async init() {
        this.uploadForm.addEventListener('submit', (e) => this.handleUpload(e));
        await this.renderGallery();
    }

    async handleUpload(e) {
        e.preventDefault();
        const file = this.fileInput.files[0];
        if (!file) return;

        await IDBManager.saveModel(file.name, file);
        this.fileInput.value = '';
        await this.renderGallery();
    }

    async renderGallery() {
        this.grid.innerHTML = '';

        // Отрендерить предустановленные
        presetModels.forEach(model => this.createCard(model));

        // Отрендерить загруженные из IndexedDB
        const userModels = await IDBManager.getAllModels();
        userModels.forEach(model => {
            // Создаем временную URL ссылку на Blob объект для GLTFLoader
            const fileUrl = URL.createObjectURL(model.blob);
            this.createCard({ id: `u_${model.id}`, name: model.name, files: [fileUrl] });
        });
    }

    createCard(modelData) {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h3');
        title.textContent = modelData.name;

        const previewContainer = document.createElement('div');
        previewContainer.className = 'preview-container';

        card.appendChild(previewContainer);
        card.appendChild(title);
        this.grid.appendChild(card);

        // Клик переводит на страницу деталей
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                window.location.href = `detail.html?id=${modelData.id}`;
            }
        });

        // Запуск Single Frame рендеринга для карточки
        this.renderPreview(previewContainer, modelData.files, modelData.isPair);
    }

    renderPreview(container, fileUrls, isPair = false) {
        const width = container.clientWidth || 220;
        const height = 180;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf5f5f5);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(4, 4, 6);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        // Освещение
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);

        const group = new THREE.Group();
        scene.add(group);

        let loadedCount = 0;

        fileUrls.forEach((url, index) => {
            this.loader.load(url, (gltf) => {
                const model = gltf.scene;

                // Если это парная модель — делаем отступ для второго объекта
                if (isPair && index === 1) {
                    model.position.x = 2.0;
                }

                group.add(model);
                loadedCount++;

                // Когда все файлы для этой карточки загружены — центрируем камеру и делаем Single Frame рендер
                if (loadedCount === fileUrls.length) {
                    this.centerAndRender(group, camera, renderer, scene);
                }
            }, undefined, (err) => {
                console.error("Ошибка загрузки миниатюры:", err);
                container.innerHTML = '<div class="error-icon">🧩</div>';
            });
        });
    }

    centerAndRender(group, camera, renderer, scene) {
        const box = new THREE.Box3().setFromObject(group);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Центрирование по виртуальному полу (на уровень Y = 0)
        group.position.y -= box.min.y;
        group.position.x -= center.x;
        group.position.z -= center.z;

        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.set(maxDim * 1.5, maxDim * 1.2, maxDim * 1.5);
        camera.lookAt(0, maxDim / 2, 0);

        // Single Frame рендеринг — рендерим только один раз! Контролы отсутствуют.
        renderer.render(scene, camera);

        // Очищаем WebGL контекст из активной памяти анимаций
        renderer.dispose();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new GalleryApp();
    app.init();
});
