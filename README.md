# Portfolio site — scaffold

Static site, plain HTML/CSS/JS, meant for GitHub Pages. This is a working
scaffold, not a finished site — every page has `<!-- TODO -->` comments and a
few `.placeholder-note` boxes marking things to fill in.

## Structure

```
index.html          splash / home page
about.html           bio, skills, coursework
portfolio.html        all 5 shortlisted projects as cards
404.html              custom not-found page (GitHub Pages serves this automatically)
css/styles.css        all styling (CSS variables for theming, responsive layout)
js/main.js             theme toggle (persisted via localStorage) + mobile nav toggle
projects/regex-dfa.html   example full project detail page - copy this as a template
images/                 empty for now - drop screenshots/favicon here
```

### Design decisions worth knowing about

- **Header/footer are duplicated on every page**, not shared via includes.
  Vanilla HTML has no native "include", and a JS `fetch()`-based include
  breaks when you open a file directly (`file://...`) instead of serving it
  from a real server — so duplication was chosen for zero-friction local
  previewing. If the site grows a lot, revisit this (a fetch-based include,
  or a static site generator, are the usual next steps) - just remember any
  nav change currently has to be copied to every page.
- **Only one project (Regex-to-DFA Engine) has a detail page** (`projects/regex-dfa.html`).
  The rest link straight to GitHub for now, per the hybrid approach from the
  plan. Copy `projects/regex-dfa.html` for any other project that deserves
  the full write-up treatment, and add a matching card link in `portfolio.html`.
- **Dark/light theme toggle** is included (top right nav) since it's a small
  JS touch that's easy to demo. Preference is saved in the visitor's browser
  via `localStorage`.

## Previewing locally

Because everything is plain static files, you *can* just double-click
`index.html` to open it in a browser - that works fine for this scaffold
since there are no fetch-based includes. If you add anything that needs a
real server later, run one from this folder, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Filling in content

Search each file for `TODO` to find every placeholder. Priorities, roughly
in order:

1. Your name/headline and bio (`index.html`, `about.html`)
2. Real skills list (`about.html`)
3. Project descriptions, languages/tags, and repo/demo links (`portfolio.html`, `projects/regex-dfa.html`)
4. Footer links: GitHub, LinkedIn, etc. (every page's footer)
5. `images/favicon.ico` (referenced by every page, currently missing - browsers will just 404 quietly on it until it's added)
6. Open Graph tags in `index.html` (`og:image`, `og:url`) once you have a banner image and a domain

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo (as the repo root, or to a `/docs` folder - either works).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set the source branch (usually `main`) and folder (`/` or `/docs` to match step 1).
4. Save - GitHub gives you a `https://<username>.github.io/<repo>/` URL a minute or two later.
5. (Optional, later) Add a custom domain by creating a `CNAME` file at the
   root with your domain in it, and configuring DNS per GitHub's Pages docs.

## Not included (deliberately, for now)

Contact form/page and a resume/CV download were left out per the current
plan - see `site-plan.md` in the project for the full reasoning. Both are
easy to add later without restructuring anything above: a contact method can
just be footer links (mailto/GitHub/LinkedIn), and a resume link can be a
single `<a href="resume.pdf">` pointing at a PDF dropped in the repo.
