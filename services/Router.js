
const Router = {
  init() {
    document.querySelectorAll("a.header__nav-link").forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        const href = a.getAttribute("href");
        Router.go(href);
      });
    });
    window.addEventListener("popstate", e => {
      Router.go(e.state?.route || location.pathname, false);
    });
    Router.go(location.pathname, false);
  },

  go(route, addToHistory = true) {
    if (addToHistory) history.pushState({ route }, "", route);
    let pageEl = null;
    switch (route) {
      case "/home":
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
        pageEl = document.createElement("h1");
        pageEl.textContent = "Página no encontrada";
        break;
    }
    if (pageEl) {
      const main = document.querySelector("main");
      main.innerHTML = "";
      main.appendChild(pageEl);
      window.scrollTo(0, 0);
    }
  }
};

export default Router;
