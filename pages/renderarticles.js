// renderArticles.js
import { observerMixin } from '../services/mixins.js';
import { TodoItem, TodoList } from '../services/todoList.js';

const todoList = TodoList.getInstance();

class ArticleModel {
  constructor(id) {
    this.id = id;
    this.liked = false;
    this.history = [];
  }
  toggleLike() { this.history.push(this.liked); this.liked = !this.liked; this.notify(); }
  undoLike() { if (this.history.length) { this.liked = this.history.pop(); this.notify(); } }
}
Object.assign(ArticleModel.prototype, observerMixin);

export async function renderArticles() {
  const res = await fetch('js/fakedata.json');
  const { articles } = await res.json();

  const container = document.getElementById('articles-container');
  container.innerHTML = `<h2 class="section-title">Latest Articles</h2>
                         <div class="articles-grid"></div>`;
  const grid = container.querySelector('.articles-grid');
  const tpl = document.getElementById('article-template');

  articles.forEach(data => {
    const model = new ArticleModel(data.id);
    const clone = tpl.content.cloneNode(true);

    clone.querySelector('.article-date').textContent = data.date;
    clone.querySelector('.article-title').textContent = data.title;
    clone.querySelector('.article-description').textContent = data.description;
    const readMore = clone.querySelector('.read-more');
    readMore.href = data.url;

    const saveBtn = clone.querySelector('.save-btn');
    const likeBtn = clone.querySelector('.like-btn');
    const likeCount = clone.querySelector('.like-count');

    // Guardar
    const isSaved = () => !!todoList.find(data.id);
    const updateSaveUI = () => saveBtn.textContent = isSaved() ? '📌' : '📍';
    updateSaveUI();
    saveBtn.addEventListener('click', () => {
      if (isSaved()) todoList.delete(data.id);
      else todoList.add(new TodoItem(data.id));
      updateSaveUI();
    });

    // Me gusta
    const updateLikeUI = () => {
      likeCount.textContent = model.liked ? '1' : '0';
      likeBtn.style.opacity = model.liked ? '1' : '0.6';
    };
    model.addObserver(updateLikeUI);
    updateLikeUI();
    likeBtn.addEventListener('click', () => model.toggleLike());

    grid.appendChild(clone);
  });

  return container;
}