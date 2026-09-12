import { sesiones } from "../data/sesiones.js";

const details = document.querySelector("#session-details");
const search = document.querySelector("#session-search");
const matches = document.querySelector("#search-matches");

const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[char]));

const normalize = (value = "") => String(value)
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase("es");

const workById = (session, id) => session.works.find((work) => work.id === id);
const activeWorks = (session) => session.works.filter((work) => !work.pending);

function workCard(work) {
  return `
    <article class="work-card" id="trabajo-${work.id.replace(/\s+/g, "-").toLowerCase()}">
      <div class="work-topline">
        <span class="work-id">${escapeHtml(work.id)}</span>
      </div>
      <h4>${escapeHtml(work.title)}</h4>
      <p class="authors">${escapeHtml(work.authors.join(" · "))}</p>
      ${work.institution ? `<p class="institution">${escapeHtml(work.institution)}</p>` : ""}
      <a class="download-link" href="${escapeHtml(work.file)}" download>Descargar resumen <span aria-hidden="true">↓</span></a>
    </article>`;
}

function renderSession(session) {
  const works = activeWorks(session);
  const blocks = session.blocks.map((block) => `
    <section class="program-block">
      <div class="block-heading">
        <h4>${escapeHtml(block.label)}</h4>
        <p>${escapeHtml(block.detail)}</p>
      </div>
      <div class="block-works">
        ${block.works.map((id) => workCard(workById(session, id))).join("")}
      </div>
    </section>`).join("");

  return `
    <article class="session-item session-${session.id}" id="${session.slug}">
      <span class="timeline-dot" aria-hidden="true"></span>
      <button class="session-toggle" type="button" aria-expanded="false" aria-controls="${session.slug}-content">
        <span class="session-number">${escapeHtml(session.label)}</span>
        <span class="session-primary">
          <strong>${escapeHtml(session.date)}</strong>
          <span>${escapeHtml(session.time)} · Coordinación: ${escapeHtml(session.coordinator)}</span>
        </span>
        <span class="session-count">${works.length} ${works.length === 1 ? "trabajo" : "trabajos"}</span>
        <span class="toggle-copy">Ampliar</span>
        <span class="toggle-icon" aria-hidden="true"></span>
      </button>
      <div class="session-content" id="${session.slug}-content" hidden>
        <section class="session-section">
          <h3>Dinámica de trabajo</h3>
          <p>${escapeHtml(session.dynamic)}</p>
        </section>
        <div class="session-columns">
          <div class="program-flow">${blocks}</div>
          <aside class="axes" aria-labelledby="axes-${session.id}">
            <p class="eyebrow">Ejes para el intercambio</p>
            <h3 id="axes-${session.id}" class="sr-only">Ejes de la ${escapeHtml(session.label)}</h3>
            <ol>
              ${session.axes.map((axis) => `<li><strong>${escapeHtml(axis.title)}</strong><span>${escapeHtml(axis.text)}</span></li>`).join("")}
            </ol>
          </aside>
        </div>
        <div class="session-downloads" aria-label="Descargas de la ${escapeHtml(session.label)}">
          <a class="download-link" href="${escapeHtml(session.orientation)}" download>Descargar orientaciones <span aria-hidden="true">↓</span></a>
          <a class="button primary" href="${escapeHtml(session.bundle)}" download>Descargar todos los resúmenes</a>
        </div>
      </div>
    </article>`;
}

details.innerHTML = sesiones.map(renderSession).join("");

const allWorks = sesiones.flatMap((session) => activeWorks(session).map((work) => ({ work, session })));

function setSessionOpen(sessionId, open = true) {
  const item = document.querySelector(`#sesion-${sessionId}`);
  if (!item) return;
  const toggle = item.querySelector(".session-toggle");
  const content = item.querySelector(".session-content");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.querySelector(".toggle-copy").textContent = open ? "Contraer" : "Ampliar";
  content.hidden = !open;
}

document.querySelectorAll(".session-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const item = toggle.closest(".session-item");
    setSessionOpen(item.id.replace("sesion-", ""), toggle.getAttribute("aria-expanded") !== "true");
  });
});

function focusResult({ work, session }) {
  setSessionOpen(session.id, true);

  window.requestAnimationFrame(() => {
    const target = document.querySelector(`#trabajo-${work.id.replace(/\s+/g, "-").toLowerCase()}`);
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
    target?.classList.add("search-target");
    target?.setAttribute("tabindex", "-1");
    target?.focus({ preventScroll: true });
    window.setTimeout(() => target?.classList.remove("search-target"), 2400);
  });
}

function getMatches() {
  const query = normalize(search.value.trim());
  if (!query) return [];
  return allWorks.filter(({ work }) => normalize([
    work.title,
    ...work.authors,
    work.institution
  ].join(" ")).includes(query));
}

function renderMatches() {
  const query = search.value.trim();
  const found = getMatches();
  if (!query) {
    matches.innerHTML = "";
    return;
  }
  if (!found.length) {
    matches.innerHTML = '<p class="search-empty">No se encontraron coincidencias.</p>';
    return;
  }
  matches.innerHTML = `
    <p class="search-count">${found.length} ${found.length === 1 ? "coincidencia" : "coincidencias"}</p>
    <div class="match-list">
      ${found.slice(0, 8).map(({ work, session }, index) => `
        <button type="button" class="match-button" data-match-index="${index}">
          <span><strong>${escapeHtml(work.title)}</strong><small>${escapeHtml(work.authors.join(" · "))}</small></span>
          <em>${escapeHtml(session.label)}</em>
        </button>`).join("")}
    </div>`;
  matches.querySelectorAll("[data-match-index]").forEach((button) => {
    button.addEventListener("click", () => focusResult(found[Number(button.dataset.matchIndex)]));
  });
}

search.addEventListener("input", renderMatches);
search.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const found = getMatches();
  if (found.length) {
    event.preventDefault();
    focusResult(found[0]);
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.setAttribute("tabindex", "-1");
  });
});
