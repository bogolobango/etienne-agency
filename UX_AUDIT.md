# Site UX Audit — Etienne Agency
**Audit Date:** 2026-06-22  
**Scope:** Navigation, scroll behavior, animations, and page-lifecycle issues  
**Repository:** `/Users/jimstephen/etienne-agency-wt-uxquality`

---

## CRITICAL (Broken Behavior — Fix Before Merge)

### 1. No scroll-to-top on route change
**File:** `client/src/App.tsx` (Router), all page components  
**Issue:** When navigating from `/contact` back to `/`, user stays at their previous scroll position (e.g., bottom of page). Expected behavior: SPA route changes should reset scroll to top unless explicitly anchoring to a hash fragment.  
**Impact:** User lands mid-page on unrelated content; creates disorientation and poor UX on multi-page flows.  
**Fix:** Add `useEffect` in Router or wrap Switch with a scroll-reset component that watches location changes and calls `window.scrollTo(0, 0)` on non-hash route changes.

### 2. Mobile menu doesn't close on Escape key
**File:** `client/src/components/Header.tsx` lines 127-224  
**Issue:** Mobile menu overlay listens only to `onClick` (line 156) and link clicks (line 35), but not to Escape key press. A user who opens the menu and presses Escape expects it to close.  
**Impact:** Frustration for mobile users trying to dismiss the menu via familiar keyboard shortcut.  
**Fix:** Add `useEffect` that listens to `keydown` with `event.key === 'Escape'` and calls `setMobileMenuOpen(false)`.

### 3. Mobile menu has no focus trap (Tab escapes into page)
**File:** `client/src/components/Header.tsx` lines 160-224  
**Issue:** Mobile drawer doesn't use a focus trap. User can Tab out of the menu and interact with page elements behind the overlay.  
**Impact:** Breaks keyboard accessibility; violates WCAG 2.1 Level AA (dialog focus management).  
**Fix:** Implement or use a focus-trap library (e.g., `focus-trap-react`) to confine Tab/Shift+Tab within the drawer while open.

### 4. Missing scroll-padding-top for anchor link targets with sticky header
**File:** `client/src/index.css` (global styles) + anchor links throughout (`Header.tsx` line 117, `ScrollCTA.tsx` line 53, etc.)  
**Issue:** Anchor links (e.g., `#hero-calculator`, `#early-adopter-section`) jump to their targets, but the fixed header (68px height) occludes the top of the content. No `scroll-padding-top` is set on `html` or `body` to account for the sticky header.  
**Impact:** Target content is hidden behind the header, forcing users to scroll down manually to see what they clicked.  
**Fix:** Add `html { scroll-padding-top: 80px; }` (or `88px` for safety) in `client/src/index.css` to make browser-native anchor scrolling account for the header height.

### 5. JSON-LD inserted via useEffect with no deduplication guard on re-render
**File:** `client/src/pages/Home.tsx` lines 57-66  
**Issue:** Every render of Home checks `if (!existing)` but only once per component mount. If the component re-mounts (rare but possible in dev or route flaps), it inserts another `<script>` tag. No cleanup of old scripts on unmount.  
**Impact:** Potential duplicate JSON-LD blocks in the DOM on certain SPA navigation patterns (though low likelihood in production).  
**Fix:** Move JSON-LD insertion to a root-level setup (e.g., in `main.tsx` or a separate effect outside the page component) that runs once, or ensure Home cleanup removes scripts on unmount.

---

## IMPORTANT (Poor UX — Fix Before Merge)

### 1. All page sections animate on mount, not on scroll-into-view
**Files:** Multiple, including `SundayProblemSection.tsx` (lines 22-33), `ProblemSection.tsx` (lines 65-75), `EarlyAdopterSection.tsx` (lines 107-117), `SocialProofSection.tsx` (lines 14-26), `IndustriesSection.tsx` (lines 13-23)  
**Issue:** Sections use `IntersectionObserver` with `threshold: 0.1–0.25`, but the animation trigger happens on first intersection. For long pages, all sections that enter the viewport simultaneously (e.g., during initial fast scroll or on slower devices) animate at once, defeating the stagger effect.  
**Impact:** Animations feel disconnected from user scrolling; the page looks "alive all at once" rather than responsive to the user's pace through content.  
**Fix:** Stagger animations *per card within a section* and ensure only sections currently in view (threshold > 0.3) trigger initial reveals. Or embrace mount-time animations but reduce their prominence (shorter durations, subtler motion).

