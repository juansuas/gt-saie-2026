import { sesiones } from "../data/sesiones.js";

const overview = document.querySelector("#session-overview");
const details = document.querySelector("#session-details");
const results = document.querySelector("#work-results");
const search = document.querySelector("#work-search");
const filter = document.querySelector("#session-filter");
const count = document.querySelector("#results-count");
const orientationLinks = document.querySelector("#orientation-links");

const escapeHtml = (value = "") => value.replace(/[&<>'"]/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[char]));

const normalize = (value = "") => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase("es");

function workById(session, id) {
  return session.works.find((work) => work.id === id);
}

function viewHref(file) {
  const source = new URL(file, window.location.href).href;
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(source)}`;
}

function workCard(work, compact = false) {
  return `
    <article class="work-card${compact ? " compact" : ""}">
      <div class="work-topline">
        <span class="work-id">${escapeHtml(work.id)}</span>
        ${work.pending ? '<span class="pending-tag">Bloque por confirmar</span>' : ""}
      </div>
      <h4>${escapeHtml(work.title)}</h4>
      <p class="authors">${escapeHtml(work.authors.join(" · "))}</p>
      ${work.institution ? `<p class="institution">${escapeHtml(work.institution)}</p>` : ""}
      <div class="actions">
        <a class="button secondary small" data-view-doc href="${escapeHtml(work.file)}" target="_blank" rel="noopener">Ver resumen</a>
        <a class="text-link" href="${escapeHtml(work.file)}" download>Descargar resumen</a>
      </div>
    </article>`;
}

overview.innerHTML = sesiones.map((session) => `
  <article class="session-summary session-${session.id}">
    <span class="session-number">${session.label}</span>
    <h3>${session.shortDate}</h3>
    <p class="session-time">${session.time}</p>
    <p>Coordinación: <strong>${session.coordinator}</strong></p>
    <p>${session.works.length} trabajos</p>
    <a class="text-link" href="#${session.slug}">Ver sesión</a>
  </article>`).join("");

details.innerHTML = sesiones.map((session) => {
  const blocks = session.blocks.map((block) => `
    <section class="program-block">
      <div class="block-heading">
        <h4>${block.label}</h4>
        <p>${block.detail}</p>
      </div>
      <div class="block-works">
        ${block.works.map((id) => workCard(workById(session, id), true)).join("")}
      </div>
      <p class="exchange">Intercambio</p>
    </section>`).join("");

  const pending = session.pending.length ? `
    <section class="pending-block" aria-label="Trabajo con bloque pendiente de confirmación">
      <div class="block-heading">
        <h4>Bloque por confirmar</h4>
        <p>La planilla y el documento transversal incluyen este trabajo, pero la dinámica de la sesión no lo asigna a un bloque.</p>
      </div>
      ${session.pending.map((id) => workCard(workById(session, id), true)).join("")}
    </section>` : "";

  return `
    <article class="session-panel session-${session.id}" id="${session.slug}">
      <header class="session-panel-header">
        <div>
          <span class="session-number">${session.label}</span>
          <h3>${session.date}</h3>
          <p class="session-time">${session.time}</p>
        </div>
        <p class="moderator"><span>Coordinación</span><strong>${session.coordinator}</strong></p>
      </header>
      ${session.note ? `<p class="source-note"><strong>Diferencia entre fuentes:</strong> ${session.note}</p>` : ""}
      <div class="session-columns">
        <div>
          <section class="session-section">
            <h4>Dinámica de trabajo</h4>
            <p>${session.dynamic}</p>
          </section>
          <div class="program-flow">${blocks}${pending}</div>
        </div>
        <aside class="axes" aria-labelledby="axes-${session.id}">
          <p class="eyebrow">Ejes para el intercambio</p>
          <h4 id="axes-${session.id}" class="sr-only">Ejes de la ${session.label}</h4>
          <ol>
            ${session.axes.map((axis) => `<li><strong>${axis.title}</strong><span>${axis.text}</span></li>`).join("")}
          </ol>
        </aside>
      </div>
      <div class="session-downloads">
        <a class="button secondary" data-view-doc href="${session.orientation}" target="_blank" rel="noopener">Ver orientaciones</a>
        <a class="text-link" href="${session.orientation}" download>Descargar orientaciones</a>
        <a class="button primary" href="${session.bundle}" download>Descargar todos los resúmenes</a>
      </div>
    </article>`;
}).join("");

orientationLinks.innerHTML = sesiones.map((session) => `
  <article class="orientation-card">
    <span class="session-number">${session.label}</span>
    <h3>${session.date} · ${session.time}</h3>
    <p>${session.axes.length} ejes para organizar el intercambio</p>
    <div class="actions">
      <a class="button secondary small" data-view-doc href="${session.orientation}" target="_blank" rel="noopener">Ver orientaciones</a>
      <a class="text-link" href="${session.orientation}" download>Descargar</a>
    </div>
  </article>`).join("");

const allWorks = sesiones.flatMap((session) => session.works.map((work) => ({ ...work, session })));

function renderResults() {
  const query = normalize(search.value.trim());
  const selected = filter.value;
  const filtered = allWorks.filter(({ session, title, authors, institution }) => {
    const matchesSession = selected === "all" || String(session.id) === selected;
    const haystack = normalize([title, ...authors, institution].join(" "));
    return matchesSession && (!query || haystack.includes(query));
  });

  count.textContent = `${filtered.length} ${filtered.length === 1 ? "trabajo" : "trabajos"}`;
  results.innerHTML = filtered.length ? filtered.map(({ session, ...work }) => `
    <article class="result-row">
      <div>
        <span class="work-id">${work.id}</span>
        <h3>${escapeHtml(work.title)}</h3>
        <p class="authors">${escapeHtml(work.authors.join(" · "))}</p>
        ${work.institution ? `<p class="institution">${escapeHtml(work.institution)}</p>` : ""}
      </div>
      <div class="result-session">
        <strong>${session.label}</strong>
        <span>${session.shortDate} · ${session.time}</span>
        <div class="actions">
          <a class="text-link" href="#${session.slug}">Ver sesión</a>
          <a class="text-link" data-view-doc href="${work.file}" target="_blank" rel="noopener">Resumen</a>
        </div>
      </div>
    </article>`).join("") : '<p class="empty-state">No encontramos trabajos con esos criterios.</p>';
  enhanceViewLinks(results);
}

function enhanceViewLinks(root = document) {
  root.querySelectorAll("[data-view-doc]").forEach((link) => {
    if (!link.dataset.originalFile) link.dataset.originalFile = link.getAttribute("href");
    link.setAttribute("href", viewHref(link.dataset.originalFile));
  });
}

search.addEventListener("input", renderResults);
filter.addEventListener("change", renderResults);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.setAttribute("tabindex", "-1");
  });
});

enhanceViewLinks();
renderResults();
