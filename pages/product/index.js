import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {ProductComponent} from "../../components/product/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, params) {
        this.parent = parent;
        this.id = params ? params.id : null;
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            if (data) {
                const pageRoot = document.getElementById('product-page');

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

        const backBtn = new BackButtonComponent(pageRoot);
        backBtn.render(() => {
            window.router.navigate('/');
        });

        this.getData();
    }
}
