// Work history, from the résumé (public/resume.pdf). Keep the two in step when either changes.
// `project` links an entry to its case study in src/content/projects.

export type Job = {
  title: string;
  org: string;
  period: string;
  context?: string;
  points: string[];
  project?: string;
};

export const EXPERIENCE: Job[] = [
  {
    title: 'Independent Full-Stack Developer',
    org: 'Contractor',
    period: 'Dec 2022 – Present',
    context: 'Campus food-ordering and delivery marketplace · 4 native apps + 2 web portals · 9 campuses',
    project: 'food-delivery-platform',
    points: [
      'REST and GraphQL over dozens of AWS Lambda services, with EventBridge and Step Functions workflows on DynamoDB.',
      'Stripe Connect payments, payouts and deposit holds, plus two campus meal-plan processors with split tender. Found and eliminated a production double-charge caused by retries regenerating the idempotency key.',
      'Traced about 4 million promotion reads a day to a client loop and fixed it server-side; added a tiered Google Maps cache.',
      'One-command releases of four apps to TestFlight, the App Store and Google Play, with CI/CD and Slack alerts.',
    ],
  },
  {
    title: 'Sole engineer, clinic management SaaS',
    org: 'D-Touch Health Platform · business project',
    period: 'Jan 2024 – Present',
    context: '4 React Native Web apps · Supabase / PostgreSQL · pre-launch, running on test data',
    project: 'clinic-platform',
    points: [
      'Many clinics on one Supabase backend; no app server: 77 RLS policies, 100+ PL/pgSQL functions and 660+ checks for tenant isolation.',
      'Exclusion constraints make double-booking impossible.',
      'Booking board, tooth charting, billing with GCash / QR Ph, CSV import with dry-run and undo, and a trigger-based audit log. 187 Vitest tests.',
    ],
  },
  {
    title: 'Mobile App Developer (Flutter)',
    org: 'Achieve Without Borders',
    period: 'Aug 2022 – Nov 2022',
    points: [],
  },
];

export const EDUCATION = {
  degree: 'BS Electronics Engineering',
  school: 'San Sebastian College Recoletos de Cavite',
  period: '2012 – 2017',
};
