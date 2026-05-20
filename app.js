import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { IDBManager } from './idb.js';

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

        presetModels.forEach(model => this.createCard(model));

        const userModels = await IDBManager.getAllModels();
        userModels.forEach(model => {
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

        const currentId = modelData.id;

        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!currentId) {
                console.error("Критическая ошибка: у модели отсутствует ID!", modelData);
                return;
            }

            localStorage.setItem('selectedModelId', currentId);

            window.location.href = 'detail.html';
        });
        requestAnimationFrame(() => {
            this.renderPreview(previewContainer, modelData.files, modelData.isPair);
        });
    }

    renderPreview(container, fileUrls, isPair = false) {
        const width = container.clientWidth || 250;
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

                if (isPair && index === 1) {
                    model.position.x = 2.0;
                }

                group.add(model);
                loadedCount++;

                if (loadedCount === fileUrls.length) {
                    this.centerAndRender(group, camera, renderer, scene);
                }
            }, undefined, (err) => {
                console.error("Ошибка загрузки миниатюры:", err);
                if (!container.querySelector('.error-icon')) {
                    container.innerHTML = '<div class="error-icon">🧩</div>';
                }
            });
        });
    }

    centerAndRender(group, camera, renderer, scene) {
        const box = new THREE.Box3().setFromObject(group);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        group.position.y -= box.min.y;
        group.position.x -= center.x;
        group.position.z -= center.z;

        const maxDim = Math.max(size.x, size.y, size.z);
        const cameraDist = maxDim > 0 ? maxDim * 1.8 : 5;

        camera.position.set(cameraDist, cameraDist * 0.8, cameraDist);
        camera.lookAt(0, maxDim / 2, 0);

        renderer.render(scene, camera);

        renderer.dispose();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new GalleryApp();
    app.init();
});
