import aashaData from '../data/aasha.json';
export const SITE_URL = 'https://mindgracencr.in';
export const CLINIC_ID = `${SITE_URL}/#clinic`;
export const PHYSICIAN_ID = `${SITE_URL}/#physician`;
export const PERSON_ID = `${SITE_URL}/#doctor-anita-sharma`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const clinicAddress = {
  '@type': 'PostalAddress',
  streetAddress: 'J123 Gamma II',
  addressLocality: 'Greater Noida',
  addressRegion: 'Uttar Pradesh',
  postalCode: '201310',
  addressCountry: 'IN',
} as const;

export const clinicHours = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '16:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '17:30',
    closes: '19:30',
  },
] as const;

export const clinic = {
  '@type': ['MedicalClinic', 'MedicalBusiness'],
  '@id': CLINIC_ID,
  name: 'Mind Grace Neuropsychiatric Clinic',
  url: `${SITE_URL}/`,
  description: 'Adult neuropsychiatric care and academic training in Greater Noida, with all child-related care through Aasha Early Intervention Centre.',
  telephone: '+91-9667863295',
  priceRange: '₹₹',
  logo: `${SITE_URL}/assets/images/mind-grace-clinic-logo-pink.svg`,
  image: `${SITE_URL}/assets/images/mind-grace-entry-n-reception.webp`,
  address: clinicAddress,
  geo: { '@type': 'GeoCoordinates', latitude: 28.4910152, longitude: 77.5132324 },
  openingHoursSpecification: clinicHours,
  areaServed: ['Greater Noida', 'Noida', 'Gautam Buddha Nagar', 'Delhi NCR'],
  employee: { '@id': PERSON_ID },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Clinical services',
    itemListElement: [
      'Psychiatric Consultation',
      'Psychological Counselling',
      'Mental Health Assessment',
      'Medication Management',
    ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
  },
} as const;

export const AASHA_ID = aashaData.id;
export const aasha = {
  '@type': 'MedicalClinic', '@id': AASHA_ID,
  name: aashaData.name, alternateName: aashaData.shortName,
  url: aashaData.url, telephone: aashaData.telephone,
  description: 'Individualised child development assessments, psychiatric consultation, speech and language therapy, occupational therapy, special education and behavioural support in Greater Noida.',
  logo: `${SITE_URL}${aashaData.logo}`, image: `${SITE_URL}${aashaData.logo}`,
  address: { '@type': 'PostalAddress', streetAddress: 'J-123, J Block, Gamma 2', addressLocality: 'Greater Noida', addressRegion: 'Uttar Pradesh', postalCode: '201310', addressCountry: 'IN' },
  areaServed: ['Greater Noida', 'Noida', 'Delhi NCR'],
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '12:00', closes: '20:00' },
} as const;
