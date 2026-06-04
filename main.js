/* ============================================================
   PORTFOLIO — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── EmailJS INIT ───────────────────────────────────────── */
  emailjs.init("ZoFZsfn0Noii4ja_q");

  /* ── Active nav link ──────────────────────────────────────── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  /* ── Hamburger menu ──────────────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  /* ── Skill bar animation ─────────────────────────────────── */
  // Barları, parent container görünür olduktan SONRA tetikle
  function animateBarsInside(container, delay) {
    container.querySelectorAll('.skill-bar-fill').forEach(fill => {
      setTimeout(() => {
        fill.style.width = fill.dataset.pct + '%';
      }, delay || 520);
    });
  }

  /* ── Fade-up on scroll ───────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.card, .skill-category, .cert-card, .project-card, .contact-link-item');
  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          // Skill category görünür olunca içindeki barları da başlat
          if (entry.target.classList.contains('skill-category')) {
            animateBarsInside(entry.target);
          }
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
      fadeObserver.observe(el);
    });
  }

  /* ── Counter animation ───────────────────────────────────── */
  const counters = document.querySelectorAll('.num[data-target]');
  if (counters.length) {
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          let current  = 0;
          const step   = Math.ceil(target / 60);
          const timer  = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current + suffix;
            if (current >= target) clearInterval(timer);
          }, 20);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));
  }

  /* ── Contact form (EmailJS FULL) ─────────────────────────── */
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Gonderiliyor...';
      btn.disabled = true;

      emailjs.send("service_e2as6hn", "template_18h3pai", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
      })
      .then(function() {
        form.style.display = 'none';
        success.style.display = 'block';
      })
      .catch(function(error) {
        alert("Mail gönderilemedi ❌");
        console.log(error);
        btn.textContent = 'Gönder';
        btn.disabled = false;
      });
    });
  }

  /* ── Cursor glow ─────────────────────────────────────────── */
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; pointer-events:none; z-index:9998;
    width:300px; height:300px; border-radius:50%;
    background:radial-gradient(circle, rgba(0,245,212,0.06) 0%, transparent 70%);
    transform:translate(-50%,-50%);
    transition:opacity 0.3s ease;
    top:0; left:0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });

  /* ── Duplicate ticker for seamless loop ──────────────────── */
  const ticker = document.querySelector('.ticker');
  if (ticker) {
    ticker.innerHTML += ticker.innerHTML;
  }

});