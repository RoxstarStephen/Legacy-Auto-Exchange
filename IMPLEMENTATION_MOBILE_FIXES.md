# [PLAN] Legacy Auto Exchange: Mobile & Cross-Platform Fixes

This document tracks all known UX and layout bugs affecting the Legacy Auto Exchange website on mobile and desktop. Each item is a discrete, testable fix. Items will be checked off as they are implemented and verified.

---

## Checklist

- [ ] **Fix 1 — Hero CTA Button Layout** (`Hero.tsx`): The "VALUE MY CAR" button's `<ArrowRight>` icon is misaligned — it appears on a separate line instead of inline with the label text on mobile. The button container uses `flex items-center` but the `<motion.span>` wrapping the children breaks inline flow on narrow viewports.

- [ ] **Fix 2 — ValuationForm CTA Button Layout** (`ValuationForm.tsx`): The "GET MY VALUATION" submit button has the same misalignment — the `<ArrowRight>` icon wraps to a new line on mobile instead of staying inline with the button text. Root cause is the same `<motion.span>` wrapper inside `Button.tsx` that doesn't enforce `flex items-center` on its inner content.

- [ ] **Fix 3 — Button Children Inline Flex** (`Button.tsx`): The inner `<motion.span>` that wraps `children` lacks `flex items-center gap` classes, causing icons passed as siblings (e.g., `Value My Car <ArrowRight />`) to wrap or misalign on narrow viewports. Apply `inline-flex items-center` to the inner span to fix both Fix 1 and Fix 2 in one place.

- [ ] **Fix 4 — Smooth Scroll for Nav Items** (`App.tsx` + `Header.tsx`): Clicking `[Process, Our Values, Testimonials, FAQ]` in the header performs a janky, non-smooth scroll. The `scrollTo` Lenis call works for `contact` but nav items snap without momentum. The `offset: -80` is applied but Lenis may be conflicting with the `useScroll` sticky header. Need to ensure all nav-item scroll calls use Lenis with consistent `duration` and proper `offset` for the fixed header height.

- [ ] **Fix 5 — CTA Scrolls to Wrong Target** (`App.tsx`, `Hero.tsx`, `ValuationForm.tsx`): All CTA buttons (e.g., "Value My Car", "Get Quote") call `scrollTo('contact')` or `scrollToSection('contact')`, which scrolls to the top of the `#contact` section — landing on "Begin Your Professional Valuation" panel rather than the input form. Need to add a dedicated anchor ID (e.g., `id="valuation-form-card"`) on the `<form>` element or the form wrapper and scroll CTA buttons to that element instead.

- [ ] **Fix 6 — Process Section Card Scrolling (Mobile + Desktop)** (`Process.tsx`): The sticky-scroll `AnimatePresence` card swap in "The Legacy Process" feels janky when swiping on mobile. The `min-h-[400vh]` sticky container does not account for mobile viewport height, causing the scroll-to-step mapping to be disproportionate. On desktop, the `rAF` loop reads `scrollYProgress` every frame but the `AnimatePresence mode="sync"` still produces visible flicker on fast scroll. Need to: (a) test and tune the sticky container height for mobile, (b) add `will-change: transform` to the card, and (c) consider replacing the `rAF` loop with a Framer Motion `useMotionValueEvent` listener for cleaner updates.

- [ ] **Fix 7 — Coverage Map Overlap on Mobile** (`Coverage.tsx`): In "TAMIL NADU'S MOST TRUSTED NETWORK", the interactive map and the text/feature blocks overlap on mobile. The section uses `grid lg:grid-cols-2` which collapses to a single column below `lg`, but the `<InteractiveMap>` component has hardcoded dimensions that overflow its container, causing it to bleed into the text above. Need to constrain the map container with `max-w-full overflow-hidden` and ensure `InteractiveMap` renders responsively (i.e., `width: 100%` SVG viewBox).

- [ ] **Fix 8 — Footer Region Bullets** (`Footer.tsx`): The "Regions" column (`Chennai, Coimbatore, Madurai, Salem, Trichy`) renders each city with a small indigo dot (`<span className="w-1 h-1 bg-indigo-500 rounded-full mr-3" />`). This is inconsistent with the "Connect" column which has plain text buttons. Remove the bullet dot from each `<li>` in the Regions list so all footer columns have a uniform, bullet-free style.

- [ ] **Fix 9 — Animation Fluidity** (Multiple files): Many entrance animations feel abrupt or janky, particularly on mobile where GPU compositing is limited. Specific issues: (a) `SplitText` stagger animations render too many DOM nodes triggering layout thrash on mobile, (b) `whileInView` animations in `Coverage.tsx` and `Values.tsx` fire too late (viewport threshold too high), (c) `BackgroundEffects` in `App.tsx` runs 15 animated `<Particle>` components on a `rAF` loop which competes with scroll and transition performance on low-end mobile. Fixes: reduce particle count for mobile via media query or `window.innerWidth` check, add `layout` prop carefully, use `will-change: transform, opacity` only on actively animating elements, and ensure all `transition` configs use `ease: [0.22, 1, 0.36, 1]` (custom spring) rather than linear for a premium feel.

---

## Affected Files

| File | Issues |
|---|---|
| [`Button.tsx`](file:///d:/Website_Tests/Legacy-Auto-Exchange/src/components/Button.tsx) | Fix 3 (icon wrapping on mobile) |
| [`Hero.tsx`](file:///d:/Website_Tests/Legacy-Auto-Exchange/src/sections/Hero.tsx) | Fix 1, Fix 5 |
| [`ValuationForm.tsx`](file:///d:/Website_Tests/Legacy-Auto-Exchange/src/sections/ValuationForm.tsx) | Fix 2, Fix 5 |
| [`Header.tsx`](file:///d:/Website_Tests/Legacy-Auto-Exchange/src/sections/Header.tsx) | Fix 4 |
| [`App.tsx`](file:///d:/Website_Tests/Legacy-Auto-Exchange/src/App.tsx) | Fix 4, Fix 5, Fix 9 |
| [`Process.tsx`](file:///d:/Website_Tests/Legacy-Auto-Exchange/src/sections/Process.tsx) | Fix 6 |
| [`Coverage.tsx`](file:///d:/Website_Tests/Legacy-Auto-Exchange/src/sections/Coverage.tsx) | Fix 7, Fix 9 |
| [`Footer.tsx`](file:///d:/Website_Tests/Legacy-Auto-Exchange/src/sections/Footer.tsx) | Fix 8 |
| Various sections | Fix 9 (animation fluidity) |

---

## Verification Checklist (Post-Implementation)

- [ ] "Value My Car" button arrow stays inline on 375px (iPhone SE) viewport
- [ ] "Get My Valuation" button arrow stays inline on 375px viewport
- [ ] Clicking Process / Our Values / Testimonials / FAQ nav items scrolls smoothly with Lenis
- [ ] Clicking any CTA scrolls to the actual input form fields, not the title panel
- [ ] Scrolling through The Legacy Process cards feels smooth on mobile and desktop
- [ ] Coverage map does not overflow or overlap text on screens narrower than 1024px
- [ ] Footer Regions list has no bullet dots
- [ ] Entrance animations feel fluid on a mid-range Android device (throttle CPU in DevTools)
- [ ] No regressions on desktop (1280px+) for any of the above items

---

*Status: Planning. No code changes have been made yet.*
