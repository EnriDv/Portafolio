
window.addEventListener('DOMContentLoaded', () => {
  const proyectos = [
    {
      title: "Disco Stage Diorama",
      description: "A stage diorama visualization built with Three.js and custom shaders",
      image: "https://placehold.co/400x272",
      alt: "Disco Stage Diorama",
      url: "https://github.com/DanyElAlgo/Disco-stage-diorama"
    },
    {
      title: "Busca Minas",
      description: "Classic minesweeper game implemented in JavaScript and HTML5 Canvas",
      image: "https://placehold.co/400x272",
      alt: "Busca Minas",
      url: "https://github.com/EnriDv/BuscaMinas-EnriqueDiaz"
    },
    {
      title: "Inventario",
      description: "Inventory management system using Python and SQLite",
      image: "https://placehold.co/400x272",
      alt: "Inventario",
      url: "https://github.com/EnriDv/Inventario"
    }
  ]
  const articles = [
    {
      date: "March 20, 2025",
      title: "Microsoft Majorana 1",
      description: "The possibilities are insane. This could change computing as we know it.",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7299524815516807168/"
    },
    {
      date: "April 5, 2025",
      title: "Vibe Coding",
      description: "Una Nueva Era en la Ingeniería de Software.",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7312321735331106816/"
    },
    {
      date: "April 10, 2025",
      title: "RF-Pose",
      description: "La combinación de inteligencia artificial y señales inalámbricas.",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7322446822579281920/"
    }
  ]

    let memento = JSON.parse(localStorage.getItem('proyectosMemento')) || {
    likes: [0, 1, 5],
    liked: [false, false, false],
    saved: [false, false, false]
  };

  const proyectosContainer = document.getElementById('proyectos-lista');
  if (proyectosContainer) {
    proyectosContainer.innerHTML = "";
    proyectos.forEach(proyecto => {
      const article = document.createElement('article');
      article.className = 'project-card';
      article.innerHTML = `
        <a href="${proyecto.url}" target="_blank">
          <img src="${proyecto.image}" alt="${proyecto.alt}" class="project-image" />
          <div class="project-details">
            <h3 class="project-title">${proyecto.title}</h3>
            <p class="project-description">${proyecto.description}</p>
          </div>
        </a>
      `;
      proyectosContainer.appendChild(article);
    });
  }

const articulosContainer = document.getElementById('articulos-lista');
if (articulosContainer) {
  articulosContainer.innerHTML = "";
  articles.forEach((article, idx) => {
    const card = document.createElement('article');
    card.className = 'article-card';
    card.innerHTML = `
      <time class="article-date">${article.date}</time>
      <h3 class="article-title">${article.title}</h3>
      <p class="article-description">${article.description}</p>
      <a class="read-more" href="${article.url}" target="_blank">Leer artículo</a>
    `;

      const btnContainer = document.createElement('div');
      btnContainer.style.position = 'absolute';
      btnContainer.style.top = '10px';
      btnContainer.style.right = '10px';
      btnContainer.style.display = 'flex';
      btnContainer.style.gap = '10px';
      btnContainer.style.zIndex = '2';
      card.style.position = 'relative';

      const likeBtn = document.createElement('button');
      likeBtn.className = 'likebtn';
      likeBtn.innerHTML = `<span class="likebtn__icon">&#10084;</span> <span class="likebtn__count">${memento.likes[idx]}</span>`;
      if (memento.liked[idx]) likeBtn.classList.add('likebtn--active');
      likeBtn.addEventListener('click', function() {
        memento.liked[idx] = !memento.liked[idx];
        likeBtn.classList.toggle('likebtn--active', memento.liked[idx]);
        if (memento.liked[idx]) {
          memento.likes[idx]++;
        } else {
          memento.likes[idx]--;
        }
        likeBtn.querySelector('.likebtn__count').textContent = memento.likes[idx];
        localStorage.setItem('proyectosMemento', JSON.stringify(memento));
      });

      const saveBtn = document.createElement('button');
      saveBtn.className = 'savebtn';
      saveBtn.innerHTML = `<span class="savebtn__icon">&#x2606;</span>`;
      if (memento.saved[idx]) saveBtn.classList.add('savebtn--active');
      saveBtn.addEventListener('click', function() {
        memento.saved[idx] = !memento.saved[idx];
        saveBtn.classList.toggle('savebtn--active', memento.saved[idx]);
        localStorage.setItem('proyectosMemento', JSON.stringify(memento));
      });

      btnContainer.appendChild(likeBtn);
      btnContainer.appendChild(saveBtn);
      card.insertBefore(btnContainer, card.firstChild);

      articulosContainer.appendChild(card);
    });
  }
});