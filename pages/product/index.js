// import {BackButtonComponent} from "../../components/back-button/index.js";
// import {MainPage} from "../main/index.js";
// import {ProductComponent} from "../../components/product/index.js";
// import { ajax } from "../../modules/ajax.js";
// import { stockUrls } from "../../modules/stockUrls.js";

// export class ProductPage {
//     constructor(parent, id) {
//         this.parent = parent;
//         // this.data = data;
//         this.id = id;
//     }

//     getData() {
//         // Запрашиваем конкретный элемент по ID
//         ajax.get(stockUrls.getStockById(this.id), (data) => {
//             if (data) {
//                 this.renderData(data);
//             }
//         });
//     }

//     renderData(item) {
//         const productRoot = document.getElementById('product-page-root');
//         // Отрисовка детальной информации (название, картинка, описание)
//         productRoot.innerHTML = `
//             <h1>${item.title}</h1>
//             <img src="${item.src}" alt="${item.title}">
//             <p>${item.text}</p>
//         `;
//     }

//     render() {
//         this.parent.innerHTML = '';

//         const html = '<div id="product-page" class="container mt-4"></div>';
//         this.parent.insertAdjacentHTML('beforeend', html);
//         const pageRoot = document.getElementById('product-page');

//         const product = new ProductComponent(pageRoot);
//         product.render(this.data);

//         const backBtn = new BackButtonComponent(pageRoot);
//         backBtn.render(() => {
//             const mainPage = new MainPage(this.parent);
//             mainPage.render();
//         });
//     }
// }
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {ProductComponent} from "../../components/product/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    // Изменено: получаем данные по ID, а затем передаем их в твой ProductComponent
    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            if (data) {
                const pageRoot = document.getElementById('product-page');

                // Используем твой стандартный компонент для отрисовки, передавая данные из API
                const product = new ProductComponent(pageRoot);
                product.render(data);
            }
        });
    }

    render() {
        this.parent.innerHTML = '';

        const html = '<div id="product-page" class="container mt-4"></div>';
        this.parent.insertAdjacentHTML('beforeend', html);
        const pageRoot = document.getElementById('product-page');

        // Кнопка назад создается сразу
        const backBtn = new BackButtonComponent(pageRoot);
        backBtn.render(() => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });

        // Запрашиваем данные вакансии с сервера
        this.getData();
    }
}
