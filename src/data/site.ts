// Everything a visitor sees about who we are and how to reach us.
// Edit here; pages read from this file.

type SiteKey =
  | 'url'
  | 'name'
  | 'fullName'
  | 'role'
  | 'title'
  | 'description'
  | 'headline'
  | 'intro'
  | 'location'
  | 'availability'
  | 'email'
  | 'github'
  | 'linkedin'
  | 'resume'
  | 'portfolio';

export const SITE: Record<SiteKey, string> = {
  // Change after the first Cloudflare deploy (or when a custom domain is added).
  url: 'https://timothy-borja.pages.dev',
  name: 'Tim Borja',
  fullName: 'Timothy Maersk M. Borja',
  role: 'Full-stack engineer',
  title: 'Tim Borja · Full-stack engineer: mobile, web and serverless',
  description:
    'Full-stack engineer in the Philippines building production mobile apps, web platforms and AWS serverless backends. Case studies, live demos, résumé and contact.',
  headline: 'Production apps, from the phone to the database.',
  intro:
    "Full-stack engineer with 4+ years shipping web and mobile systems: Flutter and React Native clients, AWS serverless and Postgres backends, payments, and the release pipeline. Most of what's here is live, so you can try it before you read about it.",
  location: 'Cavite, Philippines',
  availability: 'Available for contract or direct work · remote worldwide',
  email: 'timothyborja28@gmail.com',
  github: 'https://github.com/kdgbduyu28',
  linkedin: '', // e.g. 'https://www.linkedin.com/in/…' (left empty to hide)
  // PDFs in public/. Short links /resume and /portfolio point at them (public/_redirects).
  // Set to '' to hide the buttons.
  resume: '/resume.pdf',
  portfolio: '/portfolio.pdf',
};

export const NAV = [
  { href: '/projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
] as const;
