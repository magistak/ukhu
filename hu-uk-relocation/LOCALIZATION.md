# Localization

## Languages
- **English (en-GB)** and **Hungarian (hu-HU)**

## Routing
- `/en/...` and `/hu/...`
- Default locale: detect via browser on first visit; persist user choice

## Editorial workflow
1) Create base content in source locale  
2) Create translation in paired locale (linked)  
3) QA: terminology, legal phrasing parity, dates, links  
4) Publish both or stagger with “translation pending” badge

## UI strings
- Stored in locale JSONs, versioned; no hardcoded component text
