import ArticleItem from "./article-item.js";
import { List } from "../services/itemList/ItemList.js";

const template = document.createElement("template");
    template.innerHTML = 
    `
      <div id="articles-container" class="articles-grid"></div>
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
    this.container = this.root.getElementById("articles-container");
  }

  connectedCallback() {
    window.addEventListener("articleschange", () => this.render());
    // 6) Primer render
    this.render();
  }

  render() {
    this.container.innerHTML = "";

    const list = List.getInstance();
    const items = list.items; 

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
