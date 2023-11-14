/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll(".nav_link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLinks.forEach((link) => link.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills_content");
const skillsHeader = document.querySelectorAll(".skills_header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills_content skills_close";
  }

  if (itemClass === "skills_content skills_close") {
    this.parentNode.className = "skills_content skills_open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification_active");
    });
    target.classList.add("qualification_active");

    tabs.forEach((otherTab) => {
      otherTab.classList.remove("qualification_active");
    });
    tab.classList.add("qualification_active");
  });
});

/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "fa-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";

const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "fa-moon" : "fa-sun";

if(selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    document.body.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}else {
      // Set initial theme based on user's preference or default
      const userPreference = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.classList[userPreference ? "add" : "remove"](darkTheme);
      themeButton.classList[userPreference ? "add" : "remove"](iconTheme);
    }

themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkTheme);
    const isDarkMode = document.body.classList.contains(darkTheme);

    // Toggle the icon classes
    themeButton.classList.remove(isDarkMode ? "fa-moon" : "fa-sun");
    themeButton.classList.add(isDarkMode ? "fa-sun" : "fa-moon");

    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});


/*==================== CONNECT FORM TO EMAILJS ====================*/

const contactForm = document.querySelector("#contact-form");
const submitBtn = document.querySelector(".submit-btn");
const nameInput = document.querySelector("#user_name");
const emailInput = document.querySelector("#user_email");
const messageInput = document.querySelector("#message");

const publicKey = "Xfb8nEuhMA8juHQ2q";
const serviceId = "service_f2dn55k";
const templateId = "template_ul4nn1p";

emailjs.init(publicKey);

contactForm.addEventListener("submit", e => {
  e.preventDefault();

  submitBtn.innerText = "Just a moment";

  const inputFields = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };

  emailjs.send(serviceId, templateId, inputFields).then(
    () => {
      submitBtn.innerText = "Message Sent Successfully";
      nameInput.value = " ";
      emailInput.value = " ";
      messageInput.value = " ";
    },

    (error) => {
      console.log(error);
      submitBtn.innerText = "Something went wrong";
    }
  );

});


