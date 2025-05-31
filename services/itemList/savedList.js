
import { observerMixin } from "../mixin.js";

export class SavedList {
  #data = new Map(); 

  static instance = new SavedList();
  static getInstance() {
    return this.instance;
  }
  constructor() {
    if (SavedList.instance) throw new Error("Use SavedList.getInstance()");
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

  get items() {
    return Array.from(this.#data.values());
  }
}

Object.assign(SavedList.prototype, observerMixin);
