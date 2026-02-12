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
        description: "La inteligencia artificial está transformando la forma en que desarrollamos software. Ya no se trata solo de escribir líneas de código, sino de colaborar con sistemas capaces de sugerir soluciones y optimizar procesos.",
        url: "https://www.linkedin.com/posts/jose-enrique-diaz-velarde_ia-desarrollodesoftware-programacion-activity-7327533883325902849-ExU5?utm_source=share&utm_medium=member_desktop&rcm=ACoAAESspMwB044CPVwHzv8StwGDmROQ13_Tcjo",
        category: "IA & Dev",
        image: "https://placehold.co/600x400/111827/FFF?text=IA+%26+Software" 
      },
      {
        date: "April 10, 2025",
        title: "RF-Pose",
        description: "La combinación de inteligencia artificial y señales inalámbricas permite detectar posturas humanas a través de las paredes. ¿Privacidad o avance médico?",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7322446822579281920/",
        category: "AI Research",
        image: "https://placehold.co/600x400/e11d48/FFF?text=RF-Pose"
      },
      {
        date: "April 5, 2025",
        title: "Vibe Coding",
        description: "Una Nueva Era en la Ingeniería de Software. No es solo una tendencia, es un cambio de mentalidad en cómo abordamos el código limpio.",
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
      const mainResp = await fetch("/pages/index.css");
      const artResp = await fetch("/blocks/articles.css");
      
      const mainCss = await mainResp.text();
      const artCss = await artResp.text();

      this.stylesElement.textContent = mainCss + "\n" + artCss;
    } catch (e) {
      console.warn("Error cargando CSS:", e);
    }
  }

  render() {
    this.memento = JSON.parse(localStorage.getItem("proyectosMemento")) || {
      likes: new Array(this.articles.length).fill(0),
      liked: new Array(this.articles.length).fill(false),
      saved: new Array(this.articles.length).fill(false),
    };

    this.container.innerHTML = "";

    this.articles.forEach((article, idx) => {
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

      const likeBtn = document.createElement("button");
      likeBtn.className = "likebtn";
      const currentLikes = this.memento.likes[idx] || 0;
      
      likeBtn.innerHTML = `
        <span class="likebtn__icon">&#10084;</span>
        <span class="likebtn__count">${currentLikes}</span>
      `;
      
      if (this.memento.liked[idx]) likeBtn.classList.add("likebtn--active");
      
      likeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (this.memento.liked[idx] === undefined) this.memento.liked[idx] = false;
        if (this.memento.likes[idx] === undefined) this.memento.likes[idx] = 0;

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
      
      const isSaved = this.memento.saved[idx] || false;
      
      if (isSaved) {
          saveBtn.classList.add("savebtn--active");
          saveBtn.innerHTML = `<span class="savebtn__icon">&#x2605;</span>`;
      } else {
          saveBtn.innerHTML = `<span class="savebtn__icon">&#x2606;</span>`;
      }

      saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (this.memento.saved[idx] === undefined) this.memento.saved[idx] = false;
        
        this.memento.saved[idx] = !this.memento.saved[idx];
        
        saveBtn.classList.toggle("savebtn--active", this.memento.saved[idx]);
        saveBtn.innerHTML = this.memento.saved[idx] 
            ? `<span class="savebtn__icon">&#x2605;</span>` 
            : `<span class="savebtn__icon">&#x2606;</span>`;
            
        localStorage.setItem("proyectosMemento", JSON.stringify(this.memento));
      });

      btnContainer.append(likeBtn, saveBtn);
      this.container.appendChild(card);
    });
  }
}

customElements.define("articles-list", ArticlesList);