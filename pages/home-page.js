const template = document.createElement("template");
template.innerHTML = `
  <main class="main-content">
    <section id="home" class="hero-section">
      <div class="section-container hero-container">
        <div class="hero-text">
          <span class="hero-greeting">Hola, soy</span>
          <h1 class="hero-title">Jose Enrique<br>Diaz Velarde</h1>
          <h2 class="hero-subtitle">Ingeniero de Software en formación & Full Stack Dev</h2>
          <p class="hero-description">
            Aporto liderazgo y comunicación efectiva. Especializado en crear soluciones escalables aplicando principios SOLID y patrones de diseño. 
            Experiencia en React, Angular, .NET y gráficos 3D con Three.js.
          </p>
          <div class="hero-buttons">
            <a href="/cv.pdf" target="_blank" class="btn btn-primary">Descargar CV</a>
          </div>
        </div>
        <div class="hero-visual">
           <div class="visual-circle"></div>
        </div>
      </div>
    </section>

    <section id="featured-projects" class="carousel-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">Proyectos Recientes</h2>
          <div class="carousel-controls">
            <button id="prevBtn" class="nav-btn">←</button>
            <button id="nextBtn" class="nav-btn">→</button>
          </div>
        </div>
        
        <div class="carousel-track-container" id="carousel-track">
           <p style="padding: 1rem; color: #666;">Cargando proyectos...</p>
        </div>

        <div class="center-action">
          <a href="projects" onclick="document.querySelector('app-router').loadRoute('projects')" class="see-all-btn">Ver todos los proyectos</a>
        </div>
      </div>
    </section>

    <section id="resume" class="resume-section">
      <div class="section-container">
        <h2 class="section-title">Trayectoria</h2>
        
        <div class="resume-grid">
          <div class="resume-column">
            <h3 class="subsection-title">Experiencia</h3>
            
            <div class="timeline-item">
              <span class="timeline-date">2025</span>
              <h4 class="timeline-role">Gestor de Salones de Belleza "Saly"</h4>
              <p class="timeline-tech">Kotlin • Android Studio</p>
              <p class="timeline-desc">Aplicación móvil para agendar citas, optimizando la gestión de tiempos y clientes.</p>
            </div>

            <div class="timeline-item">
              <span class="timeline-date">2025</span>
              <h4 class="timeline-role">Order Now</h4>
              <p class="timeline-tech">React • Supabase</p>
              <p class="timeline-desc">Aplicación clon de pedidos enfocada en la experiencia de usuario y gestión de datos en tiempo real.</p>
            </div>

            <div class="timeline-item">
              <span class="timeline-date">Pasantía</span>
              <h4 class="timeline-role">FocoAzul</h4>
              <p class="timeline-tech">React • WordPress • Elementor</p>
              <p class="timeline-desc">Diseño y maquetación de interfaces web y personalización de sitios corporativos.</p>
            </div>

             <div class="timeline-item">
              <span class="timeline-date">2024</span>
              <h4 class="timeline-role">Plataforma de Inventario</h4>
              <p class="timeline-tech">Angular • .NET • MariaDB</p>
              <p class="timeline-desc">Gestión de inventario para laboratorio aplicando arquitectura limpia y patrones de diseño.</p>
            </div>
          </div>

          <div class="resume-column">
            <h3 class="subsection-title">Educación & Certificaciones</h3>
            
            <div class="timeline-item">
              <span class="timeline-date">2023 - Presente</span>
              <h4 class="timeline-role">Licenciatura en Ingeniería de Software</h4>
              <p class="timeline-place">Universidad Católica Boliviana "San Pablo"</p>
            </div>

            <div class="timeline-item">
              <span class="timeline-date">May 2025</span>
              <h4 class="timeline-role">Basic Proficiency in KNIME</h4>
              <p class="timeline-place">Analytics Platform</p>
            </div>

            <div class="timeline-item">
              <span class="timeline-date">Nov 2024</span>
              <h4 class="timeline-role">JavaScript Essentials 1</h4>
              <p class="timeline-place">Cisco Networking Academy</p>
            </div>

             <div class="timeline-item">
              <span class="timeline-date">2024 - 2025</span>
              <h4 class="timeline-role">Competencia ICPC</h4>
              <p class="timeline-place">Participación activa en programación competitiva.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="contact-section">
      <div class="section-container">
        <h2 class="section-title">Hablemos</h2>
        <div class="contact-wrapper">
            <p class="contact-text">
                ¿Tienes un proyecto en mente o quieres colaborar? Estoy disponible para nuevas oportunidades.
            </p>
            
            <a href="mailto:dv.josenrique@gmail.com" class="email-link">dv.josenrique@gmail.com</a>
            
            <div class="social-links-row">
                <a href="https://github.com/EnriDv" target="_blank" class="social-btn">GitHub</a>
                <a href="https://linkedin.com/in/jose-enrique-diaz-velarde" target="_blank" class="social-btn">LinkedIn</a>
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

    this.loadStyles(styles);
  }

  async loadStyles(styleElement) {
    try {
        const repo = window.location.hostname.includes("github.io") ? "/Portafolio" : "";
        
        const mainCss = await fetch(`${repo}/blocks/main.css`).then(r => r.text());
        const homeCss = await fetch(`${repo}/blocks/home.css`).then(r => r.text());
        
        styleElement.textContent = mainCss + "\n" + homeCss;
    } catch (e) {
        console.warn("Error cargando CSS en HomePage:", e);
    }
  }

  connectedCallback() {
    this.fetchGithubProjects();
    this.setupCarouselEvents();
  }

  async fetchGithubProjects() {
    const track = this.root.getElementById('carousel-track');
    if(!track) return;

    try {
      const res = await fetch('https://api.github.com/users/EnriDv/repos?sort=updated&per_page=8');
      
      if(!res.ok) throw new Error("Error fetching repos");
      
      const data = await res.json();
      
      const projects = data
        .filter(repo => !repo.fork) 
        .map(repo => ({
           title: repo.name,
           desc: repo.description || "Sin descripción disponible.",
           tags: [repo.language || "Code"],
           url: repo.html_url,
           image: `https://placehold.co/400x250/1a1b22/FFF?text=${repo.name}`
        }));

      this.renderCarousel(projects);

    } catch (error) {
      console.error(error);
      track.innerHTML = `<p style="padding:1rem">No se pudieron cargar los proyectos. <a href="https://github.com/EnriDv" target="_blank">Ver en GitHub</a></p>`;
    }
  }

  renderCarousel(projects) {
    const track = this.root.getElementById('carousel-track');
    track.innerHTML = ''; 

    projects.forEach(p => {
        const card = document.createElement('a');
        card.className = 'carousel-card';
        card.href = p.url;
        card.target = "_blank";
        
        card.innerHTML = `
            <img src="${p.image}" alt="${p.title}" class="card-img" loading="lazy">
            <div class="card-body">
                <h3 class="card-title">${p.title}</h3>
                <p class="card-desc">${p.desc}</p>
                <div class="card-tags">
                    ${p.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
                </div>
            </div>
        `;
        track.appendChild(card);
    });
  }

  setupCarouselEvents() {
    const track = this.root.getElementById('carousel-track');
    const prevBtn = this.root.getElementById('prevBtn');
    const nextBtn = this.root.getElementById('nextBtn');

    if (prevBtn && nextBtn && track) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -340, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 340, behavior: 'smooth' });
        });
    }
  }
}

customElements.define("home-page", HomePage);