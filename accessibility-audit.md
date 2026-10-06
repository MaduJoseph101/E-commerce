# Accessibility audit — AllShoes (static, manual review)

Scope: every component under `src/`. Methodology: read each file and flag
a11y issues against WCAG 2.1 AA heuristics (keyboard, screen reader, focus,
color/contrast as implemented, semantics, announcements). This is a code
review, not a browser test — visual contrast ratios, motion-preferring users,
and live focus behavior still need a runtime check.

---

## What's already decent

- Search autocomplete in [Allitems.jsx](src/AllPoducts/Allitems.jsx) is the
  strongest piece: `aria-autocomplete="list"`, `aria-controls`, `aria-activedescendant`,
  arrow-key navigation, Escape to close, and `role="listbox"/"option"` are all
  wired. That's a good pattern. The only gap is confirming the value/status
  region is announced (see notes below).
- FAQ accordion in [FAQ.jsx](src/Props/FAQ.jsx) uses `aria-expanded` and a
  real `<button>` for each item — good. It still lacks focus styling and a
  proper `aria-controls`/id linkage to the content region.
- Toasts ([UndoToast.jsx](src/Purchase/UndoToast.jsx),
  [WishlistToast.jsx](src/Purchase/WishlistToast.jsx)) use `aria-label` on
  dismiss buttons and are fixed-position, which is fine. They are not yet
  announced via a live region, though.
- Hero images on category pages are decorative/background, which is correct
  (no `alt` needed there). Product thumbnails all carry `alt={product.title}`,
  which is good and consistent.
- Social links in [Footer.jsx](src/Footer.jsx) use `aria-label` on icon-only
  links — good.

---

## High-impact issues to fix

### 1. Missing page-level language
`[index.html](../index.html)` and the root layout should declare
`<html lang="en">`. Screen readers use this to pick pronunciation. If the
`<html>` element is not under React control, set it in `index.html`; if it is,
set it in `main.jsx`.

### 2. Skip-to-content link
There is no skip link. Add a "Skip to main content" link as the first focusable
element in the layout so keyboard users can bypass the sticky header.

### 3. Meta viewport is not accessibility-friendly if it disables zoom
Check `[index.html](../index.html)` for `<meta name="viewport">`. Do **not**
use `user-scalable=no` or `maximum-scale` below 2. Users must be able to zoom.

### 4. Carousel auto-advance / drag region
`[BestSellers.jsx](src/Homepages/BestSellers.jsx)` is now keyboard-reachable
via the arrow buttons, which is good. Remaining concerns:
- If the carousel ever auto-advances, it needs pause/stop control and
  `prefers-reduced-motion` respect.
- The slide container has `role="group"`/`aria-roledescription`, which is
  acceptable but still not a full carousel pattern. Acceptable compromise for
  a small site, provided the slide position is announced. Currently the
  `sr-only` live region says "Showing product X of N", which is good — but
  confirm the region is `aria-live="polite"` in the actual JSX (it appears to
  be set, but re-verify the rendered attribute, because some drafts had it as
  a plain string).
- Each card inside the carousel is a `<Link to="/all">`. That means every
  slide is a link to the same destination. That's usable but should be
  announced clearly; the current image alt text (product title) helps.

### 5. Focus visible styles
Several interactive components have focus handling, but you should confirm:
- Buttons and links get a visible focus indicator in all states.
- Custom-styled controls (color swatches, size buttons, cart stepper buttons,
  social icons, search clear button) do not rely on `outline: none` without a
  replacement focus style.
- In particular, confirm focus styling exists on:
  - Color selector swatches in [ProductDetails.jsx](src/Purchase/ProductDetails.jsx)
  - Size picker buttons (fixed in the keyboard-navigation work — re-verify
    `focus-visible` ring is present and visible on the real border/background
    colors)
  - Cart stepper minus/plus buttons in [Cart.jsx](src/Purchase/Cart.jsx) and
    [CartDrawer.jsx](src/Purchase/CartDrawer.jsx)
  - All icon-only links/buttons (search, cart, wishlist, profile, social icons)

