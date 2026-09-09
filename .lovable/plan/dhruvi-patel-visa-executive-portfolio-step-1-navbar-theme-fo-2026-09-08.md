# Dhruvi Patel — Visa Executive Portfolio (Step 1: Navbar + Theme Foundation)

## One note on the stack
This project already runs on Vite (React 19 + Vite 7) — it's the same fast Vite build you asked for. The routing layer is TanStack Router, which is the router this platform supports; swapping in a different router isn't possible here. Everything else you listed (Lenis, GSAP, Framer Motion, Phosphor icons, Sora) works exactly as intended.

## Look and feel
- Background: #F3F1EB warm paper base, near-black ink text.
- Three switchable accents: sage #7F8D70, terracotta #A46C49, ink #1F1F1F.
- Sora as the single typeface, tight editorial tracking, generous whitespace.
- Deliberately not the usual AI-generic look: pill-shaped floating nav, high-contrast ink capsule, real motion craft, no gradient/purple clichés.

## What gets built now
1. **Design foundation** — paper/ink/accent color tokens, Sora loaded, radii, shadows, smooth scrolling via Lenis app-wide.
2. **Desktop navbar** — a floating dark pill capsule centered at the top, ~68% of screen width, with:
   - "DP" monogram in a light circle at the far left
   - Menu items: Work, About, Playground, Resource
   - Right side: an email capsule button (dhruvi's email)
   - Hover animation copied from your video: each label rolls upward while a duplicate rises into place, plus a soft accent glow behind the hovered item
   - An accent-shift button: click cycles sage → terracotta → ink, with the whole site's accent animating to the new color; choice is remembered between visits
3. **Mobile navbar** — DP monogram left, menu button right. Tapping opens a full-screen curtain that slides down, with menu items staggering in large editorial type, the email address, and social/contact line. Tapping again closes it with a reverse curtain.
4. **Routes** — page shells created for Work, About, Playground, Resource so every nav link lands somewhere real, each with its own page title and description. Full page content comes in later steps.

## Technical notes
- Libraries added: `lenis`, `gsap`, `motion` (Framer Motion), `@phosphor-icons/react`, Sora via a font link in the root head.
- Tokens defined in `src/styles.css` (`@theme inline` + `:root`); accent switching swaps a CSS variable set on `<html>` via a small React context + localStorage.
- Navbar built as `src/components/site/Navbar.tsx` + `MobileCurtain.tsx`, mounted in `src/routes/__root.tsx` around the outlet; Lenis initialized in a client-only effect there.
- Hover roll uses a fixed-height mask with two stacked spans animated by Framer Motion; curtain uses GSAP timeline with clip-path + stagger.
- Route files: `work.tsx`, `about.tsx`, `playground.tsx`, `resource.tsx` (placeholder sections, real head metadata).
- Mobile safety: grid header with `min-w-0` / `shrink-0` so nothing clips at small widths.

## Needed from you
The real email address to show in the nav (the video shows a placeholder). I'll use `dhruvi.patel@gmail.com` as a stand-in until you give the actual one.
