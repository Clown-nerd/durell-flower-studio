# Project TODO

- [x] Register the injected Shopify commerce router and expose the storefront environment configuration.
- [x] Seed a minimal Shopify preview catalog with one or two active, published CrochetEra. products.
- [x] Validate that the live Shopify catalog is visible through the storefront commerce API.
- [x] Establish the CrochetEra. visual system: warm cream canvas, muted terracotta/ochre/sage accents, organic gradients, translucent forms, bold fluid typography, and restrained soft shadows.
- [x] Build a responsive homepage with an editorial featured-collection hero and a browsable catalog preview.
- [x] Create a customer-facing shop collection view with size, color, and category filters.
- [x] Create product detail pages with gallery, accessible variant selection, add-to-cart controls, and a recommended-items carousel.
- [x] Build an accessible cart drawer with editable quantities, subtotal, and Shopify checkout handoff.
- [x] Add responsive storefront navigation and an accessible policy footer.
- [x] Add and update Vitest coverage for commerce routing and key storefront helpers.
- [x] Verify the storefront on desktop and mobile, including loading, empty, error, cart, and checkout states.
- [x] Save a final project checkpoint after every completed task is marked done.
- [x] Add a desktop-hover secondary lifestyle image transition to product-grid cards, with a touch-device-safe primary-image fallback.
- [x] Validate the product-grid hover experience on homepage and shop views, then save an updated checkpoint.
- [x] Add a hover- and focus-revealed Quick Add button over product-card lifestyle images that safely adds the default available Shopify variant to the cart.
- [x] Validate Quick Add cart feedback and responsive product-grid behavior, then save an updated checkpoint.


## Durell. motion & micro-interactions pass

- [x] Replace raw section reveal orchestration with Framer Motion `whileInView` transitions and reduced-motion handling.
- [x] Add a small mouse-parallax treatment to the homepage hero, disabled for touch and reduced-motion users.
- [x] Slow and soften bouquet-card primary/lifestyle crossfades while preserving hover and focus behavior.
- [x] Replace successful add-to-cart toasts with a quiet flower confirmation and bloom pulse; preserve error feedback and cart drawer behavior.
- [x] Re-time the cart drawer open/close easing without changing cart, checkout, or data logic.
- [x] Reframe Shop filters as By occasion, By stem, and By season while keeping existing filter mechanics.
- [x] Adapt product option labels to wrap style, vase size, and stem count language and rename recommendations to Pairs well with.
- [x] Run final typecheck, test, build, and responsive visual checks.
- [x] Save the focused motion pass checkpoint.

## Durell. delivery & gifting pass

- [x] Inspect cart, checkout, product form, and persistence boundaries.
- [x] Add a delivery date picker with a next-day minimum and three calm time windows to the cart drawer.
- [x] Persist delivery preferences locally per storefront session and show a readable saved summary without changing Shopify cart or checkout mutations.
- [x] Add a personalized gift-message textarea to the product page with a 180-character limit, live count, and preview.
- [x] Add validation coverage for delivery selections and gift-message length handling.
- [x] Run typecheck, tests, production build, and responsive visual checks.
- [x] Save the delivery & gifting checkpoint.

## Durell. rotating catalogue & physical card pass

- [x] Audit hero, catalogue, and storefront image fallback coverage.
- [x] Add a rotating hero catalogue using real flower products, thumbnail controls, accessible labels, and reduced-motion-safe behavior.
- [x] Ensure hero, catalogue cards, product detail, recommendation cards, and cart imagery have reliable flower image sources and alt text.
- [x] Upgrade the gift message preview to a layered physical paper-card mockup with flap, shadow, stamp, and live message updates.
- [x] Run tests, typecheck, production build, and responsive visual checks.
- [x] Save the rotating catalogue and physical card checkpoint.

## Durell. calendar & occasions-first pass

- [x] Audit routes, occasions content, and cart delivery controls.
- [x] Replace the native cart date field with a visual month calendar using the existing accessible calendar primitive.
- [x] Preserve next-day availability, time-window selection, saved delivery summaries, and existing cart/checkout behavior.
- [x] Promote the occasions edit into the Home route with occasions-first hero CTA and section copy.
- [x] Reorder desktop and mobile navigation so Occasions is primary and Shop flowers is secondary.
- [x] Run tests, typecheck, production build, and responsive visual checks.
- [x] Save the calendar and occasions-first checkpoint.

## Durell. occasions quick-add & pickup pass

- [x] Audit occasions product surfaces and delivery availability boundaries.
- [x] Add featured flower cards beneath the occasions tiles using the existing subtle quick-add animation and flower image treatment.
- [x] Add deterministic fully booked indicators, gray styling, and disabled delivery selection for Sundays and preview sell-out dates.
- [x] Add a Studio pickup fulfilment mode for dates unavailable for delivery, with saved preference summaries.
- [x] Run tests, typecheck, production build, and responsive visual checks.
- [x] Save the occasions quick-add and pickup checkpoint.
