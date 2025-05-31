
import ArticleItem from "./article-item.js";
import { SavedList } from "../services/itemList/savedList.js";

const template = document.createElement("template");
template.innerHTML = `
  <div class="saved-app">
    <h2>Artículos Guardados</h2>
    <div id="saved-container" class="articles-grid"></div>
  </div>
`;

export class SavedArticlesPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.styles = document.createElement("style");
    this.root.appendChild(this.styles);
    (async () => {
      try {
        const r = await fetch("/pages/index.css");
        this.styles.textContent = await r.text();
      } catch (e) {
        console.warn("No se pudo cargar CSS en SavedArticlesPage:", e);
      }
    })();

    this.root.appendChild(template.content.cloneNode(true));
    this.container = this.root.getElementById("saved-container");

    this.render = this.render.bind(this);
  }

  connectedCallback() {
    SavedList.getInstance().addObserver(this.render);
    this.render();
  }

  render() {
    const items = SavedList.getInstance().items;
    this.container.innerHTML = "";

    if (items.length === 0) {
      this.container.textContent = "No hay artículos guardados.";
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

customElements.define("saved-articles-page", SavedArticlesPage);
