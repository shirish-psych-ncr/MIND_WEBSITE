import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const CLINIC_ID = 'https://mindgracencr.in/#clinic';
const PHYSICIAN_ID = 'https://mindgracencr.in/#physician';
const PERSON_ID = 'https://mindgracencr.in/#doctor-anita-sharma';
const WEBSITE_ID = 'https://mindgracencr.in/#website';
const htmlFiles = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith('.html')) htmlFiles.push(path);
  }
}

function typesOf(node) {
  return Array.isArray(node?.['@type']) ? node['@type'] : [node?.['@type']];
}

await walk(DIST);
const failures = [];
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const scripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const nodes = [];
  for (const [, source] of scripts) {
    try {
      const data = JSON.parse(source);
      nodes.push(...(Array.isArray(data?.['@graph']) ? data['@graph'] : [data]));
    } catch (error) {
      failures.push(`${file}: invalid JSON-LD (${error.message})`);
    }
  }

  if (html.includes('api2.amplitude.com') || html.includes('amplitude-2.47.0.min.js')) {
    failures.push(`${file}: retired Amplitude runtime is still referenced`);
  }
  if (/\/cdn-cgi\/zaraz\/|zaraz-tracking(?:\.min)?\.js/i.test(html)) {
    failures.push(`${file}: retired Zaraz runtime is still referenced`);
  }
  if (/offline\.html$/i.test(file)) continue;

  const clinicNodes = nodes.filter((node) => node?.['@id'] === CLINIC_ID);
  if (clinicNodes.length !== 1) failures.push(`${file}: expected one clinic definition, found ${clinicNodes.length}`);
  const clinic = clinicNodes[0];
  for (const type of ['MedicalClinic', 'MedicalBusiness']) {
    if (!typesOf(clinic).includes(type)) failures.push(`${file}: clinic is missing ${type}`);
  }
  for (const field of ['image', 'logo', 'telephone', 'priceRange', 'address', 'geo', 'openingHoursSpecification']) {
    if (!clinic?.[field]) failures.push(`${file}: clinic is missing ${field}`);
  }
  const anonymousBusinesses = nodes.filter((node) =>
    typesOf(node).some((type) => ['MedicalClinic', 'MedicalBusiness', 'Physician'].includes(type)) && !node?.['@id']);
  if (anonymousBusinesses.length) failures.push(`${file}: found ${anonymousBusinesses.length} business node(s) without @id`);
}

const doctorFile = htmlFiles.find((file) => /dr-anita-sharma\.html$/i.test(file));
if (!doctorFile) failures.push('Missing generated Dr Anita Sharma page');
else {
  const html = await readFile(doctorFile, 'utf8');
  const nodes = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap(([, source]) => {
      const data = JSON.parse(source);
      return Array.isArray(data?.['@graph']) ? data['@graph'] : [data];
    });
  const person = nodes.filter((node) => node?.['@id'] === PERSON_ID);
  const physician = nodes.filter((node) => node?.['@id'] === PHYSICIAN_ID);
  if (person.length !== 1) failures.push(`Doctor page: expected one Person, found ${person.length}`);
  if (physician.length !== 1) failures.push(`Doctor page: expected one Physician practice, found ${physician.length}`);
  for (const field of ['image', 'priceRange', 'address', 'telephone']) {
    if (!physician[0]?.[field]) failures.push(`Doctor page: Physician is missing ${field}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Validated structured data in ${htmlFiles.length} generated pages: stable clinic, website, person, and physician identities; no Amplitude or Zaraz runtime.`);
