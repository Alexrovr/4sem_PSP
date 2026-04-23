// export class ProductComponent {
//     constructor(parent) {
//         this.parent = parent;
//     }

//     getHTML(data) {
//         return `
//             <div class="card shadow-sm">
//                 <div class="card-header bg-primary text-white">
//                     <h4 class="my-0">${data.name} (${data.ticker})</h4>
//                 </div>
//                 <div class="card-body">
//                     <h1 class="card-title pricing-card-title">${data.price} <small class="text-muted fw-light">/ USD</small></h1>
//                     <ul class="list-unstyled mt-3 mb-4">
//                         <li><strong>Описание:</strong> ${data.desc}</li>
//                         <li><strong>Статус:</strong> Рынок открыт</li>
//                         <li><strong>Объем торгов:</strong> Высокий</li>
//                     </ul>
//                     <div class="alert alert-info" role="alert">
//                         График изменения цены за 24 часа будет доступен в следующей версии приложения.
//                     </div>
//                 </div>
//             </div>
//         `;
//     }

//     render(data) {
//         const html = this.getHTML(data);
//         this.parent.insertAdjacentHTML('beforeend', html);
//     }
// }

export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card border-0 shadow-sm p-4">
                            <h2 class="fw-bold">${data.title}</h2>
                            <h3 class="text-primary mb-4">${data.salary}</h3>

                            <h5>Описание вакансии</h5>
                            <p>${data.desc}</p>

                            <h5 class="mt-4">Требования</h5>
                            <ul>
                                <li>Высшее профильное образование</li>
                                <li>Умение работать в команде</li>
                                <li>Ответственность и пунктуальность</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm p-3 bg-light">
                            <h5>О компании</h5>
                            <p class="fw-bold mb-1">${data.company}</p>
                            <p class="text-muted small">${data.location}</p>
                            <hr>
                            <button class="btn btn-success w-100 mb-2">Откликнуться</button>
                            <button class="btn btn-outline-primary w-100">Показать контакты</button>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    render(data) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    }
}

