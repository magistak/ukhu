# Content Model (WordPress Headless)

## Dual-Portal Structure

This CMS supports **two separate relocation portals** with different purposes:
- **Hungarian Site** (`/hu/*`): For Hungarians moving to the UK (HU→UK) - content in Hungarian
- **English Site** (`/en/*`): For anyone moving to Hungary (→HU) - content in English

Each portal serves a completely different audience and direction.

## Post Types

### Guide
Fields: title, slug, locale, summary, body (structured blocks), last-updated,  
tags: `[work, study, healthcare, housing, finance, legal]`,  
audience: `[hu-to-uk, to-hungary]`, references (links), "actions" (CTAs)

**Content Rules:**
- `audience: hu-to-uk` + `locale: hu` = Hungarian site content (Hungarians moving to UK)
- `audience: to-hungary` + `locale: en` = English site content (People moving to Hungary)
- Content must be direction-specific - no more "both" audience

### FAQ
Fields: question, answer, tags, audience, last-updated

**Audience Rules:** Same as Guides - must specify `hu-to-uk` or `to-hungary`

### Checklist Template
Fields: title, audience, items `[id, label, help, optional]`, order

**Audience Rules:** Direction-specific checklists (`hu-to-uk` or `to-hungary`)

### Announcement
Fields: title, summary, body, expiry, pinned?, audience

**Audience Rules:** Portal-specific announcements (`hu-to-uk` or `to-hungary`)

## Shared fields
- SEO: meta title/desc, canonical, noindex toggle
- Locale linkages: translation key
- Editorial: reviewer, legal note, source links

## Taxonomies
- **Topic:** `work`, `study`, `healthcare`, `housing`, `finance`, `legal`
- **Audience:** `hu-to-uk` (Hungarians→UK), `to-hungary` (Anyone→Hungary)
- **Stage:** `research`, `prepare`, `arrive`, `settle`

## Content Strategy Examples

### Hungarian Site (`hu-to-uk` + `locale: hu`)
- "Skilled Worker víza útmutató 2024"
- "Angol nyelvvizsga típusok UK vízumhoz"
- "Lakáskeresés Londonban"
- "National Insurance szám igénylése"
- "GP regisztráció és NHS használata"

### English Site (`to-hungary` + `locale: en`)
- "Complete Guide to Hungary Residence Permits"
- "Finding Housing in Budapest"
- "Registering for Hungarian Healthcare"
- "Working in Hungary: Permits and Process"
- "Opening a Bank Account in Hungary"

## Migration Notes

- **Old audience values removed:** `HU→UK`, `UK→HU`, `both`
- **New audience values:** `hu-to-uk`, `to-hungary`
- **Content must be direction-specific:** Each piece serves one clear relocation direction
- **Locale enforcement:** Hungarian content uses `locale: hu`, English content uses `locale: en`