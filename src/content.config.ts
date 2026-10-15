import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per project in src/content/projects. The file name is the URL.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string(),
      summary: z.string(),
      year: z.number(),
      status: z.enum(['In production', 'Live', 'Pre-launch', 'In progress', 'Source only']),
      order: z.number(),
      featured: z.boolean().default(false),
      // How the project is shown: a live app in a phone or browser frame, or a built-in visual.
      demo: z.discriminatedUnion('kind', [
        z.object({ kind: z.literal('phone'), url: z.url() }),
        z.object({ kind: z.literal('browser'), url: z.url() }),
        z.object({ kind: z.literal('clinic-mock') }),
        z.object({ kind: z.literal('agent-graph') }),
        // An architecture diagram: one row per layer, boxes left to right.
        z.object({
          kind: z.literal('layers'),
          rows: z.array(
            z.object({
              label: z.string(),
              items: z.array(z.object({ name: z.string(), note: z.string().optional() })),
              emphasis: z.boolean().default(false),
            }),
          ),
        }),
      ]),
      accent: z.string(), // CSS color for the project's cover
      // Real screenshot of the app, relative to the Markdown file.
      screenshot: image().optional(),
      live: z.url().optional(),
      repo: z.url().optional(),
      // Any other links (second repo, app stores), shown with the live and repo buttons.
      links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
      team: z.array(z.string()).default(['tim']),
      role: z.string(),
      stack: z.array(z.string()),
      // Each skill listed here links back to this project in the Skills section.
      skills: z.array(z.string()),
      highlights: z.array(z.string()),
      stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    }),
});

export const collections = { projects };
