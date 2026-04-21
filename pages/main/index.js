import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {ToastComponent} from "../../components/toast/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {id: 1, ticker: "AAPL", name: "Apple Inc.", price: "$180", desc: "Технологический гигант"},
            {id: 2, ticker: "TSLA", name: "Tesla", price: "$240", desc: "Электромобили и энергия"},
            {id: 3, ticker: "BTC", name: "Bitcoin", price: "$65,000", desc: "Цифровое золото"}
        ];
    }

    render() {
        this.parent.innerHTML = '<div id="main-page" class="d-flex flex-wrap"></div>';
        const container = document.getElementById('main-page');

        this.getData().forEach(item => {
            const card = new ProductCardComponent(container);
            card.render(item, () => {
                const toast = new ToastComponent(document.getElementById('toast-container'));
                toast.render("Переход", `Открываем акции ${item.ticker}`);

                const productPage = new ProductPage(this.parent, item);
                productPage.render();
            });
        });
    }
}
