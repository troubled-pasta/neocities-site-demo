/* --------- GLOBAL VARIABLES --------- */

let lastFocusedElement = null;

const slideIndex = {}; // Current slide for each carousel/modal
const totalSlides = {}; // Total slides for each carousel/modal


/* --------- INITIALIZE CAROUSELS, GALLERIES AND MODALS --------- */

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(
    ".carousel-container, .gallery-container"
  );

  containers.forEach((container) => {
    const id = container.id;

    slideIndex[id] = 1;
    totalSlides[id] = container.querySelectorAll(
      ".carouselSlides, .gallery-item"
    ).length;

    showSlide(id);
  });

  setupThumbnails();
  setupCarouselButtons();
  setupModalButtons();
});


/* --------- SHOW SLIDE - ON-PAGE CAROUSEL --------- */

function showSlide(containerId) {
  const slides = document.querySelectorAll(
    `#${containerId} .carouselSlides`
  );

  if (!slides.length) return;

  if (slideIndex[containerId] > slides.length) {
    slideIndex[containerId] = 1;
  }

  if (slideIndex[containerId] < 1) {
    slideIndex[containerId] = slides.length;
  }

  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  slides[slideIndex[containerId] - 1].style.display = "block";
}


/* --------- CAROUSEL BUTTONS - ON-PAGE --------- */

function setupCarouselButtons() {
  document.querySelectorAll(".carousel-container").forEach((container) => {
    const id = container.id;
    const prev = container.querySelector(".prev");
    const next = container.querySelector(".next");

    if (prev) {
      prev.addEventListener("click", () => navigateSlides(-1, id));

      prev.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigateSlides(-1, id);
        }
      });
    }

    if (next) {
      next.addEventListener("click", () => navigateSlides(1, id));

      next.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigateSlides(1, id);
        }
      });
    }
  });
}


/* --------- NAVIGATE SLIDES - ON-PAGE CAROUSEL --------- */

function navigateSlides(n, containerId) {
  slideIndex[containerId] += n;
  showSlide(containerId);
}


/* --------- THUMBNAIL CLICK AND KEYBOARD HANDLERS --------- */

function setupThumbnails() {
  const containers = document.querySelectorAll(
    ".carousel-container, .gallery-container"
  );

  containers.forEach((container) => {
    const modalId = container.id;
    const thumbnails = container.querySelectorAll("img");

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        openModal(modalId, index + 1);
      });

      thumb.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(modalId, index + 1);
        }
      });
    });
  });
}


/* --------- OPEN MODAL --------- */

function openModal(modalId, slideNum = 1) {
  const modal = document.getElementById(`modal-${modalId}`);

  if (!modal) return;

  lastFocusedElement = document.activeElement;
  modal.style.display = "block";

  slideIndex[modalId] = slideNum;

  totalSlides[modalId] = modal.querySelectorAll(
    ".modalSlides"
  ).length;

  setupModalFocus(modalId);
  showModalSlides(modalId);
}


/* --------- CLOSE MODAL --------- */

function closeModal(modalId) {
  const modal = document.getElementById(`modal-${modalId}`);

  if (!modal) return;

  modal.style.display = "none";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}


/* --------- SHOW SLIDE - MODAL --------- */

function showModalSlides(modalId) {
  const slides = document.querySelectorAll(
    `#modal-${modalId} .modalSlides`
  );

  if (!slides.length) return;

  if (slideIndex[modalId] > slides.length) {
    slideIndex[modalId] = 1;
  }

  if (slideIndex[modalId] < 1) {
    slideIndex[modalId] = slides.length;
  }

  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  slides[slideIndex[modalId] - 1].style.display = "block";
}


/* --------- NAVIGATE SLIDES - MODAL --------- */

function plusSlides(n, modalId) {
  slideIndex[modalId] += n;
  showModalSlides(modalId);
}


/* --------- MODAL KEYBOARD FOCUS MANAGEMENT --------- */

function setupModalFocus(modalId) {
  const modal = document.getElementById(`modal-${modalId}`);

  if (!modal) return;

  const prevBtn = modal.querySelector(".prev");
  const nextBtn = modal.querySelector(".next");
  const closeBtn = modal.querySelector(".close");

  if (!prevBtn || !nextBtn || !closeBtn) return;

  // Focus the next button when the modal opens.
  nextBtn.focus();

  // Register the keyboard listener only once per modal.
  if (modal.dataset.focusTrapInitialized) return;

  modal.dataset.focusTrapInitialized = "true";

  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;

    e.preventDefault();

    if (!e.shiftKey) {
      if (document.activeElement === prevBtn) {
        nextBtn.focus();
      } else if (document.activeElement === nextBtn) {
        closeBtn.focus();
      } else {
        closeBtn.focus();
      }
    } else {
      if (document.activeElement === closeBtn) {
        nextBtn.focus();
      } else if (document.activeElement === nextBtn) {
        prevBtn.focus();
      } else {
        prevBtn.focus();
      }
    }
  });
}


/* --------- MODAL BUTTONS - CLOSE, PREVIOUS AND NEXT --------- */

