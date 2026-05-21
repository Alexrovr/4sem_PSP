// import {MainPage} from "./pages/main/index.js";

// const root = document.getElementById('root');
// const mainPage = new MainPage(root);
// mainPage.render();

// main.js
import { Router } from "./modules/router.js";
import { MainPage } from "./pages/main/index.js";
import { CreatePage } from "./pages/create/index.js";
import { ProductPage } from "./pages/product/index.js";

const root = document.getElementById('root');
const router = new Router(root);

// Регистрируем маршруты
router.addRoute('/', MainPage);
router.addRoute('/create', CreatePage);
router.addRoute('/vacancy/:id', ProductPage); // :id станет доступен внутри ProductPage

// Сохраняем роутер глобально или передаем в компоненты, чтобы вызывать переходы
window.router = router;

// Запускаем
router.start();
