import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
    }

    render() {
        this.parent.innerHTML = `
            <div class="card p-4">
                <h2>${this.data.name} (${this.data.ticker})</h2>
                <p class="lead">${this.data.desc}</p>
                <p>Текущая котировка: <b>${this.data.price}</b></p>
                <div id="back-btn-container"></div>
            </div>`;

        const backBtn = new BackButtonComponent(document.getElementById('back-btn-container'));
        backBtn.render(() => new MainPage(this.parent).render());
    }
}
