# Interactive globe hero + rebuilt contact section

## 1. Landing hero: interactive globe instead of spinning flags

Replace the orbiting flag rings with a real, draggable 3D globe that marks the ten
destinations you work with and draws travel arcs from India out to them.

- New component `src/components/ui/cobe-globe.tsx`, based on the reference code:
  drag to spin, inertia after release, vertical tilt clamped, auto-rotation resumes
  on release, labels attached to markers/arcs.
- Colors come from the existing accent tokens (sage / terracotta / ink) via
  `useAccent`, and label chips use `bg-ink` / `text-paper` instead of hardcoded hex,
  so the globe re-themes with the accent switcher.
- Markers: New York, Toronto, London, Sydney, Berlin, Dubai, Auckland, Singapore,
  Paris, Tokyo. Arcs: Ahmedabad → London, Ahmedabad → Toronto, Ahmedabad → Sydney.
- `src/routes/index.tsx` hero: `HeroOrbit` swapped for the new globe (same grid
  slot, mobile-first order kept). Keep the "10 destinations" idea as a small caption
  under the globe rather than the centre badge.
- `HeroOrbit.tsx` deleted; the `orbit-spin` keyframes in `src/styles.css` removed if
  nothing else uses them.
- Labels use CSS anchor positioning, which not every browser supports; where it is
  unsupported the globe still renders and spins, labels just do not float.

## 2. Contact section redesign

- Remove the globe and the decorative circles from the contact block
  (`src/components/site/Globe.tsx` deleted — it is only used there).
- New layout: a single centred column on mobile, two columns from `lg` up — left
  side holds the heading plus email / phone / location as compact rows with icons,
  right side holds the form card.
- Tighten spacing: section padding drops to `px-4 py-16` on mobile, form card
  padding to `p-4`, gap between fields `gap-3`. No large empty blocks, no oversized
  rounded corners on small screens.

## 3. Form polish

- First name and last name stay side by side on mobile (`grid-cols-2`), everything
  else full width.
- Field height reduced slightly on mobile, labels smaller, error text sits tight
  under each field instead of pushing layout.
- Submit button becomes full width on mobile, auto width from `sm` up.
- Validation, the mailto behaviour, and the success state are unchanged.

## Technical notes

- `cobe@^2.0.1` is already installed and its types include `arcs`, `arcColor`,
  `arcWidth`, `arcHeight` — no new dependency needed.
- The globe canvas is client-only: mount it behind a hydration guard so SSR does not
  touch WebGL, and cancel the animation frame plus `globe.destroy()` on unmount.
- Marker/arc arrays are module-level constants so the globe effect does not
  re-initialise on every render.
- Files touched: `src/components/ui/cobe-globe.tsx` (new), `src/routes/index.tsx`,
  `src/components/site/ContactForm.tsx`, `src/styles.css`; deleted:
  `src/components/site/HeroOrbit.tsx`, `src/components/site/Globe.tsx`.
- The intentional `undefinedVariable` error added earlier for pipeline testing is
  left in place unless you want it removed.
