const Router = {
basePath: window.location.hostname.includes("github.io") ? "/Portafolio" : "",

  init() {
    document.querySelectorAll("a.header__nav-link").forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        const href = a.getAttribute("href");
        Router.go(href);
      });
    });

    window.addEventListener("popstate", e => {
      let path = location.pathname;
      if (this.basePath && path.startsWith(this.basePath)) {
          path = path.replace(this.basePath, "");
      }
      Router.go(path || "/", false);
    });

    let initialPath = location.pathname;
    
    if (this.basePath && initialPath.startsWith(this.basePath)) {
        initialPath = initialPath.replace(this.basePath, "");
    }

    Router.go(initialPath || "/", false);
  },

  go(route, addToHistory = true) {
    if (addToHistory) {
      history.pushState({ route }, "", this.basePath + route);
    }

    let pageEl = null;

    switch (route) {
      case "/":
      case "/index.html":
        pageEl = document.createElement("home-page");
        break;
      case "/all":
        pageEl = document.createElement("all-page");
        break;
      case "/saved":
        pageEl = document.createElement("saved-page");
        break;
      case "/projects":
        pageEl = document.createElement("project-section");
        break;
      case "/articles":
        pageEl = document.createElement("articles-list");
        break;
      default:
        pageEl = document.createElement("home-page"); 

        break;
    }

    if (pageEl) {
      const main = document.querySelector("main"); 
      if (main) {
        main.innerHTML = "";
        main.appendChild(pageEl);
        window.scrollTo(0, 0);
      } else {
        console.error("No se encontró el elemento <main> en el HTML");
      }
    }
  }
};

export default Router;