function setupModalButtons() {
  document.querySelectorAll(".modal .close").forEach((btn) => {
    const modalId = btn.closest(".modal").id.replace("modal-", "");

    btn.addEventListener("click", () => closeModal(modalId));
  });

  document.querySelectorAll(".modal .prev").forEach((btn) => {
    const modalId = btn.closest(".modal").id.replace("modal-", "");

    btn.addEventListener("click", () => plusSlides(-1, modalId));
  });

  document.querySelectorAll(".modal .next").forEach((btn) => {
    const modalId = btn.closest(".modal").id.replace("modal-", "");

    btn.addEventListener("click", () => plusSlides(1, modalId));
  });
}


/* --------- ACCORDIONS --------- */

const accordions = document.getElementsByClassName("accordion");

for (let i = 0; i < accordions.length; i++) {
  accordions[i].addEventListener("click", function () {
    this.classList.toggle("active");

    const panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}


/* --------- BUTTON ERROR ANIMATION --------- */

document.querySelectorAll(".button-empty").forEach((button) => {
  button.addEventListener("click", function () {
    button.classList.add("clicked");
  });

  button.addEventListener("animationend", function () {
    button.classList.remove("clicked");
  });
});


/* --------- AGE GATE --------- */

const gate = document.getElementById("gate");

if (gate) {
  const gateButton = gate.querySelector("button");

  // Check if age was already confirmed this session.
  if (sessionStorage.getItem("ageConfirmed")) {
    gate.style.display = "none";
  }

  // Trap focus on the button once it receives focus.
  document.addEventListener("keydown", (e) => {
    if (gate.style.display === "none" || e.key !== "Tab") return;

    const uw = document.querySelector("#userwayAccessibilityIcon");

    if (!uw) return;

    if (e.shiftKey && uw.contains(document.activeElement)) {
      e.preventDefault();
      gateButton.focus();
    } else if (!e.shiftKey && document.activeElement === gateButton) {
      e.preventDefault();
      uw.focus();
    }
  });

  // Fade out the gate and remember confirmation.
  window.off = function () {
    sessionStorage.setItem("ageConfirmed", "true");

    gate.style.transition = "opacity 0.5s ease";
    gate.style.opacity = "0";

    setTimeout(() => {
      gate.style.display = "none";
    }, 500);
  };
}

/* --------- ANNOUNCEMENTS --------- */

const utilityBar = document.getElementById("utility-bar");

if (utilityBar) {
  const button = utilityBar.querySelector("button");

  // Check whether the utility bar was already closed.
  if (sessionStorage.getItem("utilityBarClosed")) {
    utilityBar.style.display = "none";
  }

  if (button) {
    button.addEventListener("click", function () {
      utilityBar.style.display = "none";

      // Remember that the utility bar was closed.
      sessionStorage.setItem("utilityBarClosed", "true");
    });
  }
}

/* --------- EMAIL SPAM GUARD --------- */

function secureEmail(encoded) {
  const address = atob(encoded);
  window.location.href = "mailto:" + address;
}


/* --------- USERWAY ACCESSIBILITY WIDGET --------- */

(function (d) {
  const s = d.createElement("script");

  // Widget position.
  s.setAttribute("data-position", 7);

  // Widget size.
  s.setAttribute("data-size", "large");

  // Uncomment to override the default language.
  // s.setAttribute("data-language", "null");

  // Widget color.
  s.setAttribute("data-color", "#EEAECA");

  // Widget type: 1 = person, 2 = chair, 3 = eye, 4 = text.
  s.setAttribute("data-type", "2");

  // Accessibility statement (optional).
  // s.setAttribute("data-statement_text", "Our Accessibility Statement");
  // s.setAttribute("data-statement_url", "https://www.example.com/accessibility");

  // Mobile support (optional).
  // s.setAttribute("data-mobile", true);

  // Custom trigger (optional).
  // s.setAttribute("data-trigger", "triggerId");

  // UserWay account.
  s.setAttribute("data-account", "[your account value here]");

  // Load widget.
  s.setAttribute("src", "https://cdn.userway.org/widget.js");

  (d.body || d.head).appendChild(s);
})(document);


/* --------- FADE TRANSITION --------- */

// Transition effect for page change.
window.transitionToPage = function (href) {
  document.querySelector("body").style.opacity = 0;

  setTimeout(() => {
    window.location.href = href;
  }, 500);
};


// Handle page restoration.
window.addEventListener("pageshow", function (event) {
  const historyTraversal = event.persisted;
  const perf = window.performance;
  const perfEntries =
    perf && perf.getEntriesByType && perf.getEntriesByType("navigation");
  const perfEntryType =
    perfEntries && perfEntries[0] && perfEntries[0].type;
  const navigationType =
    perf && perf.navigation && perf.navigation.type;

  if (
    historyTraversal ||
    perfEntryType === "back_forward" ||
    navigationType === 2
  ) {
    // Handle page restoration.
    window.location.reload();
  }
});


// Show body content after DOM content is loaded.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("body").style.opacity = 1;
});


// Add event listeners to links.
document.querySelectorAll(".transition-link").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default navigation.
    transitionToPage(link.href); // Call the custom transition function.
  });
});
