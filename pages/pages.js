
import { savedBlogItem, savedBlogList } from "../blocks/blog/blog_post.js";
import { Command, Commands, CommandExecutor } from "../services/command.js";


function dbGenerator(startIndex) {
  const posts = [];
  for (let i = 0; i < 5; i++) {
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

function attachBlogListeners(container) {
  container.addEventListener("click", event => {
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
      // Lanza comando SAVE
      const cmd = new Command(Commands.SAVE, { id, date, title, desc });
      CommandExecutor.execute(cmd);
    }
  });
}

export class AllPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section>
        <h2>All Blogs (Scroll Infinito)</h2>
        <div class="blog"></div>
      </section>`;
    this.list = this.querySelector(".blog");
    const sentinel = document.createElement("div");
    sentinel.className = "blog__sentinel";
    this.list.appendChild(sentinel);

    attachBlogListeners(this.list);

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) this.loadMore();
    }, { rootMargin: "100px" });

    observer.observe(sentinel);
    this.loadMore();
  }

  loadMore() {
    const current = this.list.querySelectorAll(".blog__post").length;
    const newPosts = dbGenerator(current);
    newPosts.forEach(post => {
      savedBlogList.getInstance().add(post);

      const savedState = localStorage.getItem(`post_${post.id}`);
      const isSaved = savedState != null;
      const item = document.createElement("article");
      item.className = "blog__post";
      item.dataset.postId = post.id;
      item.innerHTML = `
        <h6 class="blog__date">${post.date}</h6>
        <h3 class="blog__title">${post.title}</h3>
        <p class="blog__desc">${post.desc}</p>
        <button class="blog__save ${isSaved ? "blog__save--saved" : ""}">
          ${isSaved ? "Saved" : "Save"}
        </button>
      `;
      this.list.insertBefore(item, this.list.lastElementChild);
    });
  }
}

export class SavedPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section>
        <h2>Saved Blogs</h2>
        <div class="blog"></div>
      </section>`;
    this.list = this.querySelector(".blog");
    const savedItems = Array.from(savedBlogList.getInstance().items);
    savedItems.forEach(post => {
      const savedState = localStorage.getItem(`post_${post.id}`);
      const isSaved = savedState != null;
      const item = document.createElement("article");
      item.className = "blog__post";
      item.dataset.postId = post.id;
      item.innerHTML = `
        <h6 class="blog__date">${post.date}</h6>
        <h3 class="blog__title">${post.title}</h3>
        <p class="blog__desc">${post.desc}</p>
        <button class="blog__save ${isSaved ? "blog__save--saved" : ""}">
          ${isSaved ? "Saved" : "Save"}
        </button>
      `;
      this.list.appendChild(item);
    });
    attachBlogListeners(this.list);
  }
}

customElements.define("all-page", AllPage);
customElements.define("saved-page", SavedPage);