### 6. Icon-only controls need labels (some are good, some must be checked)
Good: footer social links, search clear, cart/wishlist toggles with `aria-label`.
Still audit:
- Any new icon-only controls added elsewhere.
- The Wishlist/Undo toasts have dismiss icons with `aria-label`, which is good.
- Confirm the cart drawer stepper buttons have descriptive `aria-label`s that
  include the item context if possible (currently "Decrease quantity"/"Increase
  quantity" is acceptable but generic).

### 7. Forms and inputs
- [CheckoutModal.jsx](src/Purchase/CheckoutModal.jsx): all fields now have
  `label[htmlFor]` + `id` pairing (fixed previously). Remaining:
  - Add `aria-required="true"` to required fields, or rely on `required` plus
    visible text. Right now `required` appears only on the email field.
  - Wire error messages with `aria-describedby` so screen readers announce
    validation errors when they appear.
  - On step 2, the card form fields should also have `aria-describedby` for
    errors and ideally `inputmode` / `autocomplete` attributes
    (`cc-number`, `cc-exp`, `cc-csc`) for better mobile/screen-reader support.
- [Cart.jsx](src/Purchase/Cart.jsx) promo code input: add `aria-label` or a
  visible label. Currently it has no associated `<label>` and no `aria-label`,
  only a placeholder.
- [Footer.jsx](src/Footer.jsx) subscribe form: the email input has no label
  and no `aria-label`. Placeholder alone is not accessible. Add a visually
  hidden label or `aria-label="Email address"`.
- [Signup.jsx](src/Signup.jsx): currently a stub (`Signup` text only). When
  implemented, ensure the form has labels, error handling, and focus management
  on submit.

### 8. Images and media
- Product thumbnails: `alt={product.title}` is generally okay, but ideally the
  alt should describe the product and variant where possible (e.g. include color
  or size when it matters). For now, title-only alt is acceptable but not ideal.
- Category hero images are CSS backgrounds — good (decorative). Ensure any
  `<img>` that is purely decorative has `alt=""` and `role="presentation"` or
  is CSS.
- No video/audio present, so no captions/transcripts needed yet.

### 9. Announcements and live regions
- Toast notifications should be announced. Add `aria-live="polite"` (or
  `assertive` for critical errors) to the toast container, or ensure the toast
  element itself has an appropriate live region role.
- Cart drawer opening should ideally move focus into the drawer and trap focus
  while open, then return focus on close. Currently it likely does not do focus
  management, which can leave keyboard users behind.
- Checkout modal should similarly trap focus and manage focus on open/close.
- Cart item add/remove/wishlist changes currently rely on toasts, which may or
  may not be announced depending on the live-region implementation.

### 10. Dynamic content and route changes
- You added a scroll-to-top effect in [main.jsx](src/main.jsx), which is good
  for visual users. For screen reader users, route changes should also announce
  the new page title or move focus to the main content. Consider focusing
  `main`/heading after navigation, or announcing page title change.
- Skeleton loaders are used on several pages. Ensure they are not announced as
  meaningful content (purely presentational is fine, but watch for stray text).

### 11. Color and contrast
Cannot fully verify without a browser, but note these for runtime testing:
- Light text on dark backgrounds (header, footer hero overlays) is likely fine
  but must be checked at the smallest sizes used (`text-[10px]`/`text-[11px]`
  appears in several places).
- Error states use red; confirm red-on-white and red-on-light-bg meets contrast
  when used for text, not just borders.
- Gray-on-gray placeholder and secondary text should be checked at small sizes.
- Do not rely on color alone to convey status: out-of-stock, selected size,
  active nav, error fields. Currently selected size also uses dark fill +
  text change, which is good; out-of-stock uses a strikethrough-style mark and
  disabled state — good. Make sure error fields also have an icon or text, not
  only a red border.

### 12. Touch targets and spacing
Several controls use small sizes (`text-[10px]`, icon buttons, star ratings).
For AA, aim for at least 44x44 CSS pixels of interactive area for important
controls, or at least adequate spacing so adjacent targets do not collide. This
is especially relevant for:
- Size picker buttons
- Color swatches
- Cart stepper buttons
- Social icon links in the footer (they are 36x36-ish; consider enlarging)

### 13. Headings, landmarks, and structure
- Main pages generally use `<h1>` once per page, which is good.
- Confirm each page has a sensible landmark structure: `<main>` around primary
  content, `<nav>` for navigation regions, `<header>`/`<footer>` where
  appropriate. Currently a lot of layout is `<div>`-based; adding semantic
  landmarks improves screen-reader navigation.
- FAQ section uses `<section>` but no landmark label; add `aria-labelledby` or
  `aria-label`.
- Breadcrumbs are present as text/links but should be wrapped in a
  `<nav aria-label="Breadcrumb">` with `<ol>` and `<li>` for proper structure,
  and the current page should be `aria-current="page"`.

### 14. Shopping-cart and quantity controls
- Cart stepper buttons in [Cart.jsx](src/Purchase/Cart.jsx) and
  [CartDrawer.jsx](src/Purchase/CartDrawer.jsx) use `aria-label`, which is
  good, but consider including item name/context for screen readers if feasible.
- Removing items with an undo toast is a nice pattern; make sure the undo action
  is reachable by keyboard and the toast announcement is reliable.

### 15. Window title / page identity
Confirm each route sets a distinct, descriptive `<title>` in
`[index.html](../index.html)` or via `document.title` / a React title hook.
This helps screen readers and tabs.

### 16. Motion
The site uses transitions and a few animations (bounces, fades, carousel
transitions). Add a `prefers-reduced-motion` safeguard for any animation that
could be distracting, especially auto-moving or repeating motion.

---

## Medium / minor notes

- "New" badge is a visual label on product cards; ensure screen readers are not
  left guessing why a card is emphasized. A hidden text "New" is already there
  via the badge text, so it's likely fine.
- Rating display uses a star character "★". This is okay, but a screen reader
  may read it oddly; consider a visually hidden "Rating: X out of 5" text.
- Product grid items on category pages are a single big link wrapping image +
  text. That's acceptable, but ensure the image alt doesn't duplicate the link
  text in a confusing way. Current pattern: image alt is product title, link
  text also includes product title. That duplication can be noisy. Consider
  `alt=""` on the thumbnail when the link already names the product, or make
  the alt slightly different/ complementary.
- Category pages use the same grid component pattern; if you ever add filters,
  ensure they are reachable and labeled.
- Empty states (empty cart, empty wishlist) are well done visually; make sure
  they include clear actions and are reachable.

---

## Prioritized fix list (recommended order)

1. `[index.html](../index.html)` — `lang="en"`, accessible viewport meta,
   distinct `<title>` per route.
2. Add skip-to-content link near the top of the layout.
3. Add `<main>`, `<nav>`, `<section>`/`aria-label` landmarks across pages.
4. Fix form labels/announcements:
   - Footer subscribe email input: add label or `aria-label`.
   - Cart promo input: add `aria-label` or visible label.
   - Checkout form: add `aria-required` and `aria-describedby` for errors;
     add `autocomplete`/`inputmode` for card fields.
5. Make toasts and cart/drawer state announcements reliable with live regions
   and focus management on drawer/modal open/close.
6. Add `aria-current="page"` to breadcrumbs and structure them as a list.
7. Ensure visible focus styles everywhere custom controls exist.
8. Address duplicate alt/link text on product cards.
9. Confirm carousel live region text is properly announced and consider
   reduced-motion handling if auto-advance is ever added.
10. Add `prefers-reduced-motion` safeguards for site animations.

---

## What was NOT checked (needs runtime/browser verification)

- Actual color contrast ratios at the smallest font sizes.
- Focus order and visibility in the real browser.
- Whether live regions announce as expected.
- Drawer/modal focus trapping behavior.
- Screen-reader behavior with the carousel, search, and FAQ accordion.
- Any regression from the keyboard-navigation changes on the size picker and
  carousel.
- Automated axe/Lighthouse results.

---

## Files referenced

- [src/main.jsx](src/main.jsx)
- [src/Homepage.jsx](src/Homepage.jsx)
- [src/Footer.jsx](src/Footer.jsx)
- [src/Signup.jsx](src/Signup.jsx)
- [src/AllPoducts/Allitems.jsx](src/AllPoducts/Allitems.jsx)
- [src/MenProducts/MenItems.jsx](src/MenProducts/MenItems.jsx)
- [src/WomenProducts/WomenItems.jsx](src/WomenProducts/WomenItems.jsx)
- [src/Props/FAQ.jsx](src/Props/FAQ.jsx)
- [src/Homepages/BestSellers.jsx](src/Homepages/BestSellers.jsx)
- [src/Purchase/ProductDetails.jsx](src/Purchase/ProductDetails.jsx)
- [src/Purchase/Cart.jsx](src/Purchase/Cart.jsx)
- [src/Purchase/CartDrawer.jsx](src/Purchase/CartDrawer.jsx)
- [src/Purchase/CheckoutModal.jsx](src/Purchase/CheckoutModal.jsx)
- [src/Purchase/SavedItems.jsx](src/Purchase/SavedItems.jsx)
- [src/Purchase/UndoToast.jsx](src/Purchase/UndoToast.jsx)
- [src/Purchase/WishlistToast.jsx](src/Purchase/WishlistToast.jsx)
- [index.html](../index.html)
