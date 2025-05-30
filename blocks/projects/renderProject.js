// project-section.js

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

    // 3) Buscar el contenedor de proyectos dentro del shadowRoot
    this.proyectosContainer = this.root.getElementById("proyectos-lista");

    // 4) Cargar tu CSS
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

    // 5) Datos de ejemplo
    this.proyectos = [
    {
      title: "Disco Stage Diorama",
      description: "A stage diorama visualization built with Three.js and custom shaders",
      image: "https://placehold.co/400x272",
      alt: "Disco Stage Diorama",
      url: "https://github.com/DanyElAlgo/Disco-stage-diorama"
    },
    {
      title: "Busca Minas",
      description: "Classic minesweeper game implemented in JavaScript and HTML5 Canvas",
      image: "https://placehold.co/400x272",
      alt: "Busca Minas",
      url: "https://github.com/EnriDv/BuscaMinas-EnriqueDiaz"
    },
    {
      title: "Inventario",
      description: "Inventory management system using Python and SQLite",
      image: "https://placehold.co/400x272",
      alt: "Inventario",
      url: "https://github.com/EnriDv/Inventario"
    }
  ]
  }

  connectedCallback() {
    // 6) Renderizo los proyectos
    this.render();

    // 7) Si quieres re-renderizar cuando dispares un evento
    window.addEventListener("projectschange", () => this.render());
  }

  render() {
    if (!this.proyectosContainer) {
      console.error("No encontré #proyectos-lista en el shadowRoot");
      return;
    }
    this.proyectosContainer.innerHTML = ""; // Limpiar antes de re-renderizar

    // 8) Renderizado
    this.proyectos.forEach(p => {
      const article = document.createElement("article");
      article.className = "project-card";
      article.innerHTML = `
        <div style="padding-top: 20px">
          <a href="${p.url}" target="_blank">
            <img src="${p.image}" alt="${p.alt}" class="project-image" />
            <div class="project-details">
              <h3 class="project-title">${p.title}</h3>
              <p class="project-description">${p.description}</p>
            </div>
          </a>
        </div>
      `;
      this.proyectosContainer.appendChild(article);
    });
  }
}

customElements.define("project-section", ProjectSection);