### 2. ScrollCTA persists across route changes
**File:** `client/src/components/ScrollCTA.tsx` lines 7-8, 11  
**Issue:** ScrollCTA stores dismiss state in `sessionStorage` which survives route changes. If a user navigates to `/about` after dismissing the CTA on `/`, they won't see it on the new page (expected), but the scroll threshold logic still runs on every page. On pages shorter than 60% of the viewport height, the CTA never triggers.  
**Impact:** On short pages (e.g., `/contact`), the CTA is invisible, reducing secondary conversion opportunities.  
**Fix:** Reset scroll threshold check per page or make the 60% threshold dynamic based on page length. Or scope the sessionStorage key to the current route.

### 3. No header hide-on-scroll-down pattern
**File:** `client/src/components/Header.tsx` lines 27-33  
**Issue:** Header reacts to scroll by changing background (scrolled = backdrop blur), but it always stays visible. On long pages, scrolling down doesn't hide the header to reclaim space, and scrolling back up doesn't re-show it with fanfare.  
**Impact:** On mobile especially, the fixed header occupies valuable vertical space. Users scrolling for content don't get the "scroll down = more space" feedback.  
**Fix:** Implement a show/hide pattern: track scroll direction + distance. Hide header when scrolling down (unless near top), re-show when scrolling up. Use a `translateY(-100%)` transform on the header for smooth animation.

### 4. Inconsistent animation timings across sections
**Files:** Multiple component files  
**Issue:** Observed timing inconsistencies:  
- Hero sections use `duration-700` (line `Hero.tsx:42–44`)  
- Problem sections use `duration-700 delay-100` (line `ProblemSection.tsx:92`)  
- EarlyAdopter uses `duration-700 delay-150 delay-200 delay-250` staggered delays (lines 128, 140, 155)  
- SundayProblem uses `duration-1000` (line `SundayProblemSection.tsx:102`)  

No centralized timing constants; easing functions mix `ease-out` (CSS class implicit) and `cubic-bezier(0.22, 1, 0.36, 1)` (MagneticButton inline).  
**Impact:** Page feels rhythmically inconsistent; animations don't feel like part of a unified motion language.  
**Fix:** Define global animation timing tokens in `index.css` (e.g., `--duration-reveal: 700ms`, `--timing-ease-reveal: cubic-bezier(...)`) and use throughout. Or create a shared hook `useRevealAnimation()` that returns consistent timing.

### 5. CountUp animations may not fire if component outside viewport on mount
**File:** `client/src/components/CountUp.tsx` lines 52-67  
**Issue:** CountUp only animates if `hasTriggered` is true (line 71). It sets `hasTriggered` on intersection with a root margin of `0px 0px -10% 0px` (line 63), which means the component must be visible before animation starts. If a user lands on a page and immediately sees a CountUp number (e.g., in ProblemSection comparison cards), the animation may already have fired or may not fire if the card is only 5% into the viewport.  
**Impact:** Numbers may appear instantly instead of animating, breaking the micro-interaction.  
**Fix:** Adjust `rootMargin` to `"50px"` or similar to give CountUp a larger "pre-trigger" zone, or set `eager={true}` for above-the-fold numbers that should animate on page load.

### 6. Calendly iframe reflows page on load (Contact page)
**File:** `client/src/pages/Contact.tsx` lines 96-113, 26-34  
**Issue:** Calendly widget loads asynchronously (line 27–33). Once loaded, it injects an `<iframe>` with `height: 700px` (line 111), causing a layout reflow if content below shifts. No placeholder / skeleton, no `loading="lazy"`, and the iframe is not reserved space (no aspect-ratio or height pre-allocation).  
**Impact:** Layout shift (CLS violation); user sees content move up as Calendly loads.  
**Fix:** Allocate fixed height for the Calendly container (`min-height: 700px`, `aspect-ratio: auto` if needed) before the widget loads, or use a skeleton loader while loading.

---

## MINOR (Polish — Fix If Cheap)

### 1. FloatingDustMotes canvas doesn't disable on low-end devices / battery saver mode
**File:** `client/src/components/FloatingDustMotes.tsx` lines 32–47  
**Issue:** Canvas respects `IntersectionObserver` to pause when off-screen (lines 39–47), which is good. However, it doesn't check for `prefers-reduced-motion` (unlike MagneticButton, CountUp, and other animation components). On battery-saver mode or accessibility preference, the canvas still runs at 60fps.  
**Impact:** Inconsistent accessibility treatment; battery drain on devices with reduced-motion preference enabled.  
**Fix:** In the same effect block (lines 59–106), add a check: `if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { return; }` to disable animation entirely.

