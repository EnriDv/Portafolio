
import Router from "./services/Router.js";
import {AllPage, SavedPage} from "./pages/pages.js";
import { initializeBlog } from "./blocks/blog/blog.js";
import { ProjectSection } from "./blocks/projects/renderProject.js";
import { HomePage } from "./pages/home-page.js";
import {ArticlesPage} from "./pages/articles-page.js";
import { searchbar } from "./services/searchBar/search-bar.js";
import { SearchCommand, SearchCommandExecutor, SearchCommands } from "./services/searchBar/searchCommand.js";
import { LocalStorage } from "./services/storage.js";
import { loadData } from "./services/dataLoader.js";


globalThis.app = {};
globalThis.DOM = {};

const DOM = globalThis.DOM;
app.router = Router;
app.projects = {};
app.articles = {};
appState.favoriteItems = {};

window.addEventListener("DOMContentLoaded", () => {
  loadData();
  initializeBlog();
  app.router.init();
});
  

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "k") {
    event.preventDefault();
    const cmd = new SearchCommand(SearchCommands.FOCUS);
    SearchCommandExecutor.execute(cmd);
  }
  if (event.ctrlKey && event.key === "f") {
    event.preventDefault();
    const cmd = new SearchCommand(SearchCommands.ADD);
    SearchCommandExecutor.execute(cmd);
  }
});
