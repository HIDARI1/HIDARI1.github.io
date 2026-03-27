const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close"),
  header = document.getElementById("header");

function openMenu() {
  if (!navMenu) return;
  navMenu.classList.add("show-menu");
  document.body.classList.add("nav-open");
  if (header) header.classList.add("show-menu-active");
}

function closeMenu() {
  if (!navMenu) return;
  navMenu.classList.remove("show-menu");
  document.body.classList.remove("nav-open");
  if (header) header.classList.remove("show-menu-active");
}

if (navToggle) {
  navToggle.addEventListener("click", openMenu);
}

if (navClose) {
  navClose.addEventListener("click", closeMenu);
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");
navLink.forEach((n) => n.addEventListener("click", closeMenu));

/*==================== AUTO-HIDE HEADER ON MOBILE SCROLL ====================*/
(function () {
  var lastScroll = 0;
  var scrollThreshold = 60;
  var isMobile = function () { return window.innerWidth < 768; };

  window.addEventListener("scroll", function () {
    if (!isMobile() || !header) return;
    if (navMenu && navMenu.classList.contains("show-menu")) return;

    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll <= 10) {
      header.classList.remove("header--hidden");
      return;
    }

    if (currentScroll > lastScroll + 5 && currentScroll > scrollThreshold) {
      header.classList.add("header--hidden");
    } else if (currentScroll < lastScroll - 5) {
      header.classList.remove("header--hidden");
    }

    lastScroll = currentScroll;
  }, { passive: true });

  window.addEventListener("resize", function () {
    if (!isMobile() && header) {
      header.classList.remove("header--hidden");
    }
  });
})();

/*======================= ACCORD SKILLS ======================*/

const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*============== Qualification Skills ===============*/

/*const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')
tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        tab.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})      
*/

/*======================= Services Modal ===================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*======================= BTS Tabs Switcher ===================*/
(function () {
  var btsButtons = document.querySelectorAll("#bts [data-bts-target]");
  var btsPanels = document.querySelectorAll("#bts [data-bts-content]");

  if (btsButtons.length && btsPanels.length) {
    btsButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var targetId = this.getAttribute("data-bts-target");
        var targetPanel = document.querySelector(targetId);

        if (!targetPanel) return;

        btsButtons.forEach(function (b) {
          b.classList.remove("bts-tabs__button--active");
          b.setAttribute("aria-selected", "false");
        });
        btsPanels.forEach(function (p) {
          p.classList.remove("bts-tabs__panel--active");
        });

        this.classList.add("bts-tabs__button--active");
        this.setAttribute("aria-selected", "true");
        targetPanel.classList.add("bts-tabs__panel--active");
      });
    });
  }
})();

/*======================= Portfolio Swiper (section Projets) ===================*/
var swiper = new Swiper("#portfolio .portfolio__container", {
  loop: true,
  mousewheel: false,

  navigation: {
    nextEl: "#portfolio .swiper-button-next",
    prevEl: "#portfolio .swiper-button-prev",
  },
  pagination: {
    el: "#portfolio .swiper-pagination",
    clickable: true,
  },
});

/*======================= Certification Swiper (même structure que Projets) ===================*/
var certificationSwiper = new Swiper("#certification .certification-swiper", {
  loop: true,
  mousewheel: false,

  navigation: {
    nextEl: "#certification .swiper-button-next",
    prevEl: "#certification .swiper-button-prev",
  },
  pagination: {
    el: "#certification .swiper-pagination",
    clickable: true,
  },
});

