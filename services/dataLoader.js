// src/dataLoader.js
import { API } from "./API.js";
import { List } from "./itemList/ItemList.js";

export async function loadData() {
  const { articles } = await API.getArticles();
  const list = List.getInstance();
  articles.forEach(a => list.add(a));

  window.dispatchEvent(new CustomEvent("articleschange"));
}
