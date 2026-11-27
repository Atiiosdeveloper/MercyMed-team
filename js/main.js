/* MercyMed – page behaviour: mobile menu, languages, prices, team,
   WhatsApp booking. Clinic data lives in js/config.js. */
(function () {
  "use strict";

  var cfg = window.MM_CONFIG || {};
  var dict = window.MM_I18N || {};
  var team = cfg.team || [];
  var current = "en";

  /* ---------- WhatsApp links ---------- */
  // With a confirmed number the chat opens with the clinic directly.
  // Without one, WhatsApp opens with the text ready and asks which chat to use.
  function waUrl(text) {
    var num = String(cfg.whatsappNumber || "").replace(/\D/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(text);
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---------- Languages ---------- */
  // English is read from the page itself; RU/KY come from js/i18n.js.
  var english = {};
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    if (!(key in english)) english[key] = el.textContent;
  });
  document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
    english[el.getAttribute("data-i18n-alt")] = el.alt;
  });

  function t(key) {
    if (current !== "en" && dict[current] && dict[current][key]) return dict[current][key];
    return english[key] || (dict.en && dict.en[key]) || "";
  }
  function pick(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[current] || obj.en || "";
  }

  /* ---------- Prices and WhatsApp buttons ---------- */
  function renderLinks() {
    var prices = cfg.prices || {};
    document.querySelectorAll("[data-price]").forEach(function (el) {
      var p = prices[el.getAttribute("data-price")];
      el.textContent = p ? p : t("priceAsk");
      el.classList.toggle("price-known", !!p);
    });
    document.querySelectorAll("[data-ask]").forEach(function (a) {
      var title = a.closest(".service").querySelector("h3").textContent;
      a.href = waUrl(t("msgPriceQ") + " " + title);
    });
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      a.href = waUrl(t(a.getAttribute("data-wa")));
    });
  }

  /* ---------- Team (from config) ---------- */
  var grid = document.getElementById("team-grid");
  function renderTeam() {
    grid.innerHTML = "";
    team.forEach(function (m) {
      var card = document.createElement("article");
      card.className = "person";
      var pic;
      if (m.photo) {
        pic = document.createElement("img");
        pic.className = "avatar avatar-photo";
        pic.src = m.photo;
        pic.alt = m.photoIsNotPortrait ? pick(m.role) : m.name;
        pic.width = 120; pic.height = 120;
        pic.loading = "lazy";
      } else {
        pic = document.createElement("div");
        pic.className = "avatar";
        pic.setAttribute("aria-hidden", "true");
        pic.textContent = m.name.replace(/^Dr\.?\s*/, "").charAt(0);
      }
      var h = document.createElement("h3"); h.textContent = m.name;
      var r = document.createElement("p"); r.className = "role"; r.textContent = pick(m.role);
      var b = document.createElement("p"); b.className = "bio"; b.textContent = pick(m.bio);
      card.append(pic, h, r, b);
      grid.appendChild(card);
    });
  }

  /* ---------- Booking form: doctor list ---------- */
  var form = document.getElementById("book-form");
  var doctorSelect = form.doctor;
  team.filter(function (m) { return m.bookable; }).forEach(function (m) {
    var o = document.createElement("option");
    o.value = m.name;
    doctorSelect.appendChild(o);
  });
  function renderDoctorOptions() {
    Array.prototype.forEach.call(doctorSelect.options, function (o) {
      if (!o.value) return;
      var m = team.filter(function (x) { return x.name === o.value; })[0];
      o.textContent = m.name + " – " + pick(m.role);
    });
  }

  /* ---------- Instagram (from config) ---------- */
  function renderInstagram() {
    var a = document.getElementById("insta-link");
    var handle = String(cfg.instagramHandle || "").replace(/^@/, "");
    if (!handle) return;
    a.removeAttribute("data-i18n");
    a.textContent = "@" + handle;
    a.href = "https://www.instagram.com/" + encodeURIComponent(handle) + "/";
    a.target = "_blank";
    a.rel = "noopener";
    a.removeAttribute("aria-disabled");
  }

  /* ---------- Booking via WhatsApp ---------- */
  var preview = document.getElementById("preview");
  var previewText = document.getElementById("preview-text");
  var waLink = document.getElementById("wa-link");
  var copyOk = document.getElementById("copy-ok");

  // 2026-12-03 -> 03.12.2026, the format used in Kyrgyzstan
  function formatDate(iso) {
    var p = iso.split("-");
    return p.length === 3 ? p[2] + "." + p[1] + "." + p[0] : iso;
  }

  function buildMessage() {
    var lines = [
      t("msgHello"),
      t("msgName") + ": " + form.name.value.trim(),
      t("msgDob") + ": " + formatDate(form.dob.value),
      t("msgPhone") + ": " + form.phone.value.trim()
    ];
    var type = form.type.value;
    if (type) lines.push(t("msgType") + ": " + t(type === "child" ? "fTypeChild" : "fTypeAdult"));
    if (form.doctor.value) lines.push(t("msgDoctor") + ": " + form.doctor.value);
    if (form.prefdate.value) lines.push(t("msgDate") + ": " + formatDate(form.prefdate.value));
    var msg = lines.join("\n");
    previewText.textContent = msg;
    waLink.href = waUrl(msg);
    return msg;
  }

  /* Validation: name, a date of birth that is not in the future,
     and a phone number with at least 9 digits. */
  function todayISO() {
    var d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }
  form.dob.max = todayISO();
  form.prefdate.min = todayISO();   // no past dates for the appointment

  var checks = [
    { input: form.name, error: "err-name", ok: function (v) { return v.trim().length >= 2; } },
    { input: form.dob, error: "err-dob", ok: function (v) { return !!v && v <= todayISO() && v >= "1900-01-01"; } },
    { input: form.phone, error: "err-phone", ok: function (v) {
        return /^[0-9+()\-\s]+$/.test(v.trim()) && v.replace(/\D/g, "").length >= 9;
      } },
    // Optional: empty is fine, otherwise today or later
    { input: form.prefdate, error: "err-date", ok: function (v) { return !v || v >= todayISO(); } }
  ];
  function showError(c, bad) {
    document.getElementById(c.error).hidden = !bad;
    if (bad) c.input.setAttribute("aria-invalid", "true");
    else c.input.removeAttribute("aria-invalid");
  }
  function validate() {
    var firstBad = null;
    checks.forEach(function (c) {
      var bad = !c.ok(c.input.value);
      showError(c, bad);
      if (bad && !firstBad) firstBad = c.input;
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }
  // Clear a field's error as soon as it is fixed
  checks.forEach(function (c) {
    c.input.addEventListener("input", function () {
      if (c.input.getAttribute("aria-invalid") === "true" && c.ok(c.input.value)) showError(c, false);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) { preview.hidden = true; return; }
    var msg = buildMessage();
    preview.hidden = false;
    copyOk.hidden = true;
    window.open(waUrl(msg), "_blank", "noopener");
  });

  document.getElementById("copy-btn").addEventListener("click", function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(previewText.textContent).then(function () { copyOk.hidden = false; }, function () {});
    }
  });

  document.querySelectorAll('[aria-disabled="true"]').forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (el.getAttribute("aria-disabled") === "true") e.preventDefault();
    });
  });

  /* ---------- Switching language ---------- */
  function setLanguage(lang) {
    if (!(lang === "en" || dict[lang])) lang = "en";
    current = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.alt = t(el.getAttribute("data-i18n-alt"));
    });
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    document.querySelector(".translation-note").hidden = lang === "en";
    renderLinks();
    renderTeam();
    renderDoctorOptions();
    if (!preview.hidden) buildMessage();
    try { localStorage.setItem("mm-lang", lang); } catch (e) { /* storage unavailable */ }
  }
  document.querySelectorAll(".lang-switch button").forEach(function (b) {
    b.addEventListener("click", function () { setLanguage(b.dataset.lang); });
  });

  /* ---------- Active nav link while scrolling ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav ul a"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { io.observe(s); });
  }

  /* ---------- Start ---------- */
  renderInstagram();
  var saved = null;
  try { saved = localStorage.getItem("mm-lang"); } catch (e) { /* ignore */ }
  setLanguage(saved || "en");
})();
