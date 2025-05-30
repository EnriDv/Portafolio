import { SearchCommand, SearchCommandExecutor, SearchCommands } from "./searchCommand.js";

const template = document.createElement("template");
template.innerHTML = 
`
<div id="searchbar">
    <input type= "text">
    <button id="search">
        <span">&#10137</span>
    </button>
<div>
`

export class searchbar extends HTMLElement {
  constructor() {
    super();
    
    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(template.content.cloneNode(true));
    
    const styles = document.createElement("style");
  }

  connectedCallback() {

    document.querySelector("div").addEventListener("click", (event) => {
        console.error(event)
        if(event.target.tagName.toLowerCase() == "search-bar")
        {
            console.error(event.target);
            const cmd = new SearchCommand(SearchCommands.SEARCH, {});
            SearchCommandExecutor.execute(cmd);
        }
        else
        {
            console.error(event.target.tagName.toLowerCase());
        }
    });
  }
}

customElements.define("search-bar", searchbar);
