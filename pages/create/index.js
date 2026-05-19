import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { ToastComponent } from "../../components/toast/index.js";

export class CreatePage {
    constructor(parent) {
        this.parent = parent;
    }

    // Метод сбора данных из формы и отправки их на сервер
    createStock(e) {
        e.preventDefault(); // Отменяем перезагрузку страницы при отправке формы

        // Собираем значения из полей ввода
        const title = document.getElementById('vacancy-title').value;
        const company = document.getElementById('vacancy-company').value;
        const salary = document.getElementById('vacancy-salary').value;
        const location = document.getElementById('vacancy-location').value;
        const category = document.getElementById('vacancy-category').value;
        const desc = document.getElementById('vacancy-desc').value;
        const tagsInput = document.getElementById('vacancy-tags').value;

        // Превращаем строку с тегами через запятую в массив строк
        const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

        // Формируем объект для отправки (id сервер json-server присвоит автоматически)
        const newVacancy = {
            title,
            company,
            salary,
            location,
            category,
            desc,
            date: "Сегодня",
            tags,
            img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80" // Дефолтная картинка кода
        };

        // Выполняем POST-запрос к API
        ajax.post(stockUrls.createStock(), newVacancy, (data, status) => {
            const toast = new ToastComponent(document.getElementById('toast-container'));

            // json-server при успешном создании возвращает статус 201 Created
            if (status === 201 || data) {
                toast.render("Успех", `Вакансия "${title}" успешно создана!`);

                // Перенаправляем пользователя обратно на главную страницу
                const mainPage = new MainPage(this.parent);
                mainPage.render();
            } else {
                toast.render("Ошибка", "Не удалось сохранить вакансию на сервере");
            }
        });
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

        // Слушатель на кнопку "Назад"
        document.getElementById('back-to-main-btn').addEventListener('click', () => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });

        // Слушатель на отправку формы
        document.getElementById('create-vacancy-form').addEventListener('submit', (e) => this.createStock(e));
    }
}
