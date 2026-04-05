// blog.js
import { savedBlogItem, savedBlogList } from "./blog_post.js";
import { Command, Commands, CommandExecutor } from "../../services/command.js";


function renderInitialPosts() {
  const blogList = savedBlogList.getInstance();
  DOM.blogList.innerHTML = "";

  for (const post of blogList.items) {
    const savedState = localStorage.getItem(`post_${post.id}`);
    const isSaved = savedState != null;

    const item = document.createElement("article");
    item.classList.add("blog__post");
    item.dataset.postId = post.id;
    item.innerHTML = `
      <h6 class="blog__date">${post.date}</h6>
      <h3 class="blog__title">${post.title}</h3>
      <p class="blog__desc">${post.desc}</p>
      <button class="blog__save ${isSaved ? 'blog__save--saved' : ''}">
        ${isSaved ? 'Saved' : 'Save'}
      </button>
    `;
    DOM.blogList.appendChild(item);
  }
}

function attachBlogListeners() {
  DOM.blogList.addEventListener("click", (event) => {
    if (!event.target.classList.contains("blog__save")) return;

    const button = event.target;
    const postEl = button.closest(".blog__post");
    const id     = postEl.dataset.postId;
    const date   = postEl.querySelector(".blog__date").innerText;
    const title  = postEl.querySelector(".blog__title").innerText;
    const desc   = postEl.querySelector(".blog__desc").innerText;
    const isSaved = button.classList.contains("blog__save--saved");

    if (isSaved) {
      localStorage.removeItem(`post_${id}`);
      button.classList.remove("blog__save--saved");
      button.textContent = "Save";
    } else {
      localStorage.setItem(`post_${id}`, desc);
      button.classList.add("blog__save--saved");
      button.textContent = "Saved";

      const cmd = new Command(Commands.SAVE, { id, date, title, desc });
      CommandExecutor.execute(cmd);
    }
  });
}

function setup() {
  const sentinel = document.createElement('div');
  sentinel.className = 'blog__sentinel';
  DOM.blogList.appendChild(sentinel);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadMorePosts();
      }
    });
  }, {
    rootMargin: '100px'
  });

  observer.observe(sentinel);
}

function loadMorePosts() {
  const list = savedBlogList.getInstance();
  const currentCount = DOM.blogList.querySelectorAll('.blog__post').length;
  const newPosts = dbGenerator(currentCount);

  newPosts.forEach(post => list.add(post));

  for (const post of newPosts) {
    const savedState = localStorage.getItem(`post_${post.id}`);
    const isSaved = savedState != null;

    const item = document.createElement("article");
    item.classList.add("blog__post");
    item.dataset.postId = post.id;
    item.innerHTML = `
      <h6 class="blog__date">${post.date}</h6>
      <h3 class="blog__title">${post.title}</h3>
      <p contenteditable class="blog__desc">${ isSaved ? savedState : post.desc }</p>
      <button class="blog__save ${isSaved ? 'blog__save--saved' : ''}">
        ${isSaved ? 'Saved' : 'Save'}
      </button>
    `;
    DOM.blogList.insertBefore(item, DOM.blogList.lastElementChild);
  }
}

function dbGenerator(startIndex) {
  const posts = [];
  const count = 5;
  for (let i = 0; i < count; i++) {
    const id = startIndex + i + 1;
    posts.push(new savedBlogItem(
      id,
      new Date().toLocaleDateString(),
      `Blog Post ${id}`,
      `This is the description for blog post ${id}. Generated dynamically.`
    ));
  }
  return posts;
}

export function initializeBlog() {
  globalThis.DOM = globalThis.DOM || {};
  DOM.blogList = document.querySelector(".blog");
  if (!DOM.blogList) return;

  attachBlogListeners();
  setup();
}

window.addEventListener("DOMContentLoaded", initializeBlog);
