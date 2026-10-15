import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Drawn screens (src/components/mocks) for projects with no public screenshots.
export const MOCKS = [
  'food-tracking',
  'food-rider',
  'food-merchant',
  'clinic-patient',
  'clinic-day',
  'clinic-board',
  'groundwork-chat',
  'groundwork-graph',
] as const;

export const GLYPHS = ['food', 'tooth', 'peso', 'bag', 'graph'] as const;

// One Markdown file per project in src/content/projects. The file name is the URL.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortName: z.string(), // label under the app icon
      tagline: z.string(),
      summary: z.string(),
      category: z.string(), // e.g. "Food & Drink · Marketplace"
      year: z.number(),
      status: z.enum(['In production', 'Live', 'Pre-launch', 'In progress', 'Source only']),
      order: z.number(),
      featured: z.boolean().default(false),
      platforms: z.array(z.enum(['iOS', 'Android', 'Web'])),

      // App icon: a real image, or a drawn glyph on the accent colour.
      iconImage: image().optional(),
      glyph: z.enum(GLYPHS).optional(),
      accent: z.string(), // CSS colour: icon, cover and highlights

      // What the screens are shown in, and the screens themselves (real screenshots or drawn mocks).
      device: z.enum(['phone', 'tablet', 'browser']),
      screens: z.array(
        z.object({
          image: image().optional(),
          mock: z.enum(MOCKS).optional(),
          caption: z.string(),
          device: z.enum(['phone', 'tablet', 'browser']).optional(), // overrides the project's device
          // Phone status bar behind a screenshot: a CSS background matching the screenshot's top edge.
          bar: z.string().optional(),
          barText: z.enum(['light', 'dark']).default('dark'),
        }),
      ),
      // The live web build can run inside a phone frame.
      embed: z.boolean().default(false),

      // Optional architecture diagram: one row per layer.
      architecture: z
        .array(
          z.object({
            label: z.string(),
            items: z.array(z.object({ name: z.string(), note: z.string().optional() })),
            emphasis: z.boolean().default(false),
          }),
        )
        .optional(),

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
