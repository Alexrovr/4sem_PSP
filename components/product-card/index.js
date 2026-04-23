// export class ProductCardComponent {
//     constructor(parent) {
//         this.parent = parent;
//     }

//     getHTML(data) {
//         return `
//             <div class="card m-2" style="width: 18rem;">
//                 <div class="card-body">
//                     <h5 class="card-title">${data.ticker}</h5>
//                     <h6 class="card-subtitle mb-2 text-muted">${data.name}</h6>
//                     <p class="card-text">Цена: <strong>${data.price}</strong></p>
//                     <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Детали</button>
//                 </div>
//             </div>`;
//     }

//     render(data, listener) {
//         this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
//         document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
//     }
// }

export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card shadow-sm m-2" style="width: 22rem; border-radius: 10px; border: none;">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge bg-light text-primary border">${data.category}</span>
                        <span class="text-muted" style="font-size: 0.8rem;">${data.date}</span>
                    </div>
                    <h5 class="card-title fw-bold text-dark">${data.title}</h5>
                    <p class="card-subtitle mb-2 text-primary fw-bold" style="font-size: 1.2rem;">${data.salary}</p>
                    <p class="card-text text-muted mb-1"><i class="bi bi-building"></i> ${data.company}</p>
                    <p class="card-text text-muted mb-3" style="font-size: 0.9rem;"><i class="bi bi-geo-alt"></i> ${data.location}</p>

                    <div class="mb-3">
                        ${data.tags.map(tag => `<span class="badge rounded-pill bg-info text-dark fw-normal me-1" style="font-size: 0.7rem;">${tag}</span>`).join('')}
                    </div>

                    <button class="btn btn-primary w-100" id="click-card-${data.id}" data-id="${data.id}" style="background-color: #0056b3;">
                        Подробнее
                    </button>
                </div>
            </div>`;
    }

    render(data, listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
    }
}
