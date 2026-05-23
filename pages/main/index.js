import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {ToastComponent} from "../../components/toast/index.js";
import { api } from "../../modules/api.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { CreatePage } from "../create/index.js";
import { Router } from "../../modules/router.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.visibleCards = new Set();
        this.hiddenCards = [];
        this.allData = [];
    }

    async getData() {
        const container = document.getElementById('main-page');

        try {
            const data = await api.get(stockUrls.getStocks());

            if (data && Array.from(data).length > 0) {
                this.allData = data;
                this.initializeVisibleCards();
                this.allData.forEach(item => {
                    this.renderCard(item);
                });
            } else {
                this.renderError(container, "Список вакансий пуст.");
            }
        } catch (error) {
            console.error("Сетевая ошибка на главной странице:", error);
            this.renderError(container, "Не удалось подключиться к серверу. Убедитесь, что бэкенд-сервер запущен и доступен (например, json-server).");

            const toast = new ToastComponent(document.getElementById('toast-container'));
            toast.render("Ошибка сети", "Сервер не отвечает");
        }
    }

    renderError(container, message) {
        if (!container) return;
        container.innerHTML = `
            <div class="alert alert-danger w-100 mt-3 p-4 shadow-sm" role="alert">
                <div class="d-flex align-items-center gap-3">
                    <span class="fs-2">⚠️</span>
                    <div>
                        <h4 class="alert-heading mb-1">Ошибка получения данных</h4>
                        <p class="mb-0 text-secondary">${message}</p>
                    </div>
                </div>
            </div>
        `;
    }

    initializeVisibleCards() {
        this.allData.forEach(item => {
            this.visibleCards.add(item.id);
        });
    }

    deleteRandomCard() {
        const visibleArray = Array.from(this.visibleCards);
        if (visibleArray.length === 0) {
            const toast = new ToastComponent(document.getElementById('toast-container'));
            toast.render("Ошибка", "Нет видимых карточек для удаления");
            return;
        }

        const randomIndex = Math.floor(Math.random() * visibleArray.length);
        const cardId = visibleArray[randomIndex];

        this.visibleCards.delete(cardId);
        this.hiddenCards.push(cardId);

        const cardElement = document.getElementById(`card-wrapper-${cardId}`);
        if (cardElement) {
            cardElement.style.display = 'none';
        }

        const toast = new ToastComponent(document.getElementById('toast-container'));
        const card = this.allData.find(item => item.id === cardId);
        toast.render("Удалено", `Карточка "${card.title}" скрыта`);
    }

    addRandomCard() {
        if (this.hiddenCards.length === 0) {
            const toast = new ToastComponent(document.getElementById('toast-container'));
            toast.render("Ошибка", "Нет скрытых карточек для добавления");
            return;
        }

        const randomIndex = Math.floor(Math.random() * this.hiddenCards.length);
        const cardId = this.hiddenCards.splice(randomIndex, 1)[0];

        this.visibleCards.add(cardId);

        const cardElement = document.getElementById(`card-wrapper-${cardId}`);
        if (cardElement) {
            cardElement.style.display = 'block';
        }

        const toast = new ToastComponent(document.getElementById('toast-container'));
        const card = this.allData.find(item => item.id === cardId);
        toast.render("Добавлено", `Карточка "${card.title}" показана`);
    }

    renderCard(item) {
        const container = document.getElementById('main-page');
        const wrapper = document.createElement('div');
        wrapper.id = `card-wrapper-${item.id}`;
        wrapper.style.display = this.visibleCards.has(item.id) ? 'block' : 'none';
        container.appendChild(wrapper);

        const card = new ProductCardComponent(wrapper);
        card.render(item, () => {
            window.router.navigate(`/vacancy/${item.id}`);
        });
    }

    render() {
        this.parent.innerHTML = `
            <div class="container">
                <div class="d-flex justify-content-between align-items-center mb-4 mt-3">
                    <h2 class="mb-0">Поиск вакансий</h2>
                    <div class="gap-2">
                        <button class="btn btn-success me-2" id="add-btn">+ Добавить</button>
                        <button class="btn btn-danger" id="delete-btn">- Удалить</button>
                        <button class="btn btn-primary" id="create-btn">Создать</button>
                    </div>
                </div>
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
            </div>
        `;

        document.getElementById('add-btn').addEventListener('click', () => this.addRandomCard());
        document.getElementById('create-btn').addEventListener('click', () => {
            window.router.navigate('/create');
        });
        document.getElementById('delete-btn').addEventListener('click', () => this.deleteRandomCard());

        this.getData();
    }
}
