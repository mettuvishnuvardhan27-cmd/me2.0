# Mettu Vishnu Vardhan — Personal Portfolio 2.0

## Run and deploy

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Use Node.js 22 or newer. The Vite production build writes to `dist/`. The Vercel configuration redirects `/contact` to the inquiry section. The output includes a static contact redirect for other hosts, directly addressable case studies, a sitemap and a branded 404 page. On a standalone static host, use `dist/404.html` as the custom 404 page and publish the build at the domain root.

## Contact form

Without configuration, the inquiry form validates the fields and opens an email draft. On Vercel, set these variables to enable direct delivery and redeploy.

| Variable | Value |
| --- | --- |
| `VITE_INQUIRY_ENDPOINT` | `/api/inquiry` |
| `RESEND_API_KEY` | Server-side Resend API key |
| `INQUIRY_FROM_EMAIL` | Sending address on your verified Resend domain |
| `INQUIRY_TO_EMAIL` | Inbox that should receive inquiries |
| `VITE_WHATSAPP_NUMBER` | Optional public WhatsApp number, with country code and no spaces |
| `VITE_AVAILABLE_FOR_PROJECTS` | Set to `true` to display availability |

Send a test inquiry on the deployed domain after configuring delivery. Server secrets belong in the hosting environment. The browser receives only variables prefixed with `VITE_`.

## Structure

- `src/App.jsx` contains the React sections, navigation and project pages.
- `src/content.js` holds case-study copy, verified links, services and skills.
- `src/components/Inquiry.jsx` and `api/inquiry.js` handle form behavior and direct delivery.
- `src/styles.css` defines the responsive visual system and motion settings.
- `scripts/build-pages.js` generates route-specific HTML metadata and the sitemap.
- `public/` contains the case-study imagery, fonts, certificate and social preview.

## Content notes

The source ZIP had an older static landing page and a React draft. This version combines their verified content under one React/Vite entry point. The hero displays the supplied portrait of Vishnu. The CareerIQ screenshot uses the demo dashboard. The System screenshot shows the profile setup interface from the repository.

Orbix Elevators and Vincit Fitness are current clients. Their website case studies include screenshots and links to their live sites. The existing LinkedIn URL was preserved after the service blocked automated verification.

The ZIP and live homepage did not contain Website Templates content. Add it when the source or a current URL is available. Set `VITE_WHATSAPP_NUMBER` in `.env.local` for local use or in the hosting environment for deployment, then rebuild to show the WhatsApp contact button.
