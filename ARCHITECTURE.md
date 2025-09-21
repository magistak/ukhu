# Architecture

## Overview
**Decoupled architecture**:
- **WordPress (Headless)**: editors manage EN/HU content; public never hits WP directly.
- **Next.js**: fetches content at build/edge; renders locale routes; hydrates interactive widgets.
- **Firebase**: Auth (users), Firestore (checklists, forms), Functions (emails, validation), Hosting (front-end).

## Data flow
1) Editor publishes in WP → exposed via **REST/GraphQL**.  
2) Front-end build pulls content per locale → outputs static pages; select routes use ISR/SSR.  
3) User interacts → Auth in Firebase; data to Firestore; Functions handle notifications.

## i18n & URLs
- Two spaces:
  - **/en/** (UK-facing + EN for HU users)
  - **/hu/** (Hungarian)
- Canonicals per locale; switcher preserves path; fallback if translation missing.

## Performance
- Static generation for most routes
- ISR/SSR for time-sensitive pages (e.g., “What changed”)
- Image optimization; lazy-load; minimal JS on content pages

## Reliability & security
- Public surface = CDN + Firebase endpoints
- WP behind WAF, admin-only, IP allowlist if possible
- Signed requests to WP; read-only tokens
- Firebase Security Rules; least-privilege service accounts

## Extensibility
- New tools = new React modules + Firestore collections + optional Functions
- Editors add content without code; developers ship features without touching CMS
