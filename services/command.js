import { TodoHistory } from "./memento.js";
import { TodoItem, TodoList } from "./todoList.js";

export class Command {
  name;
  args;
  constructor(name, args) {
    this.name = name;
    this.args = args;
  }
}

export const Commands = {
  ADD: "add",
  DELETE: "delete",
  UNDO: "undo",
};

export const CommandExecutor = {
  execute(command) {
    const todoList = TodoList.getInstance();
    switch (command.name) {
      case Commands.ADD:
        const todoInput = globalThis.DOM.todoInput;
        const todoText = todoInput.value.trim();
        const todoToAdd = todoList.find(todoText);

        if (todoText !== "" && todoToAdd == undefined) {
          todoList.add(new TodoItem(todoText));
          todoInput.value = "";
        }
        break;
      case Commands.DELETE:
        const [texTodo] = command.args;
        todoList.delete(texTodo);
        break;
      case Commands.UNDO:
        const todos = TodoHistory.pop();
        todoList.replaceList(todos);
        break;
    }
  },
};
