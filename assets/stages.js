/**
 * Hub interactif — section Stages
 */
(function () {
  "use strict";

  var hub = document.getElementById("stagesHub");
  if (!hub) return;

  var currentYear = null;

  function getScreen(type, year) {
    if (type === "year") {
      return hub.querySelector('[data-stages-screen="year"]');
    }
    return hub.querySelector(
      '[data-stages-screen="' + type + '"][data-stages-year="' + year + '"]'
    );
  }

  function hideAllScreens() {
    hub.querySelectorAll(".stages-hub__screen").forEach(function (screen) {
      screen.hidden = true;
      screen.classList.remove("stages-hub__screen--active");
    });
  }

  function showScreen(type, year) {
    hideAllScreens();
    var screen = getScreen(type, year);
    if (!screen) return;
    screen.hidden = false;
    screen.classList.add("stages-hub__screen--active");
    hub.setAttribute("data-stages-view", type + (year ? "-" + year : ""));
  }

  function showPanel(year, topic) {
    var detailScreen = getScreen("detail", year);
    if (!detailScreen) return;

    detailScreen.querySelectorAll(".stages-detail-panel").forEach(function (panel) {
      var isActive = panel.getAttribute("data-stages-panel") === topic;
      panel.hidden = !isActive;
      panel.classList.toggle("stages-detail-panel--active", isActive);
    });

    detailScreen.querySelectorAll(".stages-detail-nav__btn").forEach(function (btn) {
      var active =
        btn.getAttribute("data-stages-topic") === topic &&
        btn.getAttribute("data-stages-year") === String(year);
      btn.classList.toggle("stages-detail-nav__btn--active", active);
    });
  }

  function openDetail(year, topic) {
    currentYear = year;
    showScreen("detail", year);
    if (year === "2") {
      return;
    }
    showPanel(year, topic || "entreprise");
  }

  hub.addEventListener("click", function (e) {
    var yearBtn = e.target.closest(".stages-year-btn");
    if (yearBtn) {
      currentYear = yearBtn.getAttribute("data-stages-year");
      showScreen("menu", currentYear);
      return;
    }

    var topicCard = e.target.closest(".stages-topic-card");
    if (topicCard) {
      var y = topicCard.getAttribute("data-stages-year");
      var topic = topicCard.getAttribute("data-stages-topic");
      openDetail(y, topic);
      return;
    }

    var backBtn = e.target.closest(".stages-hub__back");
    if (backBtn) {
      var goto = backBtn.getAttribute("data-stages-goto");
      if (goto === "year") {
        currentYear = null;
        showScreen("year");
      } else if (goto === "menu") {
        var targetYear =
          backBtn.getAttribute("data-stages-year-target") || currentYear;
        showScreen("menu", targetYear);
      }
      return;
    }

    var navBtn = e.target.closest(".stages-detail-nav__btn");
    if (navBtn) {
      var ny = navBtn.getAttribute("data-stages-year");
      var nt = navBtn.getAttribute("data-stages-topic");
      showPanel(ny, nt);
    }
  });

  showScreen("year");
})();
