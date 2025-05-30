
import Router from "./services/Router.js";
import {AllPage, SavedPage} from "./pages/pages.js";
import { initializeBlog } from "./blocks/blog/blog.js";
import { ProjectSection } from "./blocks/projects/renderProject.js";
import { HomePage } from "./pages/home-page.js";
import { ArticlesList } from "./pages/articles-page.js";
import { searchbar } from "./services/searchBar/search-bar.js";
import { SearchCommand, SearchCommandExecutor, SearchCommands } from "./services/searchBar/searchCommand.js";
import { List, Item } from "./services/itemList/ItemList.js";
import { LocalStorage } from "./services/storage.js";

globalThis.app = {};
globalThis.DOM = {};

const DOM = globalThis.DOM;
app.router = Router;

function renderList() {
  const todos = List.getInstance();
  DOM.todoList.innerHTML = "";
  for (let todo of todos.items) {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    listItem.innerHTML = `${todo.text} 
                <button class="delete-btn">Delete</button>`;
    listItem.dataset.text = todo.text;
    DOM.todoList.appendChild(listItem);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeBlog();
  app.router.init()

  DOM.todoList = document.getElementById("todo-list");
  DOM.addBtn = document.getElementById("add-btn");
  DOM.todoInput = document.getElementById("todo-input");

    DOM.addBtn.addEventListener("click", () => {
    const cmd = new SearchCommand(SearchCommands.ADD);
    SearchCommandExecutor.execute(cmd);
  });

  DOM.todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const todo = event.target.parentNode.dataset.text;
    const cmd = new SearchCommand(SearchCommands.DELETE);
    SearchCommandExecutor.execute(cmd);
    }
  });

  LocalStorage.load();

  renderList();
  List.getInstance().addObserver(renderList);
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
