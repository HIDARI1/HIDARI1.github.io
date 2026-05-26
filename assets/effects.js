/* ============================================================
   EFFECTS — Particles · Cursor · Magnetic · Split text reveal
   ============================================================ */

(function () {
  'use strict';

  /* ─────────── 1. PARTICLES CANVAS ─────────── */
  (function initParticles() {
    var canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    // Skip sur petit ecran + reduced-motion (perf + accessibilite)
    if (window.innerWidth < 600) { canvas.style.display = 'none'; return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { canvas.style.display = 'none'; return; }
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var dpr = window.devicePixelRatio || 1;
    var w, h, particles;
    var mouse = { x: -9999, y: -9999 };
    var count;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      count = Math.min(55, Math.floor((w * h) / 28000));
      seed();
    }

    function seed() {
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.1 + 0.25,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          a: Math.random() * 0.35 + 0.1
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, w, h);

      // Bright white particles for the dark Apple void
      var isDark = document.body.classList.contains('dark-theme');
      var baseR = isDark ? 255 : 30;
      var baseG = isDark ? 255 : 30;
      var baseB = isDark ? 255 : 30;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // mouse repulsion
        var dx = p.x - mouse.x;
        var dy = p.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          var force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.6;
          p.y += (dy / dist) * force * 1.6;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + baseR + ',' + baseG + ',' + baseB + ',' + p.a + ')';
        ctx.fill();
      }
      requestAnimationFrame(step);
    }

    window.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', function () { mouse.x = -9999; mouse.y = -9999; });
    window.addEventListener('resize', resize, { passive: true });

    resize();
    step();
  })();

  /* ─────────── 2. CURSOR — retiré (curseur système natif) ─────────── */

  /* ─────────── 3. MAGNETIC BUTTONS ─────────── */
  (function initMagnetic() {
    if (window.matchMedia('(hover: none), (max-width: 768px)').matches) return;

    var els = document.querySelectorAll('[data-magnetic], .btn, .button.button--flex, .home__social-icon, .scrollup');
    els.forEach(function (el) {
      var strength = parseFloat(el.getAttribute('data-magnetic-strength')) || 0.3;
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = 'translate(' + (x * strength) + 'px,' + (y * strength) + 'px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
      });
    });
  })();

  /* ─────────── 4. NAVBAR SCROLL EFFECT ─────────── */
  (function initNavbarScroll() {
    var header = document.getElementById('header');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 30) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* ─────────── 5. SPLIT TEXT REVEAL ─────────── */
  (function initSplit() {
    var nodes = document.querySelectorAll('[data-split]');
    if (!nodes.length) return;

    nodes.forEach(function (n) {
      var text = n.textContent.trim();
      var words = text.split(/\s+/);
      n.classList.add('split');
      n.innerHTML = '';
      words.forEach(function (w) {
        var span = document.createElement('span');
        span.className = 'word';
        var inner = document.createElement('span');
        inner.className = 'word__inner';
        inner.textContent = w;
        span.appendChild(inner);
        n.appendChild(span);
        n.appendChild(document.createTextNode(' '));
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });

    nodes.forEach(function (n) { io.observe(n); });
  })();

})();
