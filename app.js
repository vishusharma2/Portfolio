// ===== Particle System =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  const maxDist = 120;
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDist) {
        const opacityVal = 0.08 * (1 - distance / maxDist);
        ctx.strokeStyle = `rgba(0, 240, 255, ${opacityVal})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Hamburger Menu =====
function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  const hamburger = document.getElementById('hamburger');
  menu.classList.toggle('active');
  hamburger.classList.toggle('active');
}

// Close menu on link click (mobile)
document.querySelectorAll('.menu-items a').forEach((link) => {
  link.addEventListener('click', () => {
    document.getElementById('nav-menu').classList.remove('active');
    document.getElementById('hamburger').classList.remove('active');
  });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===== Skill Bar Animation =====
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-width');
        fill.style.setProperty('--target-width', targetWidth);
        fill.classList.add('animated');
        skillObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 }
);

skillFills.forEach((fill) => skillObserver.observe(fill));

// ===== Auto Typing Effect =====
document.addEventListener('DOMContentLoaded', () => {
  const autoTypeElement = document.getElementById('auto-type');
  const texts = [
    'Full Stack Web Developer',
    'JavaScript Enthusiast',
    'Python Developer',
    'Creative Problem Solver',
  ];
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const delayBetween = 2000;
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = texts[textIndex];

    if (isDeleting) {
      autoTypeElement.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      autoTypeElement.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === current.length) {
      delay = delayBetween;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
});
