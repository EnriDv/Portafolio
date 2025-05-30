
import Router from "./services/Router.js";
import {AllPage, SavedPage} from "./pages/pages.js";
import { initializeBlog } from "./blocks/blog/blog.js";
import { ProjectSection } from "./blocks/projects/renderProject.js";
import { HomePage } from "./pages/home-page.js";
import { ArticlesList } from "./pages/articles-page.js";

globalThis.app = {};
app.router = Router;

window.addEventListener('DOMContentLoaded', () => {
  initializeBlog();
  app.router.init()
});