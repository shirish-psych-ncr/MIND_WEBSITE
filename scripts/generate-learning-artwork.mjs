// Original, repository-authored guide maps. No third-party or patient imagery.
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
const guides = [
  ['autism-and-adhd-differences', 'Understand the pattern', 'AUTISM + ADHD', [['Attention', 'Starting, shifting, sustaining'], ['Communication', 'Understanding and expressing'], ['Everyday life', 'Comfort and participation']], 'One behaviour can have several explanations.'],
  ['autism-screening-and-assessment', 'From concern to a care plan', 'SCREENING + ASSESSMENT', [['Notice', 'Describe everyday examples'], ['Assess', 'Bring history and context'], ['Support', 'Agree goals and next steps']], 'A screen opens a conversation. It does not settle a diagnosis.'],
  ['developmental-regression', 'When an established skill changes', 'DEVELOPMENTAL REGRESSION', [['Recognize', 'What skill has changed?'], ['Record', 'What happened, and when?'], ['Seek care', 'Assess the medical context']], 'Loss of skills needs medical attention, not a theory chosen in advance.'],
  ['mthfr-methylation-and-autism', 'A pathway is not a prescription', 'METHYLATION + GENETICS', [['Biology', 'Understand the pathway'], ['Evidence', 'Interpret the actual finding'], ['Clinical use', 'Ask what changes in care']], 'Common variants, rare disease and treatment decisions are different questions.'],
  ['folinic-acid-and-autism', 'Read beyond the headline', 'FOLINIC ACID + AUTISM', [['Indication', 'Which condition is treated?'], ['Research', 'Who was studied, and how?'], ['Decision', 'Benefits, harms and review']], 'A rare-disease approval is not a general autism approval.'],
  ['mitochondria-and-autism', 'Energy biology, in context', 'MITOCHONDRIA + AUTISM', [['Cell biology', 'How cells use energy'], ['Clinical picture', 'What has changed for a child?'], ['Investigation', 'Which question needs a test?']], 'A research marker and an individual diagnosis are not the same thing.'],
  ['autism-gut-health-and-diets', 'Make comfort the starting point', 'GUT HEALTH + NUTRITION', [['Comfort', 'Pain and bowel symptoms'], ['Nutrition', 'Growth and accepted foods'], ['Participation', 'A manageable mealtime']], 'Treat the problem identified. Protect nutrition when planning change.'],
  ['autism-treatment-evidence', 'Turn a promise into a question', 'UNDERSTANDING EVIDENCE', [['What changed?', 'A meaningful outcome'], ['Compared with?', 'A fair comparison'], ['At what cost?', 'Harms, time and burden']], 'A mechanism suggests a hypothesis. Clinical evidence tests a benefit.'],
];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
const folder = 'assets/images/learning';
await mkdir(folder, { recursive: true });
for (const [slug, title, label, cards, footer] of guides) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#fbf4ed"/><path d="M0 0H1200V16H0Z" fill="#78314b"/><circle cx="1140" cy="95" r="190" fill="#edddd6"/><g font-family="Arial,sans-serif"><text x="58" y="78" font-size="20" letter-spacing="3" fill="#78314b">AASHA / ${escape(label)}</text><text x="58" y="157" font-size="47" font-weight="700" fill="#243e38">${escape(title)}</text>${cards.map(([heading, detail], i) => { const x = 58 + i * 367; return `<rect x="${x}" y="223" width="350" height="245" rx="20" fill="#fffdf9" stroke="#a5b8ad"/><circle cx="${x + 46}" cy="278" r="25" fill="#78314b"/><text x="${x + 46}" y="286" text-anchor="middle" fill="white" font-size="23">${i + 1}</text><text x="${x + 25}" y="357" font-size="29" font-weight="700" fill="#243e38">${escape(heading)}</text><text x="${x + 25}" y="407" font-size="20" fill="#3f554e">${escape(detail)}</text>`; }).join('')}<text x="58" y="535" font-size="23" fill="#243e38">${escape(footer)}</text><text x="58" y="588" font-size="17" letter-spacing="2" fill="#78314b">LEARN / ASK / PLAN TOGETHER</text></g></svg>`;
  await writeFile(`${folder}/${slug}.svg`, svg);
  await sharp(Buffer.from(svg)).png().toFile(`${folder}/${slug}.png`);
}
console.log(`Created ${guides.length} original guide illustrations (SVG + PNG).`);
