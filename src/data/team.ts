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
    role: 'Full-stack engineer',
    bio: 'Sole engineer on a campus food-ordering platform in production on the App Store and Google Play. Builds Flutter and React Native clients, AWS serverless and Postgres backends, and the pipelines that ship them.',
    github: 'https://github.com/kdgbduyu28',
    email: 'timothyborja28@gmail.com',
  },
];

export const memberById = (id: string) => TEAM.find((m) => m.id === id);
