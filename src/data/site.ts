// Everything a visitor sees about who we are and how to reach us.
// Edit here; pages read from this file.

export const SITE: Record<
  'url' | 'name' | 'title' | 'description' | 'headline' | 'intro' | 'location' | 'availability' | 'email' | 'github' | 'linkedin' | 'resume',
  string
> = {
  // Change after the first Cloudflare deploy (or when a custom domain is added).
  url: 'https://tim-borja.pages.dev',
  name: 'Tim Borja',
  title: 'Tim Borja · Apps, data and AI, built and shipped',
  description:
    'Mobile and web apps, data pipelines and AI agents built in the Philippines. Live demos, case studies and contact.',
  headline: 'We build apps people can actually open.',
  intro:
    'Mobile and web apps, data pipelines and AI agents, built end to end and shipped live. Every project here has a working demo or its source code, so you can try it before you read about it.',
  location: 'Philippines',
  availability: 'Open to freelance projects and full-time roles',
  email: 'timothyborja28@gmail.com',
  github: 'https://github.com/kdgbduyu28',
  linkedin: '', // e.g. 'https://www.linkedin.com/in/…' (left empty to hide)
  // Put a PDF at public/resume.pdf and set this to '/resume.pdf' to show the button.
  resume: '',
};

export const NAV = [
  { href: '/projects', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#team', label: 'Team' },
  { href: '/contact', label: 'Contact' },
] as const;
