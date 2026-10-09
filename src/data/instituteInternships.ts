// Institute internship guide content for Mind Grace Neuropsychiatric Clinic.
// Data-driven source for every /blog/pages/adult/*-internship page rendered by
// src/components/InternshipGuidePage.astro. Content is derived from the clinic's
// Delhi NCR psychology & psychiatry programme directory; logos live in
// assets/images/institute_logos/ (published under /assets/ via publicAssets).

export interface InstituteFaq { question: string; answer: string }

export interface InstituteProfile {
  /** institution prop passed to InternshipGuidePage (page identity) */
  institution: string;
  location: string;
  slug: string;
  type: string;
  rciPathway?: boolean;
  logo?: string; // file name inside assets/images/institute_logos/
  alt: string; // logo alt text
  short: string; // one-line "who they are" blurb
  programs: string[];
  syllabus: string[];
  practicum: string[];
  features: string[];
  angle: string; // why an intern from this institute would look east of the Yamuna
  faqs: InstituteFaq[];
}

const FAQ_BASE: InstituteFaq[] = [
  {
    question: 'Does Mind Grace supervise student interns directly?',
    answer: 'Clinical supervision and training opportunities are arranged on a case-by-case basis with the treating RCI-licensed clinical psychologist. Availability, duration, documentation formats, and the scope of permitted activities must always be confirmed in writing before you log any hours.',
  },
  {
    question: 'What can psychology interns realistically do at Mind Grace?',
    answer: 'Interns typically observe assessments, assist with record keeping and psychoeducation under supervision, support intake workflows, and co-conduct research or awareness projects. Interns never independently diagnose, interpret test protocols for patients, or deliver therapy.',
  },
  {
    question: 'Will Mind Grace provide an internship completion letter?',
    answer: 'Placements that run to completion generally receive an official letter describing your tenure, supervised activities, and conduct. Share your university template early so the letter satisfies your department\u2019s exact requirements for hours, signatures, and letterhead.',
  },
];

