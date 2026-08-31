import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git", ".playwright-cli"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html") && !full.includes(`${path.sep}assets${path.sep}components${path.sep}`)) htmlFiles.push(full);
  }
}
walk(root);
const errors = [];
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  if (!/<html\b[^>]*\blang=["'][^"']+["']/i.test(html)) errors.push(`${relative}: missing html lang`);
  if (!/<meta\b[^>]*name=["']viewport["']/i.test(html)) errors.push(`${relative}: missing responsive viewport`);
  if (!/<title\b/i.test(html)) errors.push(`${relative}: missing title`);
  if (!/<meta\b[^>]*name=["']description["'][^>]*content=["'][^"']+[^"']["']/i.test(html)) errors.push(`${relative}: missing meta description`);
  if ((html.match(/<link\b[^>]*rel=["']canonical["']/gi) || []).length !== 1) errors.push(`${relative}: expected one canonical URL`);
  if (!/<body\b/i.test(html)) errors.push(`${relative}: missing body`);
  if ((html.match(/<header\b/gi) || []).length !== 1) errors.push(`${relative}: expected one header`);
  if ((html.match(/<footer\b/gi) || []).length !== 1) errors.push(`${relative}: expected one footer`);
  if ((html.match(/<main\b/gi) || []).length !== 1) errors.push(`${relative}: expected one main`);
  if (!relative.replaceAll("\\", "/").endsWith("index.html") && !/<nav[^>]+class=["'][^"']*breadcrumbs/i.test(html)) errors.push(`${relative}: missing breadcrumbs`);
  if (!relative.replaceAll("\\", "/").endsWith("index.html") && !/<a[^>]+class=["'][^"']*skip-link/i.test(html)) errors.push(`${relative}: missing skip link`);
  const skipTarget = html.match(/<a[^>]+class=["'][^"']*skip-link[^"']*["'][^>]+href=["']#([^"']+)["']/i)?.[1];
  if (skipTarget && !new RegExp(`\\bid=["']${escapeRegex(skipTarget)}["']`, "i").test(html)) errors.push(`${relative}: skip link target #${skipTarget} not found`);
  if (/aria-label=["']Breadcrumb["'][^>]*>[^<]*<ol[\s\S]*?<a href=["']\/index\.html["'][^>]*>Blog<\/a>/i.test(html)) errors.push(`${relative}: Blog breadcrumb points to home`);
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const id of new Set(ids)) {
    if (ids.filter((value) => value === id).length > 1) errors.push(`${relative}: duplicate id #${id}`);
  }
  for (const image of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt\s*=\s*["'][^"']*["']/i.test(image[1]) && !/\baria-hidden\s*=\s*["']true["']/i.test(image[1])) errors.push(`${relative}: image missing alt text`);
  }
  for (const button of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const attrs = button[1];
    const content = button[2].replace(/<[^>]+>/g, "").trim();
    if (!content && !/\baria-label\s*=|\btitle\s*=/i.test(attrs)) errors.push(`${relative}: button missing accessible name`);
  }
  for (const field of html.matchAll(/<(input|select|textarea)\b([^>]*)>/gi)) {
    const attrs = field[2];
    if (/\btype\s*=\s*["']hidden["']/i.test(attrs)) continue;
    const id = attrs.match(/\bid=["']([^"']+)["']/i)?.[1];
    if (!id && !/\baria-label\s*=|\baria-labelledby\s*=/i.test(attrs)) errors.push(`${relative}: ${field[1]} missing accessible name`);
    if (id && !/\baria-label\s*=|\baria-labelledby\s*=/i.test(attrs) && !new RegExp(`<label\\b[^>]*\\bfor=["']${escapeRegex(id)}["']`, "i").test(html)) errors.push(`${relative}: field #${id} missing label`);
  }
  for (const anchor of html.matchAll(/<a\b([^>]*)>/gi)) {
    if (/\bhref=["'](?:#|javascript:)["']/i.test(anchor[1])) errors.push(`${relative}: placeholder link`);
  }
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const ref = match[1];
    if (!ref || /^(?:https?:|mailto:|tel:|data:|#|javascript:)/i.test(ref)) continue;
    const [beforeHash, fragment] = ref.split("#", 2);
    const clean = beforeHash.split("?")[0];
    if (!clean) continue;
    const target = path.resolve(root, clean.replace(/^\//, ""));
    if (!fs.existsSync(target)) errors.push(`${relative}: missing ${ref}`);
    if (fragment && target.endsWith(".html")) {
      const targetHtml = fs.readFileSync(target, "utf8");
      const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!new RegExp(`(?:id|name)=["']${escaped}["']`, "i").test(targetHtml)) errors.push(`${relative}: missing fragment ${ref}`);
    }
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${htmlFiles.length} public HTML pages and all local references.`);
}
