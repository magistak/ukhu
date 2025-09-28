# Architecture

## Overview
**Dual-portal decoupled architecture**:
- **WordPress (Headless)**: editors manage direction-specific content; public never hits WP directly.
- **Next.js**: fetches content at build/edge; renders locale routes; hydrates interactive widgets.
- **Firebase**: Auth (users), Firestore (checklists, forms), Functions (emails, validation), Hosting (front-end).

## Dual-Portal Structure
Two separate, purpose-built portals serving different audiences:

### Hungarian Site (`/hu/*`) 
- **Audience**: Hungarians moving to the UK
- **Content**: HU→UK guides (UK visas, English requirements, British settlement)
- **Language**: Hungarian content
- **WordPress Taxonomy**: `audience: hu-to-uk` + `locale: hu`

### English Site (`/en/*`)
- **Audience**: Anyone moving to Hungary  
- **Content**: →HU guides (Hungary permits, Budapest housing, Hungarian systems)
- **Language**: English content
- **WordPress Taxonomy**: `audience: to-hungary` + `locale: en`

## Data flow
1) Editor publishes direction-specific content in WP → exposed via **REST/GraphQL** with audience filtering.  
2) Front-end build pulls content per portal → outputs static pages; select routes use ISR/SSR.  
3) User interacts → Auth in Firebase; data to Firestore; Functions handle notifications.

## Content Separation & URLs
- **Two distinct portals**:
  - **/en/** (Hungary portal - for people moving TO Hungary)
  - **/hu/** (UK portal - for Hungarians moving TO UK)
- **No content overlap**: Each portal serves completely different audiences and directions
- **Audience-based filtering**: WordPress content tagged by target audience (`hu-to-uk` vs `to-hungary`)
- **Direction-specific navigation**: Each portal has tailored branding and messaging

## Performance
- Static generation for most routes
- ISR/SSR for time-sensitive pages (e.g., "What changed")
- Image optimization; lazy-load; minimal JS on content pages

## Reliability & security
- Public surface = CDN + Firebase endpoints
- WP behind WAF, admin-only, IP allowlist if possible
- Signed requests to WP; read-only tokens
- Firebase Security Rules; least-privilege service accounts

## Extensibility
- New tools = new React modules + Firestore collections + optional Functions
- Editors add direction-specific content without code; developers ship features without touching CMS
- Content management via audience taxonomy ensures proper portal separation