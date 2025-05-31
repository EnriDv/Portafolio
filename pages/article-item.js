import { List, Item } from "../services/itemList/ItemList.js";
const template = document.createElement("template");
template.innerHTML = `
  <div class="articles-grid" id="articulos-item"></div>
`;

export default class ArticleItem extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(template.content.cloneNode(true));
    this.container = this.root.querySelector("#articulos-item");
    this.root.appendChild(this.container);
    const styles = document.createElement("style");
    this.root.appendChild(styles);
    (async () => {
      try {
        const res = await fetch("/pages/index.css");
        styles.textContent = await res.text();
      } catch (e) {
        console.warn("No se pudo cargar CSS:", e);
      }
    })();
  }

  async connectedCallback() {

    this.memento = JSON.parse(
      localStorage.getItem("proyectosMemento")
    ) || {
      likes: [],
      liked: [],
      saved: [],
    };

    const article = JSON.parse(this.dataset.article);
    const idx = parseInt(this.dataset.index, 10);

    const card = document.createElement("article");
    card.className = "article-card";
    card.style.position = "relative";
    card.innerHTML = `
      <time class="article-date">${article.date}</time>
      <h3 class="article-title">${article.title}</h3>
      <p class="article-description">${article.description}</p>
      <a class="read-more" href="${article.url}" target="_blank">Leer artículo</a>
    `;

    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, {
      position: "absolute",
      top: "10px",
      right: "10px",
      display: "flex",
      gap: "8px",
      zIndex: "2",
    });

    const likeBtn = document.createElement("button");
    likeBtn.className = "likebtn";
    likeBtn.innerHTML = `
      <span class="likebtn__icon">&#10084;</span>
      <span class="likebtn__count">${this.memento.likes[idx] || 0}</span>
    `;
    if (this.memento.liked[idx]) likeBtn.classList.add("likebtn--active");
    likeBtn.addEventListener("click", () => {
      this.memento.liked[idx] = !this.memento.liked[idx];
      this.memento.likes[idx] = (this.memento.likes[idx] || 0) + (this.memento.liked[idx] ? 1 : -1);
      likeBtn.classList.toggle("likebtn--active", this.memento.liked[idx]);
      likeBtn.querySelector(".likebtn__count").textContent = this.memento.likes[idx];
      localStorage.setItem("proyectosMemento", JSON.stringify(this.memento));
    });

    const saveBtn = document.createElement("button");
    saveBtn.className = "savebtn";
    saveBtn.innerHTML = `<span class="savebtn__icon">&#x2606;</span>`;
    if (this.memento.saved[idx]) saveBtn.classList.add("savebtn--active");
    saveBtn.addEventListener("click", () => {
      this.memento.saved[idx] = !this.memento.saved[idx];
      saveBtn.classList.toggle("savebtn--active", this.memento.saved[idx]);
      localStorage.setItem("proyectosMemento", JSON.stringify(this.memento));
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      const list = List.getInstance();
      list.delete(article);
      window.dispatchEvent(new CustomEvent("articleschange"));
    });

    btnContainer.append(likeBtn, saveBtn, deleteBtn);
    card.appendChild(btnContainer);
    this.container.appendChild(card);
  }
}

customElements.define("article-item", ArticleItem);