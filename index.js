// js/index.js
import { observerMixin } from './services/mixins.js';
import { TodoList, TodoItem } from './services/todoList.js';
import { LocalStorage } from './services/localStorage.js';

// Exponemos contenedores en globalThis.DOM
globalThis.DOM = {
  homeSection: document.getElementById('home'),
  projectsContainer: document.getElementById('projects-container'),
  articlesContainer: document.getElementById('articles-container'),
  savedContainer: document.getElementById('saved-container'),
  projectTpl: document.getElementById('project-template'),
  articleTpl: document.getElementById('article-template'),
};

// Modelo sencillo para “Me gusta”
class ArticleModel {
  constructor(id) {
    this.id = id;
    this.liked = false;
    this.history = [];
  }
  toggleLike() {
    this.history.push(this.liked);
    this.liked = !this.liked;
    this.notify();
  }
}
Object.assign(ArticleModel.prototype, observerMixin);

async function renderProjects() {
  const res = await fetch('fakedata.json');
  const { projects } = await res.json();
  const container = DOM.projectsContainer;
  container.innerHTML = '<h2 class="section-title">Featured Projects</h2><div class="projects-grid"></div>';
  const grid = container.querySelector('.projects-grid');

  projects.forEach(p => {
    const clone = DOM.projectTpl.content.cloneNode(true);
    const link = clone.querySelector('a');
    link.href = p.url;
    const img = clone.querySelector('.project-image');
    img.src = p.image;
    img.alt = p.title;
    clone.querySelector('.project-title').textContent = p.title;
    clone.querySelector('.project-description').textContent = p.description;
    grid.appendChild(clone);
  });
}

async function renderArticles() {
  const res = await fetch('fakedata.json');
  const { articles } = await res.json();
  const container = DOM.articlesContainer;
  container.innerHTML = '<h2 class="section-title">Latest Articles</h2><div class="articles-grid"></div>';
  const grid = container.querySelector('.articles-grid');
  const todoList = TodoList.getInstance();

  articles.forEach(data => {
    const model = new ArticleModel(data.id);
    const clone = DOM.articleTpl.content.cloneNode(true);

    clone.querySelector('.article-date').textContent = data.date;
    clone.querySelector('.article-title').textContent = data.title;
    clone.querySelector('.article-description').textContent = data.description;
    clone.querySelector('.read-more').href = data.url;

    const saveBtn = clone.querySelector('.save-btn');
    const likeBtn = clone.querySelector('.like-btn');
    const likeCount = clone.querySelector('.like-count');

    const isSaved = () => !!todoList.find(data.id);
    const updateSaveUI = () => saveBtn.textContent = isSaved() ? '📌' : '📍';
    updateSaveUI();
    saveBtn.addEventListener('click', () => {
      isSaved() ? todoList.delete(data.id) : todoList.add(new TodoItem(data.id));
      updateSaveUI();
    });

    const updateLikeUI = () => {
      likeCount.textContent = model.liked ? '1' : '0';
      likeBtn.style.opacity = model.liked ? '1' : '0.6';
    };
    model.addObserver(updateLikeUI);
    updateLikeUI();
    likeBtn.addEventListener('click', () => model.toggleLike());

    grid.appendChild(clone);
  });
}

async function renderSaved() {
  const res = await fetch('fakedata.json');
  const { articles } = await res.json();
  const container = DOM.savedContainer;
  container.innerHTML = '<h2 class="section-title">Artículos guardados</h2><div class="articles-grid"></div>';
  const grid = container.querySelector('.articles-grid');
  const savedIds = Array.from(TodoList.getInstance().items).map(i => i.id);
  const saved = articles.filter(a => savedIds.includes(a.id));

  if (!saved.length) {
    grid.innerHTML = '<p>No tienes artículos guardados.</p>';
  } else {
    saved.forEach(data => {
      const clone = DOM.articleTpl.content.cloneNode(true);
      clone.querySelector('.article-date').textContent = data.date;
      clone.querySelector('.article-title').textContent = data.title;
      clone.querySelector('.article-description').textContent = data.description;
      clone.querySelector('.read-more').href = data.url;
      clone.querySelector('.article-actions').remove();
      grid.appendChild(clone);
    });
  }
}

const Router = {
  init() {
    document.querySelectorAll('a.nav-link').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        location.hash = a.getAttribute('href');
      });
    });
    window.addEventListener('hashchange', () => this.go(location.hash));
    this.go(location.hash);
  },
  async go(hash) {
    ['homeSection','projectsContainer','articlesContainer','savedContainer']
      .forEach(id => DOM[id].style.display = 'none');

    switch (hash || '#/') {
      case '#/':
        DOM.homeSection.style.display = 'block';
        break;
      case '#/projects':
        DOM.projectsContainer.style.display = 'block';
        await renderProjects();
        break;
      case '#/articles':
        DOM.articlesContainer.style.display = 'block';
        await renderArticles();
        break;
      case '#/saved':
        DOM.savedContainer.style.display = 'block';
        await renderSaved();
        break;
      default:
        DOM.homeSection.style.display = 'block';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  LocalStorage.load();      
  Router.init();            
});