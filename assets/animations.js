/* ============================================================
   MODERN ANIMATIONS - Scroll Reveal, Progress Bar, Typing, Counters
   ============================================================ */

/* ======================== SCROLL REVEAL ======================== */
(function () {
  var revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ======================== PROGRESS BAR ======================== */
(function () {
  var bar = document.getElementById('progress-bar');
  if (!bar) return;

  function updateProgress() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();

/* ======================== TYPING EFFECT ======================== */
(function () {
  var el = document.getElementById('typing-text');
  if (!el) return;

  var phrases = [
    'Étudiant en BTS SIO',
    'Passionné de cybersécurité',
    'En recherche de stage',
    'Option SISR'
  ];

  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typeSpeed = 80;
  var deleteSpeed = 40;
  var pauseEnd = 2000;
  var pauseStart = 500;

  function type() {
    var current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    var delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === current.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = pauseStart;
    }

    setTimeout(type, delay);
  }

  type();
})();

/* ======================== ANIMATED COUNTERS ======================== */
(function () {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      var el = entry.target;
      var target = el.getAttribute('data-count');
      var isNumber = !isNaN(parseInt(target));

      if (isNumber) {
        var end = parseInt(target);
        var duration = 1500;
        var start = 0;
        var startTime = null;

        function animate(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.floor(eased * (end - start) + start);
          el.textContent = current;
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = target;
        }

        requestAnimationFrame(animate);
      } else {
        el.textContent = target;
      }

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (c) { observer.observe(c); });
})();
