# CMS Setup (Headless WordPress)

## Dual-Portal Content Management
WordPress manages **direction-specific content** for two separate portals:
- **Hungarian Site**: Content for Hungarians moving to UK (`audience: hu-to-uk`)
- **English Site**: Content for anyone moving to Hungary (`audience: to-hungary`)

## Plugins
- WPGraphQL or REST (choose one)
- ACF (for structured fields) + ACF to REST/GraphQL  
- SEO plugin (Yoast/SEOPress)
- **No translation plugins needed** - each portal serves different content

## Content types
- Guide, FAQ, Checklist Template, Announcement (see CONTENT_MODEL.md)
- All content types must specify `audience` taxonomy

## Required Taxonomies
### Audience (Critical)
- `hu-to-uk` - Hungarians moving to UK (Hungarian site)
- `to-hungary` - Anyone moving to Hungary (English site)
- **Never use `both`** - content must be direction-specific

### Topic
- `work` - Employment, visas, permits
- `study` - Education, language requirements  
- `healthcare` - Medical registration, insurance
- `housing` - Accommodation, rental markets
- `finance` - Banking, taxes, costs
- `legal` - Official processes, documentation

### Stage  
- `research` - Planning phase content
- `prepare` - Pre-departure preparation
- `arrive` - First steps upon arrival
- `settle` - Long-term settlement

## Content Creation Workflow
1. **Identify target audience**: Who is this content for?
   - Hungarians moving to UK → `audience: hu-to-uk` + `locale: hu`
   - People moving to Hungary → `audience: to-hungary` + `locale: en`

2. **Create direction-specific content**:
   - Hungarian site: UK visa guides, British settlement processes
   - English site: Hungary permit guides, Budapest living guides

3. **Set correct taxonomy**:
   - Audience: `hu-to-uk` OR `to-hungary` 
   - Topic: Choose appropriate category
   - Stage: Match user journey phase

## API Configuration
- REST endpoint: `/wp-json/wp/v2/guides?audience=hu-to-uk&lang=hu`
- Ensure `meta.audience` and `meta.topics` are exposed in API
- Configure WordPress Application Passwords for secure API access

## Hardening
- Admin MFA, limited roles
- Disable XML-RPC, limit login attempts
- Read-only API token, IP-allowlist to build hooks if possible

## Preview
- Configure preview secret + route in Next.js
- Map WP preview to `/[locale]/preview?postId=...&token=...`

## Migration from Bilingual Setup
- **Remove translation plugins** (Polylang/WPML not needed)
- **Update existing content**:
  - Tag with appropriate audience (`hu-to-uk` or `to-hungary`)
  - Ensure content serves one clear direction
- **Content audit**: Remove or split content that tried to serve both audiences