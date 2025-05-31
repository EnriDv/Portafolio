import ArticleItem from "./article-item.js";
import { ArticlesManager } from "./article-manage.js";
import { List, Item } from "../services/itemList/ItemList.js";

const template = document.createElement("template");
template.innerHTML = `
  <div class="articles-app">
    <h2>Nuevo Artículo</h2>
    <div class="form-row">
      <input id="date-input"        type="date"        placeholder="Fecha" />
      <input id="title-input"       type="text"        placeholder="Título" />
      <input id="description-input" type="text"        placeholder="Descripción" />
      <input id="url-input"         type="url"         placeholder="URL" />
      <button id="add-btn">Agregar</button>
    </div>
    <h2>Artículos</h2>
    <div id="articles-container" class="articles-grid"></div>
  </div>
`;

export class ArticlesPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    this.styles = document.createElement("style");
    this.root.appendChild(this.styles);
    (async () => {
      try {
        const resp = await fetch("/pages/index.css");
        this.styles.textContent = await resp.text();
      } catch (e) {
        console.warn("No se pudo cargar CSS en ArticlesPage:", e);
      }
    })();

    this.root.appendChild(template.content.cloneNode(true));

    this.dateInput        = this.root.getElementById("date-input");
    this.titleInput       = this.root.getElementById("title-input");
    this.descriptionInput = this.root.getElementById("description-input");
    this.urlInput         = this.root.getElementById("url-input");
    this.addBtn           = this.root.getElementById("add-btn");
    this.container        = this.root.getElementById("articles-container");

    this.render    = this.render.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  connectedCallback() {
    
    List.getInstance().addObserver(this.render);
    this.addBtn.addEventListener("click", this.handleAdd);
    window.addEventListener("articleschange", this.render);

    this.render();
  }

  handleAdd() {
    const date        = this.dateInput.value;
    const title       = this.titleInput.value.trim();
    const description = this.descriptionInput.value.trim();
    const url         = this.urlInput.value.trim();
    const list        = List.getInstance();

    if (!date || !title || !description || !url) return;
    if (list.findByUrl
        ? list.findByUrl(url)
        : list.find(url)
    ) {
      return;
    }

    const item = new Item({ date, title, description, url });
    list.add(item);

    this.dateInput.value =
    this.titleInput.value =
    this.descriptionInput.value =
    this.urlInput.value = "";

    window.dispatchEvent(new CustomEvent("articleschange"));
  }

  render() {
    const list  = List.getInstance();
    const items = list.items;

    this.container.innerHTML = "";

    if (items.length === 0) {
      this.container.textContent = "No hay artículos para mostrar.";
      return;
    }

    items.forEach((article, idx) => {
      const el = document.createElement("article-item");
      el.dataset.article = JSON.stringify(article);
      el.dataset.index   = idx;
      this.container.appendChild(el);
    });
  }
}

customElements.define("articles-page", ArticlesPage);