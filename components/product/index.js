export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h4 class="my-0">${data.name} (${data.ticker})</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">${data.price} <small class="text-muted fw-light">/ USD</small></h1>
                    <ul class="list-unstyled mt-3 mb-4">
                        <li><strong>Описание:</strong> ${data.desc}</li>
                        <li><strong>Статус:</strong> Рынок открыт</li>
                        <li><strong>Объем торгов:</strong> Высокий</li>
                    </ul>
                    <div class="alert alert-info" role="alert">
                        График изменения цены за 24 часа будет доступен в следующей версии приложения.
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
