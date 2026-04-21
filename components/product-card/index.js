export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card m-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${data.ticker}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${data.name}</h6>
                    <p class="card-text">Цена: <strong>${data.price}</strong></p>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Детали</button>
                </div>
            </div>`;
    }

    render(data, listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
    }
}
