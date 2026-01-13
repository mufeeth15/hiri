document.addEventListener("DOMContentLoaded", () => {
        // 1. MOBILE MENU TOGGLE
        const menuToggle = document.querySelector(".menu-toggle");
        const navLinks = document.querySelector(".nav-links");
        const icon = menuToggle.querySelector("i");

        menuToggle.addEventListener("click", () => {
          navLinks.classList.toggle("active");
          if (navLinks.classList.contains("active")) {
            icon.classList.remove("ri-menu-4-line"); icon.classList.add("ri-close-line");
          } else {
            icon.classList.remove("ri-close-line"); icon.classList.add("ri-menu-4-line");
          }
        });

        // 2. SCROLL OBSERVER
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
          });
        }, { threshold: 0.1 });
        const clientsSection = document.querySelector(".clients-section");
        if (clientsSection) observer.observe(clientsSection);

        // 3. MAGNETIC CURSOR LOGIC (Desktop)
        const cursorRing = document.getElementById("cursorRing");
        const cursorCore = document.getElementById("cursorCore");
        if (cursorRing && cursorCore) {
          let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
          
          window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX; mouseY = e.clientY;
            cursorCore.style.left = `${mouseX}px`; cursorCore.style.top = `${mouseY}px`;
          });
          
          window.addEventListener("mousedown", () => document.body.classList.add("clicking"));
          window.addEventListener("mouseup", () => document.body.classList.remove("clicking"));

          const animateCursor = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = `${ringX}px`; cursorRing.style.top = `${ringY}px`;
            requestAnimationFrame(animateCursor);
          };
          animateCursor();

          // Magnetic Hover
          const interactiveElements = document.querySelectorAll("a, button, .client-card, .menu-toggle");
          interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", () => document.body.classList.add("hovering"));
            el.addEventListener("mouseleave", () => document.body.classList.remove("hovering"));
          });
        }
      });

      // 4. PRELOADER & HERO ANIMATION SEQUENCE
      window.addEventListener("load", () => {
        const preloader = document.getElementById("preloader");
        const fanDeck = document.getElementById("fanDeck");
        const centerCard = document.querySelector(".center-card");
        const heroTitle = document.getElementById("heroTitle");

        setTimeout(() => {
          if (preloader) preloader.classList.add("fade-out");

          setTimeout(() => {
            if (preloader) preloader.style.display = "none";
            
            if(heroTitle) heroTitle.classList.add("focus-in-contract");

            // STEP A: Show Center Card
            if (centerCard) {
              centerCard.style.opacity = "1";
              centerCard.style.transform = "scale(1)";
            }

            // STEP B: 0.2s later, Fan Out the rest
            setTimeout(() => {
              if (fanDeck) fanDeck.classList.add("fanned");
            }, 200);

          }, 800); 
        }, 2000);
      });