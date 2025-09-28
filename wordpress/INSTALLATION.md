# WordPress Installation Guide for Dual-Portal Blog System

This guide will help you set up the WordPress backend to create blog posts for both the Hungarian (HU→UK) and English (→HU) relocation portals.

## Quick Setup (Option 1: Plugin Method - Recommended)

### 1. Install as WordPress Plugin
1. Upload the `relocation-portal-plugin.php` file to your WordPress `/wp-content/plugins/` directory
2. Create a folder called `relocation-portal` and place the file inside
3. Go to **Plugins** in WordPress admin and activate "Relocation Portal Content Manager"
4. The plugin will automatically create all necessary post types and taxonomies

### 2. Install Required Plugins
Install these essential plugins:
- **Advanced Custom Fields (ACF)** - For structured content fields
- **ACF to REST API** - Exposes ACF fields in REST API

### 3. Import Field Groups
1. Go to **Custom Fields > Tools** in WordPress admin
2. Choose **Import Field Groups**
3. Upload the `acf-fields.json` file
4. Click **Import**

## Manual Setup (Option 2: Theme Functions)

If you prefer to add the code to your theme:

1. Copy the contents of `functions.php` into your active theme's `functions.php` file
2. Follow steps 2-3 from the Plugin Method above

## Post-Installation Setup

### 1. Configure Permalinks
1. Go to **Settings > Permalinks**
2. Choose **Post name** structure (required for REST API)
3. Click **Save Changes**

### 2. Set Up Authentication
For the Next.js frontend to access WordPress:

1. Go to **Users > Your Profile**
2. Scroll to **Application Passwords**
3. Create a new application password named "Next.js Frontend"
4. Copy the generated password
5. Update your Next.js environment variables:
   ```
   WORDPRESS_API_URL=https://your-wordpress-site.com
   WORDPRESS_API_USERNAME=your-admin-username
   WORDPRESS_API_PASSWORD=the-generated-app-password
   ```

### 3. Test the Setup
1. Visit `/wp-admin/edit.php?post_type=guides` to see the Guides section
2. Check that Audience, Topic, and Stage taxonomies are available
3. Test the REST API: `your-site.com/wp-json/wp/v2/guides`

## Creating Your First Blog Posts

### For Hungarian Site (Hungarians Moving to UK)
1. Go to **Guides > Add New**
2. **Title**: Write in Hungarian (e.g., "Skilled Worker víza útmutató 2024")
3. **Content**: Write the guide content in Hungarian
4. **Locale**: Select "Hungarian (for HU→UK portal)"
5. **Audience**: Select "Hungarians moving to UK (Hungarian site)"
6. **Topic**: Choose appropriate category (work, legal, etc.)
7. **Publish**

### For English Site (Anyone Moving to Hungary)
1. Go to **Guides > Add New**
2. **Title**: Write in English (e.g., "Complete Guide to Hungary Residence Permits")
3. **Content**: Write the guide content in English
4. **Locale**: Select "English (for →Hungary portal)"
5. **Audience**: Select "Anyone moving to Hungary (English site)"
6. **Topic**: Choose appropriate category
7. **Publish**

## Content Management Features

### Admin Interface
- **Custom Columns**: See Audience and Locale at a glance
- **Bulk Actions**: Set audience for multiple posts at once
- **Admin Notices**: Helpful reminders about content creation rules
- **Statistics Dashboard**: Track content for each portal

### Content Structure
Each guide includes:
- **Basic Info**: Title, content, excerpt
- **Metadata**: Locale, audience, topic, stage
- **Enhanced Fields**: Summary, difficulty level, estimated time, costs
- **References**: Official government links and resources
- **Actions**: Call-to-action buttons for next steps

### REST API Endpoints
Your Next.js app will fetch content from:
- All guides: `/wp-json/wp/v2/guides`
- Hungarian content: `/wp-json/wp/v2/guides?audience=hu-to-uk`
- English content: `/wp-json/wp/v2/guides?audience=to-hungary`
- FAQs: `/wp-json/wp/v2/faqs`

## Content Creation Workflow

### Content Strategy
- **No Translation**: Each portal serves different audiences with different needs
- **Direction-Specific**: Hungarian site covers UK processes, English site covers Hungarian processes
- **Audience-First**: Always ask "Which portal is this for?" before creating content

### Quality Guidelines
1. **Audience Clarity**: Every piece of content must have a clear audience
2. **Actionable Content**: Include specific steps and next actions
3. **Current Information**: Keep guides updated with latest requirements
4. **Official Sources**: Link to government websites and official forms

### Editorial Process
1. **Plan**: Identify content gaps for each portal
2. **Create**: Write direction-specific content
3. **Review**: Check accuracy and audience targeting
4. **Publish**: Make content live
5. **Update**: Regular reviews for currency

## Troubleshooting

### Common Issues

**Content Not Appearing in API**
- Check that posts are published (not draft)
- Verify audience taxonomy is set
- Ensure REST API is enabled

**Custom Fields Missing**
- Verify ACF plugin is installed and activated
- Check that field groups were imported correctly
- Ensure ACF to REST API plugin is active

**Permalink Issues**
- Set permalinks to "Post name" structure
- Clear any caching plugins
- Check .htaccess file permissions

### Support Checklist
- [ ] WordPress version 5.0+
- [ ] ACF plugin installed and activated
- [ ] Field groups imported successfully
- [ ] Permalinks set to "Post name"
- [ ] Application passwords configured
- [ ] REST API endpoints responding

## Next Steps

Once WordPress is set up:

1. **Create Initial Content**: Start with 5-10 guides per portal
2. **Test Frontend Integration**: Verify Next.js can fetch WordPress content
3. **Content Planning**: Plan your editorial calendar
4. **SEO Setup**: Configure meta tags and sitemaps
5. **Backup Strategy**: Set up regular WordPress backups

## API Testing

Test these URLs in your browser to verify the setup:

```
# All content
https://your-site.com/wp-json/wp/v2/guides

# Hungarian portal content
https://your-site.com/wp-json/wp/v2/guides?audience=hu-to-uk

# English portal content  
https://your-site.com/wp-json/wp/v2/guides?audience=to-hungary

# Taxonomies
https://your-site.com/wp-json/wp/v2/audience
https://your-site.com/wp-json/wp/v2/topic
```

You should see JSON responses with your content data. If you get errors, check the troubleshooting section above.