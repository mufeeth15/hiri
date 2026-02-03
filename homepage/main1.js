document.addEventListener("DOMContentLoaded", () => {
  // 1. MOBILE MENU TOGGLE
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const icon = menuToggle.querySelector("i");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    document.body.classList.toggle("no-scroll");

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
    ".featured-section",
  ];

  sectionsToObserve.forEach((selector) => {
    const section = document.querySelector(selector);
    if (section) observer.observe(section);
  });

  // 3. MAGNETIC CURSOR LOGIC
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
      "a, button, .client-card, .menu-toggle, .fan-card, .col-img, .glass-icon-card, .img-card, .glass-card, .ctx-img, .project-card, .btn-lime, .site-badge"
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

  // 4. MISSION SECTION STICKY EFFECT
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

  // 5. HERO ANIMATION (2D GOLD PARTICLES)
  const initHeroAnimation = () => {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];

    const config = {
      particleCount: window.innerWidth < 768 ? 40 : 80,
      connectionDistance: 150,
      mouseDistance: 200,
      color: "212, 175, 55",
      speed: 0.4,
    };

    let mouse = { x: null, y: null };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      config.particleCount = window.innerWidth < 768 ? 40 : 80;
      createParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * config.speed;
        this.vy = (Math.random() - 0.5) * config.speed;
        this.size = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < config.mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force =
              (config.mouseDistance - distance) / config.mouseDistance;
            this.x -= forceDirectionX * force * 0.6;
            this.y -= forceDirectionY * force * 0.6;
          }
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${config.color}, 0.8)`;
        ctx.fill();
      }
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < config.particleCount; i++)
        particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < config.connectionDistance) {
            ctx.beginPath();
            let opacity = 1 - distance / config.connectionDistance;
            ctx.strokeStyle = `rgba(${config.color}, ${opacity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    resize();
    animate();
  };
  initHeroAnimation();

  // 6. CLIENTS SECTION - LIQUID 3D ANIMATION (THREE.JS)
  const initLiquidAnimation = () => {
    const container = document.getElementById("liquid-canvas-container");
    if (!container) return;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = null;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 30;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const warmLight1 = new THREE.PointLight(0xd4af37, 2, 50);
    warmLight1.position.set(-10, 0, 10);
    scene.add(warmLight1);

    const warmLight2 = new THREE.PointLight(0xffffff, 1, 50);
    warmLight2.position.set(10, 5, 5);
    scene.add(warmLight2);

    // GEOMETRY (TorusKnot - Radius 6)
    const geometry = new THREE.TorusKnotGeometry(6, 2, 256, 32, 2, 3);

    const count = geometry.attributes.position.count;
    const originalPositions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      originalPositions[i] = geometry.attributes.position.array[i];
    }
    geometry.userData.originalPositions = originalPositions;

    // MATERIAL
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xaa8c2c,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.2,
      thickness: 2,
      envMapIntensity: 2.0,
      clearcoat: 1,
      clearcoatRoughness: 0,
    });

    const liquidMesh = new THREE.Mesh(geometry, material);
    scene.add(liquidMesh);

    // ENV MAP
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
    const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
    scene.add(cubeCamera);
    material.envMap = cubeRenderTarget.texture;

    // ANIMATION
    const clock = new THREE.Clock();

    function animate3D() {
      const time = clock.getElapsedTime();

      const positions = liquidMesh.geometry.attributes.position.array;
      const originals = liquidMesh.geometry.userData.originalPositions;

      for (let i = 0; i < count; i++) {
        const px = originals[i * 3];
        const py = originals[i * 3 + 1];
        const pz = originals[i * 3 + 2];

        const wave1 = 0.3 * Math.sin(px * 0.5 + time * 1.5);
        const wave2 = 0.3 * Math.cos(py * 0.3 + time * 1.0);
        const wave3 = 0.2 * Math.sin(pz * 0.5 + time);

        positions[i * 3] = px + wave1;
        positions[i * 3 + 1] = py + wave2;
        positions[i * 3 + 2] = pz + wave3;
      }
      liquidMesh.geometry.attributes.position.needsUpdate = true;

      liquidMesh.rotation.x = time * 0.08;
      liquidMesh.rotation.y = time * 0.1;

      liquidMesh.visible = false;
      cubeCamera.update(renderer, scene);
      liquidMesh.visible = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate3D);
    }

    animate3D();

    window.addEventListener("resize", () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  };
  initLiquidAnimation();
});

// 7. PAGE LOAD SEQUENCE
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