export const INSTITUTE_PROFILES: InstituteProfile[] = [
  {
    institution: 'Amity University',
    location: 'Noida and Greater Noida',
    slug: 'amity-university-psychology-internship',
    type: 'Private University',
    rciPathway: true,
    logo: 'amity_university_logo_Transparent.png',
    alt: 'Amity University logo',
    short: 'One of the largest private psychology schools in the NCR, with an RCI-approved clinical ladder running from B.Sc. through the Ph.D.',
    programs: [
      'B.A. (Hons) Psychology \u2013 3 years',
      'B.Sc. Clinical Psychology (Hons) \u2013 4 years, RCI-approved pathway',
      'B.A. to M.A. Clinical Psychology Dual Degree \u2013 5 years',
      'M.A. Clinical Psychology \u2013 2 years, RCI-approved',
      'M.A. Counseling Psychology \u2013 2 years',
      'Ph.D. Psychology',
    ],
    syllabus: [
      'Undergraduate core: Introduction to Psychology, Life Span Development, Social Psychology, Cognitive Psychology, Biological Psychology, Research Methods, Psychological Testing, Personality Theories',
      'M.A. Clinical Psychology: History of Psychology, Advanced Social Psychology, Psychopathology, Psycho-diagnostics, Psychotherapeutic Methods, Psychological Assessment, Counseling Skills, Mental Health, Clinical Practicum, Advanced Research Methodology',
    ],
    practicum: [
      'Extensive supervised practicum and internship hours are mandated across programmes',
      'Psychological assessment training and fieldwork in recognised mental health settings',
      'Detailed case conceptualisations, diagnostic formulations, and therapeutic intervention logs under direct supervision of RCI-licensed clinical psychologists',
      'The B.Sc. Clinical pathway includes early exposure to clinical settings to build foundational observational skills',
    ],
    features: [
      'Teletherapy platforms integrated into training',
      'Advanced clinical psychology modules',
      'Hands-on psychiatric assessment training in state-of-the-art university laboratories',
    ],
    angle: 'With campuses on both sides of the Yamuna, Amity students can pair west-campus laboratory training with east-side community caseloads. Mind Grace sits on the Greater Noida side of that loop, adding outpatient neurosis, de-addiction, and tele-mental-health exposure to a portfolio that is already strong on psychometrics.',
    faqs: [
      {
        question: 'Can Amity M.A. Clinical Psychology students do their clinical practicum at Mind Grace?',
        answer: 'Mind Grace accepts enquiries from students whose universities require supervised practicum hours in recognised mental health settings. Send your handbook extract specifying required hours, permitted activities, and supervisor qualifications, and the clinic will confirm in writing what it can offer before you begin.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Amity Institute of Psychology and Allied Sciences',
    location: 'Noida',
    slug: 'amity-aips-noida-psychology-internship',
    type: 'Private University \u2013 Dedicated Psychology Institute',
    rciPathway: true,
    logo: 'amity_university_logo_Transparent.png',
    alt: 'Amity University logo',
    short: 'AIPS is Amity\u2019s dedicated psychology institute in Sector 125, Noida, spanning behavioural science from undergraduate labs to doctoral research.',
    programs: [
      'B.A./B.Sc. Psychology specialisations (clinical, counselling, organisational, child-focused)',
      'Integrated M.A. routes in Psychology',
      'M.Phil. and Ph.D. in Psychology',
    ],
    syllabus: [
      'Foundations of behavioural science with clinical, counselling, organisational, and child-and-adolescent specialisation tracks',
      'Laboratory-based experimental methods and psychological testing',
      'Research design, statistics, and dissertation work at the postgraduate level',
    ],
    practicum: [
      'Match internships to your chosen clinical, counselling, organisational, or child-and-adolescent specialisation',
      'Verify required documents \u2014 logbooks, supervisor evaluations, and completion certificates \u2014 before accepting a placement',
      'Compare the laboratory, assessment, school, corporate, and clinical components of your exact programme',
    ],
    features: [
      'Multiple specialisation tracks under one institute roof',
      'Strong laboratory infrastructure for experimental psychology',
    ],
    angle: 'AIPS\u2019s Sector 125 campus is a short drive from Greater Noida West, so its students can treat Mind Grace as a natural east-of-Noida clinical adjunct: real outpatient presentations, family counselling sessions, and de-addiction follow-ups that complement the institute\u2019s laboratory-heavy curriculum.',
    faqs: [
      {
        question: 'Which AIPS specialisation fits a clinic-based internship best?',
        answer: 'Clinical and counselling track students gain the most from outpatient observation, intake assistance, and psychoeducation work. Organisational-track students usually benefit more from workplace wellbeing projects. Discuss your specialisation and learning goals with the clinic before finalising scope.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Amity University, Greater Noida',
    location: 'Greater Noida',
    slug: 'amity-greater-noida-psychology-internship',
    type: 'Private University',
    logo: 'amity_university_logo_Transparent.png',
    alt: 'Amity University logo',
    short: 'Amity\u2019s Greater Noida campus offers psychology education with clinical, behavioural, and evidence-informed components.',
    programs: [
      'B.A. / B.Sc. Psychology offerings',
      'Postgraduate psychology components with applied and clinical flavours',
    ],
    syllabus: [
      'Core psychology foundations with behavioural and evidence-informed modules',
      'Programme recognition and fieldwork requirements vary by exact course \u2014 confirm against the current handbook',
    ],
    practicum: [
      'Confirm the exact programme recognition and required hours',
      'Establish whether fieldwork is hospital, rehabilitation, laboratory, or community based',
      'Verify current programme status and evaluation documents before applying',
    ],
    features: [
      'Campus positioned in the heart of Greater Noida\u2019s expanding healthcare belt',
    ],
    angle: 'Students studying locally in Greater Noida keep internship hours within the same district \u2014 Mind Grace\u2019s Sector 128 base means minimal commute time and access to the case mix of a growing township: exam anxiety, substance use in young adults, and first-episode mental illness.',
    faqs: [
      {
        question: 'Do Greater Noida Amity students get local internship options?',
        answer: 'Yes. Local clinics in the same district reduce travel burden and make consistent weekly attendance realistic \u2014 something supervisors weigh heavily when signing off hour logs. Confirm your department\u2019s list of approved placement categories before approaching any centre.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Galgotias University',
    location: 'Greater Noida',
    slug: 'galgotias-university-psychology-internship',
    type: 'Private University',
    logo: 'galgotias_university_logo_Transparent.png',
    alt: 'Galgotias University logo',
    short: 'An applied-psychology school that bridges theory with corporate and community mental health interventions.',
    programs: [
      'B.A. (Hons) Applied Psychology \u2013 3 years',
      'B.A. (Hons) Psychology \u2013 3 years',
      'M.A. Psychology \u2013 2 years',
      'M.A. Applied Psychology \u2013 2 years',
      'Ph.D. Psychology',
    ],
    syllabus: [
      'UG core: Introduction to Psychology, Life Span Development, Social Psychology, Cognitive Psychology Theory, Research Methods and Design, Physiological Psychology, Vedic Psychology and Well-being, Perspectives on Trauma Studies, Counseling Psychology, Statistics in Psychological Research',
      'PG curriculum: pure and applied psychology with focus on clinical and organisational psychology, Life Span Human Development, Research Writing Skills, and a dedicated internship component',
    ],
    practicum: [
      'Mandatory internship components in later semesters',
      'University facilitates connections to nearby clinics, NGOs, and corporate HR settings',
      'Detailed fieldwork reports and supervisor evaluations are required submissions',
    ],
    features: [
      'Strong emphasis on applied psychology',
      'Trauma studies and Vedic psychology electives unusual in the region',
    ],
    angle: 'Galgotias sits right beside the Greater Noida West corridor where Mind Grace practices. Its trauma-studies and counselling orientation pairs well with a clinic caseload of anxiety disorders, de-addiction follow-up, and family adjustment issues \u2014 exactly the settings where its fieldwork reports need grounded, observed material.',
    faqs: [
      {
        question: 'Does Mind Grace accept Galgotias fieldwork-report formats?',
        answer: 'Galgotias requires detailed fieldwork reports and supervisor evaluations. Send your report template before starting; the clinic will agree on what can be documented, what stays confidential, and how the supervisor signs off, so your submission is valid without breaching patient privacy.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Sharda University',
    location: 'Greater Noida',
    slug: 'sharda-university-psychology-internship',
    type: 'Private University',
    rciPathway: true,
    logo: 'sharda_university_logo_Transparent.png',
    alt: 'Sharda University logo',
    short: 'Home to an RCI-approved M.A. Clinical Psychology built around live psychiatric cases and hospital-linked rotations.',
    programs: [
      'B.A. Psychology \u2013 3 years',
      'M.A. Clinical Psychology \u2013 2 years, RCI-approved',
      'M.A. Applied Psychology \u2013 2 years',
    ],
    syllabus: [
      'Semester 1: General Psychology, Research Methods, Psychological Testing',
      'Semester 2: Psychological Disorders, Psychometrics, Principles and Applications of Counselling, Physiological Psychology, Personality Theories, Organizational Psychology, Mental Abilities, Life Span Development',
    ],
    practicum: [
      'Mandatory clinical rotations with supervised practicum hours',
      'Live psychiatric cases, psychometric testing, and therapeutic interventions',
      'Training occurs within the university\u2019s affiliated hospital or partnered clinical centres under strict supervision',
    ],
    features: [
      'RCI-approved curriculum with extensive clinical training',
      'Access to live psychiatric case studies',
      'Structured therapeutic intervention modules',
    ],
    angle: 'Sharda\u2019s own teaching hospital covers inpatient psychiatry; Mind Grace adds the outpatient continuity many campus hospitals cannot \u2014 long-term therapy follow-ups, neuropsychiatric rehabilitation cases, and teleconsultation practice that sharpen assessment-and-referral judgement.',
    faqs: [
      {
        question: 'How does a private-clinic internship complement Sharda\u2019s hospital rotations?',
        answer: 'Hospital rotations excel at acute, inpatient presentation; an outpatient clinic like Mind Grace shows the longitudinal picture \u2014 treatment adherence, family dynamics, relapse patterns, and tele-mental-health delivery. Ask your department whether external practicum hours count toward your clinical rotation requirement.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Jaypee Institute of Information Technology',
    location: 'Noida',
    slug: 'jiit-psychology-internship',
    type: 'Private Deemed University',
    logo: 'Jaypee_Institute_Of_Information_Technology_Logo_Transparent.png',
    alt: 'Jaypee Institute of Information Technology logo',
    short: 'A psychology-with-technology programme at the intersection of cognitive science, HCI, and digital mental health.',
    programs: [
      'M.Sc. Psychology \u2013 2 years (Clinical Psychology, Counselling Psychology, Organizational Behaviour domains)',
    ],
    syllabus: [
      'Cognitive science and human-computer interaction',
      'Workplace psychometrics and organisational behaviour',
      'Psychological impact of technology and digital mental health',
    ],
    practicum: [
      'Experiential learning through practical training and research projects',
      'Placements in tech-driven OB roles, UX research labs, or cognitive research facilities',
      'Bridge traditional psychology with modern technological applications',
    ],
    features: [
      'Unique intersection of psychology and information technology',
      'Prepares graduates for emerging digital mental health careers',
    ],
    angle: 'Mind Grace runs teleconsultation and digital-first follow-up pathways \u2014 a live testbed for JIIT students researching screen-based assessment, tele-therapy engagement, and app-assisted mood tracking, with clinician partners who can speak to what actually works in Indian outpatient practice.',
    faqs: [
      {
        question: 'Can JIIT M.Sc. students do digital-mental-health research projects at Mind Grace?',
        answer: 'Clinic-based research requires written approval, an ethics clearance aligned with your programme, and a data protocol that protects patient identity. Students working on teleconsultation experience, digital assessment tools, or tech-related behavioural concerns often find Mind Grace\u2019s tele-mental-health service a relevant study setting once these approvals exist.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Gautam Buddha University',
    location: 'Greater Noida',
    slug: 'gautam-buddha-university-psychology-internship',
    type: 'State Government University',
    rciPathway: true,
    logo: 'Gautam_Buddha_University_logo_Transparent.png',
    alt: 'Gautam Buddha University logo',
    short: 'A state university whose RCI-approved M.Phil. Clinical Psychology runs a fully equipped clinical OPD daily.',
    programs: [
      'B.A. / B.Sc. (Hons) Psychology \u2013 3 to 4 years',
      'M.A. Psychology \u2013 2 years',
      'M.Phil. Clinical Psychology \u2013 2 years, RCI-approved',
      'Ph.D. Psychology',
    ],
    syllabus: [
      'M.Phil. Clinical: psychological assessment, psychotherapy, behaviour therapy, biofeedback, hypnosis, counseling, marital therapy, group therapy, sex therapy',
      'Designed per NEP 2020 and UGC guidelines with a strong research methodology focus',
    ],
    practicum: [
      'Full-time intensive clinical training with structured internships, fieldwork, research projects, and community outreach',
      'Training primarily in the university\u2019s fully equipped Clinical Psychology OPD under direct daily supervision of RCI-certified clinical psychologists',
    ],
    features: [
      'Fully equipped Clinical Psychology OPD staffed by RCI-certified psychologists',
      'Extensive assessment tool library',
      'Highly subsidised state-university fee structure',
    ],
    angle: 'GBU trainees already log heavy OPD hours; Mind Grace extends their range into private-practice realities \u2014 elective psychotherapy demand, neuropsychiatric rehabilitation referrals, and consultation-liaison style coordination with psychiatry \u2014 while remaining a quick drive away in the same district.',
    faqs: [
      {
        question: 'Are GBU internship placements restricted to the university OPD?',
        answer: 'The OPD is the primary training site, but the programme also mandates fieldwork and community outreach. External attachments depend on departmental rules \u2014 ask whether partner clinics can host observation or outreach components, then propose Mind Grace as a candidate with your supervision requirements attached.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Institute of Human Behaviour and Allied Sciences',
    location: 'Dilshad Garden, New Delhi',
    slug: 'ibhas-psychology-internship',
    type: 'Government Hospital and Research Institute',
    rciPathway: true,
    logo: 'Institute_of_Human_Behaviour_and_Allied_Sciences_Logo_Transparent_Transparent.webp',
    alt: 'IHBAS logo',
    short: 'A premier central-government mental hospital running an RCI-approved M.A. Clinical Psychology residency-style programme.',
    programs: [
      'M.A. Clinical Psychology \u2013 2 years, RCI-approved (replacing the former M.Phil)',
      'Ph.D. Clinical Psychology',
    ],
    syllabus: [
      'General Psychology, Developmental Psychology, Social Psychology, Personality',
      'Biological and Physiological Psychology, Research Methods, Statistics',
      'Psychopathology and Psychological Testing',
    ],
    practicum: [
      'Hospital-based clinical residency with supervised practicum, internships, case discussions, and psychotherapy training',
      'Real patient caseloads managed from day one under senior clinical psychologists',
    ],
    features: [
      'Minimal fees with a monthly stipend for trainees',
      'Unparalleled exposure to severe psychopathology and neuro-rehabilitation',
      'Premier government mental health hospital setting',
    ],
    angle: 'IHBAS residents see the heaviest end of the spectrum \u2014 severe mental illness, addiction, neuro-rehabilitation. Mind Grace, only across the border in Greater Noida, shows the mirror image: ambulatory neurosis, lifestyle-driven distress, and private tele-mental-health care, rounding out a resident\u2019s formulation skills across both worlds.',
    faqs: [
      {
        question: 'Can IHBAS trainees add external clinic exposure to their residency?',
        answer: 'Residency hours are tightly scheduled within the hospital, but elective attachments, research collaborations, and post-residency associate roles are possible conversations. Because Mind Grace is a short commute from Dilshad Garden along the Ghaziabad\u2013Greater Noida corridor, weekend or elective arrangements are logistically realistic if your programme permits them.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Santosh (Deemed to be University)',
    location: 'Ghaziabad',
    slug: 'santosh-university-psychology-internship',
    type: 'Private Deemed Medical University',
    rciPathway: true,
    logo: 'SANTOSH-UNIVERSITY_Logo_Transparent.webp',
    alt: 'Santosh University logo',
    short: 'A medical university where clinical psychology trainees and psychiatry residents share the same hospital wards.',
    programs: [
      'B.Sc. Clinical Psychology \u2013 3 to 4 years',
      'M.Sc. Clinical Psychology \u2013 2 years',
      'M.Phil. Clinical Psychology \u2013 2 years, RCI-approved',
      'MD Psychiatry \u2013 3 years (medical)',
    ],
    syllabus: [
      'M.Sc. Clinical: Applied Psychology, Bio-Psychosocial Perspective of Behavior, Social Psychology, Indian Psychology, Hospital Psychology, Psychopathology, Psychometrics, Counseling Skills, Advanced Therapeutic Approaches',
      'MD Psychiatry: Neuroanatomy, Neurophysiology, Neurochemistry, Psychoneuroendocrinology, Psychoneuroimmunology, Neurogenetics, comprehensive psychiatric training',
    ],
    practicum: [
      'Rigorous hospital-based internships rotating through Santosh Medical College and Hospital',
      'Inpatient and outpatient psychiatric cases under strict medical and psychological supervision',
      'Psychiatry residents complete consultation-liaison rotations across all medical and surgical wards',
    ],
    features: [
      'Integrated medical and psychological training environment',
      'Close collaboration between psychiatry residents and clinical psychology trainees',
    ],
    angle: 'Santosh\u2019s Ghaziabad campus and Mind Grace\u2019s Greater Noida clinic anchor opposite ends of the same Yamuna loop \u2014 ideal for trainees who want hospital depth plus private-outpatient breadth, including comorbid physical-mental cases typical of a general-hospital catchment.',
    faqs: [
      {
        question: 'Is there cross-border internship convenience between Ghaziabad and Greater Noida?',
        answer: 'Yes \u2014 the two cities are connected by direct road corridors across the Yamuna, making a Ghaziabad-campus student\u2019s commute to Mind Grace comparable to any intra-city NCR placement. Plan fixed weekly blocks rather than ad-hoc visits so hour logs stay credible.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'CHRIST (Deemed to be University), Delhi NCR',
    location: 'Ghaziabad (Delhi NCR Campus)',
    slug: 'christ-delhi-ncr-psychology-internship',
    type: 'Private Deemed University',
    rciPathway: true,
    logo: 'CHRIST_University_Logo_Transparent.png',
    alt: 'Christ University logo',
    short: 'A disciplined deemed university with an RCI-approved M.A. Clinical and block-internship model across NCR hospitals.',
    programs: [
      'B.A. (Hons) Psychology \u2013 3 years',
      'M.Sc. Clinical Psychology \u2013 2 years',
      'M.Sc. Counseling Psychology \u2013 2 years',
      'M.A. Clinical Psychology \u2013 2 years, RCI-approved',
      'PG Diploma in Counseling Psychology',
    ],
    syllabus: [
      'Counseling psychology integrated with mental health, family studies, research, and community engagement',
      'M.A. Clinical (RCI): psychological assessment, diagnostic formulation, psychotherapy, evidence-based interventions',
    ],
    practicum: [
      'Supervised clinical practicum with block internships',
      'Detailed case history taking, psychological assessments, real-case observations',
      'Mandatory weekly supervision sessions with faculty or clinical supervisors',
    ],
    features: [
      'Highly disciplined academic environment',
      'Strong emphasis on research ethics',
      'Well-established ties with major NCR hospitals for clinical postings',
    ],
    angle: 'Christ\u2019s block-internship structure suits a clinic that values consistency: a focused four-to-six-week block at Mind Grace gives trainees concentrated exposure to intake interviews, CBT-oriented session observation, and teleconsultation workflows, followed by reflective write-ups.',
    faqs: [
      {
        question: 'How should a CHRIST block internship be organised at Mind Grace?',
        answer: 'Block internships work best with a written schedule: which sessions are observable, which records may be summarised, who signs the logbook, and what the final reflective submission should cover. Agree this with both your faculty coordinator and the clinic before the block starts.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Tata Institute of Social Sciences',
    location: 'Mumbai, with Delhi NCR campus outreach and field networks',
    slug: 'tiss-psychology-internship',
    type: 'Central University',
    logo: 'Tata_Institute_of_Social_Sciences_Logo_Transparent.webp',
    alt: 'TISS logo',
    short: 'India\u2019s benchmark for social-justice psychology, placing interns in schools, hospitals, and grassroots field projects.',
    programs: [
      'M.A. Applied Psychology (Clinical and Counselling Practice) \u2013 2 years, 50 seats',
    ],
    syllabus: [
      'Developmental, mental health, and issue-based assessment and intervention',
      'Multi-cultural counselling and sensitivity in working with diverse, marginalised populations',
    ],
    practicum: [
      'Extensive field-based internships are mandatory',
      'Placements in schools, hospitals, counselling centres, or TISS Field Action Projects',
      'Community research, clinical advising, and grassroots mental health advocacy',
    ],
    features: [
      'Renowned social justice orientation and critical psychology perspectives',
      'Unparalleled NGO and community health centre network',
    ],
    angle: 'TISS trains people to read distress in context. Mind Grace\u2019s catchment \u2014 migrant-worker families, students under exam pressure, gig-economy burnout \u2014 is a living laboratory for that lens, letting TISS interns pair individual clinical observation with the social determinants their programme insists on.',
    faqs: [
      {
        question: 'Can TISS field internships count a private clinic as a placement site?',
        answer: 'TISS field placements usually run through its network of institutions and Field Action Projects. If your coordinator permits an independent placement, a private clinic can serve as a site for community-mental-health observation and psychoeducation design \u2014 provided the learning objectives, supervision, and reporting format are agreed in advance.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Vidyasagar Institute of Mental Health and Neurosciences',
    location: 'Nehru Nagar, New Delhi',
    slug: 'vimhans-psychology-internship',
    type: 'Private Deemed University and Specialized Hospital',
    rciPathway: true,
    logo: 'Vidyasagar_Institute_of_Mental_Health_and_Neurosciences_logo_Transparent.png',
    alt: 'VIMHANS logo',
    short: 'One of India\u2019s oldest dedicated mental-health institutes, known for rigorous M.Phil. clinical training and short-term exposure programmes.',
    programs: [
      'M.Phil. Clinical Psychology \u2013 2 years, RCI-approved',
      'Short-Term Clinical Exposure Programs \u2013 1 to 2 months',
      'UG and PG Nursing Training in Mental Health',
    ],
    syllabus: [
      'Comprehensive mental-health theory paired with practical training in psychotherapy, behaviour therapy, biofeedback, hypnosis, counseling, marital therapy, group therapy, and sex therapy',
    ],
    practicum: [
      'Mandatory short-term clinical exposure programmes and supervised observation hours',
      'Expert faculty lectures and tutorials covering all mental-health concepts',
      'Direct patient interaction under strict clinical supervision',
    ],
    features: [
      'One of the oldest and most respected private mental-health institutes in India',
      'Rigorous clinical training with a specialised neurosciences focus',
    ],
    angle: 'VIMHANS\u2019s own short-term exposure model maps neatly onto how Mind Grace hosts visitors: compressed, high-density observation blocks. For trainees beyond Delhi, a satellite stint here adds private-clinic and teleconsultation dimensions that a large institutional hospital rarely showcases.',
    faqs: [
      {
        question: 'Does Mind Grace host short-term observers similar to VIMHANS exposure programmes?',
        answer: 'Short observation attachments can be discussed for students and early-career clinicians, subject to consent and confidentiality protocols. Enquire with your intended dates and objectives; the clinic confirms what an observer may witness, what documentation they may review, and how participation is certified.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'National Forensic Sciences University, Delhi Campus',
    location: 'Rohini, Delhi',
    slug: 'nfsu-delhi-psychology-internship',
    type: 'Central University',
    rciPathway: true,
    logo: 'National_Forensic_Sciences_University_logo_Transparent.png',
    alt: 'NFSU logo',
    short: 'The specialist bridge between clinical psychology and the criminal-justice system, with an RCI-approved clinical route.',
    programs: [
      'B.A. / B.Sc. Psychology \u2013 3 years',
      'M.Sc. Clinical Psychology \u2013 2 years, RCI-approved',
      'M.Sc. Forensic Psychology \u2013 2 years',
      'M.A. Criminology with Forensic Psychology specialisation',
    ],
    syllabus: [
      'Forensic Psychology: investigative processes of the criminal justice system, elements involved in crime, forensic assessment techniques',
      'Clinical Psychology: RCI-approved clinical practice with a focus on forensic settings',
    ],
    practicum: [
      'Specialised fieldwork in criminal-justice ecosystems, forensic laboratories, or correctional facilities',
      'Behavioural profiling, legal psychology applications, and forensic diagnostic assessments',
    ],
    features: [
      'Highly specialised curriculum bridging clinical psychology with law and criminal justice',
      'Niche career pathways in forensic mental health',
    ],
    angle: 'Forensic careers still rest on sound clinical fundamentals. Mind Grace\u2019s de-addiction and comorbid-disorder caseload offers NFSU students ethically safe, non-sensational practice in risk-aware formulation, consent, and documentation \u2014 the paper trail matters as much in courtrooms as in clinics.',
    faqs: [
      {
        question: 'Can forensic-psychology students get relevant exposure at a general clinic?',
        answer: 'Yes, indirectly: substance-use presentations, aggression-related referrals, capacity questions, and meticulous documentation all build forensic-adjacent competence. Court-facing assessments themselves happen only through licensed forensic channels \u2014 a private clinic is the place to master the clinical groundwork first.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'GD Goenka University',
    location: 'Gurugram, Haryana',
    slug: 'gd-goenka-psychology-internship',
    type: 'Private University',
    rciPathway: true,
    logo: 'GD_Goenka_University_Logo_Transparent.webp',
    alt: 'GD Goenka University logo',
    short: 'A clear RCI licensure pipeline from a four-year B.Sc. Clinical through M.A. Clinical and a professional diploma.',
    programs: [
      'B.Sc. Clinical Psychology (Hons) \u2013 4 years, RCI-approved',
      'M.A. Clinical Psychology \u2013 2 years, RCI-approved',
      'Professional Diploma in Clinical Psychology \u2013 1 year, RCI-approved',
    ],
    syllabus: [
      'B.Sc. Clinical: clinical assessment, psychodiagnostics, basic counseling, therapeutic interventions, research methods',
      'M.A. Clinical: in-depth theory, practical clinical skills, supervised experience in diagnostics, psychotherapy, and rehabilitation',
    ],
    practicum: [
      'Rigorous supervised clinical training with direct casework and psychological testing',
      'Research in partnered clinical settings, including major hospital chains',
      'Training designed to ensure readiness for RCI registration',
    ],
    features: [
      'Strong industry collaborations',
      'Modern psychodiagnostic training labs',
      'Clear pathway to RCI licensure through approved programmes',
    ],
    angle: 'For Gurugram students willing to train east, Mind Grace delivers what corporate-adjacent campuses often lack: everyday clinical variety \u2014 anxious adolescents, depressed young professionals, families seeking rehabilitation support \u2014 handled in an unhurried outpatient rhythm.',
    faqs: [
      {
        question: 'Is crossing the NCR from Gurugram to Greater Noida practical for internships?',
        answer: 'It is a real commute, so treat it seriously: fewer, longer, fixed weekday blocks beat daily short visits. Many Gurugram students bundle such placements into semester breaks or intensive blocks, which also suits clinic scheduling around peak outpatient hours.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'O. P. Jindal Global University',
    location: 'Sonipat, Haryana',
    slug: 'jgu-sonipat-psychology-internship',
    type: 'Private University',
    logo: 'OP_Jindal_Global_University_logo_Transparent.png',
    alt: 'O. P. Jindal Global University logo',
    short: 'An interdisciplinary psychology school with specialisations from child and community psychology to psychosocial rehabilitation.',
    programs: [
      'B.A. / B.Sc. Psychology \u2013 3 years',
      'M.A. / M.Sc. Applied Psychology \u2013 2 years, specialisations in Child Psychology, Community Psychology, Forensic and Investigative Psychology, Industrial and Organizational Psychology, and Psychosocial Rehabilitation',
    ],
    syllabus: [
      'Applied and theoretical psychology, intervention strategies, ethical and legal considerations with children and diverse populations',
      'Blends psychology, education, and developmental science',
    ],
    practicum: [
      'Hands-on internships, industry certifications, and research-driven projects',
      'Facilitated by the Office of Career Services into international NGOs and corporate wellness programmes',
    ],
    features: [
      'Global outlook and interdisciplinary approach',
      'Strong emphasis on research and international academic collaborations',
    ],
    angle: 'JGU\u2019s Psychosocial Rehabilitation specialisation aligns closely with Mind Grace\u2019s neuropsychiatric focus \u2014 disability-adjusted counselling, family psychoeducation, and community reintegration planning for clients recovering from serious mental illness.',
    faqs: [
      {
        question: 'Which JGU specialisation aligns best with a neuropsychiatric clinic?',
        answer: 'Psychosocial Rehabilitation and Child Psychology fit most naturally: the clinic handles long-term recovery plans, family counselling, and developmental concerns. Community Psychology students can contribute to psychoeducation content and outreach design under supervision.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Jamia Hamdard',
    location: 'New Delhi',
    slug: 'jamia-hamdard-psychology-internship',
    type: 'Private Deemed University',
    logo: 'Jamia-Hamdard-University_Logo_Transparent.png',
    alt: 'Jamia Hamdard logo',
    short: 'A life-sciences powerhouse pairing clinical psychology with holistic and psychosomatic medicine perspectives.',
    programs: [
      'B.Sc. Clinical Psychology (Hons) \u2013 4 years',
      'M.Sc. Clinical Psychology \u2013 2 years',
      'M.Sc. Mental Health \u2013 2 years',
    ],
    syllabus: [
      'B.Sc.: psychological sciences, mental health, therapeutic interventions',
      'M.Sc. Clinical: psychopathology, psychometrics, counseling skills, advanced therapeutic approaches, hospital-based training with holistic health integration',
    ],
    practicum: [
      'Hospital-based training required by the programme',
      'Academic partnerships open clinical practice exposure in psychiatric and behavioural health settings',
    ],
    features: [
      'Integration of conventional clinical psychology with holistic and psychosomatic medicine',
      'Supported by strong medical-university infrastructure',
    ],
    angle: 'Hamdard\u2019s psychosomatic emphasis finds real-world expression at Mind Grace, where lifestyle illness, stress-mediated somatic complaints, and sleep disorders dominate the outpatient mix \u2014 ideal ground for trainees interested in the body-mind interface.',
    faqs: [
      {
        question: 'Does Mind Grace support Jamia Hamdard\u2019s hospital-based training requirement?',
        answer: 'Mind Grace is a private neuropsychiatric clinic, not a hospital ward. Whether it satisfies your specific hospital-training rule depends on your department\u2019s wording \u2014 send the requirement verbatim and the clinic will clarify what supervised outpatient experience it can document.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Maulana Azad Medical College',
    location: 'New Delhi',
    slug: 'mamc-delhi-psychiatry-internship',
    type: 'State Government Medical College',
    logo: 'Maulana_Azad_Medical_College_logo_Transparent.webp',
    alt: 'Maulana Azad Medical College logo',
    short: 'The government flagship whose MD Psychiatry residents learn consultation-liaison work at enormous patient volume.',
    programs: [
      'MD Psychiatry \u2013 3 years (medical degree)',
    ],
    syllabus: [
      'Psychology, anatomy, physiology, and biochemistry of the brain',
      'Neurology, neuroanatomy, neurophysiology, neurochemistry, neuroimaging, electrophysiology',
      'Psychoneuroendocrinology, psychoneuroimmunology, chronobiology, neurogenetics',
    ],
    practicum: [
      'Three-year residency split into pre-clinical, para-clinical, and clinical phases',
      'Extensive hands-on rotations in government hospital psychiatric wards, emergency psychiatry, and consultation-liaison services',
    ],
    features: [
      'Highly subsidised fees',
      'Unparalleled clinical exposure due to massive patient inflow',
      'Legacy of producing leading psychiatric professionals in India',
    ],
    angle: 'MAMC residents master acuity; the private outpatient world they meet after residency looks different \u2014 elective psychotherapy, long-term adherence, tele-follow-up. A Mind Grace attachment during leave or fellowship lets psychiatrists preview the continuum of care on the east side of the city.',
    faqs: [
      {
        question: 'Can psychiatry residents, not just psychologists, attach to Mind Grace?',
        answer: 'Yes, for observation, collaborative care, and referral-coordination learning. Residents must route requests through their department where duty rules apply, and any activity remains supervised and within their registration scope. The clinic particularly welcomes trainees interested in consultation-liaison style outpatient care.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'All India Institute of Medical Sciences',
    location: 'New Delhi',
    slug: 'aiims-delhi-psychology-internship',
    type: 'Central Government Medical Institute',
    logo: 'All_India_Institute_of_Medical_Sciences,_Delhi_logo_Transparent.webp',
    alt: 'AIIMS Delhi logo',
    short: 'India\u2019s premier medical institute, training psychiatrists and clinical psychologists at the highest research tempo.',
    programs: [
      'MBBS with Psychiatry rotations',
      'MD Psychiatry \u2013 3 years (medical)',
      'Ph.D. Clinical Psychology \u2013 3 to 5 years',
      'B.Sc. / M.Sc. Nursing with Mental Health specialisation',
    ],
    syllabus: [
      'MD Psychiatry: neuroanatomy, neurophysiology, neurochemistry, neuroimaging, psychoneuroendocrinology, comprehensive psychiatric training',
      'Ph.D. Clinical Psychology: specialisations such as substance use disorders with two years of supervised therapeutic work',
    ],
    practicum: [
      'Rigorous structured clinical residencies across psychiatric units',
      'Management of severe mental illness, addiction problems, and common mental disorders under expert faculty supervision',
    ],
    features: [
      'Premier medical institute in India',
      'Cutting-edge research facilities and extensive clinical exposure',
      'Highest level of academic prestige',
    ],
    angle: 'AIIMS sets the national standard for hospital psychiatry; Mind Grace illustrates the private-continuum counterpart \u2014 sustained outpatient therapy, addiction follow-up outside ward constraints, and teleconsultation reach \u2014 useful for researchers comparing systems of care east of the Yamuna.',
    faqs: [
      {
        question: 'Is a research collaboration between AIIMS scholars and Mind Grace feasible?',
        answer: 'Feasible with process discipline: a written protocol, institutional ethics approval, clear data-sharing terms, and patient-consent safeguards. Scholars studying substance use, digital mental health, or outcomes of outpatient psychotherapy have historically found private clinics valuable secondary data and recruitment settings.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Indira Gandhi National Open University',
    location: 'Regional Centre 47, Greater Noida',
    slug: 'ignou-psychology-internship',
    type: 'Central Open University',
    logo: 'Indira_Gandhi_National_Open_University_logo_Transparent.png',
    alt: 'IGNOU logo',
    short: 'The open-university giant whose MAPC programme turns working learners into assessed practitioners through a rigid practicum code.',
    programs: [
      'M.A. Psychology (MAPC) \u2013 2 years, Open and Distance Learning',
    ],
    syllabus: [
      'Year 1: MPCE-011 Psychopathology, MPCE-012 Psycho-diagnostics, MPCE-013 Psychotherapeutic Methods, MPCE-014 Practicum in Clinical Psychology, MPCE-015 Internship',
      'Curriculum emphasises converting theoretical knowledge into applied competence',
    ],
    practicum: [
      'Structured practicum mandate: MPCE-014 for Clinical, MPCE-024 for Counseling, or MPCE-035 for Organizational settings',
      'Supervised internship hours at a recognised facility with a detailed practicum notebook',
      'Psychological assessments conducted and a comprehensive internship report submitted',
    ],
    features: [
      'Unmatched flexibility for working professionals',
      'Highly structured practicum guidelines',
      'Widespread recognition across India',
    ],
    angle: 'IGNOU\u2019s Regional Centre 47 is literally in Greater Noida \u2014 its distance learners are Mind Grace\u2019s home turf. Working professionals doing MPCE-014/015 need a facility that schedules supervision around jobs: evening blocks and weekend assessments fit precisely because the clinic already runs teleconsultation-friendly hours.',
    faqs: [
      {
        question: 'What does an IGNOU MPCE-015 supervisor need to provide?',
        answer: 'IGNOU requires the internship to occur at a recognised facility under a qualified supervisor, evidenced by a practicum notebook, assessment records, and countersigned reports. Bring the latest MPCE project booklet to your first conversation so the clinic understands exactly which forms, signatures, and hour thresholds must be satisfied.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Gurugram University',
    location: 'Gurugram, Haryana',
    slug: 'gurugram-university-psychology-internship',
    type: 'State University',
    rciPathway: true,
    logo: 'Gurugram_University_Logo_Transparent.png',
    alt: 'Gurugram University logo',
    short: 'A state university offering the full RCI ladder \u2014 B.Sc., M.A., diploma, and M.Phil. \u2014 at state-university prices.',
    programs: [
      'B.Sc. Clinical Psychology \u2013 4 years, RCI-approved',
      'M.Sc. Psychology \u2013 2 years',
      'M.A. Clinical Psychology \u2013 2 years, RCI-approved',
      'Professional Diploma in Clinical Psychology \u2013 1 year, RCI-approved',
      'M.Phil. Clinical Psychology \u2013 2 years, RCI-approved',
    ],
    syllabus: [
      'M.A. Clinical: rigorous two-year coverage of assessment, diagnosis, and therapeutic interventions for mental-health disorders',
      'Extensive theoretical inputs paired with widespread clinical experience requirements',
    ],
    practicum: [
      'Extensive supervised internships in recognised mental-health establishments',
      'Clinical experience is a mandatory prerequisite for RCI registration as a clinical psychologist',
    ],
    features: [
      'Affordable state-university fees',
      'RCI-approved clinical training pathways',
      'Highly viable option for aspiring clinical psychologists',
    ],
    angle: 'RCI registration demands recognised-establishment hours, and Gurugram University\u2019s east-bound students find them here: structured outpatient exposure across neurosis, neuropsychiatric rehabilitation, and addiction services \u2014 documented to licensing standards.',
    faqs: [
      {
        question: 'Does interning at Mind Grace help with RCI registration paperwork?',
        answer: 'RCI recognises training undertaken at approved establishments under qualified supervisors. Mind Grace can document your supervised hours and activities properly, but you must verify with RCI and your university that the specific arrangement satisfies current registration rules \u2014 never assume; confirm in writing.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Noida International University',
    location: 'Yamuna Expressway, Greater Noida',
    slug: 'niu-greater-noida-psychology-internship',
    type: 'Private University',
    logo: 'Noida_International_university_Transparent.png',
    alt: 'Noida International University logo',
    short: 'An accessible private university on the Yamuna Expressway with clinical, counselling, and organisational tracks.',
    programs: [
      'B.A. (Hons) Psychology \u2013 3 years',
      'M.A. Applied Psychology \u2013 2 years, specialisations in Clinical, Counseling, and Organizational Psychology',
      'Ph.D. Psychology',
    ],
    syllabus: [
      'B.A. (Hons): fundamentals of psychology, developmental psychology, social psychology, cognitive processes, psychological testing',
      'M.A. Applied: focused tracks in clinical, counselling, and organisational domains',
    ],
    practicum: [
      'Fieldwork and internships are mandated',
      'Students connect with regional healthcare and educational institutions along the Yamuna Expressway for practical training and observational clinical hours',
    ],
    features: [
      'Accessible fee structure',
      'Dedicated departmental focus on applied psychology',
      'Growing infrastructure for practical training',
    ],
    angle: 'NIU sits squarely on the Yamuna Expressway growth spine, and Mind Grace is part of the healthcare layer that expressway corridor is building \u2014 convenient observational hours without the cross-NCR commute its students otherwise face.',
    faqs: [
      {
        question: 'How far is NIU from Mind Grace, practically?',
        answer: 'Both sit along the Greater Noida/Yamuna Expressway axis, making this one of the easiest long-distance commutes in the NCR internship map. Even so, book fixed supervision slots in advance \u2014 expressway traffic patterns reward planned visits over opportunistic ones.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Apeejay Stya University',
    location: 'Sohna, Gurugram',
    slug: 'apeejay-stya-psychology-internship',
    type: 'Private University',
    logo: 'Apeejay_Stya_University_Gurgaon_Haryana_Logo_Transparent.webp',
    alt: 'Apeejay Stya University logo',
    short: 'A liberal-arts-framed M.Sc. Applied Psychology with positive-psychology and medical-psychology emphases.',
    programs: [
      'M.Sc. Applied Psychology \u2013 2 years',
    ],
    syllabus: [
      'Semester 1: Advanced Social Psychology, Positive Psychology, Child Development, Medical Psychology, Theories of Personality, Statistics in Psychology, Psychological Testing',
      'Balances theoretical understanding with practical application',
    ],
    practicum: [
      'Supervised practicum required',
      'University connects students to educational institutions, healthcare centres, and community development organisations',
      'Field-based research options available',
    ],
    features: [
      'Liberal-arts framework allowing cross-disciplinary research electives alongside core psychology modules',
    ],
    angle: 'Apeejay\u2019s positive-psychology and medical-psychology modules translate well into Mind Grace\u2019s world: wellbeing programming for stressed professionals, and the psychology of living with chronic illness \u2014 both recurring themes in an east-NCR outpatient practice.',
    faqs: [
      {
        question: 'Can Apeejay students design a positive-psychology project during the practicum?',
        answer: 'Yes, with supervision and approvals. Gratitude, resilience, and wellbeing interventions are among the few areas where interns can sometimes co-deliver structured, manualised activities to consenting clients under close clinician oversight \u2014 discuss scope explicitly before designing anything.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'K. R. Mangalam University',
    location: 'Gurugram, Haryana',
    slug: 'kr-mangalam-psychology-internship',
    type: 'Private University',
    logo: 'KR_Manglam_University_Logo_Transparent.png',
    alt: 'KR Mangalam University logo',
    short: 'A contemporary, liberal-arts-oriented psychology school focused on behavioural research and modern therapy orientations.',
    programs: [
      'B.A. Psychology (Hons) \u2013 3 years',
      'M.A. Applied Psychology \u2013 2 years',
      'M.A. Clinical Psychology \u2013 2 years',
    ],
    syllabus: [
      'B.A. (Hons): Advanced Social Psychology, Biopsychology, Cognitive Psychology, Psychotherapeutic Intervention, modern clinical approaches',
      'M.A. programmes blend theory with real-world application \u2014 assessing behaviour, designing interventions, conducting research',
    ],
    practicum: [
      'Mandatory internships in final semesters',
      'Placement support for school counselling, corporate HR, and clinical settings',
    ],
    features: [
      'Modern, liberal arts-oriented psychology curriculum',
      'Focus on behavioural research methods and contemporary therapy orientations',
    ],
    angle: 'KRMU\u2019s psychotherapeutic-intervention syllabi are classroom-strong; Mind Grace supplies the session-room reality \u2014 observing how CBT, family counselling, and supportive therapy actually unfold with Indian clients, case by case.',
    faqs: [
      {
        question: 'Will KRMU credits transfer to an out-of-city clinic internship?',
        answer: 'Most departments approve external sites when supervision quality and documentation match their rubric. Obtain your internship guidelines, share them with Mind Grace ahead of time, and get the university\u2019s written nod before your first day \u2014 retroactive approval is the classic avoidable mistake.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'SGT University',
    location: 'Gurugram, Haryana',
    slug: 'sgt-university-psychology-internship',
    type: 'Private University',
    rciPathway: true,
    logo: 'Shree_Gobind_Singh_Tricentenary_Logo_Transparent.png',
    alt: 'SGT University logo',
    short: 'The widest RCI-approved programme basket in the region, run through a dedicated School of Behavioural Sciences.',
    programs: [
      'B.Sc. Clinical Psychology (Hons) \u2013 4 years, RCI-approved',
      'M.A. Applied Psychology \u2013 2 years',
      'M.Sc. Clinical Psychology \u2013 2 years, RCI-approved',
      'M.Phil. Clinical Psychology \u2013 2 years, RCI-approved',
      'Professional Diploma in Clinical Psychology \u2013 1 year',
      'Diploma in Psychotherapy and Counseling',
    ],
    syllabus: [
      'B.Sc. Clinical: abnormal psychology, cognitive processes, social psychology, clinical assessment',
      'M.Phil.: theoretical knowledge, practical and clinical skills, thesis training, professional attitudes development',
    ],
    practicum: [
      'Comprehensive practical and clinical skills training',
      'Thesis work plus supervised clinical rotations in behavioural-science and hospital settings',
    ],
    features: [
      'Extensive range of RCI-approved programmes',
      'Dedicated School of Behavioural Sciences',
      'Strong anti-stigma community engagement mission',
    ],
    angle: 'SGT\u2019s anti-stigma mission matches Mind Grace\u2019s outreach posture on the east side \u2014 interns can pair clinical rotations with psychoeducation content, awareness campaigns, and help-seeking research aimed at exactly the communities that delay treatment longest.',
    faqs: [
      {
        question: 'Can SGT thesis students collect data through Mind Grace?',
        answer: 'Possible, with an approved protocol. Thesis research needs faculty-guide sign-off, clinic permission, ethics clearance where applicable, and anonymised data handling. Topics on stigma, help-seeking, and digital mental health tend to fit an outpatient clinic\u2019s workflow best.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Central University of Haryana',
    location: 'Mahendragarh, Haryana',
    slug: 'central-university-haryana-psychology-internship',
    type: 'Central University',
    logo: 'Central_University_of_Haryana_logo_Transparent.png',
    alt: 'Central University of Haryana logo',
    short: 'A low-fee central university with a CBCS psychology master\u2019s anchored in research methods.',
    programs: [
      'M.A. Psychology \u2013 2 years, 40 seats',
      'Ph.D. Psychology',
    ],
    syllabus: [
      'Psychology of Cognitive and Affective Processes, Contemporary Issues of Social Psychology',
      'Psychological Research Methods, Advanced General Psychology, Physiological Psychology',
      'Research Methodology and Statistics under the Choice Based Credit System',
    ],
    practicum: [
      'Semester-long internship mandated',
      'Engagement with local government schools, NGOs, and district hospitals encouraged for field-based learning and community psychology',
    ],
    features: [
      'Central-university academic standards with minimal fees',
      'Pristine campus attracting students from across the NCR',
    ],
    angle: 'CUH\u2019s distance from the capital pushes students toward NCR internships during vacations. Mind Grace\u2019s research-friendly outpatient dataset \u2014 with consent \u2014 and its community-adjacent services give methodologically trained students something rare: clean, ethically collected real-world data.',
    faqs: [
      {
        question: 'A semester-long internship sounds long \u2014 is that flexible?',
        answer: 'Duration expectations vary by cohort. Mind Grace structures long attachments in phases: observation first, assisted documentation next, then a small supervised project. If your semester calendar differs, propose your dates and weekly availability; schedules are negotiated, not assumed.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Dr B. R. Ambedkar University Delhi',
    location: 'Kashmere Gate, New Delhi',
    slug: 'aud-psychology-internship',
    type: 'State University',
    logo: 'Ambedkar_University_Delhi_logo_Transparent.png',
    alt: 'Ambedkar University Delhi logo',
    short: 'The psychosocial flagship \u2014 classical psychoanalysis meets critical social-justice clinical studies.',
    programs: [
      'M.A. Psychology (Psychosocial Clinical Studies) \u2013 2 years, 53 seats',
      'Ph.D. Psychology',
    ],
    syllabus: [
      'Psychosocial and clinical studies with emphasis on contemporary mental-health issues',
      'Psychoanalysis, clinical interventions, and social-justice dimensions',
      'Gender and sexuality studies woven through the clinical curriculum',
    ],
    practicum: [
      'Community-based participatory research emphasis',
      'Practicums in NGOs, human-rights organisations, and progressive mental-health collectives',
    ],
    features: [
      'Globally recognised, distinctive curriculum',
      'Bridges classical psychoanalysis, modern clinical interventions, and critical social justice',
    ],
    angle: 'AUD\u2019s psychosocial lens thrives where distress meets inequality. East NCR\u2019s clinic serves exactly that seam \u2014 gender-distress presentations, workplace exploitation aftermath, and migrant-family adjustment \u2014 giving AUD interns reflective-space practice rather than checklist psychiatry.',
    faqs: [
      {
        question: 'Is Mind Grace compatible with AUD\u2019s psychosocial, non-pathologising approach?',
        answer: 'The clinic is diagnostically grounded yet routinely frames cases socially \u2014 occupation, family system, and precarity inform every formulation. AUD students often find the productive tension between medical and psychosocial registers itself the best lesson; discuss your reflective-practice goals in the first meeting.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'IIMT University',
    location: 'Meerut / NCR outreach, Uttar Pradesh',
    slug: 'iimt-university-psychology-internship',
    type: 'Private University',
    logo: '',
    alt: 'IIMT University emblem placeholder',
    short: 'A private university whose Manojoy wellness initiative puts counselling practice inside the campus itself.',
    programs: [
      'B.A. (Hons) Psychology \u2013 3 years',
      'M.A. Psychology \u2013 2 years',
    ],
    syllabus: [
      'Developmental psychology, cognitive psychology, social psychology',
      'Research methods and psychological assessment',
    ],
    practicum: [
      'Manojoy initiative: a dedicated emotional-wellness programme giving students practical counselling experience under faculty supervision within the university ecosystem',
      'Internal practicum environment complements external clinical attachments',
    ],
    features: [
      'Strong focus on student mental wellness',
      'Unique internal practicum environment for aspiring counsellors',
    ],
    angle: 'Manojoy builds campus-side confidence; Mind Grace completes the picture with out-of-campus reality \u2014 presenting problems that arrive without a counselor waiting down the corridor. IIMT\u2019s NCR-facing cohorts use the clinic for exactly that calibration.',
    faqs: [
      {
        question: 'Should IIMT students intern internally or externally?',
        answer: 'Ideally both. The Manojoy internal practicum develops basic listening and rapport skills in a supported setting; an external clinical attachment then tests those skills against real presentations, documentation duties, and referral boundaries. Sequence them \u2014 internal first, clinic second \u2014 if your handbook allows.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'IMS Ghaziabad',
    location: 'Ghaziabad, Uttar Pradesh',
    slug: 'ims-ghaziabad-psychology-internship',
    type: 'Private University',
    logo: 'Institute_of_Management_Studies_Ghaziabad_logo_Transparent.png',
    alt: 'Institute of Management Studies Ghaziabad logo',
    short: 'A management-first institution where psychology rides along with industrial and organisational insight.',
    programs: [
      'B.A. Psychology (Hons) \u2013 3 years',
      'M.A. Psychology \u2013 2 years',
    ],
    syllabus: [
      'Fundamentals of psychology, child psychology, developmental psychology',
      'Social psychology and research methodology',
    ],
    practicum: [
      'Semester-long internships facilitated in local schools, corporate HR departments, and counselling centres',
      'Supported by an active student psychology society',
    ],
    features: [
      'Strong management-school integration offering unique IO-psychology perspectives',
    ],
    angle: 'Across the river from Greater Noida\u2019s corporate belt, IMS students can hold both worlds in one term: workplace-wellbeing projects by day in Noida\u2019s offices, clinical grounding at Mind Grace for the human distress those wellness programmes are meant to prevent.',
    faqs: [
      {
        question: 'How does a business-school psychology student benefit from a clinical clinic?',
        answer: 'Occupational distress rarely stays occupational \u2014 insomnia, anxiety, low mood, and substance use walk in through the clinic door. Clinical literacy makes future HR and wellness practitioners far better at triage, referral, and designing humane policies than workplace-only training alone provides.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'PDM University',
    location: 'Bahadurgarh, Haryana',
    slug: 'pdm-university-psychology-internship',
    type: 'Private University',
    logo: 'PDM_University_delhi_logo_Transparent.webp',
    alt: 'PDM University logo',
    short: 'An affordable private university steering psychology students toward counselling and community-service careers.',
    programs: [
      'B.A. Psychology (Hons) \u2013 3 years',
      'M.A. Psychology \u2013 2 years',
    ],
    syllabus: [
      'Psychological research methods, cognitive psychology, child psychology',
      'Social psychology and guidance techniques',
    ],
    practicum: [
      'Mandatory fieldwork components',
      'Students placed in partnered social-welfare organisations or educational institutions for practical skill application',
    ],
    features: [
      'Affordable fee structure',
      'Focused preparation for careers in counselling and community service management',
    ],
    angle: 'PDM\u2019s guidance-and-counselling orientation needs supervised, client-facing hours to become real competence. Mind Grace\u2019s structured outpatient environment \u2014 intakes, family sessions, follow-ups \u2014 supplies the observational density that welfare-placement fieldwork alone cannot.',
    faqs: [
      {
        question: 'Does Mind Grace take students without a prior MoU with their university?',
        answer: 'Many placements proceed without formal MoUs when the student\u2019s department provides clear written requirements and the clinic agrees to a defined scope. What is non-negotiable: supervision arrangements, confidentiality undertakings, and an agreed documentation format before the first visit.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'MVN University',
    location: 'Palwal, Haryana',
    slug: 'mvn-university-psychology-internship',
    type: 'Private University',
    logo: 'mvn_university_logo_haryana_Transparent.png',
    alt: 'MVN University logo',
    short: 'A UGC and AICTE-approved university whose occupational-therapy programme intersects with rehabilitation psychology.',
    programs: [
      'B.A. Psychology \u2013 3 years',
      'M.A. Psychology \u2013 2 years',
      'Bachelor of Occupational Therapy (closely intersecting rehabilitation psychology)',
    ],
    syllabus: [
      'Core psychology, sociology, and guidance counselling',
      'Competencies in behavioural sciences and rehabilitation techniques',
    ],
    practicum: [
      'Supervised practical training required',
      'Coordinated through university tie-ups with regional healthcare and educational bodies',
    ],
    features: [
      'UGC and AICTE approved',
      'Occupational-therapy programme intersecting rehabilitation psychology',
    ],
    angle: 'Rehabilitation is where Mind Grace\u2019s \u201cneuropsychiatric\u201d prefix earns its keep: functional recovery planning, family training, and school re-entry after illness. MVN\u2019s OT-psychology blend finds a natural eastern anchor for exactly this kind of supervised exposure.',
    faqs: [
      {
        question: 'Can occupational-therapy and psychology students both attach to Mind Grace?',
        answer: 'Rehabilitation-flavoured attachments suit both, with different lenses: OT students focus on functional and daily-living goals, psychology students on assessment and counselling process. Scope, supervision, and permitted activities are set separately for each discipline in writing.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Government Institute of Medical Sciences',
    location: 'Kasna, Greater Noida',
    slug: 'gims-greater-noida-psychology-internship',
    type: 'State Government Medical Institute',
    logo: 'government_institute_of_medical_sciences_greater_noida_logo_Transparent.png',
    alt: 'Government Institute of Medical Sciences Greater Noida logo',
    short: 'The state\u2019s fast-expanding medical college serving Greater Noida\u2019s mental-health needs from Kasna.',
    programs: [
      'MBBS with Psychiatry rotations',
      'MD Psychiatry \u2013 3 years (medical)',
      'B.Sc. Nursing with Mental Health',
    ],
    syllabus: [
      'Department of Psychiatry training: neuroanatomy, neurophysiology, neurochemistry, psychopharmacology, comprehensive psychiatric diagnostics',
    ],
    practicum: [
      'Residents provide outpatient, inpatient, and consultation-liaison services',
      'Direct patient care, diagnostic evaluations, and collaborative work with psychology trainees from nearby institutions such as GBU',
    ],
    features: [
      'Rapidly expanding government medical infrastructure',
      'Strong commitment to Greater Noida\u2019s population mental health',
    ],
    angle: 'GIMS and Mind Grace serve the same district from opposite ends \u2014 government-bed psychiatry and private neuropsychiatric outpatient care. Trainees rotating between them see the full local continuum, from emergency admission to year-two community follow-up.',
    faqs: [
      {
        question: 'How do GIMS residents coordinate with private clinics like Mind Grace?',
        answer: 'Referral relationships are the practical form: residents learn where stable outpatients go for ongoing psychotherapy and rehabilitation, and clinics learn the public-system discharge pipelines. Student attachments follow the same mutual-interest logic \u2014 propose them through your HOD with a defined rotation plan.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'University of Delhi and Jamia Millia Islamia',
    location: 'Delhi',
    slug: 'du-jamia-psychology-internship',
    type: 'Government and Central Universities',
    logo: '',
    alt: '',
    short: 'Delhi\u2019s flagship university psychology departments, with strong foundations in experimental, applied, and research psychology.',
    programs: [
      'B.A. (Hons) / M.A. Psychology \u2013 University of Delhi departments',
      'B.A. (Hons) / M.A. Clinical and Applied Psychology \u2013 Jamia Millia Islamia',
      'M.Phil. and Ph.D. research programmes in psychology',
    ],
    syllabus: [
      'Experimental and cognitive psychology, statistics, and research methodology',
      'Applied, clinical, and counselling psychology electives at the postgraduate level',
      'Dissertation and journal-club based research training',
    ],
    practicum: [
      'Internships are often not formal course requirements \u2014 many students arrange summer placements independently with faculty support',
      'Confirm whether your intake mandates fieldwork hours or treats internships as optional enrichment',
      'Departmental societies and faculty networks frequently broker hospital, NGO, and school connections',
    ],
    features: [
      'Deep research culture and long academic legacy',
      'Extensive alumni networks across Indian clinical and corporate psychology',
    ],
    angle: 'DU and Jamia students studying west of the Yamuna can treat Greater Noida West as a deliberate east-side detour: smaller private clinics like Mind Grace give continuity-of-care outpatient exposure that large-government-hospital postings rarely offer within a short summer window.',
    faqs: [
      {
        question: 'Are internships compulsory for DU and Jamia psychology students?',
        answer: 'It varies by department, programme, and intake year. Some courses embed fieldwork; others leave internships to the student. Read your current handbook and ask your coordinator before assuming hours are required \u2014 or allowed to be arranged independently.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Government Post Graduate College, Noida and Pt. Jawahar Lal Nehru Government College, Faridabad',
    location: 'Noida and Faridabad',
    slug: 'government-colleges-noida-faridabad-psychology-internship',
    type: 'State Government Colleges',
    logo: '',
    alt: '',
    short: 'Affordable government colleges offering psychology degrees on both southern and eastern edges of the NCR.',
    programs: [
      'B.A. Psychology (3 years)',
      'M.A. Psychology (2 years)',
    ],
    syllabus: [
      'General and applied psychology foundations, developmental and social psychology',
      'Research methodology and statistical techniques at the postgraduate level',
    ],
    practicum: [
      'Internships are frequently independently arranged summer learning rather than formal requirements',
      'Faculty recommendation letters, attendance records, and approval of host institutions matter \u2014 ask early',
      'Hospitals, schools, and NGOs near campus are the usual placement pool',
    ],
    features: [
      'Minimal fees with UGC-affiliated degree recognition',
      'Local campuses reduce commute barriers for part-time fieldwork',
    ],
    angle: 'For Noida-side government college students, the eastward drift toward Greater Noida West clinics is a short commute; for Faridabad students it is a longer one \u2014 but either way, a private neuropsychiatric OPD adds clinical texture that general colleges cannot provide in-house.',
    faqs: [
      {
        question: 'Will a government college accept a private clinic like Mind Grace as an internship site?',
        answer: 'Acceptance depends entirely on your department\u2019s rules about recognised settings and supervisor qualifications. Obtain written approval from your college first, then share those exact requirements with the clinic so scope can be matched before hours begin.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'HRIT University',
    location: 'Ghaziabad, Uttar Pradesh',
    slug: 'hrit-ghaziabad-psychology-internship',
    type: 'Private University',
    logo: '',
    alt: '',
    short: 'A Ghaziabad private university whose psychology courses lean on research statistics, cognitive processes, and behavioural analysis.',
    programs: [
      'B.A. (Hons) Psychology (3 years)',
      'M.A. Psychology (2 years)',
    ],
    syllabus: [
      'Cognitive psychology, behavioural analysis, and research statistics',
      'Applied psychology electives and project-based coursework',
    ],
    practicum: [
      'Practical training projects and fieldwork may count toward credits \u2014 verify which activities qualify for your intake',
      'Local school, NGO, and corporate placements are common; confirm assessment formats with your department',
    ],
    features: [
      'Ghaziabad location places students minutes from the Yamuna corridor into east NCR clinical settings',
    ],
    angle: 'HRIT sits in Ghaziabad, directly across the river from Greater Noida West \u2014 one of the shortest commutes in this directory to a dedicated neuropsychiatric OPD, making weekly supervised observation logistically realistic even alongside full coursework.',
    faqs: [
      {
        question: 'Does HRIT count clinic observation hours toward its internship credits?',
        answer: 'Check your programme handbook for what qualifies as practical training \u2014 some intakes require active assistance and documented deliverables, not passive observation. Get the criteria in writing from your coordinator before approaching any clinic.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'IILM University, Gurugram',
    location: 'Gurugram, Haryana',
    slug: 'iilm-gurugram-psychology-internship',
    type: 'Private University',
    logo: '',
    alt: '',
    short: 'The Gurugram campus of IILM offering psychology and applied-psychology study with an experiential emphasis.',
    programs: [
      'B.A. (Hons) Psychology',
      'M.A. / M.Sc. Applied Psychology routes',
    ],
    syllabus: [
      'Applied psychology core with assessment and research components',
      'Experiential learning modules tied to field projects',
    ],
    practicum: [
      'Confirm whether opportunities are observational, research-based, or supervised practice',
      'Schools, corporate wellness, and clinical settings each carry different documentation expectations',
    ],
    features: [
      'Strong placement-support culture bridging psychology and management ecosystems',
    ],
    angle: 'Gurugram is the far southwest corner of this directory \u2014 students making the cross-NCR trip east should choose the commute deliberately: a single well-documented clinic rotation in Greater Noida West can anchor an otherwise corporate-heavy portfolio with genuine psychopathology exposure.',
    faqs: [
      {
        question: 'Is it worth commuting from Gurugram to a Greater Noida clinic for an internship?',
        answer: 'Only if your learning goals are clinical. Gurugram offers excellent corporate and counselling exposure locally; the east-NCR trip pays off specifically when you need outpatient psychopathology, rehabilitation, or de-addiction cases that your home city placements rarely surface.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'IILM University',
    location: 'Greater Noida and Gurugram',
    slug: 'iilm-university-psychology-internship',
    type: 'Private University',
    logo: '',
    alt: '',
    short: 'IILM\u2019s broader university footprint spanning Greater Noida and Gurugram campuses with applied-psychology tracks.',
    programs: [
      'B.A. (Hons) Psychology',
      'M.A. Applied Psychology with specialisation options',
    ],
    syllabus: [
      'Applied psychology, assessment, research methods, and experiential learning',
      'Later-semester internship components varying by campus and intake',
    ],
    practicum: [
      'Ask how fieldwork, laboratory learning, and later-semester internships are documented for your specific campus',
      'Verify permitted activities and supervisor qualification requirements before accepting a placement',
    ],
    features: [
      'Two-campus network gives students choice between west and east NCR placement pools',
    ],
    angle: 'Greater Noida campus IILM students are already on the east side \u2014 pairing them with a nearby neuropsychiatric OPD removes the commute problem entirely and frees hours for actual supervised contact instead of travel.',
    faqs: [
      {
        question: 'Which IILM campus rules apply to my internship?',
        answer: 'Campus-specific handbooks differ. Confirm credit counts, approved settings, and evaluation formats with your own campus\u2019s department office \u2014 never assume the other campus\u2019s rules transfer.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Lovely Professional University (MEERZ Institute of Behavioural and Allied Sciences)',
    location: 'Phagwara, Punjab (with NCR field-placement networks)',
    slug: 'lingayas-faridabad-psychology-internship',
    type: 'Private University \u2013 Dedicated Behavioural Science Institute',
    logo: '',
    alt: '',
    short: 'A large private university with a dedicated behavioural-science institute whose students routinely seek NCR clinical placements.',
    programs: [
      'B.A. (Hons) Psychology / B.Sc. Psychology',
      'M.A. / M.Sc. Clinical and Organisational Psychology',
      'Integrated M.Phil./Ph.D. research routes',
    ],
    syllabus: [
      'Core psychology, clinical assessment, and counselling skill sequences',
      'Research methodology, statistics, and dissertation work',
    ],
    practicum: [
      'Clinical attachments are commonly completed away from the main campus during designated semesters',
      'Students must confirm hour requirements, supervisor qualifications, and report formats in writing',
    ],
    features: [
      'One of India\u2019s largest psychology student cohorts, with an established NCR placement culture',
    ],
    angle: 'Students doing their NCR-phase posting can use the east-side window deliberately: while peers cluster around west-Delhi hospitals, Greater Noida West clinics offer shorter queues, more observation slots per week, and continuity with the same patients across a posting.',
    faqs: [
      {
        question: 'Can out-of-state university students complete NCR clinic internships?',
        answer: 'Yes, provided your university formally recognises the setting and the clinic agrees in writing. Plan for logistics \u2014 accommodation, duration, and documentation timelines \u2014 before committing to an out-of-state placement.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'Maharaja Risi Vidhyashram Institute of Research and Development (MRIIRS)',
    location: 'Faridabad, Haryana',
    slug: 'mriirs-psychology-internship',
    type: 'Private Institute',
    logo: '',
    alt: '',
    short: 'A research-and-development oriented institute whose psychology trainees look outward to NCR clinical sites for field exposure.',
    programs: [
      'Psychology and allied behavioural-science programmes',
      'Research projects and field-training components',
    ],
    syllabus: [
      'Research methodology with applied behavioural-science coursework',
      'Project-based learning and publication-oriented training',
    ],
    practicum: [
      'Field placements are typically arranged with partner hospitals, clinics, and NGOs outside the home campus',
      'Confirm what counts as supervised hours versus research assistance under your current scheme',
    ],
    features: [
      'Research-forward culture suited to students aiming at M.Phil./Ph.D. pathways',
    ],
    angle: 'Faridabad-to-Greater-Noida is a diagonal NCR crossing, so trainees should bundle their time: combine clinic observation with a data-collection research project so the long commute yields both practicum hours and thesis material.',
    faqs: [
      {
        question: 'Can a clinic internship double as MRIIRS research-fieldwork?',
        answer: 'Often yes \u2014 retrospective record reviews, outcome-audit projects, and awareness-programme evaluations can satisfy research components while counting toward supervised hours. Propose the dual purpose explicitly so both your department and the clinic approve the same scope.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'National Institute of Construction Management and Research / NICFS Rohini Psychology Track',
    location: 'Rohini, Delhi',
    slug: 'nicfs-rohini-psychology-internship',
    type: 'Specialised Training Centre',
    logo: '',
    alt: '',
    short: 'A north-west Delhi training centre whose psychology-track students explore counselling and forensic-adjacent fieldwork options.',
    programs: [
      'Counselling and applied-psychology diploma and certificate tracks',
      'Short-term field exposure and workshop components',
    ],
    syllabus: [
      'Counselling fundamentals, listening skills, and ethical frameworks',
      'Introductory psychopathology and referral-limbic awareness content',
    ],
    practicum: [
      'Short-duration placements dominate \u2014 match your hours target to realistic weekly availability',
      'Verify whether certificates from the centre require specific host-institution categories',
    ],
    features: [
      'Flexible short-course formats suited to working professionals adding field hours',
    ],
    angle: 'From Rohini, east-NCR clinics sit at the opposite edge of the city \u2014 students should negotiate block-scheduled rotations (concentrated weeks rather than daily commutes) so a short diploma posting stays feasible alongside the long cross-city journey.',
    faqs: [
      {
        question: 'Do block internships suit short-course students better than weekly ones?',
        answer: 'Usually yes for two-to-six-week certificate tracks: concentrated daytime blocks maximise observed sessions per travel day. Agree the block calendar in advance with both your centre and the clinic, and keep a signed schedule copy for your documentation file.',
      },
      ...FAQ_BASE,
    ],
  },
  {
    institution: 'GS Medical College and Hospital',
    location: 'Ghaziabad, Uttar Pradesh',
    slug: 'gs-medical-college-psychiatry-internship',
    type: 'Private Medical College',
    logo: 'GS_Medical_College_and_Hospital_Ghaziabad_Logo_Transparent.webp',
    alt: 'GS Medical College and Hospital Ghaziabad logo',
    short: 'A private medical college focused on psychopharmacology-strong psychiatric clinicians.',
    programs: [
      'MBBS with Psychiatry rotations',
      'MD Psychiatry \u2013 3 years (medical)',
    ],
    syllabus: [
      'Nature, causes, and classifications of mental disorders',
      'Psychiatric evaluations and exposure to various psychotherapy techniques',
    ],
    practicum: [
      'Practical and clinical skills training alongside theoretical knowledge',
      'Supervised rotations in psychiatric evaluation and psychotherapy techniques within the hospital network',
    ],
    features: [
      'Dedicated focus on competent psychiatric clinicians',
      'Strong foundations in psychopharmacology and behavioural medicine',
    ],
    angle: 'From Ghaziabad to Greater Noida is a short hop across the Yamuna \u2014 GS residents round out hospital psychiatry with the private-practice half of the profession: long-term outcome tracking, combined pharmacotherapy-plus-psychotherapy cases, and tele-follow-up routines.',
    faqs: [
      {
        question: 'Do MBBS students, not just residents, benefit from clinic attachments?',
        answer: 'Yes \u2014 late-year MBBS students choosing psychiatry careers gain disproportionately from outpatient observation, where diagnosis evolves over visits rather than in a single ward round. Attachments depend on your college\u2019s elective/vacation internship rules; bring those rules to the first conversation.',
      },
      ...FAQ_BASE,
    ],
  },
];

export function getInstituteProfile(slug: string): InstituteProfile | undefined {
  return INSTITUTE_PROFILES.find((profile) => profile.slug === slug);
}
