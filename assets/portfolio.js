/**
 * Hub missions — section Projets
 */
(function () {
  "use strict";

  var hub = document.getElementById("portfolioHub");
  if (!hub) return;

  var tabs = hub.querySelectorAll(".portfolio-hub__tab");
  var panels = hub.querySelectorAll(".portfolio-mission");

  function showMission(id) {
    tabs.forEach(function (tab) {
      var active = tab.getAttribute("data-mission") === String(id);
      tab.classList.toggle("portfolio-hub__tab--active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    panels.forEach(function (panel) {
      var active = panel.getAttribute("data-mission-panel") === String(id);
      panel.hidden = !active;
      panel.classList.toggle("portfolio-mission--active", active);
    });
  }

  hub.addEventListener("click", function (e) {
    var tab = e.target.closest(".portfolio-hub__tab");
    if (!tab) return;
    showMission(tab.getAttribute("data-mission"));
  });
})();
