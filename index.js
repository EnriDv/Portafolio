
const projectsContainer = document.getElementById('projects-container');
const articlesContainer = document.getElementById('articles-container');
const projectTpl = document.getElementById('project-card-template');
const articleTpl = document.getElementById('article-card-template');

function renderList(dataArray, container, tpl, mapper) {
  dataArray.forEach(item => {
    const clone = tpl.content.cloneNode(true);
    mapper(clone, item);
    container.appendChild(clone);
  });
}

function mapProject(clone, project) {
  const link = clone.querySelector('.project-link');
  link.href = project.url;

  const img = clone.querySelector('.project-image');
  img.src = project.image;
  img.alt = project.alt;

  clone.querySelector('.project-title').textContent = project.title;
  clone.querySelector('.project-description').textContent = project.description;
}

function mapArticle(clone, article) {
  clone.querySelector('.article-date').textContent = article.date;
  clone.querySelector('.article-title').textContent = article.title;
  clone.querySelector('.article-description').textContent = article.description;

  const readMore = clone.querySelector('.read-more');
  readMore.href = article.url;
}

fetch('./data/fake_data.json')
  .then(res => res.json())
  .then(({ projects, articles }) => {
    renderList(projects, projectsContainer, projectTpl, mapProject);
    renderList(articles, articlesContainer, articleTpl, mapArticle);
  })
  .catch(err => console.error('Error cargando datos:', err));
