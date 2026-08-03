# anikabadkul.com

Source for [anikabadkul.com](https://anikabadkul.com) — Anika Badkul's portfolio site. Static HTML/CSS/JS, no build step, deployed on Vercel.

## Structure

```
.
├── index.html                  Homepage
├── about.html                  About page
├── work.html / projects.html   Case study index
├── resume.html / resume.pdf    Résumé
├── cs-*.html                   Individual case studies
├── site.css / site.js          Shared site styles + behavior
├── favicon.ico, apple-touch-icon.png   Required at root by browser convention
│
├── card/                       /card — permanent NFC networking landing page
├── ghc/                        /ghc — seasonal GHC 2026 skin of /card
├── card.css                    Shared stylesheet for /card and /ghc
├── contact.vcf                 vCard linked from /card
├── contact-ghc.vcf             vCard linked from /ghc (adds a GHC 2026 note)
│
└── images/
    ├── photo.jpg, social-preview.jpg
    ├── brand/                  Logo marks
    └── case-studies/
        ├── kobl/
        ├── mealplan/
        ├── schedule-builder/
        └── selfcheckout/
```

Case study pages (`cs-*.html`) stay flat at the root — their URLs are the canonical, linkable form and aren't affected by the `images/` reorganization.

## NFC cards (`/card`, `/ghc`)

Two tap-landing pages sharing one design (`card.css`): `/card` is the everyday networking card; `/ghc` is a Grace Hopper Celebration 2026 event skin with an extra footer and an event-tagged vCard. See git history for the originating PRD.

## Local preview

No build step — serve the directory root with any static file server, e.g.:

```
python3 -m http.server 8080
```

## Deploy

Auto-deploys via Vercel on push to `main`.
