export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card border-0 shadow-sm overflow-hidden mb-4">
                            <img src="${data.img}" class="img-fluid" alt="${data.title}" style="max-height: 400px; width: 100%; object-fit: cover;">
                            <div class="p-4">
                                <h2 class="fw-bold">${data.title}</h2>
                                <h3 class="text-primary mb-4">${data.salary}</h3>
                                <h5>Описание вакансии</h5>
                                <p>${data.desc}</p>
                                <h5 class="mt-4">Что мы предлагаем</h5>
                                <ul>
                                    <li>Официальное трудоустройство по ТК РФ</li>
                                    <li>Современный офис и мощное железо</li>
                                    <li>Возможности для быстрого карьерного роста</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm p-3 bg-light">
                            <h5>О компании</h5>
                            <p class="fw-bold mb-1">${data.company}</p>
                            <p class="text-muted small">${data.location}</p>
                            <hr>
                            <button class="btn btn-success w-100 mb-2">Откликнуться</button>
                            <button class="btn btn-outline-primary w-100" id="back-btn-container">Связаться с компанией</button>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    render(data) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    }
}
