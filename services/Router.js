const Router = {
  basePath: window.location.hostname.includes("github.io") ? "/Portafolio" : "",

  init() {
    document.querySelectorAll("a.header__nav-link").forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        
        let href = a.getAttribute("href");
        
        if (href.startsWith("./")) {
            href = href.slice(1); 
        }
        if (!href.startsWith("/")) {
            href = "/" + href;
        }

        Router.go(href);
      });
    });

    window.addEventListener("popstate", e => {
      let path = location.pathname;
      
      if (this.basePath && path.toLowerCase().startsWith(this.basePath.toLowerCase())) {
          path = path.slice(this.basePath.length);
      }
      
      Router.go(path || "/", false);
    });

    let initialPath = location.pathname;
    
    if (this.basePath && initialPath.toLowerCase().startsWith(this.basePath.toLowerCase())) {
        initialPath = initialPath.slice(this.basePath.length);
    }

    if (initialPath === "" || initialPath === ".") initialPath = "/";

    Router.go(initialPath, false);
  },

  go(route, addToHistory = true) {
    if (route.startsWith("./")) {
        route = route.slice(1);
    }
    if (!route.startsWith("/")) {
        route = "/" + route;
    }

    console.log("Navegando a:", route); 

    if (addToHistory) {
      history.pushState({ route }, "", this.basePath + route);
    }

    let pageEl = null;

    switch (route) {
      case "/":
        pageEl = document.createElement("home-page"); 
        break;
      case "/index.html":
        pageEl = document.createElement("home-page");
        break;
      case "/projects":
        pageEl = document.createElement("project-section");
        break;
      case "/articles":
        pageEl = document.createElement("articles-list");
        break;
      default:
        console.warn("Ruta no reconocida:", route, "Redirigiendo a Home.");
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