/*======================= Certification Lightbox with Carousel ===================*/
(function () {
  var lightbox = document.getElementById("certification-lightbox");
  if (!lightbox) return;
  var lightboxImg = lightbox.querySelector(".certification-lightbox__img");
  var lightboxBackdrop = lightbox.querySelector(".certification-lightbox__backdrop");
  var lightboxClose = lightbox.querySelector(".certification-lightbox__close");
  var prevBtn = lightbox.querySelector(".certification-lightbox__prev");
  var nextBtn = lightbox.querySelector(".certification-lightbox__next");
  var counter = lightbox.querySelector(".certification-lightbox__counter");
  var zoomImgs = document.querySelectorAll(".certification__img-zoom");

  var gallery = [];
  var currentIndex = 0;

  function updateNav() {
    var isGallery = gallery.length > 1;
    prevBtn.style.display = isGallery ? "" : "none";
    nextBtn.style.display = isGallery ? "" : "none";
    counter.style.display = isGallery ? "" : "none";
    if (isGallery) {
      counter.textContent = (currentIndex + 1) + " / " + gallery.length;
    }
  }

  function showImage(index) {
    currentIndex = (index + gallery.length) % gallery.length;
    lightboxImg.src = gallery[currentIndex];
    lightboxImg.alt = "Image " + (currentIndex + 1) + " sur " + gallery.length;
    updateNav();
  }

  function openLightbox(images, startIndex) {
    gallery = images;
    lightbox.classList.add("certification-lightbox--open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    showImage(startIndex || 0);
  }

  function closeLightbox() {
    lightbox.classList.remove("certification-lightbox--open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    gallery = [];
  }

  zoomImgs.forEach(function (img) {
    function handleOpen(e) {
      e.preventDefault();
      e.stopPropagation();
      var galleryAttr = img.getAttribute("data-gallery");
      if (galleryAttr) {
        openLightbox(JSON.parse(galleryAttr), 0);
      } else {
        openLightbox([img.src], 0);
      }
    }
    img.addEventListener("click", handleOpen);
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") handleOpen(e);
    });
  });

  prevBtn.addEventListener("click", function () { showImage(currentIndex - 1); });
  nextBtn.addEventListener("click", function () { showImage(currentIndex + 1); });
  lightboxBackdrop.addEventListener("click", closeLightbox);
  lightboxClose.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("certification-lightbox--open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });
})();

/*======================= Certification Detail Modal ===================*/
(function () {
  var modal = document.getElementById("certif-modal");
  if (!modal) return;
  var backdrop = modal.querySelector(".certif-modal__backdrop");
  var closeBtn = modal.querySelector(".certif-modal__close");
  var titleEl = modal.querySelector(".certif-modal__title");
  var bodyEl = modal.querySelector(".certif-modal__body");

  var data = {
    ai: {
      title: "Elements of AI",
      body: '<div class="certif-modal__section"><p class="certif-modal__section-title">Organisme</p><p>Université d\'Helsinki &amp; MinnaLearn — plateforme MOOC.fi</p></div>' +
        '<div class="certif-modal__section"><p class="certif-modal__section-title">Contenu de la formation</p><p>Cette certification couvre les <strong>fondamentaux de l\'intelligence artificielle</strong> à travers 6 modules progressifs :</p>' +
        '<ul><li>Qu\'est-ce que l\'IA ? — définitions et applications concrètes</li><li>Résolution de problèmes &amp; algorithmes de recherche</li><li>Probabilités et modèle de Bayes</li><li>Apprentissage automatique (Machine Learning)</li><li>Réseaux de neurones et Deep Learning</li><li>Implications sociétales et éthiques de l\'IA</li></ul></div>' +
        '<div class="certif-modal__section"><p class="certif-modal__section-title">Compétences acquises</p><div class="certif-modal__tags"><span class="certif-modal__tag">Machine Learning</span><span class="certif-modal__tag">Réseaux de neurones</span><span class="certif-modal__tag">Probabilités</span><span class="certif-modal__tag">Éthique IA</span><span class="certif-modal__tag">Algorithmes</span></div></div>'
    },
    secnum: {
      title: "SecNum Académie — ANSSI",
      body: '<div class="certif-modal__section"><p class="certif-modal__section-title">Organisme</p><p><strong>ANSSI</strong> (Agence Nationale de la Sécurité des Systèmes d\'Information) — organisme gouvernemental français</p></div>' +
        '<div class="certif-modal__section"><p class="certif-modal__section-title">Contenu de la formation</p><p>Formation complète de <strong>sensibilisation à la cybersécurité</strong> composée de 4 modules :</p>' +
        '<ul><li>Panorama de la sécurité des systèmes d\'information</li><li>Sécurité de l\'authentification et du poste de travail</li><li>Sécurité sur Internet — navigation, messagerie, réseaux sociaux</li><li>Sécurité du réseau local et gestion des incidents</li></ul></div>' +
        '<div class="certif-modal__section"><p class="certif-modal__section-title">Compétences acquises</p><div class="certif-modal__tags"><span class="certif-modal__tag">Hygiène numérique</span><span class="certif-modal__tag">Sécurité réseau</span><span class="certif-modal__tag">Gestion d\'incidents</span><span class="certif-modal__tag">Authentification</span><span class="certif-modal__tag">Protection des données</span></div></div>'
    },
    rgpd: {
      title: "Atelier RGPD — CNIL",
      body: '<div class="certif-modal__section"><p class="certif-modal__section-title">Organisme</p><p><strong>CNIL</strong> (Commission Nationale de l\'Informatique et des Libertés) — autorité française de protection des données</p></div>' +
        '<div class="certif-modal__section"><p class="certif-modal__section-title">Contenu de la formation</p><p>Formation sur le <strong>Règlement Général sur la Protection des Données</strong> en 5 modules :</p>' +
        '<ul><li>Les données personnelles — définition, enjeux et cadre juridique</li><li>Les principes de la protection des données</li><li>Les droits des personnes concernées</li><li>Le responsable de traitement et ses obligations</li><li>Les outils de la conformité — registre, AIPD, DPO</li></ul></div>' +
        '<div class="certif-modal__section"><p class="certif-modal__section-title">Compétences acquises</p><div class="certif-modal__tags"><span class="certif-modal__tag">RGPD</span><span class="certif-modal__tag">Données personnelles</span><span class="certif-modal__tag">Conformité</span><span class="certif-modal__tag">Droits des personnes</span><span class="certif-modal__tag">DPO</span></div></div>'
    },
    ipv6: {
      title: "Objectif IPv6 — Institut Mines-Télécom",
      body: '<div class="certif-modal__section"><p class="certif-modal__section-title">Organisme</p><p><strong>IMT</strong> (Institut Mines-Télécom) — badge de réussite de la formation</p></div>' +
        '<div class="certif-modal__section"><p class="certif-modal__section-title">Contenu de la formation</p><p>Formation sur les <strong>fondamentaux d\'IPv6</strong> et sa mise en œuvre :</p>' +
        '<ul><li>Identifier l\'importance d\'IPv6 dans l\'Internet aujourd\'hui</li><li>Acquérir les fondamentaux d\'IPv6 et de sa mise en application sur un réseau local</li><li>Comprendre les phénomènes liés à la cohabitation IPv4/IPv6</li><li>Identifier les étapes et les solutions existantes vers l\'intégration d\'IPv6 selon les contextes</li></ul></div>' +
        '<div class="certif-modal__section"><p class="certif-modal__section-title">Compétences acquises</p><div class="certif-modal__tags"><span class="certif-modal__tag">IPv6</span><span class="certif-modal__tag">Adressage réseau</span><span class="certif-modal__tag">Cohabitation IPv4/IPv6</span><span class="certif-modal__tag">Réseau local</span><span class="certif-modal__tag">Transition réseau</span></div></div>'
    },
    fiveg: {
      title: "5G : Principe du réseau coeur — Institut Mines-Télécom",
      body: '<div class="certif-modal__section"><p class="certif-modal__section-title">Organisme</p><p><strong>France Université Numérique (FUN) / IMT</strong> — badge de réussite</p></div>' +
        '<div class="certif-modal__section"><p class="certif-modal__section-title">Contenu de la formation</p><p>MOOC centré sur le <strong>coeur de réseau 5G</strong>, l\'architecture et la sécurité :</p>' +
        '<ul><li>Modes 5G : eMBB, uRLLC, mMTC</li><li>Fonctions coeur : gNB, AMF, SMF, UPF, UDM, AUSF</li><li>Gestion des connexions radio et réduction de la signalisation</li><li>Sécurité radio, interconnexion de réseaux et interfaces SBI/SBA</li></ul></div>' +
        '<div class="certif-modal__section"><p class="certif-modal__section-title">Compétences acquises</p><div class="certif-modal__tags"><span class="certif-modal__tag">5G Core</span><span class="certif-modal__tag">SBA/SBI</span><span class="certif-modal__tag">Sécurité 5G</span><span class="certif-modal__tag">Fonctions réseau</span><span class="certif-modal__tag">Télécommunications</span></div></div>'
    }
  };

  function openModal(key) {
    var d = data[key];
    if (!d) return;
    titleEl.textContent = d.title;
    bodyEl.innerHTML = d.body;
    modal.classList.add("certif-modal--open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("certif-modal--open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".certif-detail-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openModal(btn.getAttribute("data-certif"));
    });
  });

  backdrop.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("certif-modal--open")) {
      closeModal();
    }
  });
})();

