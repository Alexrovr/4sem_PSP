import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {ProductComponent} from "../../components/product/index.js";
import { api } from "../../modules/api.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, params) {
        this.parent = parent;
        this.id = params ? params.id : null;
    }

    async getData() {
        const pageRoot = document.getElementById('product-page');

        if (!this.id) {
            this.renderError(pageRoot, "Некорректный идентификатор вакансии в URL.");
            return;
        }

        try {
            const data = await api.get(stockUrls.getStockById(this.id));

            if (data && Object.keys(data).length > 0) {
                const product = new ProductComponent(pageRoot);
                product.render(data);
            } else {
                this.renderError(pageRoot, "Не удалось загрузить данные вакансии. Убедитесь, что бэкенд-сервер запущен и возвращает данные.");
            }
        } catch (error) {
            console.error("Сетевая ошибка в ProductPage:", error);
            this.renderError(pageRoot, "Ошибка соединения. Не удалось связаться с бэкенд-сервером.");
        }
    }

    renderError(container, message) {
        if (!container) return;
        container.innerHTML = `
            <div class="alert alert-danger mt-4 p-4 shadow-sm" role="alert">
                <div class="d-flex align-items-center gap-3">
                    <span class="fs-3">⚠️</span>
                    <div>
                        <h4 class="alert-heading mb-1">Ошибка загрузки</h4>
                        <p class="mb-0 text-secondary">${message}</p>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';

        const html = '<div id="product-page" class="container mt-4"></div>';
        this.parent.insertAdjacentHTML('beforeend', html);
        const pageRoot = document.getElementById('product-page');

        const backBtn = new BackButtonComponent(pageRoot);
        backBtn.render(() => {
            window.router.navigate('/');
        });

        this.getData();
    }
}
