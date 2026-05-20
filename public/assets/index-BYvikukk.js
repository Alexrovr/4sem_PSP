var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n,r=e((()=>{n=class{constructor(e){this.parent=e}getHTML(e){return`
            <div class="card shadow-sm m-2" style="width: 22rem; border-radius: 10px; overflow: hidden; border: none;">
                <img src="${e.img}" class="card-img-top" alt="${e.title}" style="height: 160px; object-fit: cover;">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge bg-light text-primary border">${e.category}</span>
                        <span class="text-muted" style="font-size: 0.8rem;">${e.date}</span>
                    </div>
                    <h5 class="card-title fw-bold text-dark text-truncate">${e.title}</h5>
                    <p class="card-subtitle mb-2 text-primary fw-bold" style="font-size: 1.2rem;">${e.salary}</p>
                    <p class="card-text text-muted mb-1" style="font-size: 0.9rem;">${e.company}</p>
                    <div class="mb-3">
                        ${e.tags.map(e=>`
                        <span class="badge bg-light text-primary border border-primary border-opacity-25 me-1"
                                style="font-size: 0.7rem;">
                            ${e}
                        </span>
                        `).join(``)}
                    </div>
                    <button class="btn btn-primary w-100" id="click-card-${e.id}" data-id="${e.id}">
                        Подробнее
                    </button>
                </div>
            </div>`}render(e,t){this.parent.insertAdjacentHTML(`beforeend`,this.getHTML(e)),document.getElementById(`click-card-${e.id}`).addEventListener(`click`,t)}}})),i,a=e((()=>{i=class{constructor(e){this.parent=e}addListeners(e){let t=document.getElementById(`back-button`);t&&t.addEventListener(`click`,e)}getHTML(){return`
            <button id="back-button" class="btn btn-outline-secondary mt-3" type="button">
                &larr; Вернуться к акциям
            </button>
        `}render(e){let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t),this.addListeners(e)}}})),o,s=e((()=>{o=class{constructor(e){this.parent=e}getHTML(e){return`
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card border-0 shadow-sm overflow-hidden mb-4">
                            <img src="${e.img}" class="img-fluid" alt="${e.title}" style="max-height: 400px; width: 100%; object-fit: cover;">
                            <div class="p-4">
                                <h2 class="fw-bold">${e.title}</h2>
                                <h3 class="text-primary mb-4">${e.salary}</h3>
                                <h5>Описание вакансии</h5>
                                <p>${e.desc}</p>
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
                            <p class="fw-bold mb-1">${e.company}</p>
                            <p class="text-muted small">${e.location}</p>
                            <hr>
                            <button class="btn btn-success w-100 mb-2">Откликнуться</button>
                            <button class="btn btn-outline-primary w-100" id="back-btn-container">Связаться с компанией</button>
                        </div>
                    </div>
                </div>
            </div>`}render(e){this.parent.insertAdjacentHTML(`beforeend`,this.getHTML(e))}}})),c,l,u=e((()=>{c=class{async get(e){try{let t=await fetch(e);if(!t.ok)throw Error(`Ошибка HTTP: ${t.status}`);return await t.json()}catch(e){return console.error(`GET ошибка:`,e),null}}async post(e,t){try{let n=await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});return{data:n.ok?await n.json():null,status:n.status}}catch(e){return console.error(`POST ошибка:`,e),{data:null,status:500}}}},l=new c})),d,f,p=e((()=>{d=class{constructor(){this.baseUrl=`http://localhost:3000`}getStocks(){return`${this.baseUrl}/stocks`}getStockById(e){return`${this.baseUrl}/stocks/${e}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(e){return`${this.baseUrl}/stocks/${e}`}updateStockById(e){return`${this.baseUrl}/stocks/${e}`}},f=new d})),m,h=e((()=>{a(),x(),s(),u(),p(),m=class{constructor(e,t){this.parent=e,this.id=t}async getData(){let e=await l.get(f.getStockById(this.id));e&&new o(document.getElementById(`product-page`)).render(e)}render(){this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,`<div id="product-page" class="container mt-4"></div>`),new i(document.getElementById(`product-page`)).render(()=>{new b(this.parent).render()}),this.getData()}}})),g,_=e((()=>{g=class{constructor(e){this.parent=e}getHTML(e,t){return`
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto text-primary">${e}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">${t}</div>
            </div>`}render(e,t){let n=this.getHTML(e,t);this.parent.insertAdjacentHTML(`beforeend`,n);let r=this.parent.lastElementChild;setTimeout(()=>r.remove(),3e3)}}})),v,y=e((()=>{x(),u(),p(),_(),v=class{constructor(e){this.parent=e}async createStock(e){e.preventDefault();let t=document.getElementById(`vacancy-title`).value,n={title:t,company:document.getElementById(`vacancy-company`).value,salary:document.getElementById(`vacancy-salary`).value,location:document.getElementById(`vacancy-location`).value,category:document.getElementById(`vacancy-category`).value,desc:document.getElementById(`vacancy-desc`).value,date:`Сегодня`,tags:document.getElementById(`vacancy-tags`).value.split(`,`).map(e=>e.trim()).filter(e=>e!==``),img:`https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80`},r=await l.post(f.createStock(),n),i=new g(document.getElementById(`toast-container`));r.status===201||r.data?(i.render(`Успех`,`Вакансия "${t}" успешно создана через fetch!`),new b(this.parent).render()):i.render(`Ошибка`,`Не удалось сохранить вакансию`)}render(){this.parent.innerHTML=`
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
        `,document.getElementById(`back-to-main-btn`).addEventListener(`click`,()=>{new b(this.parent).render()}),document.getElementById(`create-vacancy-form`).addEventListener(`submit`,e=>this.createStock(e))}}})),b,x=e((()=>{r(),h(),_(),u(),p(),y(),b=class{constructor(e){this.parent=e,this.visibleCards=new Set,this.hiddenCards=[],this.allData=[]}async getData(){let e=await l.get(f.getStocks());e?(this.allData=e,this.initializeVisibleCards(),this.allData.forEach(e=>{this.renderCard(e)})):new g(document.getElementById(`toast-container`)).render(`Ошибка`,`Не удалось загрузить данные через fetch`)}initializeVisibleCards(){this.allData.forEach(e=>{this.visibleCards.add(e.id)})}deleteRandomCard(){let e=Array.from(this.visibleCards);if(e.length===0){new g(document.getElementById(`toast-container`)).render(`Ошибка`,`Нет видимых карточек для удаления`);return}let t=e[Math.floor(Math.random()*e.length)];this.visibleCards.delete(t),this.hiddenCards.push(t);let n=document.getElementById(`card-wrapper-${t}`);n&&(n.style.display=`none`);let r=new g(document.getElementById(`toast-container`)),i=this.allData.find(e=>e.id===t);r.render(`Удалено`,`Карточка "${i.title}" скрыта`)}addRandomCard(){if(this.hiddenCards.length===0){new g(document.getElementById(`toast-container`)).render(`Ошибка`,`Нет скрытых карточек для добавления`);return}let e=Math.floor(Math.random()*this.hiddenCards.length),t=this.hiddenCards.splice(e,1)[0];this.visibleCards.add(t);let n=document.getElementById(`card-wrapper-${t}`);n&&(n.style.display=`block`);let r=new g(document.getElementById(`toast-container`)),i=this.allData.find(e=>e.id===t);r.render(`Добавлено`,`Карточка "${i.title}" показана`)}renderCard(e){let t=document.getElementById(`main-page`),r=document.createElement(`div`);r.id=`card-wrapper-${e.id}`,r.style.display=this.visibleCards.has(e.id)?`block`:`none`,t.appendChild(r),new n(r).render(e,()=>{new m(this.parent,e.id).render()})}render(){this.parent.innerHTML=`
            <div class="container">
                <div class="d-flex justify-content-between align-items-center mb-4 mt-3">
                    <h2 class="mb-0">Поиск вакансий</h2>
                    <div class="gap-2">
                        <button class="btn btn-success me-2" id="add-btn">+ Добавить</button>
                        <button class="btn btn-danger" id="delete-btn">- Удалить</button>
                        <button class="btn btn-primary" id="create-btn">Создать</button>
                    </div>
                </div>
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
            </div>
        `,document.getElementById(`add-btn`).addEventListener(`click`,()=>this.addRandomCard()),document.getElementById(`create-btn`).addEventListener(`click`,()=>{new v(this.parent).render()}),document.getElementById(`delete-btn`).addEventListener(`click`,()=>this.deleteRandomCard()),this.getData()}}}));t((()=>{x(),new b(document.getElementById(`root`)).render()}))();