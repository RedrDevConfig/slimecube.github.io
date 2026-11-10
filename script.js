(() => {
  const c = window.PORTFOLIO_CONFIG || {};
  const $ = (s) => document.querySelector(s);
  const setText = (selector, value) => document.querySelectorAll(selector).forEach(el => el.textContent = value ?? "");
  const translateItem = (group, item, field, fallback) =>
    window.PORTFOLIO_I18N?.item(group, item.title, field, fallback) ?? fallback;

  setText("[data-site-name]", c.siteName || "SLIMECUBE");
  document.querySelectorAll("[data-home-link]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      history.replaceState(history.state, "", `${location.pathname}${location.search}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  document.querySelectorAll("[data-social]").forEach(link => {
    const url = c[`${link.dataset.social}Url`];
    if (url) {
      link.href = url;
      link.hidden = false;
    }
  });
  const owner = c.owner || c.siteName || "SLIMECUBE";
  setText("[data-owner-name]", owner);
  setText("[data-owner-initial]", owner.trim().charAt(0).toUpperCase());
  document.querySelectorAll("[data-profile-avatar]").forEach(profileAvatar => {
    const initial = profileAvatar.parentElement.querySelector("[data-owner-initial]");
    if (!c.avatar_profile) return;

    profileAvatar.addEventListener("load", () => {
      profileAvatar.hidden = false;
      if (initial) initial.hidden = true;
    }, { once: true });
    profileAvatar.addEventListener("error", () => {
      profileAvatar.hidden = true;
    }, { once: true });
    profileAvatar.src = c.avatar_profile;
  });
  setText("[data-version]", c.minecraftVersion || "1.21.X");
  const buildItems = c.buildPages?.length ? c.buildPages : (c.builds || []);
  const buildImageCount = buildItems.filter(item => typeof item.image === "string" && item.image.trim()).length;
  document.querySelectorAll("[data-stat]").forEach(el => {
    el.textContent = el.dataset.stat === "builds"
      ? buildImageCount
      : c.stats?.[el.dataset.stat] ?? 0;
  });
  const viewCount = $("#view-count");
  if (c.counterApiUrl && viewCount) {
    viewCount.title = "Visitas totales del portfolio";
    fetch(c.counterApiUrl, { cache: "no-store" })
      .then(response => {
        if (!response.ok) throw new Error(`CounterAPI respondió ${response.status}`);
        return response.json();
      })
      .then(result => {
        const count = result?.data?.up_count ?? result?.data?.count ?? result?.up_count ?? result?.count;
        if (!Number.isSafeInteger(count) || count < 0) {
          throw new Error("CounterAPI devolvió un total de visitas inválido");
        }
        viewCount.textContent = count.toLocaleString("es");
      })
      .catch(error => {
        console.error("No se pudo actualizar el contador de visitas:", error);
        viewCount.textContent = "—";
        viewCount.title = "No se pudo cargar el contador de visitas";
      });
  }
  document.querySelectorAll("[data-image]").forEach(el => { const p = c.images?.[el.dataset.image]; if (p) el.src = p; });
  const discord = $('[data-link="discord"]');
  const email = $('[data-link="email"]');
  if (discord && c.discordUrl) discord.href = c.discordUrl;
  if (email && c.email) email.href = `mailto:${c.email}`;

const card = (item, type = "build") => {
    const isCommission = type === "commission";

    const element = document.createElement(
        isCommission && item.link ? "a" : "article"
    );

    element.className = isCommission
        ? "project-card commission-card"
        : "project-card";

    if (isCommission && item.link) {
        element.href = item.link;
    }

    if (!isCommission) {
      const img = document.createElement("img");
      img.src = item.image || "";
      img.alt = item.title || "Project image";

      img.onerror = () => {
          img.src = "https://placehold.co/800x550/142431/33c9ff?text=ADD+YOUR+IMAGE";
      };
      element.append(img);
    }

    const body = document.createElement("div");
    body.className = "card-body";

    const tag = isCommission ? document.createElement("div") : null;
    if (tag) {
        tag.className = "eyebrow";
        tag.textContent = window.PORTFOLIO_I18N.text("customCommission");
    }

    const title = document.createElement("h3");
    title.textContent = translateItem(isCommission ? "commissionsList" : "builds", item, "title", item.title || "Untitled");

    const desc = document.createElement("p");
    desc.textContent = translateItem(isCommission ? "commissionsList" : "builds", item, "description", item.description || "");

    if (tag) body.append(tag);
    body.append(title, desc);

    if (!isCommission) {
        const a = document.createElement("a");
        a.className = "text-link";
        a.href = item.link || "#contact";
        a.textContent = window.PORTFOLIO_I18N.text("viewProject");
        body.append(a);
    }

    element.append(body);

    return element;
};
  const renderConfiguredCards = () => {
    const buildGrid = $("#build-grid");
    const commissionGrid = $("#commission-grid");
    if (buildGrid) buildGrid.replaceChildren(...(c.builds || []).map(item => card(item)));
    if (commissionGrid) commissionGrid.replaceChildren(...(c.commissions || []).map(item => card(item, "commission")));
  };
  renderConfiguredCards();
  document.addEventListener("portfolio-language-change", renderConfiguredCards);
  (c.tools || []).forEach(x => {
    const a = document.createElement("a"); a.className = "tool-card"; a.href = x.link || "#";
    const tag = document.createElement("div"); tag.className = "eyebrow"; tag.textContent = x.label || "TOOL";
    const h = document.createElement("h3"); h.textContent = x.title;
    const p = document.createElement("p"); p.textContent = x.description;
    a.append(tag, h, p, Object.assign(document.createElement("span"), {className:"text-link", textContent:window.PORTFOLIO_I18N.text("openTool")}));
    $("#tools-grid")?.append(a);
  });

  $("#year").textContent = new Date().getFullYear();
  const toggle = $(".menu-toggle"), nav = $(".nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
})();
/* Dedicated build pages: cards on the homepage link to their own URLs. */
(() => {
  const c = window.PORTFOLIO_CONFIG || {};
  const pages = c.buildPages || [
    {title:"BoxPvP",description:"Arenas PvP personalizadas.",image:"assets/images/boxpvp.jpg",link:"box-pvp/index.html"},
    {title:"Lobbys",description:"Spawns y lobbies para servidores.",image:"assets/images/lobby.jpg",link:"lobbys/index.html"},
    {title:"FullPvP",description:"Mapas de combate y minas.",image:"assets/images/fullpvp.jpg",link:"fullpvp/index.html"}
  ];
  const grid = document.querySelector("#build-grid");
  if (!grid) return;
  const renderBuildPages = () => {
    if (!pages.length) return;
    grid.innerHTML = "";
    pages.forEach(item => {
      const a = document.createElement("a"); a.className = "project-card"; a.href = item.link;
      const img = document.createElement("img"); img.src = item.image; img.alt = item.title;
      const body = document.createElement("div"); body.className = "card-body";
      const h = document.createElement("h3"); h.textContent = window.PORTFOLIO_I18N.item("builds", item.title, "title", item.title);
      const p = document.createElement("p"); p.textContent = window.PORTFOLIO_I18N.item("builds", item.title, "description", item.description || "");
      const more = document.createElement("span"); more.className = "text-link"; more.textContent = window.PORTFOLIO_I18N.text("viewProject");
      body.append(h,p,more); a.append(img,body); grid.append(a);
    });
  };
  renderBuildPages();
  document.addEventListener("portfolio-language-change", renderBuildPages);
})();
