import { MainPage } from "../main/index.js";
import { api } from "../../modules/api.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { ToastComponent } from "../../components/toast/index.js";

export class CreatePage {
    constructor(parent) {
        this.parent = parent;
    }

    async createStock(e) {
        e.preventDefault();

        const title = document.getElementById('vacancy-title').value;
        const company = document.getElementById('vacancy-company').value;
        const salary = document.getElementById('vacancy-salary').value;
        const location = document.getElementById('vacancy-location').value;
        const category = document.getElementById('vacancy-category').value;
        const desc = document.getElementById('vacancy-desc').value;
        const tagsInput = document.getElementById('vacancy-tags').value;

        const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

        const newVacancy = {
            title, company, salary, location, category, desc,
            date: "Сегодня",
            tags,
            img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80"
        };

        const response = await api.post(stockUrls.createStock(), newVacancy);
        const toast = new ToastComponent(document.getElementById('toast-container'));

        if (response.status === 201 || response.data) {
            toast.render("Успех", `Вакансия "${title}" успешно создана через fetch!`);
            window.router.navigate('/');
        } else {
            toast.render("Ошибка", "Не удалось сохранить вакансию");
        }
    }

    render() {
        this.parent.innerHTML = `
            <div class="container mt-4" style="max-width: 600px;">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Добавление вакансии</h2>
                    <button class="btn btn-secondary" id="back-to-main-btn">Назад</button>
                </div>

                <form id="create-vacancy-form" class="card p-4 shadow-sm">
                    <div class="mb-3">
                        <label for="vacancy-title" class="form-label">Название должности</label>
                        <input type="text" class="form-control" id="vacancy-title" required placeholder="например, Frontend-разработчик">
                    </div>
                    <div class="mb-3">
                        <label for="vacancy-company" class="form-label">Компания</label>
                        <input type="text" class="form-control" id="vacancy-company" required placeholder="ООО Техно">
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="vacancy-salary" class="form-label">Зарплата</label>
                            <input type="text" class="form-control" id="vacancy-salary" required placeholder="от 100 000 руб.">
                        </div>
                        <div class="col mb-3">
                            <label for="vacancy-location" class="form-label">Город</label>
                            <input type="text" class="form-control" id="vacancy-location" required placeholder="Москва">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="vacancy-category" class="form-label">Категория</label>
                        <input type="text" class="form-control" id="vacancy-category" required placeholder="IT, Аналитика, Маркетинг...">
                    </div>
                    <div class="mb-3">
                        <label for="vacancy-tags" class="form-label">Теги (через запятую)</label>
                        <input type="text" class="form-control" id="vacancy-tags" placeholder="Удаленно, Полный день, Опыт от 1 года">
                    </div>
                    <div class="mb-3">
                        <label for="vacancy-desc" class="form-label">Описание обязанностей</label>
                        <textarea class="form-control" id="vacancy-desc" rows="3" required placeholder="Что предстоит делать..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-success w-100">Сохранить и опубликовать</button>
                </form>
            </div>
        `;

        document.getElementById('back-to-main-btn').addEventListener('click', () => {
            window.router.navigate('/');
        });

        document.getElementById('create-vacancy-form').addEventListener('submit', (e) => this.createStock(e));
    }
}
