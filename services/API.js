export const API = {
  articlesUrl: "../data/articles.json",
  projectsUrl: "../data/projects.json",
  getArticles: async () => {
    const response = await fetch(API.articlesUrl);
    if (!response.ok) {
      throw new Error(`Error cargando artículos: ${response.status}`);
    }
    return response.json();
  },
  getProjects: async () => {
    const response = await fetch(API.projectsUrl);
    if (!response.ok) {
      throw new Error(`Error cargando proyectos: ${response.status}`);
    }
    return response.json();
  },
};
