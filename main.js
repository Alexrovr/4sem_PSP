import { Router } from "./modules/router.js";
import { MainPage } from "./pages/main/index.js";
import { ProductPage } from "./pages/product/index.js";
import { CreatePage } from "./pages/create/index.js";

const root = document.getElementById('root');
const router = new Router(root);

router.addRoute('/', MainPage);
router.addRoute('/create', CreatePage);
router.addRoute('/vacancy/:id', ProductPage);

window.router = router;

router.start();
