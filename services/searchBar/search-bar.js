const template = document.createElement("template");
template.innerHTML = 
`
<input type= "text" >
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
