const template = document.createElement("template");
template.innerHTML = 
`
<div class="searchbar">
    <input type= "text" id="searchbar">
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
    
  }
}

customElements.define("search-bar", searchbar);
