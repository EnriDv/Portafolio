import { savedBlogItem, savedBlogList } from "../blocks/blog/blog_post.js";
import saveModal from "./saveModal.js";

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
    SAVE: "save"
};

export const CommandExecutor = {
    execute(command) {
        const list = savedBlogList.getInstance();

        switch (command.name) {
            case Commands.SAVE:
                const { id, date, title, desc } = command.args;
                const item = new savedBlogItem(id, date, title, desc);
                list.add(item);
                saveModal.showMessage("Artículo guardado", "info");
                break;
        }
    }
};