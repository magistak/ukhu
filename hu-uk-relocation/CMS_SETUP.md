# CMS Setup (Headless WordPress)

## Plugins
- WPGraphQL or REST (choose one)
- Polylang or WPML (translations)
- SEO plugin (Yoast/SEOPress)
- ACF (for structured fields) + ACF to REST/GraphQL

## Content types
- Guide, FAQ, Checklist Template, Announcement (see CONTENT_MODEL.md)

## Hardening
- Admin MFA, limited roles
- Disable XML-RPC, limit login attempts
- Read-only API token, IP-allowlist to build hooks if possible

## Preview
- Configure preview secret + route in Next.js
- Map WP preview to `/[locale]/preview?postId=...&token=...`
