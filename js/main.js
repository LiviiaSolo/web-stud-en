document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------
    BURGER MENU
  ------------------------------ */
  const burger = document.getElementById("burger");
  const nav = document.querySelector(".nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("active");
      burger.classList.toggle("active");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        burger.classList.remove("active");
      });
    });
  }


  /* ------------------------------
    GLOBAL FADE-IN (Observer)
  ------------------------------ */
  const animatedElements = document.querySelectorAll(
    ".fade-in, .fade-left, .fade-right, .fade-slow, .fade-card"
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => observer.observe(el));


  /* ------------------------------
    CONTACT FORM
  ------------------------------ */
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");

  if (form && success) {
    form.addEventListener("submit", async e => {
      e.preventDefault();

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          success.classList.add("show");
          form.reset();
          setTimeout(() => success.classList.remove("show"), 4000);
        } else {
          alert("❌ Niečo sa pokazilo.");
        }
      } catch {
        alert("❌ Chyba pripojenia.");
      }
    });
  }


  /* ------------------------------
    ACCORDION
  ------------------------------ */
  document.querySelectorAll(".accordion-item, .faq-item").forEach(item => {
    const trigger = item.querySelector(".accordion-header, .faq-question");
    if (trigger) trigger.addEventListener("click", () => item.classList.toggle("active"));
  });


  /* ------------------------------
    MODALS (Unified System)
  ------------------------------ */
  document.querySelectorAll("[data-modal]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const id = btn.dataset.modal;
      const modal = document.getElementById(id);
      if (modal) modal.classList.add("active");
    });
  });

  document.querySelectorAll(".modal").forEach(modal => {
    const closeBtn = modal.querySelector(".modal-close");
    const overlay = modal.querySelector(".modal-overlay");

    if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    if (overlay) overlay.addEventListener("click", () => modal.classList.remove("active"));
  });


  /* ------------------------------
    ABOUT LIST ANIMATION
  ------------------------------ */
  const aboutList = document.querySelector(".about-list");
  if (aboutList) aboutList.classList.add("active");


  /* ------------------------------
    LAPTOP ANIMATION
  ------------------------------ */
  const laptop = document.querySelector(".laptop");
  if (laptop) {
    const laptopObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) laptop.classList.add("active");
      });
    }, { threshold: 0.3 });

    laptopObserver.observe(laptop);
  }

});


/* ------------------------------
    REALTY SLIDER 
  ------------------------------ */
const imgContainer = document.querySelector('.img-container');
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

if (imgContainer && dotsContainer && prevBtn && nextBtn) {

  const boxes = Array.from(imgContainer.children);
  let currentIndex = 0;

  // Create dots
  boxes.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.index = i;
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }

  function goToSlide(index) {
    while (currentIndex !== index) {
      if (index > currentIndex) {
        imgContainer.appendChild(imgContainer.firstElementChild);
        currentIndex = (currentIndex + 1) % boxes.length;
      } else {
        imgContainer.prepend(imgContainer.lastElementChild);
        currentIndex = (currentIndex - 1 + boxes.length) % boxes.length;
      }
    }
    updateDots();
  }

  // Buttons
  nextBtn.addEventListener('click', () => {
    goToSlide((currentIndex + 1) % boxes.length);
  });

  prevBtn.addEventListener('click', () => {
    goToSlide((currentIndex - 1 + boxes.length) % boxes.length);
  });

  // Dot click
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(Number(dot.dataset.index));
    });
  });

  // Swipe
  let touchStartX = 0;

  imgContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  imgContainer.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].screenX;

    if (touchStartX - touchEndX > 50) nextBtn.click();
    if (touchEndX - touchStartX > 50) prevBtn.click();
  });
}
