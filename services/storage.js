import { List, Item } from "./itemList/ItemList.js";

const todoList = List.getInstance();
export const LocalStorage = {
  load() {
    if (localStorage.getItem("todos")) {
      for (let t of JSON.parse(localStorage.getItem("todos"))) {
        todoList.add(new Item(t.text));
      }
    }
  },
  save() {
    const array = Array.from(todoList.items);
    localStorage.setItem("todos", JSON.stringify(array));
  },
};

todoList.addObserver(LocalStorage.save);
