import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IDBManager } from './idb.js';

class DetailApp {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.titleElement = document.getElementById('model-title');
        this.loader = new GLTFLoader();

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.modelGroup = null;
        this.modelSize = 5; // Дефолтный радиус для настройки ракурсов
    }

    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const modelId = urlParams.get('id');
        if (!modelId) {
            window.location.href = 'index.html';
            return;
        }

        this.initThree();
        await this.loadModelData(modelId);
        this.setupEvents();
        this.animate();
    }

    initThree() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xeeeeee);

        this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);

        // Вращение мышью
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        // Свет
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.9));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(10, 20, 15);
        this.scene.add(dirLight);

        // Сетка пола для ориентации в пространстве
        const gridHelper = new THREE.GridHelper(60, 60);
        this.scene.add(gridHelper);

        this.modelGroup = new THREE.Group();
        this.scene.add(this.modelGroup);
    }

    async loadModelData(id) {
        // Проверяем: предустановленная или пользовательская модель
        if (id.startsWith('u_')) {
            const realId = id.split('_')[1];
            const userModel = await IDBManager.getModelById(realId);
            if (userModel) {
                this.titleElement.textContent = userModel.name;
                const url = URL.createObjectURL(userModel.blob);
                this.loadGLB([url]);
            }
        } else {
            const presetModels = [
                { id: 'p1', name: 'Машина', files: ['./models/car.glb'] },
                { id: 'p2', name: 'Дерево 1', files: ['./models/tree1.glb'] },
                { id: 'p3', name: 'Дерево 2', files: ['./models/tree2.glb'] },
                { id: 'p4', name: 'Машина + Дерево', files: ['./models/car.glb', './models/tree.glb'], isPair: true }
            ];
            const preset = presetModels.find(m => m.id === id);
            if (preset) {
                this.titleElement.textContent = preset.name;
                this.loadGLB(preset.files, preset.isPair);
            }
        }
    }

    loadGLB(fileUrls, isPair = false) {
        let loadedCount = 0;

        fileUrls.forEach((url, index) => {
            this.loader.load(url, (gltf) => {
                const model = gltf.scene;
                if (isPair && index === 1) {
                    model.position.x = 3.0; // Отступ для второго объекта пары
                }
                this.modelGroup.add(model);
                loadedCount++;

                if (loadedCount === fileUrls.length) {
                    this.centerModel();
                }
            });
        });
    }

    centerModel() {
        const box = new THREE.Box3().setFromObject(this.modelGroup);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Ровно поднимаем основание модели на виртуальный пол (Y = 0)
        this.modelGroup.position.y -= box.min.y;
        this.modelGroup.position.x -= center.x;
        this.modelGroup.position.z -= center.z;

        this.modelSize = Math.max(size.x, size.y, size.z);

        // Базовый ракурс камеры
        this.changeView('front');
    }

    setupEvents() {
        document.getElementById('back-btn').addEventListener('click', () => window.location.href = 'index.html');

        // Зум кнопки
        document.getElementById('zoom-in').addEventListener('click', () => this.zoom(0.8));
        document.getElementById('zoom-out').addEventListener('click', () => this.zoom(1.2));

        // Ракурсы
        document.getElementById('view-front').addEventListener('click', () => this.changeView('front'));
        document.getElementById('view-back').addEventListener('click', () => this.changeView('back'));
        document.getElementById('view-left').addEventListener('click', () => this.changeView('left'));
        document.getElementById('view-right').addEventListener('click', () => this.changeView('right'));

        window.addEventListener('resize', () => {
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        });
    }

    zoom(factor) {
        const distance = this.camera.position.distanceTo(this.controls.target);
        this.camera.position.sub(this.controls.target).normalize().multiplyScalar(distance * factor).add(this.controls.target);
        this.controls.update();
    }

    changeView(side) {
        const distance = this.modelSize * 1.8;
        const targetY = this.modelSize / 2;
        this.controls.target.set(0, targetY, 0);

        switch (side) {
            case 'front':
                this.camera.position.set(0, targetY + this.modelSize * 0.3, distance);
                break;
            case 'back':
                this.camera.position.set(0, targetY + this.modelSize * 0.3, -distance);
                break;
            case 'left':
                this.camera.position.set(-distance, targetY + this.modelSize * 0.3, 0);
                break;
            case 'right':
                this.camera.position.set(distance, targetY + this.modelSize * 0.3, 0);
                break;
        }
        this.controls.update();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new DetailApp();
    app.init();
});
