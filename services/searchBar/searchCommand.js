import { List, Item } from "../itemList/ItemList.js";

export class SearchCommand {
    name;
    args;
    constructor(name, args) {
        this.name = name;
        this.args = args;
    }
}

export const SearchCommands = {
    ADD: "add",
    DELETE: "delete",
    SEARCH: "search",
    FOCUS: "focus",
};

export const SearchCommandExecutor = {
    execute(command) {
        const list = List.getInstance();
        switch (command.name) {
            case SearchCommands.FOCUS:
                const inputElement = document.getElementById("searchbar");
                inputElement.focus();
                break;
            case SearchCommands.SEARCH:
                
                alert("buscar" + command.args);
                console.error(list.find(command.args))
            case SearchCommands.ADD:
                const todoInput = globalThis.DOM.todoInput;
                const todoText = todoInput.value.trim();
                const todoToAdd = list.find(todoText);

                if (todoText !== "" && todoToAdd == undefined) {
                list.add(new Item(todoText));
                todoInput.value = "";
                }
                break;
            case SearchCommands.DELETE:
                const [texTodo] = command.args;
                todoList.delete(texTodo);
                break;
        }
    }

};