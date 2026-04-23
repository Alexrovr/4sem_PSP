import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {ProductComponent} from "../../components/product/index.js";

export class ProductPage {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
    }

    render() {
        this.parent.innerHTML = '';

        const html = '<div id="product-page" class="container mt-4"></div>';
        this.parent.insertAdjacentHTML('beforeend', html);
        const pageRoot = document.getElementById('product-page');

        const product = new ProductComponent(pageRoot);
        product.render(this.data);

        const backBtn = new BackButtonComponent(pageRoot);
        backBtn.render(() => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });
    }
}
