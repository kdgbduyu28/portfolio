# Portfolio

Our project showcase: live demos, case studies, skills tied to the projects that prove them, the team, and a contact form.

Built with [Astro](https://astro.build) and Tailwind CSS 4. Every page is static HTML, so it's fast and search engines can read it. The contact form is the only server code: one Cloudflare Pages Function.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npx astro check    # type check
```

## Where things live

| To change… | Edit |
|---|---|
| Name, headline, email, GitHub, LinkedIn, résumé link | `src/data/site.ts` |
| Team members | `src/data/team.ts` |
| A project's case study | `src/content/projects/<slug>.md` (file name = URL) |
| Skills list and their groups | `src/data/projects.ts` (`SKILL_GROUPS`) |
| Colours and fonts | `src/styles/global.css` |
| Contact form email sending | `functions/api/contact.ts` |

### Adding a project

Copy one of the files in `src/content/projects/`, change the frontmatter, and write the story below it. The schema is in `src/content.config.ts`. `demo.kind` picks how it is shown:

- `phone` with a `url`: the live app in a phone frame, behind a "Try it live" button. Add a `screenshot` (390×844 at 2×, in `src/assets/projects/`) for the poster.
- `clinic-mock` / `agent-graph`: drawn visuals for projects that can't be embedded.

A project's `skills` must use the names in `SKILL_GROUPS` to show up under that skill. `team` lists member ids from `src/data/team.ts`.

### Health platform data

The Clinic Platform is shown with a drawn mock-up (`src/components/ClinicMock.astro`). Every name and record in it is made up. Never put screenshots of the live system here.

### Résumé

Put the PDF at `public/resume.pdf` and set `resume: '/resume.pdf'` in `src/data/site.ts`. The buttons appear on their own.

## Contact form

Without a Turnstile site key the contact page shows an email button instead of the form. To turn the form on:

1. **Turnstile:** in the Cloudflare dashboard, add a Turnstile widget for the site's domain (and `localhost`). Put the site key in `.env` as `PUBLIC_TURNSTILE_SITE_KEY` (see `.env.example`). It's read at build time.
2. **Resend:** create an API key at [resend.com](https://resend.com). To send from your own address, verify a domain there. Without one, `onboarding@resend.dev` can only send to your Resend account's email.
3. **Cloudflare Pages → Settings → Variables and secrets**, add:
   - `TURNSTILE_SECRET_KEY`
   - `RESEND_API_KEY`
   - `CONTACT_TO` (your inbox)
   - `CONTACT_FROM` (e.g. `Portfolio <onboarding@resend.dev>`)

Messages arrive with Reply-To set to the visitor, so hitting reply answers them.

To test the function locally: `npm run build && npx wrangler pages dev dist` (put the secrets in `.dev.vars`).

## Deploy

```bash
./scripts/release.sh              # build + deploy to Cloudflare Pages
./scripts/release.sh --no-deploy  # build only
```

The Pages project is `tim-borja` (override with `PAGES_PROJECT=…`), served at https://tim-borja.pages.dev. If you rename it or add a custom domain, update `url` in `src/data/site.ts` and the sitemap line in `public/robots.txt`.
