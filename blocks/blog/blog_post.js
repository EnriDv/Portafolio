import { observerMixin } from "../../services/mixin.js";

export class savedBlogItem {
    constructor(id, date, title, desc) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.desc = desc;
    }
}

export class savedBlogList {
    #data = new Set();

    get items() {
        return this.#data;
    }

    static instance = null;
    static {
        this.instance = new savedBlogList();
    }

    constructor() {
        if (savedBlogList.instance) {
            console.log("INSTANCIA REPETIDA");
        }
    }

    static getInstance() {
        return this.instance;
    }

    add(item) {
        const exists = Array.from(this.#data).some(t => t.title === item.title);
        if (!exists) {
            this.#data.add(item);
            this.notify();
        }
    }

    remove(item) {
        this.#data.forEach((e) => {
            if (e.title === item.title) {
                this.#data.delete(e);
                this.notify();
            }
        });
    }

    find(title) {
        return Array.from(this.#data).find(t => t.title === title);
    }
}

Object.assign(savedBlogList.prototype, observerMixin);
