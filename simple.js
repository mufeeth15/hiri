      // --- EXISTING FAN OUT ANIMATION ---
      window.addEventListener("load", () => {
        const spreadContainer = document.getElementById("cardSpread");
        setTimeout(() => {
          spreadContainer.classList.add("spread-active");
        }, 500);
      });

      // --- EXISTING PARALLAX ---
      const container = document.getElementById("cardSpread");
      container.addEventListener("mousemove", (e) => {
        if (container.classList.contains("spread-active")) {
          let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
          let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
          // Keeps simplicity for now
        }
      });

      // --- NEW LAZY LOAD / OBSERVER ---
      // This watches for when the 'clientsSection' enters the viewport
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      }, observerOptions);

      const clientsSection = document.getElementById('clientsSection');
      if(clientsSection) {
        observer.observe(clientsSection);
      }