document.addEventListener("DOMContentLoaded", () => {
  // 1. MOBILE MENU TOGGLE
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const icon = menuToggle.querySelector("i");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("ri-menu-4-line");
      icon.classList.add("ri-close-line");
    } else {
      icon.classList.remove("ri-close-line");
      icon.classList.add("ri-menu-4-line");
    }
  });

  // 2. SCROLL OBSERVER
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );

  const sectionsToObserve = [
    ".clients-section",
    ".mission-section",
    ".who-creative-section",
    ".context-section",
  ];

  sectionsToObserve.forEach((selector) => {
    const section = document.querySelector(selector);
    if (section) observer.observe(section);
  });

  // 3. MAGNETIC CURSOR LOGIC (Desktop)
  const cursorRing = document.getElementById("cursorRing");
  const cursorCore = document.getElementById("cursorCore");
  if (cursorRing && cursorCore) {
    let mouseX = 0,
      mouseY = 0,
      ringX = 0,
      ringY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorCore.style.left = `${mouseX}px`;
      cursorCore.style.top = `${mouseY}px`;
    });

    window.addEventListener("mousedown", () =>
      document.body.classList.add("clicking")
    );
    window.addEventListener("mouseup", () =>
      document.body.classList.remove("clicking")
    );

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactiveElements = document.querySelectorAll(
      "a, button, .client-card, .menu-toggle, .fan-card, .col-img, .glass-icon-card, .img-card, .glass-card, .ctx-img"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        document.body.classList.add("hovering")
      );
      el.addEventListener("mouseleave", () =>
        document.body.classList.remove("hovering")
      );
    });
  }

  // 4. MISSION SECTION STICKY FADE-OUT EFFECT
  const missionSection = document.querySelector(".mission-section");
  const stickyWrapper = document.querySelector(".mission-sticky-wrapper");

  if (missionSection && stickyWrapper) {
    window.addEventListener("scroll", () => {
      const rect = missionSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const distanceFromTop = rect.top;

      let opacity = 1;
      let scale = 1;
      let blur = 0;

      if (distanceFromTop < -viewportHeight) {
        const progress =
          Math.abs(distanceFromTop + viewportHeight) / viewportHeight;

        opacity = 1 - progress * 1.5;
        scale = 1 - progress * 0.1;
        blur = progress * 10;
      }

      if (opacity < 0) opacity = 0;
      if (opacity > 1) opacity = 1;

      stickyWrapper.style.opacity = opacity;
      stickyWrapper.style.transform = `scale(${scale})`;
      stickyWrapper.style.filter = `blur(${blur}px)`;
    });
  }
});

// 5. PRELOADER & HERO ANIMATION SEQUENCE
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const fanDeck = document.getElementById("fanDeck");
  const centerCard = document.querySelector(".center-card");
  const heroTitle = document.getElementById("heroTitle");

  setTimeout(() => {
    if (preloader) preloader.classList.add("fade-out");

    setTimeout(() => {
      if (preloader) preloader.style.display = "none";
      if (heroTitle) heroTitle.classList.add("focus-in-contract");

      if (centerCard) {
        centerCard.style.opacity = "1";
        centerCard.style.transform = "scale(1)";
      }

      setTimeout(() => {
        if (fanDeck) fanDeck.classList.add("fanned");
      }, 200);
    }, 800);
  }, 2000);
});
