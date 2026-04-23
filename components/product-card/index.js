export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card shadow-sm m-2" style="width: 22rem; border-radius: 10px; overflow: hidden; border: none;">
                <img src="${data.img}" class="card-img-top" alt="${data.title}" style="height: 160px; object-fit: cover;">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge bg-light text-primary border">${data.category}</span>
                        <span class="text-muted" style="font-size: 0.8rem;">${data.date}</span>
                    </div>
                    <h5 class="card-title fw-bold text-dark text-truncate">${data.title}</h5>
                    <p class="card-subtitle mb-2 text-primary fw-bold" style="font-size: 1.2rem;">${data.salary}</p>
                    <p class="card-text text-muted mb-1" style="font-size: 0.9rem;">${data.company}</p>
                    <div class="mb-3">
                        ${data.tags.map(tag => `
                        <span class="badge bg-light text-primary border border-primary border-opacity-25 me-1"
                                style="font-size: 0.7rem;">
                            ${tag}
                        </span>
                        `).join('')}
                    </div>
                    <button class="btn btn-primary w-100" id="click-card-${data.id}" data-id="${data.id}">
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
