/* ==========================================================
   诸葛宇轩 学术主页 · 交互脚本
   ========================================================== */

(function () {
  "use strict";

  /* ---------- 页脚年份 ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 移动端菜单 ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.classList.contains("nav-link")) {
        navLinks.classList.remove("open");
      }
    });
  }

  /* ---------- 当前页面高亮（非首页） ---------- */
  var page = document.body.getAttribute("data-page");
  document.querySelectorAll(".nav-link").forEach(function (link) {
    var href = link.getAttribute("href");
    if (page && href && href.indexOf(".html") > -1 && href.indexOf("#") === -1) {
      if (href.indexOf(page) > -1) link.classList.add("active");
    }
  });

  /* ---------- 首页滚动监听（scrollspy） ---------- */
  if (page === "home") {
    var sections = document.querySelectorAll("main section[id]");
    var navAnchors = document.querySelectorAll('.nav-link[href^="#"]');

    function updateActive() {
      var pos = window.scrollY + 100;
      var current = "";
      sections.forEach(function (sec) {
        if (pos >= sec.offsetTop) current = sec.id;
      });
      navAnchors.forEach(function (link) {
        var active = link.getAttribute("href") === "#" + current;
        link.classList.toggle("active", active);
      });
    }

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
  }

  /* ---------- 回到顶部 ---------- */
  var backTop = document.getElementById("backTop");
  if (backTop) {
    window.addEventListener("scroll", function () {
      backTop.classList.toggle("show", window.scrollY > 420);
    }, { passive: true });

    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 滚动显示动画 ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }
})();
