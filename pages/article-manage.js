import { List, Item } from "../services/itemList/ItemList.js";

export class ArticlesManager extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });


    this.styles = document.createElement("style");
    this.root.appendChild(this.styles);

    const tpl = document.createElement("template");
    tpl.innerHTML = `
      <div class="articles-app">
        <h2>Nuevo Artículo</h2>
        <input id="date-input"        type="date"        placeholder="Fecha" />
        <input id="title-input"       type="text"        placeholder="Título" />
        <input id="description-input" type="text"        placeholder="Descripción" />
        <input id="url-input"         type="url"         placeholder="URL" />
        <button id="add-btn">Agregar artículo</button>
        <h2>Artículos</h2>
        <ul id="articles-list"></ul>
      </div>
    `;
    this.root.appendChild(tpl.content.cloneNode(true));

    this.dateInput        = this.root.getElementById("date-input");
    this.titleInput       = this.root.getElementById("title-input");
    this.descriptionInput = this.root.getElementById("description-input");
    this.urlInput         = this.root.getElementById("url-input");
    this.addBtn           = this.root.getElementById("add-btn");
    this.articlesList     = this.root.getElementById("articles-list");

    this.renderList = this.renderList.bind(this);
  }

  async connectedCallback() {
    try {
      const resp = await fetch("/pages/index.css");
      this.styles.textContent = await resp.text();
    } catch (e) {
      console.warn("No se pudo cargar CSS:", e);
    }

    this.addBtn.addEventListener("click", () => this.handleAdd());
    this.articlesList.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const url = e.target.dataset.url;
        this.handleDelete(url);
      }
    });

    List.getInstance().addObserver(this.renderList);
    this.renderList();
  }

  handleAdd() {
    const date        = this.dateInput.value;
    const title       = this.titleInput.value.trim();
    const description = this.descriptionInput.value.trim();
    const url         = this.urlInput.value.trim();
    const list        = List.getInstance();

    if (date && title && description && url && !list.findByUrl(url)) {
      const item = new Item({ date, title, description, url });
      list.add(item);
      this.dateInput.value =
      this.titleInput.value =
      this.descriptionInput.value =
      this.urlInput.value = "";
    }
  }

  handleDelete(url) {
    const list = List.getInstance();
    const item = list.findByUrl(url);
    if (item) list.delete(item);
  }

  renderList() {
    const list = List.getInstance();
    this.articlesList.innerHTML = "";

    if (list.items.length === 0) {
      this.articlesList.textContent = "No hay artículos para mostrar.";
      return;
    }

    list.items.forEach((article) => {
      const li = document.createElement("li");
      li.className = "article-item";
      li.innerHTML = `
        <strong>${article.title}</strong>
        <button class="delete-btn" data-url="${article.url}">Delete</button>
      `;
      this.articlesList.appendChild(li);
    });
  }
}

customElements.define("articles-manager", ArticlesManager);
