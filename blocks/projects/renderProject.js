// project-section.js

const template = document.createElement("template");
template.innerHTML = `
  <div class="projects-grid" id="proyectos-lista"></div>
`;

export class ProjectSection extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    this.root.appendChild(template.content.cloneNode(true));

    this.proyectosContainer = this.root.getElementById("proyectos-lista");

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
    this.proyectos = app.projects;
  }

  connectedCallback() {
    this.render();

    window.addEventListener("projectschange", () => this.render());
  }

  render() {
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