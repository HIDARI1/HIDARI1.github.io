/**
 * STAGES — Tab switcher simple (Apple segmented control style)
 */
(function () {
  "use strict";

  var tabs = document.querySelectorAll(".stage-tab");
  var panels = document.querySelectorAll(".stage-panel");
  if (!tabs.length || !panels.length) return;

  function activate(target) {
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-stage-tab") === target;
      t.classList.toggle("stage-tab--active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach(function (p) {
      var on = p.getAttribute("data-stage-panel") === target;
      p.classList.toggle("stage-panel--active", on);
      if (on) {
        p.removeAttribute("hidden");
      } else {
        p.setAttribute("hidden", "");
      }
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-stage-tab");
      if (target) activate(target);
    });

    // Keyboard navigation: arrow keys cycle through tabs
    tab.addEventListener("keydown", function (e) {
      var arr = Array.prototype.slice.call(tabs);
      var idx = arr.indexOf(tab);
      var next = -1;
      if (e.key === "ArrowRight") next = (idx + 1) % arr.length;
      else if (e.key === "ArrowLeft") next = (idx - 1 + arr.length) % arr.length;
      if (next >= 0) {
        e.preventDefault();
        arr[next].focus();
        arr[next].click();
      }
    });
  });
})();
