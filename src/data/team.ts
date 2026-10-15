// One entry per person. `id` is what a project's `team` list refers to.
// Leave a link empty to hide it.

export type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string; // path under public/, e.g. '/team/tim.jpg'; initials are shown without one
  github?: string;
  linkedin?: string;
  email?: string;
};

export const TEAM: Member[] = [
  {
    id: 'tim',
    name: 'Tim Borja',
    role: 'Full-stack & mobile developer',
    bio: 'Builds React Native and web apps, Supabase/Postgres backends, Python data pipelines and LLM agents, and ships them to production.',
    github: 'https://github.com/kdgbduyu28',
    email: 'timothyborja28@gmail.com',
  },
];

export const memberById = (id: string) => TEAM.find((m) => m.id === id);
