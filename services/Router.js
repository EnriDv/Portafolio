
export const Router = {
  init() {
    // click en nav-links
    document.querySelectorAll("a.nav-link").forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        // new hash
        const hash = a.getAttribute("href");
        location.hash = hash;
      });
    });

    window.addEventListener("hashchange", () => this.go(location.hash));
    this.go(location.hash); // ruta inicial
  },

  async go(hash) {
    const route = hash || "#/";

    document.getElementById("projects-container").innerHTML = "";
    document.getElementById("articles-container").innerHTML = "";
    document.getElementById("saved-container").innerHTML = "";

    switch (route) {
      case "#/":
        break;

      case "#/projects": {
        const { renderProjects } = await import("../pages/renderprojects.js");
        renderProjects();
        break;
      }

      case "#/articles": {
        const { renderArticles } = await import("./renderarticles.js");
        renderArticles();
        break;
      }

      case "#/saved": {
        const { renderSavedArticles } = await import("./rendersavedarticles.js");
        renderSavedArticles();
        break;
      }

      default:
        console.warn("Ruta no encontrada:", route);
    }
  }
};