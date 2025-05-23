import { TodoItem, TodoList } from './todoList.js';

export const LocalStorage = {
  load() {
    const stored = localStorage.getItem('savedArticles');
    if (stored) {
      JSON.parse(stored).forEach(a => {
        TodoList.getInstance().add(new TodoItem(a.id));
      });
    }
  },
  save() {
    const list = Array.from(TodoList.getInstance().items).map(i => ({ id: i.text }));
    localStorage.setItem('savedArticles', JSON.stringify(list));
  }
};

import { TodoList } from './todoList.js';
TodoList.getInstance().addObserver(LocalStorage.save);