### 2. Inconsistent Tailwind transition utilities
**Files:** Multiple (e.g., `Header.tsx` line 53, `ScrollCTA.tsx` line 43, various component transitions)  
**Issue:** Some transitions use `transition-all duration-[ms-value]` (e.g., `transition-all duration-300`), others use `transition-colors` or `transition-transform` + duration. No consistent pattern; some hardcoded inline styles for transitions (e.g., `MagneticButton.tsx` line 78).  
**Impact:** Minor code smell; harder to audit motion consistency.  
**Fix:** Standardize on `transition-all` + duration Tailwind classes for reveal animations, and use inline styles only where non-Tailwind properties are needed (e.g., `transform` in MagneticButton).

### 3. Hero number (HeroCalculator) renders late due to context hydration
**File:** `client/src/components/HeroCalculator.tsx` lines 36–48 + `context/CalculatorContext.tsx` (assumed)  
**Issue:** HeroCalculator reads from `useCalculator()` context. If CalculatorContext is lazy or wrapped late in the tree, the default values (`locations`, `apptsPerLocation`, `avgTicket`) may not be available until after first render, causing the hero number to "pop" or flicker.  
**Impact:** Minor layout shift / visual FOUT; perceived slowness on first page load.  
**Fix:** Ensure CalculatorContext is initialized with default values at the top of the tree (confirmed in `Home.tsx` line 69—already good), but verify context defaults are set synchronously in the context file (not in an effect).

### 4. SundayProblemSection parallax scroll may be distracting for reduced-motion users
**File:** `client/src/components/SundayProblemSection.tsx` lines 36–64  
**Issue:** Parallax effect respects `prefers-reduced-motion` (line 38), which is correct. However, the parallax is quite active (±30px translate across the section, line 56), which may feel jarring to users who have enabled the preference but the effect still partially renders.  
**Impact:** Low severity; effect is already gated, but the intensity is high.  
**Fix:** Reduce `maxParallax` from 60 to 30 (line 56), or ensure `prefers-reduced-motion` completely disables the scroll listener (currently does, confirmed in line 38–39).

### 5. SpotlightCard only works on hover (no touch feedback)
**File:** `client/src/components/SpotlightCard.tsx` lines 34–42, 48  
**Issue:** Spotlight effect tracks `mousemove` and responds to `onHover`. On touch devices, the effect doesn't trigger because there's no mousemove event (touch is not hover). No `active` or `focus` state for touch/keyboard.  
**Impact:** Spotlight card effect is invisible on mobile, reducing perceived interactivity on the highlighted pricing card (EarlyAdopterSection).  
**Fix:** Add touch support by listening to `ontouchstart` and using the first touch position, or disable the effect on touch devices with `window.matchMedia("(hover: none)")` and fall back to a static highlight.

### 6. MagneticButton proximity radius (80px) may be too large on mobile
**File:** `client/src/components/MagneticButton.tsx` lines 20–25  
**Issue:** Default `proximity` is 80px, which on a mobile viewport (375px wide) is ~21% of the screen width. Buttons at the bottom of the screen may trigger the magnetic effect while scrolling, creating unexpected pull.  
**Impact:** Minor jank; buttons may shift unexpectedly during scroll.  
**Fix:** Reduce proximity on mobile (e.g., `proximity = window.innerWidth < 768 ? 40 : 80`) or use a media query to conditionally set the prop.

### 7. No visual feedback when ScrollCTA is dismissed
**File:** `client/src/components/ScrollCTA.tsx` lines 35–39, 62–68  
**Issue:** When user clicks the X button (line 62), the CTA slides out with `translate-y-full` animation (line 44), which is good. However, no toast/confirmation message ("You dismissed this"), so the user may not realize they can re-enable it (they can't—it's sessionStorage-based).  
**Impact:** Low; expected behavior, but a small affordance (e.g., "You can see this again if you reload") could help.  
**Fix:** Optional: add a `toast` message on dismiss, or leave as-is (dismissal is final per session).

### 8. Hero mounted animation stagger uses magic delays (150ms, 300ms)
**File:** `client/src/components/Hero.tsx` lines 42–98  
**Issue:** Stagger delays are hardcoded (`delay-150`, `delay-300`, no delay on first element) with no constant or pattern. If timing needs to change, three places must be updated.  
**Impact:** Low; a code-smell rather than UX issue.  
**Fix:** Extract delay values to a constant (e.g., `const STAGGER_MS = [0, 150, 300]`) for maintainability.

---

## NOT BROKEN (Positive Observations)