/*======================= CV Lightbox (afficher PDF) ===================*/
(function () {
  var cvLightbox = document.getElementById("cv-lightbox");
  var cvIframe = cvLightbox && cvLightbox.querySelector(".cv-lightbox__iframe");
  var cvBackdrop = cvLightbox && cvLightbox.querySelector(".cv-lightbox__backdrop");
  var cvClose = cvLightbox && cvLightbox.querySelector(".cv-lightbox__close");
  var cvOpenBtn = document.getElementById("cv-open-btn");

  function openCV() {
    if (!cvLightbox || !cvIframe) return;
    cvIframe.src = "assets/MyCV.pdf";
    cvLightbox.classList.add("cv-lightbox--open");
    cvLightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeCV() {
    if (!cvLightbox) return;
    cvLightbox.classList.remove("cv-lightbox--open");
    cvLightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (cvIframe) cvIframe.src = "";
  }

  if (cvOpenBtn) cvOpenBtn.addEventListener("click", openCV);
  if (cvBackdrop) cvBackdrop.addEventListener("click", closeCV);
  if (cvClose) cvClose.addEventListener("click", closeCV);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && cvLightbox && cvLightbox.classList.contains("cv-lightbox--open")) {
      closeCV();
    }
  });
})();

/*======================= Global Like Counter ===================*/
(function () {
  var likeBtn = document.getElementById("like-btn");
  var likeCount = document.getElementById("like-count");
  var likeStatus = document.getElementById("like-status");
  var likeBtnText = document.getElementById("like-btn-text");
  if (!likeBtn || !likeCount) return;

  var namespace = "hidari1-github-io";
  var key = "portfolio-likes-v2";
  var likedKey = "hidari_portfolio_liked_v1";
  var alreadyLiked = localStorage.getItem(likedKey) === "1";
  var timeoutMs = 6000;

  function setLikedUI() {
    likeBtn.classList.add("like__btn--liked");
    likeBtn.setAttribute("disabled", "true");
    likeBtnText.textContent = "Merci !";
    if (likeStatus) likeStatus.textContent = "Merci pour ton like.";
  }

  function setCount(value) {
    likeCount.textContent = Number(value || 0).toLocaleString("fr-FR");
  }

  function fetchJsonWithTimeout(url) {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, timeoutMs);
    return fetch(url, { signal: controller.signal })
      .then(function (res) { return res.json(); })
      .finally(function () { clearTimeout(timer); });
  }

  function loadGlobalCount() {
    return fetchJsonWithTimeout("https://api.countapi.xyz/get/" + namespace + "/" + key)
      .then(function (data) {
        if (typeof data.value === "number") {
          setCount(data.value);
          return;
        }
        setCount(0);
      })
      .catch(function () {
        setCount(0);
        if (likeStatus) likeStatus.textContent = "Compteur temporairement indisponible.";
      });
  }

  if (alreadyLiked) {
    setLikedUI();
    if (likeStatus) likeStatus.textContent = "Deja like depuis ce navigateur.";
  }
  loadGlobalCount();

  likeBtn.addEventListener("click", function () {
    if (localStorage.getItem(likedKey) === "1") {
      if (likeStatus) likeStatus.textContent = "Deja like depuis ce navigateur.";
      return;
    }

    likeBtn.setAttribute("disabled", "true");
    if (likeStatus) likeStatus.textContent = "Envoi du like...";

    fetchJsonWithTimeout("https://api.countapi.xyz/hit/" + namespace + "/" + key)
      .then(function (data) {
        if (typeof data.value !== "number") throw new Error("invalid");
        setCount(data.value);
        localStorage.setItem(likedKey, "1");
        setLikedUI();
      })
      .catch(function () {
        likeBtn.removeAttribute("disabled");
        if (likeStatus) likeStatus.textContent = "Echec reseau. Reessaie dans un instant.";
      });
  });
})();

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");
    const navLink = document.querySelector(".nav__menu a[href*=" + sectionId + "]");

    if (!navLink) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink.classList.add("active-link");
    } else {
      navLink.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL up ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme,
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme,
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
