const template = document.createElement("template");

template.innerHTML = `
  <section class="articles-section">
    <div class="section-container">
      <div class="section-header" style="margin-bottom: 3rem;">
        <h2 class="section-title">Artículos & Novedades</h2>
      </div>
      <div class="articles-grid" id="articulos-lista"></div>
    </div>
  </section>
`;

export class ArticlesList extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(template.content.cloneNode(true));
    this.container = this.root.getElementById("articulos-lista");
    
    this.stylesElement = document.createElement("style");
    this.root.appendChild(this.stylesElement);

    this.articles = [
      {
        date: "May 15, 2025",
        title: "Desarrollar software ya no es solo programar",
        description: "La inteligencia artificial está transformando la forma en que desarrollamos software. Ya no se trata solo de escribir líneas de código, sino de colaborar...",
        url: "https://www.linkedin.com/posts/jose-enrique-diaz-velarde_ia-desarrollodesoftware-programacion-activity-7327533883325902849-ExU5",
        category: "IA & Dev",
        image: "https://placehold.co/600x400/111827/FFF?text=IA+%26+Software" 
      },
      {
        date: "April 10, 2025",
        title: "RF-Pose",
        description: "La combinación de inteligencia artificial y señales inalámbricas permite detectar posturas humanas a través de las paredes.",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7322446822579281920/",
        category: "AI Research",
        image: "https://placehold.co/600x400/e11d48/FFF?text=RF-Pose"
      },
      {
        date: "April 5, 2025",
        title: "Vibe Coding",
        description: "Una Nueva Era en la Ingeniería de Software. No es solo una tendencia, es un cambio de mentalidad.",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7312321735331106816/",
        category: "Software",
        image: "https://placehold.co/600x400/2563eb/FFF?text=Vibe+Coding"
      },
      {
        date: "March 20, 2025",
        title: "Microsoft Majorana 1",
        description: "The possibilities are insane. This could change computing as we know it using topological qubits.",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7299524815516807168/",
        category: "Quantum",
        image: "https://placehold.co/600x400/1a1b22/FFF?text=Majorana+1" 
      }
    ];
  }

  async connectedCallback() {
    this.loadStyles();
    this.render();
  }

  async loadStyles() {
    try {
      const mainUrl = new URL('../blocks/main.css', import.meta.url).href;
      const artUrl = new URL('../blocks/articles.css', import.meta.url).href;

      const [mainCss, artCss] = await Promise.all([
          fetch(mainUrl).then(r => r.text()),
          fetch(artUrl).then(r => r.text())
      ]);

      this.stylesElement.textContent = mainCss + "\n" + artCss;
    } catch (e) {
      console.warn("Error cargando CSS:", e);
    }
  }

  render() {
    this.memento = JSON.parse(localStorage.getItem("proyectosMemento")) || {
      likes: {}, liked: {}, saved: {} 
    };

    this.container.innerHTML = "";

    this.articles.forEach((article, idx) => {
      const id = idx; 

      const card = document.createElement("article");
      card.className = "article-card";
      
      card.innerHTML = `
        <div class="article-image-header">
            <img src="${article.image}" alt="${article.title}" class="article-image" loading="lazy" />
            <div class="card-actions"></div>
        </div>
        
        <div class="article-content">
            <div class="article-meta">
                <span class="article-category">${article.category}</span>
                <time class="article-date">${article.date}</time>
            </div>
            
            <h3 class="article-title">${article.title}</h3>
            <p class="article-description">${article.description}</p>
            
            <a class="read-more" href="${article.url}" target="_blank">
                Leer en LinkedIn <span>&rarr;</span>
            </a>
        </div>
      `;

      const btnContainer = card.querySelector(".card-actions");
      
      const likesCount = this.memento.likes[id] || 0;
      const isLiked = this.memento.liked[id] || false;
      const isSaved = this.memento.saved[id] || false;

      const likeBtn = document.createElement("button");
      likeBtn.className = isLiked ? "likebtn likebtn--active" : "likebtn";
      likeBtn.innerHTML = `<span class="likebtn__icon">&#10084;</span><span class="likebtn__count">${likesCount}</span>`;
      
      likeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const currentlyLiked = this.memento.liked[id] || false;
        
        this.memento.liked[id] = !currentlyLiked;
        this.memento.likes[id] = (this.memento.likes[id] || 0) + (this.memento.liked[id] ? 1 : -1);
        
        likeBtn.className = this.memento.liked[id] ? "likebtn likebtn--active" : "likebtn";
        likeBtn.querySelector(".likebtn__count").textContent = this.memento.likes[id];
        localStorage.setItem("proyectosMemento", JSON.stringify(this.memento));
      });

      const saveBtn = document.createElement("button");
      saveBtn.className = isSaved ? "savebtn savebtn--active" : "savebtn";
      saveBtn.innerHTML = isSaved ? `<span class="savebtn__icon">&#x2605;</span>` : `<span class="savebtn__icon">&#x2606;</span>`;

      saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.memento.saved[id] = !this.memento.saved[id];
        
        saveBtn.className = this.memento.saved[id] ? "savebtn savebtn--active" : "savebtn";
        saveBtn.innerHTML = this.memento.saved[id] ? `<span class="savebtn__icon">&#x2605;</span>` : `<span class="savebtn__icon">&#x2606;</span>`;
        localStorage.setItem("proyectosMemento", JSON.stringify(this.memento));
      });

      btnContainer.append(likeBtn, saveBtn);
      this.container.appendChild(card);
    });
  }
}

customElements.define("articles-list", ArticlesList);