
import { observerMixin } from "../mixin.js";

export class Item {
  constructor({ date, title, description, url }) {
    this.date = date;
    this.title = title;
    this.description = description;
    this.url = url;
  }
}

export class List
{
    #data = new Map();

  get items() {
    return Array.from(this.#data.values());
  }

  static instance = new List();
  static getInstance() {
    return this.instance;
  }
  constructor() {
    if (List.instance) {
      throw new Error("Use List.getInstance()");
    }
  }

  add(item) {
    if (!this.#data.has(item.url)) {
      this.#data.set(item.url, item);
      this.notify();
    }
  }

  delete(item) {
    if (this.#data.delete(item.url)) {
      this.notify();
    }
  }

  findByUrl(url) {
    return this.#data.get(url) || null;
  }

  
}

Object.assign(List.prototype, observerMixin);