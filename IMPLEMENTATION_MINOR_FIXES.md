# IMPLEMENTATION_MINOR_FIXES.md

This document tracks the progress of minor fixes and design enhancements for the Legacy Auto Exchange website.

## Checklist

- [x] **Hero Section**: Replace blank placeholder with the generated premium car image.
- [x] **Footer**: Improve visibility of the "LEGACY" text.
- [x] **Layout**: Address "blank sides" of the screen with a modern container/background.
- [x] **Header**: Implement a sticky header (`sticky top-0 z-50`).
- [x] **Navigation**: Add a "Back to Top" button.
- [x] **Scrolling**: Fix clipping issue in the Valuation/Contact section when scrolling.
- [x] **Modernization**: Add dynamic animations and premium styling touches.
- [x] **Regression Fix**: Full-width footer and reduced padding for a more compact look.
- [x] **Regression Fix**: Unified scroll logic for both "Contact" and "Request a Valuation" buttons.
- [x] **Regression Fix**: Perfect alignment to avoid clipping "Begin Your Professional Valuation".

---

## Proposed Changes

### [Component] [Header](file:///d:/Website_Tests/Legacy-Auto-Exchange/src/sections/Header.tsx)
- Apply `sticky top-0 z-50` and add a backdrop blur/glassmorphism effect on scroll.

### [Component] [Hero](file:///d:/Website_Tests/Legacy-Auto-Exchange/src/sections/Hero.tsx)
- Use the generated image: `premium_car_hero.png`.
- Enhance the grid layout to feel more "full" on wide screens.

### [Component] [Footer](file:///d:/Website_Tests/Legacy-Auto-Exchange/src/sections/Footer.tsx)
- Adjust the "LEGACY" text color or weight to ensure it pops against the `slate-blue` background.

### [Component] [ValuationForm](file:///d:/Website_Tests/Legacy-Auto-Exchange/src/sections/ValuationForm.tsx)
- Add `scroll-margin-top` to the section for the sticky header.
- Add bottom padding to prevent clipping of the trust badges.

### [Component] General Layout
- **New Component**: `BackToTop.tsx` with a smooth scroll-to-top function.
- **Global Styling**: Update `index.css` or `App.tsx` layout wrappers to add subtle background decorations (e.g., grain, soft gradients) to the "blank sides".

## Verification Plan

- [x] Verify car image loads in Hero section.
- [x] Verify Header remains fixed on scroll.
- [x] Verify "Back to Top" button works as expected.
- [x] Verify Valuation block is fully visible after clicking CTA.
- [x] Verify Footer text readability.
