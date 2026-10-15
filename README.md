# Portfolio

Tim Borja's portfolio site: case studies with live demos, work history, skills tied to the projects that prove them, the résumé and technical portfolio as PDFs, and a contact form.

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
| Name, headline, email, GitHub, LinkedIn, PDF links | `src/data/site.ts` |
| Work history and education | `src/data/experience.ts` |
| Team members | `src/data/team.ts` |
| A project's case study | `src/content/projects/<slug>.md` (file name = URL) |
| Skills list and their groups | `src/data/projects.ts` (`SKILL_GROUPS`) |
| Colours and fonts | `src/styles/global.css` |
| Contact form email sending | `functions/api/contact.ts` |

### Adding a project

Copy one of the files in `src/content/projects/`, change the frontmatter, and write the story below it. The schema is in `src/content.config.ts`. `demo.kind` picks how it is shown:

- `phone` with a `url`: the live app in a phone frame, behind a "Try it live" button. Add a `screenshot` (390×844 at 2×, in `src/assets/projects/`) for the poster.
- `layers`: an architecture diagram, one row per layer (see `food-delivery-platform.md`).
- `clinic-mock` / `agent-graph`: drawn visuals for projects that can't be embedded.

A project's `skills` must use the names in `SKILL_GROUPS` to show up under that skill. `team` lists member ids from `src/data/team.ts`.

### Health platform data

The Clinic Platform is shown with a drawn mock-up (`src/components/ClinicMock.astro`). Every name and record in it is made up. Never put screenshots of the live system here.

### Résumé and portfolio PDFs

`public/resume.pdf` and `public/portfolio.pdf` are the downloadable versions. Short links to share: `/resume` and `/portfolio` (set in `public/_redirects`).

To update one, replace the file and redeploy; keep the file names. Clear `resume` or `portfolio` in `src/data/site.ts` to hide its buttons.

The Experience section on the home page (`src/data/experience.ts`) is copied from the résumé, so update both together.

## Contact form

Spam protection, checked on the server in this order (`functions/api/contact.ts`):

1. **Honeypot:** a hidden field only bots fill in.
2. **Time on the form:** anything sent under 3 seconds after the page loaded is dropped.
3. **Cloudflare Turnstile:** the "Verify you are human" check, re-verified with Cloudflare on every message.

Messages caught by 1 or 2 get a fake "sent" reply, so bots learn nothing. If sending fails, the visitor keeps their text and gets an "Email it instead" button that opens their mail app with the message filled in.

Until a Turnstile site key is set, the contact page shows an email button instead of the form.

### Turning it on

1. **Turnstile widget.** Cloudflare dashboard → Turnstile → Add widget. Hostnames: `timothy-borja.pages.dev` and `localhost`. Widget mode: **Managed**. You get a site key and a secret key.
2. **Resend.** Sign up at [resend.com](https://resend.com) with the inbox that should receive messages, and create an API key (sending access is enough). Without a verified domain, Resend only sends to that sign-up address, which is all this form needs.
3. **Site key** (public; it ends up in the page HTML): put it in `.env` as `PUBLIC_TURNSTILE_SITE_KEY=…` (see `.env.example`).
4. **Secrets**, stored in Cloudflare. Run each and paste the value when asked:

   ```bash
   npx wrangler pages secret put TURNSTILE_SECRET_KEY --project-name timothy-borja
   npx wrangler pages secret put RESEND_API_KEY --project-name timothy-borja
   npx wrangler pages secret put CONTACT_TO --project-name timothy-borja
   npx wrangler pages secret put CONTACT_FROM --project-name timothy-borja
   ```

   `CONTACT_TO` is your Resend sign-up email. `CONTACT_FROM` is `Portfolio <onboarding@resend.dev>`, or an address on your own domain once it's verified in Resend.
5. **Redeploy:** `./scripts/release.sh`.

Messages arrive with Reply-To set to the visitor, so hitting reply answers them.

### Testing locally

Cloudflare's test keys always pass: build with `PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA npm run build`, put `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` and the other three values in `.dev.vars`, then run `npx wrangler pages dev dist`.

## Deploy

```bash
./scripts/release.sh              # build + deploy to Cloudflare Pages
./scripts/release.sh --no-deploy  # build only
```

The Pages project is `timothy-borja` (override with `PAGES_PROJECT=…`), served at https://timothy-borja.pages.dev. If you rename it or add a custom domain, update `url` in `src/data/site.ts` and the sitemap line in `public/robots.txt`.
