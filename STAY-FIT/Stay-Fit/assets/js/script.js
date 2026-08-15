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

/**
 * BMI Calculator
 */

const bmiHeight = document.querySelector("#bmi-height");
const bmiWeight = document.querySelector("#bmi-weight");
const calculateBmiButton = document.querySelector("#calculate-bmi");
const bmiValue = document.querySelector("#bmi-value");
const bmiCategory = document.querySelector("#bmi-category");
const bmiError = document.querySelector("#bmi-error");

if (
  bmiHeight &&
  bmiWeight &&
  calculateBmiButton &&
  bmiValue &&
  bmiCategory &&
  bmiError
) {
  const calculateBMI = function () {
    const height = parseFloat(bmiHeight.value);
    const weight = parseFloat(bmiWeight.value);

    bmiError.textContent = "";

    if (!height || !weight || height <= 0 || weight <= 0) {
      bmiError.textContent = "Please enter a valid height and weight.";
      bmiValue.textContent = "--";
      bmiCategory.textContent = "Enter your details above";
      return;
    }

    if (height < 50 || height > 250) {
      bmiError.textContent = "Height must be between 50 and 250 cm.";
      return;
    }

    if (weight < 10 || weight > 300) {
      bmiError.textContent = "Weight must be between 10 and 300 kg.";
      return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    bmiValue.textContent = bmi.toFixed(1);

    if (bmi < 18.5) {
      bmiCategory.textContent = "Underweight";
    } else if (bmi < 25) {
      bmiCategory.textContent = "Normal Weight";
    } else if (bmi < 30) {
      bmiCategory.textContent = "Overweight";
    } else {
      bmiCategory.textContent = "Obese";
    }
  };

  calculateBmiButton.addEventListener("click", calculateBMI);

  [bmiHeight, bmiWeight].forEach(function (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        calculateBMI();
      }
    });
  });
}