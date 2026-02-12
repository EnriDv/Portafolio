const template = document.createElement("template");
template.innerHTML = `
  <div class="projects-grid" id="proyectos-lista"></div>
`;

export class ProjectSection extends HTMLElement {
  constructor() {
    super();
    // 1) Shadow DOM
    this.root = this.attachShadow({ mode: "open" });

    // 2) Clonar y adjuntar el template
    this.root.appendChild(template.content.cloneNode(true));

    // 3) Buscar el contenedor
    this.proyectosContainer = this.root.getElementById("proyectos-lista");

    const styles = document.createElement("style");
    this.root.appendChild(styles);
    
    (async () => {
      try {
        const res = await fetch("/pages/index.css"); 
        if(res.ok) {
            styles.textContent = await res.text();
        } else {
            console.warn("No se encontró el archivo CSS");
        }
      } catch (e) {
        console.warn("No se pudo cargar CSS:", e);
      }
    })();

    this.manualProjects = [
      {
        title: "Disco Stage Diorama",
        description: "A stage diorama visualization built with Three.js and custom shaders",
        image: "https://placehold.co/400x272/252525/FFF?text=Disco+Stage",
        url: "https://github.com/DanyElAlgo/Disco-stage-diorama",
        tags: ["Three.js", "3D"]
      },
      {
        title: "Busca Minas",
        description: "Classic minesweeper game implemented in JavaScript and HTML5 Canvas",
        image: "https://placehold.co/400x272/252525/FFF?text=Minesweeper",
        url: "https://github.com/EnriDv/BuscaMinas-EnriqueDiaz",
        tags: ["JS", "Canvas"]
      },
      {
        title: "Inventario",
        description: "Inventory management system using Python and SQLite",
        image: "https://placehold.co/400x272/252525/FFF?text=Inventario",
        url: "https://github.com/EnriDv/Inventario",
        tags: ["Python", "SQLite"]
      }
    ];

    // Estado inicial con manuales
    this.proyectos = [...this.manualProjects];
  }

  async connectedCallback() {
    this.render(); // Render inicial rápido
    await this.fetchGithubRepos(); // Carga asíncrona de GitHub
    
    // Escuchar eventos si es necesario
    window.addEventListener("projectschange", () => this.render());
  }

  async fetchGithubRepos() {
    try {
      // Pide repositorios ordenados por actualización
      const response = await fetch("https://api.github.com/users/EnriDv/repos?sort=updated&direction=desc");
      
      if (!response.ok) throw new Error("Error GitHub API");
      
      const data = await response.json();

      // Evitamos duplicados comparando URLs
      const manualUrls = this.manualProjects.map(p => p.url);
      
      const githubProjects = data
        .filter(repo => !manualUrls.includes(repo.html_url) && !repo.fork)
        .slice(0, 12)
        .map(repo => ({
          title: repo.name,
          description: repo.description || "Sin descripción disponible.",
          image: `https://placehold.co/400x272/1a1b22/FFF?text=${repo.name}`,
          url: repo.html_url,
          tags: [repo.language || "Code"]
        }));

      this.proyectos = [...this.manualProjects, ...githubProjects];
      this.render();

    } catch (error) {
      console.error("No se pudieron cargar repositorios de GitHub:", error);
    }
  }

  render() {
    if (!this.proyectosContainer) return;
    this.proyectosContainer.innerHTML = ""; 

    this.proyectos.forEach(p => {
      const article = document.createElement("article");
      article.className = "project-card";
      
      article.innerHTML = `
        <a href="${p.url}" target="_blank" class="project-link">
            <div class="image-container">
                <img src="${p.image}" alt="${p.title}" class="project-image" loading="lazy"/>
            </div>
            <div class="project-details">
                <h3 class="project-title">${p.title}</h3>
                <p class="project-description">${p.description}</p>
                ${p.tags ? `<div class="tag-container">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
            </div>
        </a>
      `;
      this.proyectosContainer.appendChild(article);
    });
  }
}

customElements.define("project-section", ProjectSection);