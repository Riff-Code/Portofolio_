// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Back to Top Button
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  class Particle {
    constructor(ctx) {
      this.ctx = ctx;
      this.reset();
    }

    reset() {
      this.x = Math.random() * this.ctx.canvas.width;
      this.y = Math.random() * this.ctx.canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.alpha = Math.random() * 0.5 + 0.3;
    }

    update(mouse) {
      this.x += this.speedX;
      this.y += this.speedY;

      // Interaksi dengan mouse
      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          this.x += dx * 0.03;
          this.y += dy * 0.03;
        }
      }

      // Reset posisi jika keluar layar
      if (
        this.x > this.ctx.canvas.width + 20 ||
        this.x < -20 ||
        this.y > this.ctx.canvas.height + 20 ||
        this.y < -20
      ) {
        this.reset();
      }
    }

    draw() {
      this.ctx.fillStyle = `rgba(100, 255, 218, ${this.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  class ParticleSystem {
    constructor() {
      this.canvas = document.getElementById("particles-canvas");
      this.ctx = this.canvas.getContext("2d");
      this.particles = [];
      this.mouse = { x: null, y: null, radius: 100 };

      this.init();
    }

    init() {
      this.resizeCanvas();
      this.createParticles();
      this.addEventListeners();
      this.animate();
    }

    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    createParticles() {
      const particleCount = window.innerWidth < 768 ? 50 : 100;
      this.particles = [];
      for (let i = 0; i < particleCount; i++) {
        this.particles.push(new Particle(this.ctx));
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.particles.forEach((particle) => {
        particle.update(this.mouse);
        particle.draw();
      });

      requestAnimationFrame(() => this.animate());
    }

    addEventListeners() {
      // Responsif saat resize window
      window.addEventListener("resize", () => {
        this.resizeCanvas();
        this.createParticles();
      });

      // Track posisi mouse
      window.addEventListener("mousemove", (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });

      // Reset posisi mouse saat keluar window
      window.addEventListener("mouseout", () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }
  }

  // Inisialisasi sistem partikel
  const particleSystem = new ParticleSystem();
});

document.addEventListener("keydown", function (e) {
  // Mencegah Ctrl + U (View Source)
  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
    alert("Akses ini telah diblokir!");
  }

  // Mencegah F12 (DevTools)
  if (e.key === "F12") {
    e.preventDefault();
    alert("Akses ini telah diblokir!");
  }

  // Mencegah Ctrl + Shift + I (Inspect Element)
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
    alert("Akses ini telah diblokir!");
  }

  // Mencegah Ctrl + Shift + J (Console)
  if (e.ctrlKey && e.shiftKey && e.key === "J") {
    e.preventDefault();
    alert("Akses ini telah diblokir!");
  }

  // Mencegah Ctrl + Shift + C (Inspect Element)
  if (e.ctrlKey && e.shiftKey && e.key === "C") {
    e.preventDefault();
    alert("Akses ini telah diblokir!");
  }

  // Mencegah Ctrl + S (Save Page)
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    alert("Menyimpan halaman ini tidak diperbolehkan!");
  }

  // Mencegah Ctrl + P (Print Page)
  if (e.ctrlKey && e.key === "p") {
    e.preventDefault();
    alert("Mencetak halaman ini tidak diperbolehkan!");
  }
});

// Mencegah Klik Kanan
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  alert("Klik kanan telah dinonaktifkan!");
});

// Mendeteksi DevTools Terbuka
setInterval(function () {
  if (
    window.outerWidth - window.innerWidth > 160 ||
    window.outerHeight - window.innerHeight > 160
  ) {
    alert("Jangan mencoba membuka DevTools!");
    window.location.href = "about:blank"; // Redirect ke halaman kosong
  }
}, 1000);
