
const template = document.createElement("template");
template.innerHTML = `
  <main class="main-content">
    <section id="home" class="hero-section">
      <div class="section-container">
        <h1 class="hero-title">Jose Enrique Diaz Velarde</h1>
        <p class="hero-description">
          Front End Designer | Angular | .NET | Agile Methodology | Software Engineering Student
        </p>
        <p class="hero-description">Santa Cruz, Bolivia</p>
      </div>
    </section>


    <section id="about" class="about-section">
      <div class="section-container">
        <h2 class="section-title">About Me</h2>
        <div class="about-grid">
          <div class="profile-container">
            <h3 class="subsection-title">Profile</h3>
            <p class="profile-description">
              Soy José Enrique Díaz Velarde, Front End Designer especializado en Angular y .NET con metodología Agile. Apasionado por crear interfaces intuitivas y eficientes.
            </p>
            <h3 class="subsection-title">Education & Experience</h3>
            <p class="profile-description">
              Estudiante de Ingeniería de Software y Diseñador Front End con experiencia en proyectos universitarios y colaborativos.
            </p>
            <p class="profile-description">
              Actualmente en formación continua y participando en la comunidad de desarrollo en Santa Cruz, Bolivia.
            </p>
            <a href="https://www.linkedin.com/in/jose-enrique-diaz-velarde/" target="_blank" class="profile-link">
              Ver perfil completo en LinkedIn
            </a>
          </div>
          <div class="skills-container">
            <h3 class="subsection-title">Skills & Hobbies</h3>
            <div class="skills-list">
              <div class="skill-item"><p class="skill-name">Angular</p></div>
              <div class="skill-item"><p class="skill-name">.NET</p></div>
              <div class="skill-item"><p class="skill-name">HTML & CSS</p></div>
              <div class="skill-item"><p class="skill-name">JavaScript</p></div>
            </div>
            <h3 class="subsection-title">Hobbies</h3>
            <div class="hobbies-container">
              <span class="tag">Photography</span>
              <span class="tag">Travel</span>
              <span class="tag">Reading</span>
              <span class="tag">Music</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="contact-section">
      <div class="section-container">
        <h2 class="section-title">Contact Me</h2>
        <div class="contact-grid">
          <div class="contact__form-container">
            <form id="contact-form">
              <div class="contact__form-group">
                <input type="text" placeholder="Your Name" class="contact__form-input" id="name-input" />
              </div>
              <div class="contact__form-group">
                <input type="email" placeholder="Your Email" class="contact__form-input" id="email-input" />
              </div>
              <div class="contact__form-group">
                <textarea placeholder="Your Message" class="contact__form-textarea" id="message-input"></textarea>
              </div>
              <button type="submit" class="contact__submit-button">Send Message</button>
            </form>
            <div class="contact__success-message" id="form-success" hidden>
              Thank you for your message! I'll get back to you soon.
            </div>
          </div>
          <div class="contact__info-social-container">
            <div class="contact__info-container">
              <h3 class="contact__title">Contact Information</h3>
              <p class="contact__item">
                Email: 
                <a href="mailto:dv.josenrique@gmail.com" target="_blank">dv.josenrique@gmail.com</a>
              </p>
              <p class="contact__item">
                GitHub: 
                <a href="https://github.com/EnriDv" target="_blank">github.com/EnriDv</a>
              </p>
              <p class="contact__item">Location: Santa Cruz, Bolivia</p>
            </div>
            <div class="contact__social-container">
              <h3 class="contact__title">Social Media</h3>
              <div class="contact__social-links">
                <!-- Tus SVGs aquí -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
`;

export class HomePage extends HTMLElement {
  constructor() {
    super();
    
    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(template.content.cloneNode(true));
    
    const styles = document.createElement("style");
    this.root.appendChild(styles);
    async function loadCSS() {
      const res = await fetch("/pages/index.css");
      const css = await res.text();
      styles.textContent = css;
    }
    loadCSS();
  }

  connectedCallback() {
    
  }
}

customElements.define("home-page", HomePage);
