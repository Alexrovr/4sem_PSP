// import {ProductCardComponent} from "../../components/product-card/index.js";
// import {ProductPage} from "../product/index.js";
// import {ToastComponent} from "../../components/toast/index.js";
// import { ajax } from "../../modules/ajax.js";
// import { stockUrls } from "../../modules/stockUrls.js";

// export class MainPage {
//     // constructor(parent) {
//     //     this.parent = parent;
//     //     this.visibleCards = new Set();
//     //     this.hiddenCards = [];
//     //     this.allData = this.getData();
//     //     this.initializeVisibleCards();
//     // }
//     constructor(parent) {
//         this.parent = parent;
//         this.allData = []; // Теперь данные приходят с сервера
//     }

//     getData() {
//         ajax.get(stockUrls.getStocks(), (data) => {
//             if (data) {
//                 this.allData = data;
//                 this.renderData();
//             } else {
//                 const toast = new ToastComponent(document.getElementById('toast-container'));
//                 toast.render("Ошибка", "Не удалось загрузить данные с сервера");
//             }
//         });
//     }

//     initializeVisibleCards() {
//         this.allData.forEach(item => {
//             this.visibleCards.add(item.id);
//         });
//     }

//     deleteRandomCard() {
//         const visibleArray = Array.from(this.visibleCards);
//         if (visibleArray.length === 0) {
//             const toast = new ToastComponent(document.getElementById('toast-container'));
//             toast.render("Ошибка", "Нет видимых карточек для удаления");
//             return;
//         }

//         const randomIndex = Math.floor(Math.random() * visibleArray.length);
//         const cardId = visibleArray[randomIndex];

//         this.visibleCards.delete(cardId);
//         this.hiddenCards.push(cardId);

//         const cardElement = document.getElementById(`card-wrapper-${cardId}`);
//         if (cardElement) {
//             cardElement.style.display = 'none';
//         }

//         const toast = new ToastComponent(document.getElementById('toast-container'));
//         const card = this.allData.find(item => item.id === cardId);
//         toast.render("Удалено", `Карточка "${card.title}" скрыта`);
//     }

//     addRandomCard() {
//         if (this.hiddenCards.length === 0) {
//             const toast = new ToastComponent(document.getElementById('toast-container'));
//             toast.render("Ошибка", "Нет скрытых карточек для добавления");
//             return;
//         }

//         const randomIndex = Math.floor(Math.random() * this.hiddenCards.length);
//         const cardId = this.hiddenCards.splice(randomIndex, 1)[0];

//         this.visibleCards.add(cardId);

//         const cardElement = document.getElementById(`card-wrapper-${cardId}`);
//         if (cardElement) {
//             cardElement.style.display = 'block';
//         }

//         const toast = new ToastComponent(document.getElementById('toast-container'));
//         const card = this.allData.find(item => item.id === cardId);
//         toast.render("Добавлено", `Карточка "${card.title}" показана`);
//     }

//     renderCard(item) {
//         const container = document.getElementById('main-page');
//         const wrapper = document.createElement('div');
//         wrapper.id = `card-wrapper-${item.id}`;
//         wrapper.style.display = this.visibleCards.has(item.id) ? 'block' : 'none';
//         container.appendChild(wrapper);

//         const card = new ProductCardComponent(wrapper);
//         card.render(item, () => {
//             const toast = new ToastComponent(document.getElementById('toast-container'));
//             toast.render("Просмотр", `Загрузка вакансии: ${item.title}`);

//             const productPage = new ProductPage(this.parent, item);
//             productPage.render();
//         });
//     }

//     render() {
//         this.parent.innerHTML = `
//             <div class="container">
//                 <div class="d-flex justify-content-between align-items-center mb-4 mt-3">
//                     <h2 class="mb-0">Поиск вакансий</h2>
//                     <div class="gap-2">
//                         <button class="btn btn-success me-2" id="add-btn">+ Добавить</button>
//                         <button class="btn btn-danger" id="delete-btn">- Удалить</button>
//                     </div>
//                 </div>
//                 <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
//             </div>
//         `;

//         document.getElementById('add-btn').addEventListener('click', () => this.addRandomCard());
//         document.getElementById('delete-btn').addEventListener('click', () => this.deleteRandomCard());

//         this.allData.forEach(item => {
//             this.renderCard(item);
//         });
//     }
// }

import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {ToastComponent} from "../../components/toast/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { CreatePage } from "../create/index.js"; // Добавь этот импорт к остальным

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.visibleCards = new Set();
        this.hiddenCards = [];
        this.allData = []; // Данные изначально пустые, придут с сервера
    }

    // Изменено: получаем данные по API и только потом инициализируем логику карточек
    getData() {
        ajax.get(stockUrls.getStocks(), (data) => {
            if (data) {
                this.allData = data;

                // Инициализируем списки видимых карточек на основе пришедших данных
                this.initializeVisibleCards();

                // Отрисовываем карточки в контейнер
                this.allData.forEach(item => {
                    this.renderCard(item);
                });
            } else {
                const toast = new ToastComponent(document.getElementById('toast-container'));
                toast.render("Ошибка", "Не удалось загрузить данные с сервера");
            }
        });
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

            // Изменено: Передаем только id вакансии на страницу продукта, как требует лаба
            const productPage = new ProductPage(this.parent, item.id);
            productPage.render();
        });
    }

    render() {
        // Вид, структура и классы кнопок полностью сохранены
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
            const createPage = new CreatePage(this.parent);
            createPage.render();
        });
        document.getElementById('delete-btn').addEventListener('click', () => this.deleteRandomCard());

        // Запускаем асинхронную загрузку данных
        this.getData();
    }
}
