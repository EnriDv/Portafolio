// articles-list.js
const template = document.createElement("template");
template.innerHTML = `
  <div class="articles-grid" id="articulos-lista"></div>
`;

export class ArticlesList extends HTMLElement {
  constructor() {
    super();
    
    this.root = this.attachShadow({ mode: "open" });
    
    this.root.appendChild(template.content.cloneNode(true));
    
    this.container = this.root.getElementById("articulos-lista");
    
    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/pages/index.css");
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS();
    
    this.articles = [
      {
        date: "March 20, 2025",
        title: "Microsoft Majorana 1",
        description:
          "The possibilities are insane. This could change computing as we know it.",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7299524815516807168/",
      },
      {
        date: "April 5, 2025",
        title: "Vibe Coding",
        description: "Una Nueva Era en la Ingeniería de Software.",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7312321735331106816/",
      },
      {
        date: "April 10, 2025",
        title: "RF-Pose",
        description: "La combinación de inteligencia artificial y señales inalámbricas.",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7322446822579281920/",
      },
    ];
  }

  async connectedCallback() {
    
    const styles = document.createElement("style");
    this.root.appendChild(styles);
    try {
      const resp = await fetch("/pages/index.css");
      styles.textContent = await resp.text();
    } catch (e) {
      console.warn("No se pudo cargar CSS:", e);
    }

    
    this.memento = JSON.parse(localStorage.getItem("proyectosMemento")) || {
      likes: [0, 1, 5],
      liked: [false, false, false],
      saved: [false, false, false],
    };

    
    this.articles.forEach((article, idx) => {
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
      btnContainer.style.position = "absolute";
      btnContainer.style.top = "10px";
      btnContainer.style.right = "10px";
      btnContainer.style.display = "flex";
      btnContainer.style.gap = "8px";
      btnContainer.style.zIndex = "2";

      
      const likeBtn = document.createElement("button");
      likeBtn.className = "likebtn";
      likeBtn.innerHTML = `
        <span class="likebtn__icon">&#10084;</span>
        <span class="likebtn__count">${this.memento.likes[idx]}</span>
      `;
      if (this.memento.liked[idx]) likeBtn.classList.add("likebtn--active");
      likeBtn.addEventListener("click", () => {
        this.memento.liked[idx] = !this.memento.liked[idx];
        if (this.memento.liked[idx]) {
          this.memento.likes[idx]++;
        } else {
          this.memento.likes[idx]--;
        }
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

      btnContainer.append(likeBtn, saveBtn);
      card.appendChild(btnContainer);
      this.container.appendChild(card);
    });
  }
}

customElements.define("articles-list", ArticlesList);
