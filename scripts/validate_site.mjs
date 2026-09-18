import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sesiones } from "../dist/data/sesiones.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const errors = [];
const ids = new Set();
let activeCount = 0;
let withdrawnCount = 0;

const requireFile = (relative) => {
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile() || fs.statSync(absolute).size === 0) {
    errors.push(`Archivo faltante o vacío: ${relative}`);
  }
};

if (sesiones.length !== 4) errors.push(`Se esperaban 4 sesiones y hay ${sesiones.length}`);
const expectedActiveBySession = new Map([[1, 5], [2, 5], [3, 4], [4, 4]]);

for (const session of sesiones) {
  const sessionActiveCount = session.works.filter((work) => !work.pending).length;
  if (sessionActiveCount !== expectedActiveBySession.get(session.id)) {
    errors.push(`${session.label}: se esperaban ${expectedActiveBySession.get(session.id)} trabajos participantes y hay ${sessionActiveCount}`);
  }
  requireFile(session.orientation);
  requireFile(session.bundle);
  const assigned = new Set([...session.blocks.flatMap((block) => block.works), ...session.pending]);
  for (const work of session.works) {
    if (ids.has(work.id)) errors.push(`ID duplicado: ${work.id}`);
    ids.add(work.id);
    if (!assigned.has(work.id)) errors.push(`${work.id}: no está en un bloque ni en pendientes`);
    if (!work.title || !work.authors.length) errors.push(`${work.id}: faltan título o autores`);
    if (work.pending) withdrawnCount += 1;
    else activeCount += 1;
    requireFile(work.file);
  }
  for (const id of assigned) {
    if (!session.works.some((work) => work.id === id)) errors.push(`${session.label}: referencia desconocida ${id}`);
  }
}

for (const relative of [
  "index.html",
  "css/styles.css",
  "js/app.js",
  "assets/logo-saie.png",
  "documentos/orientaciones/discusiones-propuestas-por-cada-trabajo.docx",
  "documentos/coloquio/programa-general-vi-coloquio-saie.pdf"
]) requireFile(relative);

const textFiles = ["index.html", "css/styles.css", "js/app.js", "data/sesiones.js"];
for (const relative of textFiles) {
  const text = fs.readFileSync(path.join(root, relative), "utf8");
  if (/ï¿½|Ã.|Â./.test(text)) errors.push(`Posible texto mal codificado: ${relative}`);
}

if (ids.size !== 20) errors.push(`Se esperaban 20 IDs únicos y hay ${ids.size}`);
if (activeCount !== 18) errors.push(`Se esperaban 18 trabajos participantes y hay ${activeCount}`);
if (withdrawnCount !== 2) errors.push(`Se esperaban 2 trabajos que no participan y hay ${withdrawnCount}`);

const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const appJs = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
if (indexHtml.includes("Orientaciones para el intercambio")) errors.push("Permanece el bloque redundante de orientaciones");
if (`${indexHtml}\n${appJs}`.includes("Ver resumen")) errors.push("Permanece un botón Ver resumen");
if (`${indexHtml}\n${appJs}`.includes("Ver orientaciones")) errors.push("Permanece un botón Ver orientaciones");
if (`${indexHtml}\n${appJs}`.includes("Diferencia entre fuentes")) errors.push("Permanece la anotación sobre diferencias entre fuentes");
if (indexHtml.includes("Consultá la sesión, la coordinación")) errors.push("Permanece el texto retirado del encabezado");
if (indexHtml.includes("no-participan") || indexHtml.includes("withdrawn-works")) errors.push("Permanece el bloque de trabajos que no participan");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("VALIDATION_OK: 4 sesiones, 18 trabajos participantes, 2 trabajos sin participación y todos los archivos requeridos disponibles.");
