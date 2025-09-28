# Direction-Specific Content Strategy

## Portal Structure
This system supports **two separate relocation portals** rather than a traditional bilingual site:

### Hungarian Site (`/hu/*`) - Hungarians Moving to UK
- **Language**: Hungarian content only
- **Audience**: `hu-to-uk` 
- **Content Focus**: UK visa guides, British settlement, English requirements
- **Examples**: "Skilled Worker víza útmutató", "Angol nyelvvizsga típusok"

### English Site (`/en/*`) - Anyone Moving to Hungary
- **Language**: English content only  
- **Audience**: `to-hungary`
- **Content Focus**: Hungary permits, Budapest housing, Hungarian systems
- **Examples**: "Hungary Residence Permits", "Budapest Housing Guide"

## Routing
- `/en/...` - Hungary portal (→HU content in English)
- `/hu/...` - UK portal (HU→UK content in Hungarian)
- Default locale: detect via browser; persist user choice
- **No content translation**: Each portal serves different purposes and audiences

## Editorial workflow
1) **Identify target audience**: Who is this content for?
   - Hungarians moving to UK → Hungarian site (`hu-to-uk`)
   - People moving to Hungary → English site (`to-hungary`)
2) **Create direction-specific content** in appropriate language
3) **Tag with correct audience** in WordPress taxonomy
4) **No translation required**: Content serves different relocation directions

## Content Strategy Examples

### Hungarian Site Content (`audience: hu-to-uk`)
- UK visa application processes
- English language test requirements  
- British settlement guides (GP registration, National Insurance)
- London housing market for Hungarians
- UK tax and banking for new residents

### English Site Content (`audience: to-hungary`)
- Hungary residence permit applications
- Budapest apartment hunting guides
- Hungarian healthcare registration
- Hungary work permit processes  
- Hungarian banking and tax obligations

## UI strings
- Stored in locale JSONs, versioned; no hardcoded component text
- Direction-specific navigation and branding per portal
- Each portal has tailored messaging reflecting its specific purpose

## Migration Notes
- **No more bilingual content**: Each piece serves one clear direction
- **No translation workflows**: Content is purpose-built for each audience
- **Audience enforcement**: WordPress taxonomy ensures proper portal separation