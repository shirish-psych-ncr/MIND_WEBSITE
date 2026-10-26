// Editorial relationships, not URL nesting. New pages in known collections
// inherit their parent; exceptional pages can override it here.
export const siteOrigin = 'https://mindgracencr.in';
export const labels = {
  '/': 'Home', '/aasha': 'Aasha', '/aasha/learning': 'Learning hub',
  '/services': 'Care and services', '/conditions': 'Conditions', '/about': 'About the clinic',
  '/academic-training': 'Academic training', '/student-internship-guides': 'Internship guides',
  '/resources': 'Resources and tools', '/blog': 'Journal', '/blog/adult': 'Adult mental health',
  '/blog/children': 'Child development articles', '/contact': 'Visit and contact', '/site-map': 'Explore the site',
};
export const groups = {
  child: { label: 'Aasha child development', hub: '/aasha' },
  adult: { label: 'Adult mental health and care', hub: '/services' },
  academic: { label: 'Academic training and internships', hub: '/academic-training' },
  resources: { label: 'Learning and practical tools', hub: '/resources' },
  visit: { label: 'Appointments and visiting', hub: '/contact' },
  clinic: { label: 'The clinic and policies', hub: '/about' },
};
const child = new Set(['/child-development', '/child-student-mental-health', '/learning-disability-assessment', '/adhd-autism-assessment', '/sleep-and-autism-guide-indian-parents']);
const adult = new Set(['/psychiatry','/therapy','/psychology-counselling','/assessments','/specialized-consultations','/evidence-based-therapies','/psychiatrist-vs-psychologist','/psychiatrist-greater-noida','/psychiatrist-in-noida','/online-therapy-india']);
const conditions = new Set(['/addiction-substance-use','/anxiety-therapy-near-me','/bipolar-mood-disorders','/depression-anxiety','/depression-in-older-adults','/depression-treatment-ncr','/high-functioning-depression-guide','/ocd-panic-ptsd','/perceived-burdensomeness','/psychosis-schizophrenia','/schizophrenia-bipolar-care','/sleep-eating-disorders','/trauma-grief-support']);
const visit = new Set(['/book','/fees','/location','/process','/teleconsultation','/thank-you']);
const learningArticles = new Set(['autism-and-adhd-differences','autism-gut-health-and-diets','autism-screening-and-assessment','autism-treatment-evidence','developmental-regression','folinic-acid-and-autism','mitochondria-and-autism','mthfr-methylation-and-autism']);
export function classify(route) {
  if (route === '/') return { parent: null, group: 'clinic' };
  if (route === '/aasha') return { parent: '/', group: 'child' };
  if (route === '/aasha/learning') return { parent: '/aasha', group: 'child' };
  if (route.startsWith('/aasha/resources/')) return { parent: '/aasha/learning', group: 'child' };
  if (route.startsWith('/aasha/')) return { parent: '/aasha', group: 'child' };
  if (route === '/blog/children' || child.has(route)) return { parent: '/aasha', group: 'child' };
  if (route.startsWith('/blog/pages/child/')) return { parent: learningArticles.has(route.split('/').at(-1)) ? '/aasha/learning' : '/blog/children', group: 'child' };
  if (route === '/academic-training') return { parent: '/', group: 'academic' };
  if (['/student-internship-guides','/clinical-psychology-internship'].includes(route)) return { parent: '/academic-training', group: 'academic' };
  if (/internship|psychology-institutions/.test(route)) return { parent: '/student-internship-guides', group: 'academic' };
  if (route === '/blog') return { parent: '/', group: 'resources' };
  if (route === '/blog/adult') return { parent: '/blog', group: 'adult' };
  if (route.startsWith('/blog/pages/adult/')) return { parent: '/blog/adult', group: 'adult' };
  if (route === '/services') return { parent: '/', group: 'adult' };
  if (route === '/conditions') return { parent: '/services', group: 'adult' };
  if (conditions.has(route)) return { parent: '/conditions', group: 'adult' };
  if (adult.has(route)) return { parent: '/services', group: 'adult' };
  if (route === '/resources' || route === '/emergency') return { parent: '/', group: 'resources' };
  if (route.startsWith('/tools/') || route === '/faq') return { parent: '/resources', group: 'resources' };
  if (route === '/contact') return { parent: '/', group: 'visit' };
  if (visit.has(route)) return { parent: '/contact', group: 'visit' };
  if (['/about','/site-map','/404','/landing'].includes(route)) return { parent: '/', group: 'clinic' };
  return { parent: '/about', group: 'clinic' };
}
// Intentional bridges are allowed across groups; inferred links stay within one.
export const bridges = {
  '/': ['/services','/aasha','/academic-training','/resources'],
  '/services': ['/aasha','/psychiatry','/therapy','/assessments'],
  '/aasha': ['/aasha/learning','/aasha/developmental-assessment','/aasha/speech-language-therapy','/aasha/book'],
  '/aasha/learning': ['/blog/children','/aasha/developmental-check-in','/aasha/developmental-assessment'],
  '/aasha/developmental-assessment': ['/aasha/developmental-check-in','/aasha/resources/assessment-visit-planner','/aasha/book'],
  '/aasha/book': ['/aasha/developmental-assessment','/aasha/resources/assessment-visit-planner','/location'],
  '/academic-training': ['/student-internship-guides','/clinical-psychology-internship','/resources'],
  '/blog': ['/blog/adult','/blog/children','/aasha/learning','/student-internship-guides'],
  '/blog/children': ['/aasha/learning','/aasha/developmental-assessment','/sleep-and-autism-guide-indian-parents'],
  '/resources': ['/aasha/learning','/tools/guided-breathing','/blog','/student-internship-guides'],
  '/contact': ['/book','/location','/fees','/teleconsultation'],
  '/book': ['/fees','/process','/aasha/book','/location'],
  '/about': ['/doctors','/approach','/location','/aasha'],
};
export function topics(route) {
  const dictionary = {
    anxiety: /anxiety|overthinking|worry|panic|mindfulness/,
    sleep: /sleep|stimulus-control/,
    mood: /depression|bipolar|mood|burdensomeness/,
    autism: /autism|methylation|mitochondri|folinic|regression/,
    assessment: /assessment|screening|red-flags|early-signs|check-in|visit-planner/,
    communication: /speech|language|communication/,
    school: /school|adhd|special-education|learning-disability/,
    sensory: /sensory|occupational|comfort/,
    nutrition: /gut|diet|comfort-diary/,
    treatment: /treatment|evidence|therap|psychiatr/,
    training: /internship|academic|institutions/,
  };
  return Object.entries(dictionary).filter(([, pattern]) => pattern.test(route)).map(([name]) => name);
}
