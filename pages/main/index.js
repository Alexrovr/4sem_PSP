// import {ProductCardComponent} from "../../components/product-card/index.js";
// import {ProductPage} from "../product/index.js";
// import {ToastComponent} from "../../components/toast/index.js";

// export class MainPage {
//     constructor(parent) {
//         this.parent = parent;
//     }

//     getData() {
//         return [
//             {id: 1, ticker: "AAPL", name: "Apple Inc.", price: "$180", desc: "Технологический гигант"},
//             {id: 2, ticker: "TSLA", name: "Tesla", price: "$240", desc: "Электромобили и энергия"},
//             {id: 3, ticker: "BTC", name: "Bitcoin", price: "$65,000", desc: "Цифровое золото"}
//         ];
//     }

//     render() {
//         this.parent.innerHTML = '<div id="main-page" class="d-flex flex-wrap"></div>';
//         const container = document.getElementById('main-page');

//         this.getData().forEach(item => {
//             const card = new ProductCardComponent(container);
//             card.render(item, () => {
//                 const toast = new ToastComponent(document.getElementById('toast-container'));
//                 toast.render("Переход", `Открываем акции ${item.ticker}`);

//                 const productPage = new ProductPage(this.parent, item);
//                 productPage.render();
//             });
//         });
//     }
// }


import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {ToastComponent} from "../../components/toast/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
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
                tags: ["Удаленно", "Полный день", "ДМС"],
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
                tags: ["Гибкий график", "Обучение", "Стажировка"],
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
                desc: "Проектирование и наладка автоматизированных систем управления производством."
            }
        ];
    }

    render() {
        this.parent.innerHTML = '<div class="container"><h2 class="mb-4 mt-3">Поиск вакансий</h2><div id="main-page" class="d-flex flex-wrap justify-content-center"></div></div>';
        const container = document.getElementById('main-page');

        this.getData().forEach(item => {
            const card = new ProductCardComponent(container);
            card.render(item, () => {
                const toast = new ToastComponent(document.getElementById('toast-container'));
                toast.render("Просмотр", `Загрузка вакансии: ${item.title}`);

                const productPage = new ProductPage(this.parent, item);
                productPage.render();
            });
        });
    }
}
