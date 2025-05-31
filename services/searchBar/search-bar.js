// services/searchBar/search-bar.js
import { SearchCommand, SearchCommandExecutor, SearchCommands } from "./searchCommand.js";

const template = document.createElement("template");
template.innerHTML = `
  <div id="searchbar">
    <input id="search-input" type="text" " />
    <button id="search-btn">
      <span>&#10137;</span>
    </button>
  </div>
`;

export class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(template.content.cloneNode(true));

    const styles = document.createElement("style");
    styles.textContent = `
      #searchbar { display: flex; gap: 0.5rem; }
      input { flex: 1; padding: 0.5rem; }
      button { padding: 0.5rem; }
    `;
    this.root.appendChild(styles);
  }

  connectedCallback() {
    const inputEl  = this.root.querySelector("#search-input");
    const buttonEl = this.root.querySelector("#search-btn");

    buttonEl.addEventListener("click", () => {
      const query = inputEl.value.trim();
      const cmd = new SearchCommand(SearchCommands.SEARCH, query);
      SearchCommandExecutor.execute(cmd);
    });

    inputEl.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        buttonEl.click();
      }
    });
    
  }
  focusInside() {
    this.root.querySelector("#search-input").focus();
  }
  
}

customElements.define("search-bar", SearchBar);
