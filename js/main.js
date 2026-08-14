/* ============================================================
   诸葛宇轩 学术主页 · 核心脚本
   - i18n 双语切换（中/EN）
   - 首页/列表页自动抓取 blog/list.json 与 projects/data.json 渲染
   - 项目详情弹窗
   - 博客 Markdown 渲染（marked.js + KaTeX）
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 基础配置 ---------- */
  var ROOT = document.body.getAttribute("data-root") || "";
  var LANG_KEY = "site-lang";
  var LIST_URL = ROOT + "blog/list.json";      // 站点根路径下：blog/list.json
  var DATA_URL = ROOT + "projects/data.json";  // 站点根路径下：projects/data.json

  /* ---------- i18n 字典 ---------- */
  var I18N = {
    zh: {
      nav_home: "首页", nav_about: "关于", nav_research: "研究", nav_education: "教育",
      nav_projects: "项目", nav_blog: "博客", nav_contact: "联系",
      hero_name: "诸葛宇轩",
      hero_sub: "清华大学 · 物理系本科生",
      chip1: "非厄米物理", chip2: "量子开放系统", chip3: "拓扑物态",
      hero_cta_contact: "联系我", hero_cta_notes: "阅读笔记 →", hero_cta_github: "GitHub ↗",
      sec_about: "关于我", sec_research: "研究方向", sec_education: "教育经历",
      sec_projects: "项目经历", sec_blog: "博客 / 学术笔记", sec_contact: "联系我",
      about_p1: "你好！我是 <strong>诸葛宇轩</strong>，清华大学物理系本科生。我最近加入了研究 <strong>非厄米物理与量子开放系统</strong> 的课题组，重点关注其中与 <strong>拓扑物态</strong> 相关的问题，如非布洛赫能带理论以及开放系统中的拓扑性质。",
      about_p2: "本页面用于整理与展示我的学习笔记、科研项目与经历。欢迎通过下方联系方式与我交流讨论。",
      info_name: "姓名", info_unit: "单位", info_role: "身份", info_field: "方向",
      info_email: "邮箱", info_github: "GitHub",
      val_name: "诸葛宇轩", val_unit: "清华大学 · 物理系", val_role: "本科生",
      val_field: "非厄米物理 · 量子开放系统",
      topic1: "非厄米物理", topic1d: "研究例外点、非布洛赫能带理论与体-边对应的修正等非厄米体系特有的现象。",
      topic2: "量子开放系统", topic2d: "关注耗散与驱动下开放量子系统的动力学，涉及 Lindblad 主方程与 Keldysh 场论等方法。",
      topic3: "拓扑物态", topic3d: "从厄米拓扑不变量出发，理解非厄米体系中拓扑相、边界态与例外点拓扑。",
      edu_name: "清华大学 · 物理系", edu_date: "2024.09 — 至今",
      edu_desc: "本科（在读），目前在非厄米物理与量子开放系统方向进行科研训练。",
      proj_more: "查看全部项目 →", blog_more: "全部笔记 →",
      proj_hint: "点击卡片查看详情",
      contact_email: "邮箱", contact_github: "GitHub", contact_addr: "地址",
      val_addr: "北京市海淀区 · 清华大学",
      footer_line: "© {year} 诸葛宇轩 · 清华大学物理系",
      empty_posts: "暂无博客内容", empty_projects: "暂无项目",
      data_error: "数据加载失败：请通过本地服务器访问（http://127.0.0.1:8000）或检查网络后刷新。",
      modal_close: "关闭",
      article_loading: "文章加载中…",
      article_notfound: "未找到该文章。",
      article_back_blog: "← 返回博客列表", article_back_home: "回到首页",
      article_pub: "发布于"
    },
    en: {
      nav_home: "Home", nav_about: "About", nav_research: "Research", nav_education: "Education",
      nav_projects: "Projects", nav_blog: "Blog", nav_contact: "Contact",
      hero_name: "Yuxuan Zhuge",
      hero_sub: "Tsinghua University · Undergraduate in Physics",
      chip1: "Non-Hermitian Physics", chip2: "Open Quantum Systems", chip3: "Topological Matter",
      hero_cta_contact: "Contact Me", hero_cta_notes: "Read Notes →", hero_cta_github: "GitHub ↗",
      sec_about: "About Me", sec_research: "Research Interests", sec_education: "Education",
      sec_projects: "Projects", sec_blog: "Blog & Notes", sec_contact: "Contact",
      about_p1: "Hi! I'm <strong>Yuxuan Zhuge</strong>, an undergraduate in the Department of Physics at Tsinghua University. I recently joined a group working on <strong>non-Hermitian physics and open quantum systems</strong>, with a focus on <strong>topological phenomena</strong> such as non-Bloch band theory and topology in open systems.",
      about_p2: "This page collects my study notes, research projects, and experience. Feel free to reach out through the contact section below.",
      info_name: "Name", info_unit: "Institution", info_role: "Role", info_field: "Research",
      info_email: "Email", info_github: "GitHub",
      val_name: "Yuxuan Zhuge", val_unit: "Tsinghua University · Physics", val_role: "Undergraduate",
      val_field: "Non-Hermitian & Open Quantum Systems",
      topic1: "Non-Hermitian Physics", topic1d: "Exceptional points, non-Bloch band theory, and modified bulk-boundary correspondence unique to non-Hermitian systems.",
      topic2: "Open Quantum Systems", topic2d: "Dynamics of dissipative and driven open quantum systems, via Lindblad master equations and Keldysh field theory.",
      topic3: "Topological Matter", topic3d: "From Hermitian topological invariants to topological phases, edge states, and exceptional-point topology in non-Hermitian systems.",
      edu_name: "Tsinghua University · Physics", edu_date: "Sep 2024 — Present",
      edu_desc: "Undergraduate (in progress), currently doing research training in non-Hermitian physics and open quantum systems.",
      proj_more: "All Projects →", blog_more: "All Posts →",
      proj_hint: "Click a card for details",
      contact_email: "Email", contact_github: "GitHub", contact_addr: "Address",
      val_addr: "Haidian, Beijing · Tsinghua University",
      footer_line: "© {year} Yuxuan Zhuge · Tsinghua University, Physics",
      empty_posts: "No posts yet", empty_projects: "No projects yet",
      data_error: "Failed to load data: please view via the local server (http://127.0.0.1:8000) or refresh after checking the network.",
      modal_close: "Close",
      article_loading: "Loading article…",
      article_notfound: "Article not found.",
      article_back_blog: "← Back to Blog List", article_back_home: "Back to Home",
      article_pub: "Published on"
    }
  };

  var currentLang = "zh";
  try { currentLang = localStorage.getItem(LANG_KEY) || "zh"; } catch (e) { /* 隐私模式等场景 localStorage 不可用时回退中文 */ }
  if (!I18N[currentLang]) currentLang = "zh";

  function t(key) {
    var d = I18N[currentLang];
    var v = (d && d[key] !== undefined) ? d[key] : (I18N.zh[key] !== undefined ? I18N.zh[key] : key);
    return String(v).replace(/\{year\}/g, String(new Date().getFullYear()));
  }

  /* ---------- 语言切换 ---------- */
  function applyLang() {
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n"));
    });
    var btn = document.getElementById("langToggle");
    if (btn) btn.textContent = currentLang === "zh" ? "EN" : "中";
    if (window.__renderDynamic) window.__renderDynamic();
  }

  /* ---------- 工具 ---------- */
  function fetchJSON(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }

  function showError(containerId) {
    var el = document.getElementById(containerId);
    if (el) el.innerHTML = '<p class="data-empty">' + t("data_error") + "</p>";
  }

  /* 项目状态：single 字段快速切换（ongoing=进行中, done=已完成） */
  function statusLabel(p) {
    var map = currentLang === "zh"
      ? { ongoing: "进行中", done: "已完成" }
      : { ongoing: "Ongoing", done: "Completed" };
    return map[p.status] || p.status || "";
  }

  /* ---------- 博客列表渲染 ---------- */
  function renderPosts(list, containerId, limit) {
    var container = document.getElementById(containerId);
    if (!container) return;
    if (!list || !list.posts) { showError(containerId); return; }
    var posts = list.posts.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
    if (limit) posts = posts.slice(0, limit);
    if (!posts.length) {
      container.innerHTML = '<p class="data-empty">' + t("empty_posts") + "</p>";
      return;
    }
    container.innerHTML = posts.map(function (p) {
      return (
        '<a class="post-item" href="' + ROOT + 'blog/article.html?file=' + encodeURIComponent(p.file) + '">' +
          '<div class="post-date">' + p.date + "</div>" +
          '<div class="post-info">' +
            "<h3>" + (currentLang === "zh" ? p.title_zh : p.title_en) + "</h3>" +
            "<p>" + (currentLang === "zh" ? p.intro_zh : p.intro_en) + "</p>" +
          "</div>" +
          '<span class="post-arrow">→</span>' +
        "</a>"
      );
    }).join("");
  }

  /* ---------- 项目渲染 ---------- */
  function renderProjects(list, containerId, limit) {
    var container = document.getElementById(containerId);
    if (!container) return;
    if (!list || !list.projects) { showError(containerId); return; }
    /* 按日期倒序：新上传的项目自动排在最上面 */
    var projects = list.projects.slice().sort(function (a, b) {
      var da = a.date || "0000-00-00", db = b.date || "0000-00-00";
      return db.localeCompare(da);
    });
    if (limit) projects = projects.slice(0, limit);
    if (!projects.length) {
      container.innerHTML = '<p class="data-empty">' + t("empty_projects") + "</p>";
      return;
    }
    window.__projects = list.projects;
    container.innerHTML = projects.map(function (p) {
      return (
        '<div class="card project-card" data-id="' + p.id + '">' +
          '<div class="project-top">' +
            '<span class="project-badge ' + (p.status === "done" ? "badge-cyan" : "badge-indigo") + '">' + statusLabel(p) + "</span>" +
            "<h3>" + (currentLang === "zh" ? p.name_zh : p.name_en) + "</h3>" +
          "</div>" +
          "<p>" + (currentLang === "zh" ? p.desc_zh : p.desc_en) + "</p>" +
          '<div class="project-meta">' +
            p.tags.map(function (tag) { return '<span class="chip chip-sm">' + tag + "</span>"; }).join("") +
          "</div>" +
          '<span class="proj-more">' + t("proj_hint") + " →</span>" +
        "</div>"
      );
    }).join("");

    container.querySelectorAll(".project-card").forEach(function (card) {
      card.addEventListener("click", function () {
        var id = card.getAttribute("data-id");
        var proj = (window.__projects || []).filter(function (x) { return x.id === id; })[0];
        if (proj) openModal(proj);
      });
    });
  }

  /* ---------- 项目详情弹窗 ---------- */
  function openModal(proj) {
    var overlay = document.getElementById("modalOverlay");
    if (!overlay) return;
    var zh = currentLang === "zh";
    document.getElementById("modalTitle").innerHTML = zh ? proj.name_zh : proj.name_en;
    var statusEl = document.getElementById("modalStatus");
    if (statusEl) statusEl.textContent = statusLabel(proj);
    var body = document.getElementById("modalBody");
    var detail = zh ? proj.detail_zh : proj.detail_en;
    body.innerHTML = detail.split("\n").map(function (line) {
      var s = line.trim();
      if (!s) return "";
      if (/^\d+[\.、]/.test(s)) return "<li>" + s + "</li>";
      if (/^[-•]/.test(s)) return "<li>" + s.replace(/^[-•]\s*/, "") + "</li>";
      return "<p>" + s + "</p>";
    }).join("");
    var tagsEl = document.getElementById("modalTags");
    if (tagsEl) tagsEl.innerHTML = proj.tags.map(function (tag) {
      return '<span class="chip chip-sm">' + tag + "</span>";
    }).join("");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    var overlay = document.getElementById("modalOverlay");
    if (!overlay) return;
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  /* ---------- 博客文章页（Markdown 渲染） ---------- */
  function parseFrontMatter(md) {
    var m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!m) return { meta: {}, body: md };
    var meta = {};
    m[1].split(/\r?\n/).forEach(function (line) {
      var idx = line.indexOf(":");
      if (idx > 0) meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    });
    return { meta: meta, body: md.slice(m[0].length) };
  }

  function renderMarkdownTo(element, mdText) {
    if (!window.marked) {
      element.innerHTML = '<p class="data-empty">marked.js 加载失败，请检查网络后刷新。</p>';
      return null;
    }
    marked.setOptions({ gfm: true, breaks: true });
    var parsed = parseFrontMatter(mdText);
    element.innerHTML = marked.parse(parsed.body);
    if (window.renderMathInElement) {
      renderMathInElement(element, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }
    return parsed.meta;
  }

  function initArticle() {
    var params = new URLSearchParams(location.search);
    var file = params.get("file");
    var body = document.getElementById("articleBody");
    if (!file || !body) return;
    body.innerHTML = '<p class="data-empty">' + t("article_loading") + "</p>";

    fetch(file).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    }).then(function (md) {
      window.__articleMeta = renderMarkdownTo(body, md) || {};
      window.__renderDynamic();
    }).catch(function () {
      body.innerHTML = '<p class="data-empty">' + t("article_notfound") + "</p>";
    });
  }

  /* ---------- 动态内容重新渲染（切换语言时调用） ---------- */
  window.__renderDynamic = function () {
    var page = document.body.getAttribute("data-page");
    if (page === "article") {
      var meta = window.__articleMeta || {};
      var title = currentLang === "zh" ? (meta.title_zh || "") : (meta.title_en || meta.title_zh || "");
      var elTitle = document.getElementById("articleTitle");
      if (elTitle && title) elTitle.textContent = title;
      var elDate = document.getElementById("articleDate");
      if (elDate && meta.date) elDate.textContent = t("article_pub") + " " + meta.date;
      var elTags = document.getElementById("articleTags");
      if (elTags && meta.tags) {
        var raw = meta.tags.replace(/^\[|\]$/g, "");
        elTags.innerHTML = raw.split(",").map(function (s) {
          return '<span class="chip chip-sm">' + s.trim() + "</span>";
        }).join("");
      }
    }
  };

  /* ---------- 页面初始化 ---------- */
  function init() {
    var page = document.body.getAttribute("data-page");

    /* 页脚年份 */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* 语言切换按钮 */
    var langToggle = document.getElementById("langToggle");
    if (langToggle) {
      langToggle.addEventListener("click", function () {
        currentLang = currentLang === "zh" ? "en" : "zh";
        try { localStorage.setItem(LANG_KEY, currentLang); } catch (e) {}
        applyLang();
      });
    }
    applyLang();

    /* 移动端菜单 */
    var navToggle = document.getElementById("navToggle");
    var navLinks = document.getElementById("navLinks");
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", function () { navLinks.classList.toggle("open"); });
      navLinks.addEventListener("click", function (e) {
        if (e.target.classList.contains("nav-link")) navLinks.classList.remove("open");
      });
    }

    /* 当前页导航高亮（非首页） */
    var navKey = page === "article" ? "blog" : page;
    if (page !== "home") {
      document.querySelectorAll(".nav-link").forEach(function (link) {
        var href = link.getAttribute("href");
        if (href && href.indexOf(".html") > -1 && href.indexOf("#") === -1) {
          if (href.indexOf(navKey) > -1) link.classList.add("active");
        }
      });
    }

    /* 首页滚动监听（scrollspy） */
    if (page === "home") {
      var sections = document.querySelectorAll("main section[id]");
      var navAnchors = document.querySelectorAll('.nav-link[href^="#"]');
      function updateActive() {
        var pos = window.scrollY + 100, current = "";
        sections.forEach(function (sec) { if (pos >= sec.offsetTop) current = sec.id; });
        navAnchors.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + current);
        });
      }
      window.addEventListener("scroll", updateActive, { passive: true });
      updateActive();
    }

    /* 回到顶部 */
    var backTop = document.getElementById("backTop");
    if (backTop) {
      window.addEventListener("scroll", function () {
        backTop.classList.toggle("show", window.scrollY > 420);
      }, { passive: true });
      backTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* 滚动显示动画 */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add("visible"); io.unobserve(entry.target); }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("visible"); });
    }

    /* 弹窗关闭 */
    var overlay = document.getElementById("modalOverlay");
    if (overlay) {
      overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });
      var closeBtn = document.getElementById("modalClose");
      if (closeBtn) closeBtn.addEventListener("click", closeModal);
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
    }

    /* 数据抓取渲染 */
    if (page === "home") {
      fetchJSON(LIST_URL).then(function (list) { renderPosts(list, "postList", 3); }).catch(function () { showError("postList"); });
      fetchJSON(DATA_URL).then(function (data) { renderProjects(data, "projList", 2); }).catch(function () { showError("projList"); });
    } else if (page === "blog") {
      fetchJSON(LIST_URL).then(function (list) { renderPosts(list, "postList"); }).catch(function () { showError("postList"); });
    } else if (page === "projects") {
      fetchJSON(DATA_URL).then(function (data) { renderProjects(data, "projList"); }).catch(function () { showError("projList"); });
    } else if (page === "article") {
      initArticle();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
