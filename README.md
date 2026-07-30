# Dr Adidx Glow & Smile Clinic — Website

A production-ready Next.js 14 (App Router) marketing site for a dental /
hair / skin clinic in Dahanu, Maharashtra, built with Tailwind CSS and a
custom Three.js hero visualization.

## Design concept

- **Palette:** deep midnight teal (`ink`, trust & clinical calm), warm
  ivory (`porcelain`, enamel-like), marigold `glow` and rose `bloom`
  accents pulled straight from the clinic's own name.
- **Type:** Fraunces (display serif, used sparingly, italic for warmth) +
  Manrope (body) + IBM Plex Mono (labels/eyebrows/data), all self-hosted
  as local variable fonts — no external font requests at build or
  runtime.
- **Signature element:** `GlowOrb`, a raw Three.js point-sphere in the
  hero that ripples toward the visitor's cursor — a literal visualization
  of "glow" diffusing across a surface. It pauses off-screen and respects
  `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx        Root layout, fonts, SEO metadata, LocalBusiness JSON-LD
  page.tsx           Assembles all sections
  globals.css        Design tokens, base styles, buttons
  api/contact/route.ts   Appointment form submission endpoint (stub)
components/
  Hero.tsx           Headline + GlowOrb 3D visual
  GlowOrb.tsx         Three.js interactive particle sphere
  Services.tsx        Dental / Hair / Skin service cards
  AboutDoctor.tsx      Dr. Aditya's bio & philosophy
  Testimonials.tsx     4.9★ rating + patient reviews
  TrustSignals.tsx     Sterilisation, LGBTQ+ friendly, equipment, pricing
  ContactLocation.tsx  Map, hours, phone, appointment form
  AppointmentForm.tsx  Client form wired to /api/contact
  Nav.tsx / Footer.tsx
lib/data.ts          All clinic copy/data in one place — edit here first
public/fonts/         Self-hosted Fraunces, Manrope, IBM Plex Mono
```

## Before launch — replace these placeholders

1. **Photography.** Every image slot (`Services.tsx`, `AboutDoctor.tsx`)
   is currently a labelled colour placeholder. Swap in real photos of the
   clinic interior, equipment, and a warm portrait of Dr. Aditya — this
   will do more for conversion than anything else on the page.
2. **Contact form backend.** `app/api/contact/route.ts` currently logs
   submissions to the server console. Wire it to email (Resend/SendGrid),
   WhatsApp Business API, or a CRM.
3. **Domain & Open Graph.** Update `metadataBase` and `openGraph.url` in
   `app/layout.tsx` once you have a real domain, and add a real
   `og-image.jpg` to `/public`.
4. **Google Maps.** The embed uses a text query
   (`clinic.mapsQuery` in `lib/data.ts`); once you have a verified Google
   Business Profile / Place ID, swap in the Place ID-based embed URL for
   a pin-accurate map.
5. **Analytics.** Add Google Analytics / Meta Pixel in `app/layout.tsx`
   if you plan to run ads.

## Deployment

Ships cleanly to Vercel (`vercel deploy`), or any Node host that supports
Next.js 14. No environment variables are required for the base site.
