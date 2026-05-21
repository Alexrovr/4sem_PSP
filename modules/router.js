
export class Router {
    constructor(rootElement) {
        this.routes = [];
        this.rootElement = rootElement;

        window.addEventListener('hashchange', () => this.handleRoute());

        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a');
            if (anchor && anchor.target !== '_blank' && anchor.href.startsWith(window.location.origin)) {
                e.preventDefault();
                this.navigate(anchor.pathname);
            }
        });
    }

    addRoute(path, PageClass) {
        this.routes.push({ path, PageClass });
    }

    navigate(path) {
        window.location.hash = path;
    }

    handleRoute() {
        let path = window.location.hash.slice(1) || '/';

        const route = this.routes.find(r => this.matchRoute(r.path, path));

        if (!route) {
            this.rootElement.innerHTML = `<h2>404 — Страница не найдена</h2>`;
            return;
        }

        const params = this.getParams(route.path, path);
        this.rootElement.innerHTML = '';

        const page = new route.PageClass(this.rootElement, params);
        page.render();
    }

    matchRoute(routePath, currentPath) {
        const regexPath = routePath.replace(/:([^\s/]+)/g, '([^/]+)');
        const match = currentPath.match(new RegExp(`^${regexPath}$`));
        return !!match;
    }

    getParams(routePath, currentPath) {
        const params = {};
        const routeParts = routePath.split('/');
        const currentParts = currentPath.split('/');

        routeParts.forEach((part, i) => {
            if (part.startsWith(':')) {
                params[part.slice(1)] = currentParts[i];
            }
        });

        return params;
    }

    start() {
        this.handleRoute();
    }
}
