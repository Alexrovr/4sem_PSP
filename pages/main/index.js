import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {ToastComponent} from "../../components/toast/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.visibleCards = new Set();
        this.hiddenCards = [];
        this.allData = this.getData();
        this.initializeVisibleCards();
    }

    getData() {
        return [
            {
                id: 1,
                title: "Frontend-разработчик (React)",
                salary: "от 120 000 руб.",
                company: "Техно-Инновации",
                location: "Москва",
                category: "IT",
                date: "Сегодня",
                tags: ["Удаленно", "Полный день"],
                img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80", // Код
                desc: "Разработка пользовательских интерфейсов для крупных государственных систем."
            },
            {
                id: 2,
                title: "Младший аналитик данных",
                salary: "от 80 000 руб.",
                company: "ДатаСервис",
                location: "Санкт-Петербург",
                category: "Аналитика",
                date: "Вчера",
                tags: ["Гибкий график", "Стажировка"],
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80", // Графики
                desc: "Работа с базами данных SQL и построение дашбордов в BI-системах."
            },
            {
                id: 3,
                title: "Инженер по автоматизации",
                salary: "от 150 000 руб.",
                company: "ПромТех",
                location: "Екатеринбург",
                category: "Производство",
                date: "2 дня назад",
                tags: ["Релокация", "Опыт от 3 лет"],
                img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80", // Инженерия
                desc: "Проектирование и наладка автоматизированных систем управления производством."
            }
        ];
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
            const toast = new ToastComponent(document.getElementById('toast-container'));
            toast.render("Просмотр", `Загрузка вакансии: ${item.title}`);

            const productPage = new ProductPage(this.parent, item);
            productPage.render();
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
                    </div>
                </div>
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
            </div>
        `;

        document.getElementById('add-btn').addEventListener('click', () => this.addRandomCard());
        document.getElementById('delete-btn').addEventListener('click', () => this.deleteRandomCard());

        this.allData.forEach(item => {
            this.renderCard(item);
        });
    }
}
