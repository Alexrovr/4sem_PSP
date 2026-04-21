export class ToastComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(title, message) {
        return `
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto text-primary">${title}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">${message}</div>
            </div>`;
    }

    render(title, message) {
        const html = this.getHTML(title, message);
        this.parent.insertAdjacentHTML('beforeend', html);

        // Автоудаление через 3 секунды
        const lastToast = this.parent.lastElementChild;
        setTimeout(() => lastToast.remove(), 3000);
    }
}
