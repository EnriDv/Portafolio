const template = document.createElement("template");
template.innerHTML = 
`
    <button id="save-buton">
        <span">SAVE</span>
    </button>
`

export class savebutton extends HTMLElement {
  constructor() {
    super();
    this.root.appendChild(template.content.cloneNode(true));
    
    const styles = document.createElement("style");
  }

  connectedCallback() {
    
  }
}

customElements.define("save-button", savebutton);
