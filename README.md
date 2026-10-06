# Interior Design Studio & School by JTG — website

Website for **Jemma Ter-Grigoryan**, her interior design studio and her interior design school in Yerevan
(Koryun St. 21, Kentron).

- Studio — [@interior_design_by_jtg](https://www.instagram.com/interior_design_by_jtg/)
- Founder — [@jemmatergrigoryan](https://www.instagram.com/jemmatergrigoryan/)
- School — [@interior_design_school_by_jtg](https://www.instagram.com/interior_design_school_by_jtg/)

## Stack

| | |
| --- | --- |
| Framework | [Astro 7](https://astro.build) — static output, one HTML file per page |
| Images | `astro:assets` + sharp — responsive WebP (JPEG fallback) generated at build time |
| Motion | [Lenis](https://github.com/darkroomengineering/lenis) smooth scrolling + a small custom rAF scroll engine, IntersectionObserver reveals, CSS view transitions |
| Fonts | Bodoni Moda + Jost, self-hosted via Fontsource (no external requests) |
| Forms | [Netlify Forms](https://docs.netlify.com/forms/setup/) with AJAX submission, validation, honeypot |
| Hosting | Netlify (configured in `netlify.toml`) |

All motion respects `prefers-reduced-motion`; every page works without JavaScript.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — hero slideshow, founder, the two divisions, recent projects, before/after, school preview, testimonials |
| `/interior-design/` | Studio services, process, portfolio, before/after, **project request form** (`#request`) |
| `/design-school/` | School, programme, curriculum, student work, design tours, enrolment, **application / tuition form** (`#apply`) |
| `/projects/` | Portfolio with category filter |
| `/projects/<slug>/` | 14 project pages (gallery, lightbox, before/after where available) |
| `/about/` | Founder — Jemma Ter-Grigoryan |
| `/contact/` | Studio & school contacts, map |
| `/thank-you/` | No-JS form confirmation (not indexed) |
| `/404` | Not-found page |

Short links handled in `netlify.toml`: `/school`, `/apply`, `/start-a-project`, `/portfolio/*`.

## Local development

Requires **Node.js ≥ 22.12**.

```bash
npm ci            # install exact dependency versions
npm run dev       # http://localhost:4321
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Deploying on Netlify

1. In Netlify choose **Add new site → Import an existing project** and select this GitHub repository.
2. Build settings are read from `netlify.toml` — nothing to fill in:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `22.12.0`
3. Deploy.

### Turn on the forms (required once)

The site has two forms, both handled by Netlify Forms:

| Form name | Where | Purpose |
| --- | --- | --- |
| `design-request` | `/interior-design/#request` | Interior design project request (with optional file upload, max 8 MB) |
| `school-enquiry` | `/design-school/#apply` | School application / tuition & course information |

After the first deploy:

1. **Site configuration → Forms → Enable form detection.**
2. Trigger a new deploy (**Deploys → Trigger deploy → Deploy site**) so Netlify registers both forms.
3. **Forms → Form notifications → Add notification → Email notification** — add an email for each form
   (e.g. `jemmatergrigoryan@gmail.com`). Submissions are also visible in the Netlify dashboard.

Spam protection: hidden honeypot field (`company_website`), a client-side timing check, and Netlify's built-in
spam filtering.

### Environment variables

None are required.

| Variable | Required | Purpose |
| --- | --- | --- |
| `SITE_URL` | optional | Absolute production URL for canonical links, Open Graph and the sitemap (e.g. `https://www.example.am`). If unset, Netlify's built-in `URL` (the site's primary domain) is used automatically. Set it only if you want a custom domain used before it becomes the primary domain. |

## Editing content

| What | Where |
| --- | --- |
| Contact details, social links, navigation | `src/data/site.ts` |
| Projects (text, images, before/after pairs) | `src/data/projects.ts` |
| Testimonials | `src/data/testimonials.ts` |
| School programme, curriculum, differentiators | `src/data/school.ts` |
| Images | `src/assets/` (originals; optimised automatically at build) |
| Structured data (schema.org) | `src/data/schema.ts` |

To add a project: put its images in `src/assets/projects/<slug>/`, import them at the top of
`src/data/projects.ts` and add an entry to the `projects` array — its page, card and sitemap entry are generated.

## Content & media sources

Every fact on the site was verified against public sources; see **[`docs/content-sources.md`](docs/content-sources.md)**
for sources, what was intentionally left out (e.g. tuition, course duration) and media notes.
