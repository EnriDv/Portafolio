// renderProjects.js
export async function renderProjects() {
  const res = await fetch('js/fakedata.json');
  const { projects } = await res.json();

  const container = document.getElementById('projects-container');
  container.innerHTML = `<h2 class="section-title">Featured Projects</h2>
                         <div class="projects-grid"></div>`;
  const grid = container.querySelector('.projects-grid');

  const tpl = document.getElementById('project-template');

  projects.forEach(proj => {
    const clone = tpl.content.cloneNode(true);
    const link = clone.querySelector('a');
    link.href = proj.url;

    const img = clone.querySelector('.project-image');
    img.src = proj.image;
    img.alt = proj.title;

    clone.querySelector('.project-title').textContent = proj.title;
    clone.querySelector('.project-description').textContent = proj.description;

    grid.appendChild(clone);
  });

  return container;
}