// renderSavedArticles.js
import { TodoList } from '../services/todoList.js';

export async function renderSavedArticles() {
  const res = await fetch('js/fakedata.json');
  const { articles } = await res.json();

  const container = document.getElementById('saved-container');
  container.innerHTML = `<h2 class="section-title">Artículos guardados</h2>
                         <div class="articles-grid"></div>`;
  const grid = container.querySelector('.articles-grid');

  const savedIds = Array.from(TodoList.getInstance().items).map(i => i.id);
  const saved = articles.filter(a => savedIds.includes(a.id));

  if (!saved.length) {
    grid.innerHTML = `<p>No tienes artículos guardados.</p>`;
  } else {
    const tpl = document.getElementById('article-template');
    saved.forEach(data => {
      const clone = tpl.content.cloneNode(true);
      clone.querySelector('.article-date').textContent = data.date;
      clone.querySelector('.article-title').textContent = data.title;
      clone.querySelector('.article-description').textContent = data.description;
      clone.querySelector('.read-more').href = data.url;
      // Eliminamos botones de acciones para la vista guardados:
      clone.querySelector('.article-actions').remove();
      grid.appendChild(clone);
    });
  }

  return container;
}