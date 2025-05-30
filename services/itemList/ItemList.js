
import { observerMixin } from "../mixin.js";

export class Item{
    constructor(text){
        this.text = text;
    }
}

export class List
{
    #data = new Set();

    get items()
    {
        return this.#data;
    }

    static instance = null;
    static {
        this.instance = new List();
    }

    constructor()
    {
        if (List.instance)
        {
            throw new Error("Use get instance");
        }
    }

    static getInstance(){
        return this.instance;
    }

     add(Item){
        const array = Array.from(this.#data);
        const todoExist = array.filter((t) => t.text == Item.text).length > 1;
        if (todoExist)
        {
            this.add.add(Item)
            this.notify();
        }

    }
     delete(Item){
        const array = Array.from(this.#data);
        const Exist = array.filter((t) => t.text == Item.text).length > 1;
        if (Exist)
        {
            this.add.delete(Item)
            this.notify();
        }
    }

    find(Item){
        const array = Array.from(this.#data);
        return array.find((t) => t.text == Item.text);
    }
}

Object.assign(List.prototype, observerMixin)