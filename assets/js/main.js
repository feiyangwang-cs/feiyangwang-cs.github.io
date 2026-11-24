/* Page behavior, no dependencies:
   1. News "Show More" / "Show Less"
   2. Links open in a new tab
   3. On phones, highlight the Experience entry in the middle of the screen
   4. Current year in the footer */
(function () {
  "use strict";

  // Number of News items shown before "Show More" is clicked.
  var VISIBLE_COUNT = 5;

  function setUpNewsToggle() {
    var list = document.getElementById("news-list");
    var button = document.getElementById("news-toggle");
    if (!list || !button) return;

    var items = list.querySelectorAll(".dated-item");
    if (items.length <= VISIBLE_COUNT) {
      button.hidden = true;
      return;
    }

    var expanded = false;

    function render() {
      items.forEach(function (item, index) {
        item.classList.toggle("is-collapsed", !expanded && index >= VISIBLE_COUNT);
      });
      button.setAttribute("aria-expanded", String(expanded));
      button.innerHTML = expanded
        ? 'Show Less <i class="fa-solid fa-chevron-up" aria-hidden="true"></i>'
        : 'Show More <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>';
    }

    button.addEventListener("click", function () {
      expanded = !expanded;
      render();
    });
    render();
  }

  function openLinksInNewTab() {
    document.querySelectorAll("a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) === "#" || /^(mailto|javascript):/i.test(href)) return;
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }

  // The highlight style only exists in the phone layout (see style.css),
  // so this can run on every screen size.
  function highlightTimelineOnScroll() {
    var items = document.querySelectorAll(".tl-item");
    if (!items.length || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-active", entry.isIntersecting);
      });
    }, {
      // A thin strip across the middle of the viewport.
      rootMargin: "-48% 0px -48% 0px",
      threshold: 0
    });

    items.forEach(function (item) { observer.observe(item); });
  }

  function fillYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function init() {
    setUpNewsToggle();
    openLinksInNewTab();
    highlightTimelineOnScroll();
    fillYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
