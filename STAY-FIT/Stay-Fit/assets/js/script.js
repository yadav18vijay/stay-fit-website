'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const reveal = function () {
  for (let i = 0; i < sections.length; i++) {

    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }

  }
}

reveal();
addEventOnElem(window, "scroll", reveal);

/**
 * Course search and filtering
 */

const courseSearch = document.querySelector("#course-search");
const filterButtons = document.querySelectorAll(".filter-btn");
const courseCards = document.querySelectorAll(".course-card");
const courseList = document.querySelector(".course .grid-list");

const noResultsMessage = document.createElement("p");
noResultsMessage.className = "course-no-results";
noResultsMessage.textContent = "No courses found. Try a different search or category.";

if (courseList) {
  courseList.parentElement.appendChild(noResultsMessage);
}

let currentFilter = "all";

const filterCourses = function () {
  const searchTerm = courseSearch.value.toLowerCase().trim();
  let visibleCourses = 0;

  courseCards.forEach(function (card) {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    const category = card.dataset.category;

    const matchesSearch = title.includes(searchTerm);
    const matchesFilter =
      currentFilter === "all" || category === currentFilter;

    if (matchesSearch && matchesFilter) {
      card.parentElement.style.display = "";
      card.classList.remove("hidden");
      visibleCourses++;
    } else {
      card.parentElement.style.display = "none";
      card.classList.add("hidden");
    }
  });

  if (visibleCourses === 0) {
    noResultsMessage.classList.add("active");
  } else {
    noResultsMessage.classList.remove("active");
  }
};

if (courseSearch) {
  courseSearch.addEventListener("input", filterCourses);
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    filterCourses();
  });
});

// Contact Form Validation

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#contact-name");
    const email = document.querySelector("#contact-email");
    const message = document.querySelector("#contact-message");

    const nameError = document.querySelector("#name-error");
    const emailError = document.querySelector("#email-error");
    const messageError = document.querySelector("#message-error");
    const successMessage = document.querySelector("#form-success");

    // Clear previous messages
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMessage.textContent = "";

    let isValid = true;

    // Name validation
    if (name.value.trim() === "") {
      nameError.textContent = "Please enter your name.";
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov)$/i;

    if (email.value.trim() === "") {
      emailError.textContent = "Please enter your email.";
      isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // Message validation
    const messageText = message.value.trim();

    if (messageText === "") {
      messageError.textContent = "Please enter your message.";
      isValid = false;
    } else if (messageText.length < 10) {
      messageError.textContent = "Message must be at least 10 characters.";
      isValid = false;
    }

    // Stop if validation fails
    if (!isValid) {
      return;
    }

    // Show success message
    successMessage.textContent = "Thank you! Your message has been submitted.";

    // Clear form
    contactForm.reset();
  });
}