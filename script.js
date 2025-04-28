(() => {
    // State management
    const state = {
      activeTab: "home",
      menuOpen: false,
      formData: {
        name: "",
        email: "",
        message: "",
      },
      formSubmitted: false,
      skills: {
        backend: 85,
        frontend: 90,
        devops: 75,
        design: 80,
      },
    };
  
    // DOM elements
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const contactForm = document.getElementById("contact-form");
    const nameInput = document.getElementById("name-input");
    const emailInput = document.getElementById("email-input");
    const messageInput = document.getElementById("message-input");
    const formSuccess = document.getElementById("form-success");
  
    // Skill bars
    const backendSkill = document.getElementById("backend-skill");
    const frontendSkill = document.getElementById("frontend-skill");
    const devopsSkill = document.getElementById("devops-skill");
    const designSkill = document.getElementById("design-skill");
  
    // Navigation links
    const navLinks = {
      desktop: {
        home: document.getElementById("nav-home"),
        projects: document.getElementById("nav-projects"),
        blog: document.getElementById("nav-blog"),
        about: document.getElementById("nav-about"),
        contact: document.getElementById("nav-contact"),
      },
      mobile: {
        home: document.getElementById("mobile-nav-home"),
        projects: document.getElementById("mobile-nav-projects"),
        blog: document.getElementById("mobile-nav-blog"),
        about: document.getElementById("mobile-nav-about"),
        contact: document.getElementById("mobile-nav-contact"),
      },
    };
  
    // Initialize the application
    function init() {
      // Set initial active tab
      updateActiveTab(state.activeTab);
  
      // Set skill bar widths
      updateSkillBars();
  
      // Add event listeners
      addEventListeners();
    }
  
    // Add event listeners
    function addEventListeners() {
      // Menu toggle
      menuToggle.addEventListener("click", toggleMobileMenu);
  
      // Navigation links
      for (const tab in navLinks.desktop) {
        navLinks.desktop[tab].addEventListener("click", () => {
          setActiveTab(tab);
        });
  
        navLinks.mobile[tab].addEventListener("click", () => {
          setActiveTab(tab);
          toggleMobileMenu();
        });
      }
  
      // Contact form
      contactForm.addEventListener("submit", handleFormSubmit);
      nameInput.addEventListener("input", (e) =>
        updateFormData("name", e.target.value),
      );
      emailInput.addEventListener("input", (e) =>
        updateFormData("email", e.target.value),
      );
      messageInput.addEventListener("input", (e) =>
        updateFormData("message", e.target.value),
      );
    }
  
    // Toggle mobile menu
    function toggleMobileMenu() {
      state.menuOpen = !state.menuOpen;
      mobileMenu.hidden = !state.menuOpen;
    }
  
    // Set active tab
    function setActiveTab(tab) {
      state.activeTab = tab;
      updateActiveTab(tab);
    }
  
    // Update active tab styling
    function updateActiveTab(tab) {
      // Reset all tabs
      for (const key in navLinks.desktop) {
        navLinks.desktop[key].style.color = "#000";
        navLinks.mobile[key].style.color = "#000";
      }
  
      // Set active tab
      navLinks.desktop[tab].style.color = "#2F71E5";
      navLinks.mobile[tab].style.color = "#2F71E5";
    }
  
    // Update form data
    function updateFormData(field, value) {
      state.formData[field] = value;
    }
  
    // Handle form submission
    function handleFormSubmit(e) {
      e.preventDefault();
  
      // Simple validation
      if (
        !state.formData.name ||
        !state.formData.email ||
        !state.formData.message
      ) {
        alert("Please fill in all fields");
        return;
      }
  
      // Show success message
      state.formSubmitted = true;
      formSuccess.hidden = false;
  
      // Reset form
      contactForm.reset();
      state.formData = {
        name: "",
        email: "",
        message: "",
      };
  
      // Hide success message after 5 seconds
      setTimeout(() => {
        state.formSubmitted = false;
        formSuccess.hidden = true;
      }, 5000);
    }
  
    // Update skill bars
    function updateSkillBars() {
      backendSkill.style.width = `${state.skills.backend}%`;
      frontendSkill.style.width = `${state.skills.frontend}%`;
      devopsSkill.style.width = `${state.skills.devops}%`;
      designSkill.style.width = `${state.skills.design}%`;
    }
  
    // Initialize the application
    init();
  })();
  