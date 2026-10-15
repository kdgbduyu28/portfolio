import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort((a, b) => a.data.order - b.data.order);
}

// Skills shown on the home page. Each one lists the projects whose `skills` include its name,
// so a skill with no project behind it simply doesn't appear.
export const SKILL_GROUPS: { title: string; skills: { name: string; blurb: string }[] }[] = [
  {
    title: 'Mobile & frontend',
    skills: [
      { name: 'Flutter & Dart', blurb: 'Native iOS and Android apps in production, with Riverpod, Provider and BLoC.' },
      { name: 'React Native & Expo', blurb: 'One codebase for web, Android and iOS, with Expo Router.' },
      { name: 'TypeScript', blurb: 'Typed end to end, from database rows to screens.' },
      { name: 'Product design', blurb: 'Flows, layouts and copy that work on a phone, a tablet and a desktop.' },
    ],
  },
  {
    title: 'Backend & cloud',
    skills: [
      { name: 'AWS serverless', blurb: 'Lambda, API Gateway, AppSync, Step Functions, EventBridge and DynamoDB.' },
      { name: 'Node.js & GraphQL', blurb: 'REST and GraphQL APIs over dozens of services.' },
      { name: 'Payments (Stripe Connect)', blurb: 'Split tender, payouts, deposit holds, refunds and disputes, to the cent.' },
      { name: 'Supabase & PostgreSQL', blurb: 'Schemas, migrations, PL/pgSQL, triggers and full-text search.' },
      { name: 'Database security (RLS)', blurb: 'Many tenants on one database, kept apart by the database itself.' },
    ],
  },
  {
    title: 'Data & AI',
    skills: [
      { name: 'Python data pipelines', blurb: 'Turning PDFs, CSVs and messy sites into clean, versioned data.' },
      { name: 'AI agents & LLMs', blurb: 'LangGraph agents on Claude that check their own work.' },
      { name: 'Search & retrieval', blurb: 'Hybrid vector and keyword search, re-ranking, measured with evals.' },
    ],
  },
  {
    title: 'Delivery & operations',
    skills: [
      { name: 'App Store & Play releases', blurb: 'fastlane and EAS builds, TestFlight and store releases in one command.' },
      { name: 'CI/CD & automation', blurb: 'GitHub Actions that test, fetch data and deploy on a schedule.' },
      { name: 'Testing', blurb: 'Vitest, pytest and database test suites that run on every change.' },
      { name: 'Cloudflare', blurb: 'Pages hosting, Functions and Turnstile bot protection.' },
    ],
  },
];

export function projectsWithSkill(projects: Project[], skill: string) {
  return projects.filter((p) => p.data.skills.includes(skill));
}
