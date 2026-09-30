(() => {
  "use strict";
  const D = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = matchMedia("(hover: hover)").matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const css = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const ARROW = '<svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg>';

  /* ---------------- theme ---------------- */
  const root = document.documentElement;
  const isDark = () => root.dataset.theme === "dark" || (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
  $("#themeToggle").addEventListener("click", () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    window.dispatchEvent(new Event("themechange"));
  });

  /* ---------------- nav, progress, glow ---------------- */
  const nav = $("#nav"), bar = $(".scroll-progress"), glow = $(".cursor-glow");
  const menuBtn = $("#menuBtn"), links = $("#navLinks");
  menuBtn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  $$("a", links).forEach(a => a.addEventListener("click", () => { links.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); }));

  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("scrolled", y > 20);
    bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  if (canHover && !reduced) {
    addEventListener("pointermove", e => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; }, { passive: true });
  }

  const sections = $$("main section[id]");
  const navMap = new Map($$("a", links).map(a => [a.getAttribute("href").slice(1), a]));
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      $$("a", links).forEach(a => a.classList.remove("active"));
      navMap.get(en.target.id === "more" ? "teaching" : en.target.id)?.classList.add("active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => navObs.observe(s));

  /* ---------------- rotating words ---------------- */
  const words = ["cardiology", "cancer genomics", "medical imaging", "clinical decision support", "digital health products"];
  const rot = $("#rotator");
  if (!reduced) {
    let wi = 0, ci = words[0].length, del = true;
    const tick = () => {
      const w = words[wi];
      rot.textContent = w.slice(0, ci);
      if (del) { ci--; if (ci < 0) { del = false; wi = (wi + 1) % words.length; ci = 0; } setTimeout(tick, 35); }
      else { ci++; if (ci > words[wi].length) { del = true; ci = words[wi].length; setTimeout(tick, 2200); } else setTimeout(tick, 70); }
    };
    setTimeout(tick, 2400);
  }

  /* ---------------- render: service ---------------- */
  $("#serviceList").innerHTML = D.service.map(s => `<li>${esc(s)}</li>`).join("");

  /* ---------------- render: timeline ---------------- */
  const ym = s => { const [y, m] = s.split("-").map(Number); return y + (m - 1) / 12; };
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmt = s => { const [y, m] = s.split("-").map(Number); return `${MONTHS[m - 1]} ${y}`; };
  const dur = (a, b) => {
    const [y1, m1] = a.split("-").map(Number), [y2, m2] = b.split("-").map(Number);
    const n = (y2 - y1) * 12 + (m2 - m1) + 1, y = Math.floor(n / 12), m = n % 12;
    return [y ? `${y} yr${y > 1 ? "s" : ""}` : "", m ? `${m} mo${m > 1 ? "s" : ""}` : ""].filter(Boolean).join(" ");
  };
  const T0 = 2017, T1 = 2027.5, NOW = ym(D.now);
  const pct = v => ((v - T0) / (T1 - T0)) * 100;
  const laneColor = ["var(--a1)", "var(--a2)", "var(--a3)"];

  const logoChip = r => r.badge
    ? `<span class="logo-chip badge">${esc(r.badge)}</span>`
    : `<span class="logo-chip${r.logoDark ? " dark" : ""}"><img src="${r.logo}" alt="${esc(r.org)} logo" loading="lazy"></span>`;

  const tl = $("#timeline");
  let html = `<div class="tl-axis">`;
  for (let y = T0; y <= 2027; y++) html += `<span class="tl-year" style="left:${pct(y)}%">${y}</span>`;
  html += `</div><div class="tl-grid">`;
  for (let y = T0; y <= 2027; y++) html += `<i style="left:${pct(y)}%"></i>`;
  html += `<span class="tl-now" style="left:${pct(NOW)}%"></span></div>`;
  D.lanes.forEach((name, li) => {
    html += `<div class="tl-lane"><div class="tl-lane-label"><b style="background:${laneColor[li]}"></b>${esc(name)}</div><div class="tl-track">`;
    D.roles.filter(r => r.lane === li).forEach(r => {
      const s = ym(r.start), e = r.end ? ym(r.end) + 1 / 12 : T1;
      const left = pct(s), width = pct(e) - left;
      const i = D.roles.indexOf(r);
      html += `<button class="tl-bar${r.end ? "" : " ongoing"}" data-id="${r.id}" style="--c:${laneColor[li]};left:calc(${left}% + 2px);width:calc(${width}% - 4px);transition-delay:${i * 0.15}s, 0s, 0s, 0s"
        aria-label="${esc(r.title)} at ${esc(r.org)}, ${fmt(r.start)} to ${r.end ? fmt(r.end) : "present"}">
        ${logoChip(r)}<span class="txt"><span class="t">${esc(r.short)}</span><span class="d">${r.start.slice(0, 4)} – ${r.end ? r.end.slice(0, 4) : "now"}</span></span></button>`;
    });
    html += `</div></div>`;
  });
  tl.innerHTML = html;
  // Relax the stagger once the bars have drawn so hover feels instant
  setTimeout(() => $$(".tl-bar").forEach(b => b.style.transitionDelay = ""), 4000);

  const detail = $("#roleDetail");
  const showRole = id => {
    const r = D.roles.find(x => x.id === id);
    const c = laneColor[r.lane];
    $$(".tl-bar").forEach(b => b.classList.toggle("sel", b.dataset.id === id));
    const end = r.end || D.now;
    detail.innerHTML = `<article class="role-card" style="--c:${c}">
      ${logoChip(r)}
      <div>
        <p class="role-meta">${fmt(r.start)} – ${r.end ? fmt(r.end) : "Present"} · ${dur(r.start, end)} · ${esc(r.place)}</p>
        <h3>${esc(r.title)}</h3>
        <p class="role-org">${esc(r.org)}</p>
        <p class="sum">${esc(r.summary)}</p>
        ${r.points.length ? `<ul class="role-points">${r.points.map(p => `<li>${p.b ? `<b>${esc(p.b)}</b>: ` : ""}${esc(p.t)}${p.link ? ` <a class="inline-link" href="${p.link}" target="_blank" rel="noopener">${esc(p.linkText)} ${ARROW}</a>` : ""}</li>`).join("")}</ul>` : ""}
        ${r.link ? `<a class="inline-link role-link" href="${r.link}" target="_blank" rel="noopener">${esc(r.linkText)} ${ARROW}</a>` : ""}
      </div></article>`;
  };
  tl.addEventListener("click", e => { const b = e.target.closest(".tl-bar"); if (b) showRole(b.dataset.id); });
  // On small screens the chart scrolls sideways; start at the present
  const tlWrap = tl.parentElement;
  tlWrap.scrollLeft = tlWrap.scrollWidth;
  showRole("aiml");

  /* ---------------- render: projects ---------------- */
  const grid = $("#projGrid");
  grid.innerHTML = D.projects.map((p, i) => `
    <a class="proj reveal" href="${p.url}" target="_blank" rel="noopener" style="transition-delay:${(i % 4) * 80}ms">
      <img src="assets/img/projects/${p.img}" alt="" loading="lazy">
      <span class="proj-num">${String(i + 1).padStart(2, "0")}</span>
      <div class="proj-info">
        <span class="proj-tag">${esc(p.tag)}</span>
        <h3>${esc(p.title)}</h3>
        <div class="proj-more"><div>
          <p>${esc(p.desc)}</p>
          <div class="proj-venue"><span>${esc(p.venue)} · ${p.year}</span><span>Read paper ↗</span></div>
        </div></div>
      </div>
    </a>`).join("");
  $$(".proj", grid).forEach(card => {
    if (!canHover) {
      card.addEventListener("click", e => {
        if (!card.classList.contains("open")) {
          e.preventDefault();
          $$(".proj.open", grid).forEach(c => c.classList.remove("open"));
          card.classList.add("open");
        }
      });
    } else if (!reduced) {
      card.addEventListener("pointermove", e => {
        const b = card.getBoundingClientRect();
        const x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5;
        card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    }
  });

  /* ---------------- render: teaching ---------------- */
  const initials = n => n.split(" ").map(w => w[0]).join("").slice(0, 2);
  $("#students").innerHTML = D.students.map(s => `
    <div class="student">
      <span class="avatar">${esc(initials(s.name))}</span>
      <div><div class="who">${esc(s.name)}</div>
      <div class="meta"><b>${esc(s.role)}</b> · PhD · since ${s.year}</div>
      <div class="topic">${esc(s.topic)}</div></div>
    </div>`).join("");
  $("#courses").innerHTML = D.courses.map(c => `
    <li class="course${c.highlight ? " hl" : ""}">
      <span class="code">${esc(c.code)}</span>
      <div><div class="name">${esc(c.name)}</div><div class="sub">${esc(c.role)}${c.note ? " · " + esc(c.note) : ""}</div></div>
      <span class="yrs">${esc(c.years)}</span>
    </li>`).join("");

  /* ---------------- render: pets ---------------- */
  $("#pets").innerHTML = D.pets.map(p => `
    <li><a class="pet" href="${p.url}" target="_blank" rel="noopener">
      <img src="assets/img/pets/${p.img}" alt="" loading="lazy">
      <div><div class="t">${esc(p.title)}</div><div class="d">${esc(p.desc)}</div><div class="w">${esc(p.where)}</div></div>
      <span class="arrow">${ARROW}</span>
    </a></li>`).join("");

  /* ---------------- render: publications ---------------- */
  const pubsEl = $("#pubs");
  let pubFilter = "all", pubQuery = "";
  const renderPubs = () => {
    const q = pubQuery.toLowerCase();
    const list = D.pubs.filter(p =>
      (pubFilter === "all" || p.role === "first" || p.role === "senior") &&
      (!q || (p.title + " " + p.venue + " " + p.authors + " " + p.year).toLowerCase().includes(q)));
    if (!list.length) { pubsEl.innerHTML = `<p class="pub-empty">No publications match “${esc(pubQuery)}”.</p>`; return; }
    const years = [...new Set(list.map(p => p.year))].sort((a, b) => b - a);
    pubsEl.innerHTML = years.map(y => `
      <div class="pub-year"><h3>${y}</h3><div class="pub-items">
        ${list.filter(p => p.year === y).map(p => {
          const badge = p.role === "first" ? `<span class="badge-role">${p.authors.includes("†") ? "Co-first author" : "First author"}</span>`
            : p.role === "senior" ? `<span class="badge-role senior">Senior author</span>` : "";
          return `<a class="pub" href="${p.url}" target="_blank" rel="noopener">
            <span class="jlogo"><img src="assets/img/logos/${p.logo}" alt="" loading="lazy"></span>
            <div><div class="title">${esc(p.title)}</div>
            <div class="authors">${esc(p.authors).replace(/Dorraki M†?/, m => `<b>${m}</b>`)}</div>
            <div class="venue"><span>${esc(p.venue)}</span>${badge}</div></div>
            <span class="go">${ARROW}</span></a>`;
        }).join("")}
      </div></div>`).join("");
  };
  $("#pubFilter").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$("#pubFilter button").forEach(x => x.classList.toggle("on", x === b));
    pubFilter = b.dataset.f === "lead" ? "lead" : "all"; renderPubs();
  });
  $("#pubSearch").addEventListener("input", e => { pubQuery = e.target.value.trim(); renderPubs(); });
  renderPubs();

  /* ---------------- render: awards ---------------- */
  const MEDAL = '<svg viewBox="0 0 24 24"><circle cx="12" cy="15" r="6"/><path d="M8.5 10 6 2h4l2 5 2-5h4l-2.5 8"/></svg>';
  $("#awardList").innerHTML = D.awards.map((a, i) => `
    <article class="award reveal" style="transition-delay:${(i % 3) * 90}ms">
      <span class="medal">${MEDAL}</span>
      <span class="yr">${esc(a.year)}</span>
      <h3>${esc(a.title)}</h3><p class="org">${esc(a.org)}</p><p>${esc(a.desc)}</p>
    </article>`).join("");
  $("#yr").textContent = new Date().getFullYear();

  /* ---------------- reveal + counters ---------------- */
  const countUp = el => {
    const target = parseFloat(el.dataset.count), dec = +(el.dataset.decimals || 0);
    const pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
    if (reduced) return;
    const t0 = performance.now(), dur = 1600;
    const step = t => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = pre + (target * e).toFixed(dec) + suf;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      $$("[data-count]", en.target).forEach(countUp);
      io.unobserve(en.target);
    });
  }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach(el => io.observe(el));
  const tlObs = new IntersectionObserver(([en]) => { if (en.isIntersecting) { tl.classList.add("in"); tlObs.disconnect(); } }, { threshold: .3 });
  tlObs.observe(tl);

  /* ================= canvases ================= */
  const fit = cv => {
    const dpr = Math.min(devicePixelRatio || 1, 2), r = cv.getBoundingClientRect();
    cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
    const ctx = cv.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w: r.width, h: r.height };
  };
  // Only animate canvases while on screen
  const whenVisible = (el, start, stop) => new IntersectionObserver(([en]) => en.isIntersecting ? start() : stop(), { threshold: 0.05 }).observe(el);
  const rng = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  /* ---------- hero neural field ---------- */
  (() => {
    const cv = $("#heroNet"); let ctx, w, h, pts = [], raf = 0, mouse = { x: -999, y: -999 }, rgb;
    const init = () => {
      ({ ctx, w, h } = fit(cv));
      rgb = css("--net-rgb");
      const n = Math.round(Math.min(110, (w * h) / 14000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: Math.random() * 1.6 + .6 }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const L = 130;
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 140 && d > 0) { p.x += dx / d * .8; p.y += dy / d * .8; }
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < L) { ctx.strokeStyle = `rgba(${rgb},${(1 - d / L) * .22})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        ctx.fillStyle = `rgba(${rgb},.55)`; ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 7); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    init();
    addEventListener("resize", () => { init(); if (reduced) draw1(); });
    addEventListener("themechange", () => { rgb = css("--net-rgb"); });
    cv.parentElement.addEventListener("pointermove", e => { const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; });
    cv.parentElement.addEventListener("pointerleave", () => mouse = { x: -999, y: -999 });
    const draw1 = () => { draw(); cancelAnimationFrame(raf); };
    if (reduced) draw1();
    else whenVisible(cv, () => { if (!raf) raf = requestAnimationFrame(draw); }, () => { cancelAnimationFrame(raf); raf = 0; });
  })();

  /* ---------- PiNet: image → graph ---------- */
  (() => {
    const cv = $("#pinetCanvas"), hud = $("#pinetHud");
    let ctx, w, h, img, nodes, edges, raf = 0, t0 = 0, seed = 7;
    const CYCLE = 10000;
    const build = () => {
      ({ ctx, w, h } = fit(cv));
      const R = rng(seed++ * 7919), sp = Math.max(46, Math.min(w, h) / 6.2);
      nodes = [];
      for (let y = sp * .4; y < h + sp * .4; y += sp * .86)
        for (let x = sp * .4 + ((y / sp | 0) % 2) * sp * .5; x < w + sp * .4; x += sp)
          if (R() > .12) nodes.push({ x: x + (R() - .5) * sp * .7, y: y + (R() - .5) * sp * .7, deg: 0 });
      edges = [];
      nodes.forEach((a, i) => {
        const near = nodes.map((b, j) => [j, Math.hypot(a.x - b.x, a.y - b.y)]).filter(([j]) => j !== i).sort((p, q) => p[1] - q[1]).slice(0, 3);
        near.forEach(([j, d]) => {
          if (d < sp * 1.35 && R() > .18 && !edges.some(e => (e.a === i && e.b === j) || (e.a === j && e.b === i))) {
            edges.push({ a: i, b: j, w: 2 + R() * 6, bend: (R() - .5) * 18 }); a.deg++; nodes[j].deg++;
          }
        });
      });
      // Render a synthetic grayscale "microscopy" image offscreen
      img = document.createElement("canvas");
      const dpr = cv.width / w; img.width = cv.width; img.height = cv.height;
      const g = img.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.fillStyle = "#0a0c10"; g.fillRect(0, 0, w, h);
      g.filter = "blur(2.2px)";
      edges.forEach(e => {
        const A = nodes[e.a], B = nodes[e.b], mx = (A.x + B.x) / 2 + e.bend, my = (A.y + B.y) / 2 - e.bend;
        g.strokeStyle = `rgba(215,222,235,${.45 + e.w / 16})`; g.lineWidth = e.w; g.lineCap = "round";
        g.beginPath(); g.moveTo(A.x, A.y); g.quadraticCurveTo(mx, my, B.x, B.y); g.stroke();
      });
      nodes.forEach(n => { if (n.deg) { g.fillStyle = "rgba(235,240,250,.85)"; g.beginPath(); g.arc(n.x, n.y, 4 + n.deg * 1.4, 0, 7); g.fill(); } });
      g.filter = "none";
      for (let i = 0; i < w * h / 90; i++) { g.fillStyle = `rgba(255,255,255,${R() * .08})`; g.fillRect(R() * w, R() * h, 1.4, 1.4); }
    };
    const col = d => d >= 4 ? "#ff9a62" : d === 3 ? "#8b7cff" : "#34e1c9";
    const frame = t => {
      if (!t0) t0 = t;
      let k = (t - t0) / CYCLE;
      if (k >= 1) { t0 = t; k = 0; build(); }
      const scan = Math.min(1, k / .38) * (w + 60) - 30;
      const fade = k > .88 ? 1 - (k - .88) / .12 : 1;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      // dim what's been scanned so the graph reads clearly
      ctx.fillStyle = `rgba(5,8,15,${.62 * fade})`; ctx.fillRect(0, 0, Math.max(0, scan), h);
      ctx.save(); ctx.globalAlpha = fade;
      edges.forEach(e => {
        const A = nodes[e.a], B = nodes[e.b];
        const p = Math.max(0, Math.min(1, (scan - Math.min(A.x, B.x)) / (Math.abs(A.x - B.x) + 20)));
        if (p <= 0) return;
        const [s, f] = A.x < B.x ? [A, B] : [B, A];
        ctx.strokeStyle = "rgba(160,200,255,.75)"; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + (f.x - s.x) * p, s.y + (f.y - s.y) * p); ctx.stroke();
      });
      const pulse = (Math.sin(t / 380) + 1) / 2;
      nodes.forEach(n => {
        if (!n.deg || n.x > scan) return;
        const age = Math.min(1, (scan - n.x) / 40), r = (2.5 + n.deg * .9) * age;
        ctx.fillStyle = col(n.deg);
        ctx.shadowColor = col(n.deg); ctx.shadowBlur = 10 + pulse * 6 * (k > .38);
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 7); ctx.fill();
      });
      ctx.restore(); ctx.shadowBlur = 0;
      if (scan > 0 && scan < w) {
        const gr = ctx.createLinearGradient(scan - 50, 0, scan, 0);
        gr.addColorStop(0, "rgba(52,225,201,0)"); gr.addColorStop(1, "rgba(52,225,201,.35)");
        ctx.fillStyle = gr; ctx.fillRect(scan - 50, 0, 50, h);
        ctx.fillStyle = "#34e1c9"; ctx.fillRect(scan, 0, 2, h);
      }
      const nN = nodes.filter(n => n.deg).length, meanDeg = (2 * edges.length / nN).toFixed(2);
      hud.textContent = k < .38 ? "scanning image…" : `graph extracted · ${nN} nodes · ${edges.length} edges · ⟨k⟩ = ${meanDeg}`;
      raf = requestAnimationFrame(frame);
    };
    build();
    addEventListener("resize", () => { build(); if (reduced) frame(t0 + CYCLE * .6); });
    if (reduced) { t0 = 1; frame(1 + CYCLE * .6); cancelAnimationFrame(raf); }
    else whenVisible(cv, () => { if (!raf) raf = requestAnimationFrame(frame); }, () => { cancelAnimationFrame(raf); raf = 0; });
  })();

  /* ---------- Circulatory risk profile ---------- */
  (() => {
    const cv = $("#riskCanvas"), hud = $("#riskHud");
    let ctx, w, h, raf = 0, t0 = 0;
    const F = ["Age", "Systolic BP", "Cholesterol", "HbA1c", "Smoking", "eGFR"];
    // Illustrative patients (normalised 0–1 contribution per feature) and overall risk %
    const P = [
      { v: [.25, .3, .35, .2, 0, .15], risk: 4 },
      { v: [.55, .6, .5, .45, .4, .35], risk: 14 },
      { v: [.85, .8, .6, .75, .9, .7], risk: 31 }
    ];
    const HOLD = 3600;
    const lerp = (a, b, k) => a + (b - a) * k;
    const ease = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    const mix = v => { // teal → violet → orange
      const c = v < .5 ? [[52, 225, 201], [139, 124, 255], v * 2] : [[139, 124, 255], [255, 154, 98], (v - .5) * 2];
      return `rgb(${c[0].map((x, i) => Math.round(lerp(x, c[1][i], c[2]))).join(",")})`;
    };
    const init = () => ({ ctx, w, h } = fit(cv));
    const frame = t => {
      if (!t0) t0 = t;
      const el = t - t0, idx = Math.floor(el / HOLD) % P.length, k = ease(Math.min(1, (el % HOLD) / 1100));
      const A = P[(idx + P.length - 1) % P.length], B = P[idx];
      const vals = A.v.map((a, i) => lerp(a, B.v[i], k)), risk = lerp(A.risk, B.risk, k);
      ctx.clearRect(0, 0, w, h);
      const bg = ctx.createRadialGradient(w * .75, h * .3, 10, w * .75, h * .3, w * .8);
      bg.addColorStop(0, "rgba(139,124,255,.16)"); bg.addColorStop(1, "rgba(5,8,15,0)");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);

      // Narrow screens: gauge on top, one-line rows (label left, bar right) below
      const narrow = w < 520;
      const pad = 24, labelW = narrow ? 92 : 0;
      const barX = pad + labelW, barW = narrow ? w - pad * 2 - labelW : w * .5 - pad * 1.5;
      const top = narrow ? h * .56 : 42, rowH = narrow ? (h - top - 52) / F.length : (h - 90) / F.length;
      ctx.font = "500 10.5px 'JetBrains Mono', monospace"; ctx.fillStyle = "rgba(200,215,240,.5)";
      ctx.fillText("RISK FACTOR CONTRIBUTION", pad, top - 14);
      F.forEach((name, i) => {
        const y = top + i * rowH, v = vals[i], by = narrow ? y + 2 : y + 18;
        ctx.fillStyle = "rgba(220,230,250,.85)"; ctx.font = "500 12px Inter, sans-serif"; ctx.fillText(name, pad, y + (narrow ? 9 : 12));
        ctx.fillStyle = "rgba(255,255,255,.07)"; ctx.beginPath(); ctx.roundRect(barX, by, barW, 7, 4); ctx.fill();
        ctx.fillStyle = mix(v); ctx.shadowColor = mix(v); ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.roundRect(barX, by, Math.max(6, barW * v), 7, 4); ctx.fill(); ctx.shadowBlur = 0;
      });

      // gauge
      const cx = narrow ? w / 2 : w * .76, cy = narrow ? h * .27 : h * .42, R = narrow ? Math.min(h * .19, w * .3) : Math.min(w * .17, h * .3);
      const a0 = Math.PI * .75, span = Math.PI * 1.5, frac = Math.min(1, risk / 40);
      ctx.lineCap = "round"; ctx.lineWidth = 12;
      ctx.strokeStyle = "rgba(255,255,255,.08)"; ctx.beginPath(); ctx.arc(cx, cy, R, a0, a0 + span); ctx.stroke();
      const gg = ctx.createLinearGradient(cx - R, 0, cx + R, 0);
      gg.addColorStop(0, "#34e1c9"); gg.addColorStop(.5, "#8b7cff"); gg.addColorStop(1, "#ff9a62");
      ctx.strokeStyle = gg; ctx.shadowColor = mix(frac); ctx.shadowBlur = 18;
      ctx.beginPath(); ctx.arc(cx, cy, R, a0, a0 + span * frac); ctx.stroke(); ctx.shadowBlur = 0;
      ctx.textAlign = "center"; ctx.fillStyle = "#eef1f8";
      ctx.font = `500 ${Math.round(R * .52)}px Inter, sans-serif`; ctx.fillText(risk.toFixed(0) + "%", cx, cy + R * .15);
      ctx.font = "500 10px 'JetBrains Mono', monospace"; ctx.fillStyle = "rgba(200,215,240,.6)";
      ctx.fillText("CIRCULATORY RISK", cx, cy + R * .45);
      const lvl = risk < 8 ? "LOW" : risk < 20 ? "MODERATE" : "HIGH";
      ctx.fillStyle = mix(frac); ctx.font = "600 11px 'JetBrains Mono', monospace"; ctx.fillText(lvl, cx, cy + R * .7);
      ctx.textAlign = "left";

      // survival curve under gauge (wide layout only)
      if (!narrow) {
        const sx = cx - R * 1.1, sw = R * 2.2, sy = cy + R + 26, sh = h - sy - 46;
        if (sh > 30) {
          ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx, sy + sh); ctx.lineTo(sx + sw, sy + sh); ctx.stroke();
          ctx.strokeStyle = mix(frac); ctx.lineWidth = 2; ctx.beginPath();
          for (let i = 0; i <= 40; i++) { const x = i / 40, s = Math.exp(-x * risk / 22); ctx[i ? "lineTo" : "moveTo"](sx + x * sw, sy + (1 - s) * sh * 1.6); }
          ctx.stroke();
          ctx.fillStyle = "rgba(200,215,240,.45)"; ctx.font = "500 9.5px 'JetBrains Mono', monospace"; ctx.fillText("survival over follow-up", sx, sy + sh + 14);
        }
      }
      hud.textContent = `patient ${idx + 1} of ${P.length} · illustrative preview`;
      raf = requestAnimationFrame(frame);
    };
    init();
    addEventListener("resize", init);
    if (reduced) { t0 = 1; frame(1 + HOLD * 1.5); cancelAnimationFrame(raf); }
    else whenVisible(cv, () => { if (!raf) raf = requestAnimationFrame(frame); }, () => { cancelAnimationFrame(raf); raf = 0; });
  })();
})();
