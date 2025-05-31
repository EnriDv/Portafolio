import "../data/projects.json"
export const API = {
  url1: "../data/articles.json",
  url2: "../data/projects.json",
  getArticles: async () => {
    const response = await fetch(API.url1);
    return await response.json();
  },
  getProjects: async () => {
    const response = await fetch(API.url2);
    return await response.json();
  },
};