- **Mobile menu scroll-lock works correctly** — `overflow: hidden` on body (Header.tsx lines 40–48) prevents background scroll while menu is open. Cleanup is proper.
- **Header logo visual change on dark hero** — `overDark` class toggle (Header.tsx lines 24–25, 69–71) provides good contrast switching on the hero section. UX win.
- **Reduced-motion is respected globally** — Most animation-heavy components (MagneticButton, CountUp, SundayProblem parallax, GradientOrbs) check `prefers-reduced-motion` and disable or simplify. Accessibility-first approach.
- **FloatingDustMotes uses IntersectionObserver** — Canvas animation pauses when off-screen (lines 39–47), reducing CPU/battery drain. Good performance consideration.
- **Anchor link CTA copies are consistent** — All CTAs use the same links and tracking (trackCTAClick); no broken href patterns detected.
- **Focus states on buttons** — Primary buttons have hover and active states (index.css lines 417–425, MagneticButton line 78). Keyboard navigation is supported.
- **Error boundary exists** — App.tsx wraps the Router in ErrorBoundary, preventing white-screen-of-death on route errors.
- **CountUp respects reduced-motion** — Snaps to final value if `prefers-reduced-motion: reduce` is set (CountUp.tsx lines 42–49).
- **Calendly async loading** — Script is loaded dynamically only on Contact page (lines 26–34), not blocking initial page load.
- **Modal overlay click-to-dismiss** — Mobile menu overlay is clickable to close (Header.tsx line 156), standard pattern.

---

## AUDIT PATTERNS & NOTES

### Cross-Cutting Patterns

1. **Mount-time animations dominate** — Nearly every section uses `useState(false)` on mount and triggers animation on `IntersectionObserver` intersection. This is correct, but stagger timings vary widely. Consider a shared `useRevealAnimation(threshold, delay)` hook to standardize.

2. **No global scroll-to-top on route change** — This is the most visible navigation issue. SPA users experience disorientation when clicking a link and landing mid-page on the next route.

3. **Reduced-motion is inconsistently applied** — Most components check it, but some (SpotlightCard, Calendly iframe load) don't. Audit should include a pass to ensure all motion-producing components respect the preference.

4. **Parallax and scroll-driven animations use RAF throttling** — GradientOrbs, SundayProblemSection, FounderSection all implement `ticking` flags and `requestAnimationFrame` to avoid jank. Good pattern.

5. **Fixed header + anchor links = scroll offset issue** — This is a classic SPA pattern that wasn't accounted for. The header is 68px, but no `scroll-padding-top` exists.

### Instrumentation Gaps

- No analytics on ScrollCTA visibility / dismiss events (sessionStorage is set, but no event fired).
- No metrics on mobile menu open/close (trackNavigationClick exists, but not tracking the menu toggle itself).
- No performance tracking for canvas animation (FloatingDustMotes) or lazy image load (FounderSection).

### Files Worth Revisiting (Not Read in Full)

- `client/src/context/CalculatorContext.tsx` — Assumed to initialize context with defaults; worth confirming no race conditions on first render.
- `client/src/pages/HowItWorks.tsx`, `Industries.tsx`, `Calculator.tsx`, `About.tsx` — Not fully audited; may have additional section-animation patterns or scroll issues.
- `client/src/hooks/useScrollTracking.ts` — Verified that it only reads `scrollY`, doesn't modify it, but didn't check for performance issues.

---

## SUMMARY

| Category | Count | Notes |
|----------|-------|-------|
| **CRITICAL** | 5 | Scroll-to-top on route, Escape key close, focus trap, scroll-padding-top, JSON-LD dedup |
| **IMPORTANT** | 6 | Mount animations, ScrollCTA route persistence, header hide-on-scroll, timing inconsistency, CountUp visibility, Calendly CLS |
| **MINOR** | 8 | FloatingDustMotes reduced-motion, Tailwind consistency, hero number FOUT, parallax intensity, SpotlightCard touch, MagneticButton proximity, ScrollCTA feedback, stagger delays |
| **NOT BROKEN** | 10+ | Scroll-lock, header contrast, reduced-motion coverage, IntersectionObserver perf, analytics tracking, error boundary, etc. |

**Recommended Fix Order:**
1. Scroll-to-top on route change (CRITICAL, high impact)
2. Scroll-padding-top for anchors (CRITICAL, quick fix)
3. Mobile menu Escape key (CRITICAL, accessibility)
4. Focus trap in mobile menu (CRITICAL, WCAG compliance)
5. Animation timing constants (IMPORTANT, code maintainability)
6. Header hide-on-scroll (IMPORTANT, mobile UX)
7. JSON-LD dedup guard (CRITICAL, low likelihood but clean code)

