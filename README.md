# Nischal Niraula — Portfolio

A responsive personal portfolio built with React and Vite to showcase my projects, skills, services, and development journey.

**Live:** https://nischal-niraula.com.np

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Lucide React / React Icons
- Cloudflare Workers

## Features

- Responsive desktop and mobile layout
- Dark and light themes
- Sticky glass-effect navigation
- Typewriter and scroll-reveal animations
- Project, skills, and services sections
- Downloadable CV
- Contact form backed by a Cloudflare Worker and Resend

## Local Development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Contact Form Setup

The browser posts the form to `/api/contact`. The Worker in `worker/index.js` validates the request and sends the message through Resend. No API key is exposed in the React bundle.

Before using the form in production:

1. Verify `nischal-niraula.com.np` as a sending domain in Resend.
2. Create a Resend API key.
3. In Cloudflare, open the `portfolio` Worker and add `RESEND_API_KEY` under **Settings → Variables and Secrets** as a secret.
4. The default recipient is `nischalniraula21@gmail.com` and the default sender is `Nischal Niraula Portfolio <contact@nischal-niraula.com.np>`. Optional `CONTACT_TO` and `CONTACT_FROM` Worker variables can override them.
5. Redeploy after the Worker configuration is committed.

For local Worker testing, use a `.dev.vars` file for secrets. `.dev.vars*` is ignored by Git and must never be committed.

## Deployment

The project is configured for Cloudflare Workers Static Assets through `wrangler.jsonc`.

Cloudflare build settings:

```text
Build command: npm run build
Deploy command: npx wrangler deploy
```

The Worker serves the Vite `dist` output and handles `/api/*` requests before static assets.

## Featured Projects

### GharKhoj
A full-stack room rental platform for finding and listing rooms across Nepal.

### Lily Cafe & Restaurant
A cafe and restaurant website with a private cabin booking feature.

## Author

**Nischal Niraula**  
BCA Student & Full-Stack Developer  
Jhapa, Nepal  
GitHub: https://github.com/nischal-niraula21

© 2026 Nischal Niraula. All rights reserved.
