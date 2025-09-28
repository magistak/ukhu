# WordPress Setup for Dual-Portal Relocation System

This directory contains the WordPress configuration files needed to create blog posts for both the Hungarian (HU→UK) and English (→HU) relocation portals.

## Files Included

### `functions.php`
Core WordPress functionality including:
- **Custom Post Types**: Guides, FAQs, Checklist Templates
- **Custom Taxonomies**: Audience (critical), Topic, Stage  
- **REST API Integration**: Exposes all custom fields and taxonomies
- **Admin Interface**: Custom columns and helpful notices
- **Default Content**: Creates initial taxonomy terms

### `acf-fields.json`
Advanced Custom Fields configuration for:
- **Guide Fields**: Locale, summary, references, actions, difficulty, timing, costs
- **FAQ Fields**: Locale, detailed answers, related guides
- **Structured Data**: All fields exposed in REST API for Next.js consumption

## Installation Instructions

### 1. Copy Functions File
Copy `functions.php` content into your active WordPress theme's `functions.php` file:

```php
// Add this to your theme's functions.php or create a custom plugin
require_once 'path/to/relocation-portal-functions.php';
```

### 2. Install Required Plugins
Install these WordPress plugins:
- **Advanced Custom Fields (ACF)** - For structured content fields
- **ACF to REST API** - Exposes ACF fields in REST API
- **Yoast SEO** or **SEOPress** - For meta data and SEO

### 3. Import ACF Fields
1. Go to **Custom Fields > Tools** in WordPress admin
2. Choose **Import Field Groups**
3. Upload the `acf-fields.json` file
4. Click **Import**

### 4. Configure Permalinks
1. Go to **Settings > Permalinks**
2. Choose **Post name** structure
3. Click **Save Changes** to flush rewrite rules

## Content Creation Workflow

### Creating Hungarian Site Content (HU→UK)
1. Go to **Guides > Add New**
2. **Title**: Write in Hungarian (e.g., "Skilled Worker víza útmutató")
3. **Audience**: Select "Hungarians moving to UK (Hungarian site)"
4. **Locale**: Select "Hungarian (for HU→UK portal)"
5. **Topic**: Choose relevant category (work, legal, etc.)
6. **Content**: Write guide content in Hungarian about UK processes

### Creating English Site Content (→HU)
1. Go to **Guides > Add New**
2. **Title**: Write in English (e.g., "Hungary Residence Permit Guide")
3. **Audience**: Select "Anyone moving to Hungary (English site)"
4. **Locale**: Select "English (for →Hungary portal)"
5. **Topic**: Choose relevant category
6. **Content**: Write guide content in English about Hungarian processes

## REST API Endpoints

The setup automatically creates these REST API endpoints:

### Standard WordPress REST API
- `GET /wp-json/wp/v2/guides` - All guides
- `GET /wp-json/wp/v2/guides?audience=hu-to-uk` - Hungarian site content
- `GET /wp-json/wp/v2/guides?audience=to-hungary` - English site content
- `GET /wp-json/wp/v2/faqs` - All FAQs
- `GET /wp-json/wp/v2/topic` - All topics
- `GET /wp-json/wp/v2/audience` - All audiences

### Custom Endpoints
- `GET /wp-json/wp/v2/guides/by-audience/hu-to-uk` - Filtered Hungarian content
- `GET /wp-json/wp/v2/guides/by-audience/to-hungary` - Filtered English content

## Important Notes

### Audience Taxonomy (Critical)
- **Never use "both"** - content must be direction-specific
- **hu-to-uk**: Content for Hungarians moving to UK (Hungarian language)
- **to-hungary**: Content for anyone moving to Hungary (English language)

### Content Separation
- Each piece of content serves ONE portal only
- No translation workflows needed
- Each portal addresses completely different relocation needs

### Security
- Use **Application Passwords** for API authentication
- Limit API access to read-only for the front-end
- Set up proper user roles and permissions

## Testing the Setup

### 1. Create Test Content
Create a sample guide for each portal:
- One Hungarian guide about UK visas (audience: hu-to-uk, locale: hu)
- One English guide about Hungary permits (audience: to-hungary, locale: en)

### 2. Test REST API
Visit these URLs to verify API access:
- `yoursite.com/wp-json/wp/v2/guides`
- `yoursite.com/wp-json/wp/v2/guides?audience=hu-to-uk`

### 3. Check Admin Interface
- Verify custom columns show Audience and Locale
- Confirm taxonomy terms are created
- Test admin notices appear on guides page

## Troubleshooting

### Missing Content in API
- Check that posts are published (not draft)
- Verify audience taxonomy is assigned
- Ensure ACF fields are filled out

### REST API Not Working
- Check permalink structure is set to "Post name"
- Verify required plugins are installed and activated
- Test API authentication credentials

### Admin Interface Issues
- Clear any caching plugins
- Check for theme/plugin conflicts
- Verify current user has proper permissions

## Next Steps

Once WordPress is configured:
1. Create initial content for both portals (10 guides each)
2. Test API connectivity from Next.js frontend
3. Configure WordPress Application Passwords
4. Set up staging/production content workflow