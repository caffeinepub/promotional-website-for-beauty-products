# Specification

## Summary
**Goal:** Expand the Motoko backend to persist and serve core marketing-site content (products, testimonials, newsletter signups) with admin-only management APIs, and update the frontend to load/submit this data via the backend while keeping the current UI/UX intact.

**Planned changes:**
- Extend the single Motoko actor (backend/main.mo) to store and publicly serve featured products and testimonials from canister state via query APIs.
- Add admin-only create/update/delete APIs for products and testimonials using the existing authorization/access-control system.
- Add newsletter signup persistence (email + timestamp) with a public submit API and an admin-only API to list stored signups.
- Ensure upgrade-safe persistence for products, testimonials, and newsletter signups (and keep existing inquiry persistence working), adding backend/migration.mo only if state migration is required.
- Update the frontend to fetch products/testimonials from the backend instead of hardcoded constants, and update the Subscribe form to submit signups to the backend with the same success confirmation and a simple error state.

**User-visible outcome:** The marketing site displays products and testimonials from backend data, product pages still resolve by slug (including direct URL navigation), and the Subscribe form stores newsletter signups in the backend while showing the existing success message (or a simple error on failure).
