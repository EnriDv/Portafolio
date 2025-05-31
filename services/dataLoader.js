import { API } from "./API.js";
export async function loadData() {
  app.projects = await API.getProjects();
  app.articles = await API.getArticles();
}