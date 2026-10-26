import { longform } from './neurodevelopment-longform';
export const evidenceDate = '2026-10-26';
export const sources = {
  screening: { name: 'CDC: clinical screening for autism', url: 'https://www.cdc.gov/autism/hcp/diagnosis/screening.html' },
  adhd: { name: 'CDC: diagnosing ADHD', url: 'https://www.cdc.gov/adhd/diagnosis/' },
  nice: { name: 'NICE CG170: support and management', url: 'https://www.nice.org.uk/guidance/cg170/chapter/recommendations' },
  diagnosis: { name: 'NICE CG128: recognition, referral and diagnosis', url: 'https://www.nice.org.uk/guidance/cg128/chapter/Recommendations' },
  aap: { name: 'AAP: guidance on leucovorin in autistic children', url: 'https://www.aap.org/en/patient-care/autism/use-of-leucovorin-in-autistic-pediatric-patients/' },
  aapFaq: { name: 'AAP: clinical questions about leucovorin and cerebral folate deficiency', url: 'https://www.aap.org/en/patient-care/autism/use-of-leucovorin-in-autistic-pediatric-patients/frequently-asked-questions-faqs-for-pediatricians-and-other-prescribing-pediatric-clinicians/' },
  fda: { name: 'FDA: approval for FOLR1-related cerebral folate transport deficiency', url: 'https://content.govdelivery.com/accounts/USFDA/bulletins/40d8840' },
  genes: { name: 'MedlinePlus Genetics: MTHFR', url: 'https://medlineplus.gov/genetics/gene/mthfr/' },
  complementary: { name: 'NCCIH: complementary approaches for autism', url: 'https://www.nccih.nih.gov/health/tips/things-to-know-about-complementary-health-approaches-for-asd' },
  vaccines: { name: 'WHO: 2025 review of vaccines and autism', url: 'https://www.who.int/news/item/11-12-2025-who-expert-group-s-new-analysis-reaffirms-there-is-no-link-between-vaccines-and-autism' },
  mchat: { name: 'M-CHAT-R/F: official screening tool and permissions', url: 'https://www.mchatscreen.com/' },
  nimhAutism: { name: 'NIMH: autism spectrum disorder', url: 'https://www.nimh.nih.gov/health/publications/autism-spectrum-disorder' },
  nimhAdhd: { name: 'NIMH: attention-deficit/hyperactivity disorder', url: 'https://www.nimh.nih.gov/health/publications/attention-deficit-hyperactivity-disorder-what-you-need-to-know' },
  adhdCare: { name: 'NICE NG87: ADHD diagnosis and management', url: 'https://www.nice.org.uk/guidance/ng87/chapter/recommendations' },
  mito: { name: 'Mitochondrial Medicine Society: diagnostic consensus statement (2015)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5000852/' },
  folinicTrial: { name: 'Frye and colleagues: randomized folinic acid trial (2018)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5794882/' },
  constipation: { name: 'American College of Gastroenterology: constipation in children', url: 'https://gi.org/topics/constipation-in-children/' },
  celiac: { name: 'NIDDK: diagnosis of celiac disease', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/celiac-disease/diagnosis' },
};
type SourceKey = keyof typeof sources;
export interface LearningEntry {
  slug: string; title: string; description: string; kind: 'article' | 'resource';
  answer: string; image: string; imageAlt?: string;
  intro?: string[]; takeaways?: string[];
  sections: { title: string; text: string; paragraphs?: string[]; points?: string[]; source?: SourceKey; links?: { href: string; label: string }[]; table?: { caption: string; headings: string[]; rows: string[][] }; example?: { title: string; text: string } }[];
  faq: { q: string; a: string }[]; related: string[];
  worksheet?: { title: string; prompts: string[] };
}
export const entries: LearningEntry[] = [
  {
    slug: 'autism-and-adhd-differences', kind: 'article', image: 'care',
    title: 'Autism and ADHD: differences, overlap and assessment',
    description: 'Understand autism and ADHD without stereotypes: shared challenges, co-occurrence, and useful observations to bring to a child assessment.',
    answer: 'Autism and ADHD are distinct developmental conditions that can occur together. Attention, communication and sensory differences need to be understood across everyday situations; a single behaviour cannot establish either diagnosis.',
    sections: [],
    faq: [{ q: 'Can a child have both autism and ADHD?', a: 'Yes. Assessment can identify both and should describe the support needed for each child.' }, { q: 'Does making eye contact rule out autism?', a: 'No. Eye contact alone cannot confirm or exclude autism.' }],
    related: ['autism-screening-and-assessment', 'assessment-visit-planner', 'school-support-planner'],
  },
  {
    slug: 'autism-screening-and-assessment', kind: 'article', image: 'observe',
    title: 'Autism screening: what happens after a concern?',
    description: 'A parent guide to developmental monitoring, M-CHAT-R/F, assessment and early support, with practical preparation for families in Greater Noida.',
    answer: 'Screening identifies children who may need a closer developmental assessment. It does not diagnose autism, and a reassuring screen should not override persistent concerns or loss of skills.',
    sections: [],
    faq: [{ q: 'Is a positive screen an autism diagnosis?', a: 'No. It means further evaluation is needed; other developmental needs may also be identified.' }, { q: 'Should I wait if my child loses skills?', a: 'No. Arrange prompt medical assessment for loss of previously acquired skills.' }],
    related: ['developmental-regression', 'assessment-visit-planner', 'autism-and-adhd-differences'],
  },
  {
    slug: 'developmental-regression', kind: 'article', image: 'observe',
    title: 'Developmental regression: when a child loses skills',
    description: 'Understand developmental regression, what to record, when to seek urgent help, and why timing alone cannot identify the cause.',
    answer: 'Loss of previously acquired language, movement or everyday skills needs prompt medical assessment. Regression has several possible explanations and cannot be diagnosed as a mitochondrial problem from a checklist.',
    sections: [],
    faq: [{ q: 'Does regression always mean autism?', a: 'No. Loss of skills can have different causes and needs a medical evaluation.' }, { q: 'Does regression prove mitochondrial disease?', a: 'No. A specialist considers the full clinical picture before choosing investigations.' }],
    related: ['mitochondria-and-autism', 'assessment-visit-planner', 'autism-screening-and-assessment'],
  },
  {
    slug: 'mthfr-methylation-and-autism', kind: 'article', image: 'evidence',
    title: 'MTHFR, methylation and autism: understanding the claims',
    description: 'Separate methylation biology from unsupported autism treatment claims, and learn what to ask before paying for genetic or supplement panels.',
    answer: 'Methylation is a normal biological process. A common MTHFR variant does not diagnose autism or establish a supplement plan. Behaviour cannot reliably classify a child as “overmethylated” or “undermethylated”.',
    sections: [],
    faq: [{ q: 'Can an MTHFR result diagnose autism?', a: 'No. Autism diagnosis depends on developmental assessment, not a common MTHFR variant.' }, { q: 'Does agitation after a vitamin prove overmethylation?', a: 'No. Report the reaction and the product to a clinician rather than assigning a biochemical diagnosis.' }],
    related: ['folinic-acid-and-autism', 'autism-treatment-evidence', 'assessment-visit-planner'],
  },
  {
    slug: 'folinic-acid-and-autism', kind: 'article', image: 'evidence',
    title: 'Folinic acid and autism: what families should know',
    description: 'Understand leucovorin, rare cerebral folate transport deficiency and the limits of current evidence for routine use in autistic children.',
    answer: 'Folinic acid, also called leucovorin, is a medicine. Evidence for a rare folate transport disorder must not be generalized to every autistic child. The AAP does not recommend routine leucovorin use for autistic children.',
    sections: [],
    faq: [{ q: 'Is leucovorin a general cure for autism?', a: 'No. It is not an established cure for autism, and routine use is not recommended by the AAP.' }, { q: 'Does severe speech delay prove folate transport deficiency?', a: 'No. Speech delay has many possible explanations and needs developmental assessment.' }],
    related: ['mthfr-methylation-and-autism', 'autism-treatment-evidence', 'assessment-visit-planner'],
  },
  {
    slug: 'mitochondria-and-autism', kind: 'article', image: 'evidence',
    title: 'Mitochondria and autism: research versus diagnosis',
    description: 'Why mitochondrial research does not justify routine metabolic panels or supplement cocktails, and when specialist assessment may be appropriate.',
    answer: 'Research about cellular energy in autism does not mean every autistic child has mitochondrial disease. Symptoms such as fatigue or constipation are nonspecific; investigations need a clinical reason.',
    sections: [],
    faq: [{ q: 'Should every autistic child have metabolic testing?', a: 'Testing should be selected from the child’s medical history and examination, rather than ordered as a universal autism panel.' }, { q: 'Can supplements replace developmental support?', a: 'No. Medical investigations should not displace communication, learning and everyday participation support.' }],
    related: ['developmental-regression', 'autism-treatment-evidence', 'mthfr-methylation-and-autism'],
  },
  {
    slug: 'autism-gut-health-and-diets', kind: 'article', image: 'care',
    title: 'Autism, gut health and diets: a practical family guide',
    description: 'Support nutrition and gastrointestinal comfort without unproven autism diets, microbiome cure claims or blame about birth and feeding choices.',
    answer: 'Constipation, pain and feeding difficulties deserve care in their own right. Gut research does not establish that removing gluten, dairy or broad food groups treats the core features of autism.',
    sections: [],
    faq: [{ q: 'Does every autistic child need a gluten-free diet?', a: 'No. Dietary restriction should have a specific clinical reason and a plan to protect nutrition.' }, { q: 'Can a stool test diagnose autism?', a: 'No. Autism is diagnosed through developmental assessment, not a commercial microbiome profile.' }],
    related: ['daily-comfort-diary', 'autism-treatment-evidence', 'assessment-visit-planner'],
  },
  {
    slug: 'autism-treatment-evidence', kind: 'article', image: 'evidence',
    title: 'How to judge an autism treatment claim',
    description: 'A practical way to evaluate autism treatment promises, research, costs, safety and meaningful outcomes before committing time or money.',
    answer: 'Ask what outcome was measured, how the treatment was compared, what harms were recorded and whether independent guidance supports it. A biological explanation or testimonial alone does not show that a treatment works.',
    sections: [],
    faq: [{ q: 'Does a plausible biological mechanism prove benefit?', a: 'No. Benefit and harm need to be tested in people using meaningful outcomes and appropriate comparisons.' }, { q: 'Should worsening symptoms be accepted as detox?', a: 'No. New or worsening symptoms require assessment rather than an assumption that treatment is working.' }],
    related: ['folinic-acid-and-autism', 'autism-gut-health-and-diets', 'school-support-planner'],
  },
  {
    slug: 'assessment-visit-planner', kind: 'resource', image: 'observe',
    title: 'Child assessment appointment planner',
    description: 'Print a focused appointment worksheet for developmental concerns, strengths, medicines, teacher observations and questions for the care team.',
    answer: 'Bring a short history, examples from everyday life and your main questions. This printable planner organizes a conversation; it does not score or diagnose a child.',
    sections: [],
    worksheet: { title: 'My appointment notes', prompts: ['Child’s age, date and languages used', 'Strengths, interests and preferred ways to communicate', 'Main concern: one recent example and when it began', 'Any lost skills, illness or sudden change', 'Home and school observations; what helps', 'Sleep, eating, hearing, pain or movement concerns', 'Medicines and supplements, including product labels', 'Previous assessments or reports to bring', 'My three questions', 'Agreed next step, responsible person and review date'] },
    faq: [{ q: 'Do I need a diagnosis to use this planner?', a: 'No. It is useful whenever you want to discuss a developmental concern.' }],
    related: ['autism-screening-and-assessment', 'developmental-regression', 'school-support-planner'],
  },
  {
    slug: 'daily-comfort-diary', kind: 'resource', image: 'observe',
    title: 'Sleep, food and comfort diary for families',
    description: 'A printable daily observation sheet to discuss sleep, meals, bowel comfort and environmental changes with your child’s clinician.',
    answer: 'A short diary can reveal questions worth discussing with a clinician. It cannot prove a food intolerance, biochemical subtype or cause of autism.',
    sections: [],
    worksheet: { title: 'One day of observations', prompts: ['Date and any change to the usual routine', 'Bedtime, waking time and overnight waking', 'Meals and drinks offered and accepted', 'Bowel movement and signs of pain or discomfort', 'Medicines or supplements taken as prescribed', 'Activity, noise, transitions and sensory demands', 'What the child said, showed or communicated', 'What helped comfort or participation', 'Questions for the next clinical conversation'] },
    faq: [{ q: 'Does discomfort after a meal prove an intolerance?', a: 'No. Discuss a repeated pattern with a clinician rather than diagnosing from timing alone.' }],
    related: ['autism-gut-health-and-diets', 'assessment-visit-planner', 'autism-treatment-evidence'],
  },
  {
    slug: 'school-support-planner', kind: 'resource', image: 'care',
    title: 'Home and school support planning sheet',
    description: 'A printable family–teacher planning resource for communication, transitions, sensory needs and achievable participation goals.',
    answer: 'Agree one practical goal, the support adults will provide and a review date. Focus on access, comfort and participation rather than making a child hide harmless differences.',
    sections: [],
    worksheet: { title: 'Our shared support plan', prompts: ['Child’s strengths, interests and preferences', 'Situation we want to make easier', 'The child’s view or communication about it', 'One participation goal', 'Support adults will offer at home', 'Support adults will offer at school', 'How we will notice benefit or distress', 'People involved and consent for information sharing', 'Review date and what we learned'] },
    faq: [{ q: 'Must we wait for a diagnosis to discuss classroom support?', a: 'Families can discuss practical adjustments with the school while assessment is ongoing.' }],
    related: ['autism-and-adhd-differences', 'assessment-visit-planner', 'autism-treatment-evidence'],
  },
];
for (const entry of entries) {
  const expanded = longform[entry.slug];
  if (expanded) Object.assign(entry, expanded);
  if (entry.kind === 'article') {
    entry.image = entry.slug;
    entry.imageAlt = `${entry.title}: a guide map of the key questions explored in this article.`;
  }
}
export const entryPath = (entry: LearningEntry) => entry.kind === 'article' ? `/blog/pages/child/${entry.slug}` : `/aasha/resources/${entry.slug}`;

export function readingStats(entry: LearningEntry) {
  const text = [entry.answer, ...(entry.intro ?? []), ...(entry.takeaways ?? []), ...entry.sections.flatMap(section => [section.title, section.text, ...(section.paragraphs ?? []), ...(section.points ?? []), section.example?.text ?? '', ...(section.table?.rows.flat() ?? [])]), ...entry.faq.flatMap(item => [item.q, item.a])].join(' ');
  const wordCount = text.trim().split(/\s+/).length;
  return { wordCount, readingMinutes: Math.ceil(wordCount / 200) };
}

// Link at the relevant discussion, not only in the generic related-reading list.
const connections: [string, string, string, string][] = [
  ['autism-and-adhd-differences', 'What a careful assessment includes', 'autism-screening-and-assessment', 'Follow the screening-to-assessment pathway'],
  ['autism-and-adhd-differences', 'What support can look like after assessment', 'school-support-planner', 'Turn a support goal into a home–school plan'],
  ['autism-screening-and-assessment', 'When to raise a concern', 'developmental-regression', 'Understand loss of skills and when to seek care'],
  ['autism-screening-and-assessment', 'Preparing useful examples in a multilingual family', 'assessment-visit-planner', 'Print an appointment planner for your observations'],
  ['developmental-regression', 'Build a short, factual timeline', 'assessment-visit-planner', 'Organize the timeline and questions for your visit'],
  ['developmental-regression', 'Why regression does not prove mitochondrial disease', 'mitochondria-and-autism', 'Read how mitochondrial investigations are interpreted'],
  ['mthfr-methylation-and-autism', 'Nutrition and medicines: a more useful conversation', 'folinic-acid-and-autism', 'Explore folinic acid and folate transport disorders separately'],
  ['mthfr-methylation-and-autism', 'What to ask before ordering tests', 'autism-treatment-evidence', 'Use the evidence questions before buying a test package'],
  ['folinic-acid-and-autism', 'Why promising research and routine care differ', 'autism-treatment-evidence', 'Learn how to interpret trials and treatment claims'],
  ['folinic-acid-and-autism', 'Make an individual treatment discussion specific', 'assessment-visit-planner', 'Prepare your questions for the prescriber'],
  ['mitochondria-and-autism', 'Which observations are useful to the clinician?', 'developmental-regression', 'Read the guide to developmental regression'],
  ['mitochondria-and-autism', 'Why a “mitochondrial cocktail” is not a general treatment plan', 'autism-treatment-evidence', 'Compare benefit, harms and the quality of evidence'],
  ['autism-gut-health-and-diets', 'Use a brief diary without turning every meal into an experiment', 'daily-comfort-diary', 'Print the sleep, food and comfort diary'],
  ['autism-gut-health-and-diets', 'What common diet labels leave out', 'autism-treatment-evidence', 'Evaluate the evidence behind a dietary claim'],
  ['autism-treatment-evidence', 'Apply the method to biomedical claims in the notes', 'folinic-acid-and-autism', 'See a worked research discussion: folinic acid'],
  ['autism-treatment-evidence', 'Agree on a reviewable plan, not an open-ended promise', 'school-support-planner', 'Put a participation goal into a reviewable support plan'],
  ['assessment-visit-planner', 'Before the visit: choose your main question', 'autism-screening-and-assessment', 'Read what to expect during developmental assessment'],
  ['daily-comfort-diary', 'Review the pattern with a clear question', 'autism-gut-health-and-diets', 'Understand the difference between gut symptoms and diet claims'],
  ['school-support-planner', 'Define a situation rather than labelling a child', 'autism-and-adhd-differences', 'Explore why similar behaviours can have different explanations'],
];
for (const [slug, heading, target, label] of connections) {
  const section = entries.find(entry => entry.slug === slug)?.sections.find(section => section.title === heading);
  const destination = entries.find(entry => entry.slug === target);
  if (!section || !destination) throw new Error(`Invalid learning connection: ${slug} / ${heading} / ${target}`);
  (section.links ??= []).push({ href: entryPath(destination), label });
}
