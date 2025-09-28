# WordPress Integration Testing Guide

This guide helps you test that the WordPress implementation works correctly with your Next.js frontend.

## Step 1: WordPress Setup Verification

### Install the Plugin
1. Upload `relocation-portal-complete.php` to `/wp-content/plugins/`
2. Activate the plugin in WordPress admin
3. You should see a welcome notice with setup confirmation

### Verify Post Types and Taxonomies
Check that these are created:
- **Post Types**: Guides, FAQs (visible in admin menu)
- **Taxonomies**: Audience, Topic, Stage (visible when editing posts)
- **Default Terms**: 
  - Audience: `hu-to-uk`, `to-hungary`
  - Topics: `work`, `study`, `healthcare`, `housing`, `finance`, `legal`
  - Stages: `research`, `prepare`, `arrive`, `settle`

## Step 2: Create Test Content

### Hungarian Site Content (HU→UK)
Create a test guide:
1. Go to **Guides > Add New**
2. **Title**: "Skilled Worker víza útmutató 2024"
3. **Content**: "Ez az útmutató segít a Skilled Worker víza megszerzésében..."
4. **Audience**: Select "Hungarians moving to UK (Hungarian site)"
5. **Topic**: Select "work" and "legal"
6. **Locale**: Select "Hungarian (for HU→UK portal)" in the meta box
7. **Publish**

### English Site Content (→HU)
Create another test guide:
1. Go to **Guides > Add New**
2. **Title**: "Complete Guide to Hungary Residence Permits"
3. **Content**: "This guide covers everything you need to know about getting a Hungarian residence permit..."
4. **Audience**: Select "Anyone moving to Hungary (English site)"
5. **Topic**: Select "legal"
6. **Locale**: Select "English (for →Hungary portal)" in the meta box
7. **Publish**

## Step 3: API Testing

### Basic API Endpoints
Test these URLs in your browser:

```bash
# All guides
https://your-wordpress-site.com/wp-json/wp/v2/guides

# Hungarian portal content (HU→UK)
https://your-wordpress-site.com/wp-json/wp/v2/guides?audience=hu-to-uk

# English portal content (→HU)  
https://your-wordpress-site.com/wp-json/wp/v2/guides?audience=to-hungary

# Filter by locale
https://your-wordpress-site.com/wp-json/wp/v2/guides?lang=hu
https://your-wordpress-site.com/wp-json/wp/v2/guides?lang=en

# Combined filtering (Hungarian site content)
https://your-wordpress-site.com/wp-json/wp/v2/guides?audience=hu-to-uk&lang=hu

# Combined filtering (English site content)
https://your-wordpress-site.com/wp-json/wp/v2/guides?audience=to-hungary&lang=en
```

### Expected API Response Format
Your API should return data in this format:

```json
[
  {
    "id": 123,
    "slug": "skilled-worker-viza-utmutato",
    "title": {"rendered": "Skilled Worker víza útmutató 2024"},
    "excerpt": {"rendered": "Ez az útmutató segít..."},
    "content": {"rendered": "Teljes tartalom..."},
    "locale": "hu",
    "audience": ["hu-to-uk"],
    "topic": ["work", "legal"],
    "updatedAt": "2024-01-15T10:30:00",
    "updated_at": "2024-01-15T10:30:00",
    "modified": "2024-01-15T10:30:00"
  }
]
```

**Note**: The cms-client will normalize WordPress response format to extract `title`, `excerpt`, and `content` as flat strings from the nested WordPress format.

## Step 4: Frontend Integration Test

### Update Your Environment Variables
```env
WORDPRESS_API_URL=https://your-wordpress-site.com
WORDPRESS_API_USERNAME=your-admin-username  
WORDPRESS_API_PASSWORD=your-application-password
```

### Test the CMS Client
Run this in your Next.js project:

```javascript
// Test file: test-wordpress-integration.js
import { getGuides } from '../packages/cms-client/src/index.js';

async function testWordPressIntegration() {
  try {
    // Test Hungarian site content
    console.log('Testing Hungarian site content...');
    const hungarianGuides = await getGuides({
      locale: 'hu',
      audience: 'hu-to-uk'
    });
    console.log('Hungarian guides:', hungarianGuides.length);
    
    // Test English site content  
    console.log('Testing English site content...');
    const englishGuides = await getGuides({
      locale: 'en',
      audience: 'to-hungary'  
    });
    console.log('English guides:', englishGuides.length);
    
    // Test specific guide
    if (hungarianGuides.length > 0) {
      const guide = hungarianGuides[0];
      console.log('Sample guide:', {
        title: guide.title,
        locale: guide.locale,
        audience: guide.audience,
        topics: guide.topic
      });
    }
    
  } catch (error) {
    console.error('Integration test failed:', error);
  }
}

testWordPressIntegration();
```

### Run the Test
```bash
cd your-project
node test-wordpress-integration.js
```

## Step 5: Troubleshooting

### Common Issues

**1. Empty API Response**
- Check that posts are published (not draft)
- Verify audience taxonomy is assigned
- Ensure locale meta field is set

**2. Filtering Not Working**
- Test without filters first: `/wp-json/wp/v2/guides`
- Verify taxonomy terms exist: `/wp-json/wp/v2/audience`
- Check slug spelling (hu-to-uk, to-hungary)

**3. Missing Fields in API**
- Verify plugin is activated
- Check WordPress admin for any PHP errors
- Test individual field exposure

**4. Authentication Issues**
- Verify Application Password is generated correctly
- Check username/password in environment variables
- Test with a simple curl request

### Debug Commands

```bash
# Test API access
curl "https://your-site.com/wp-json/wp/v2/guides" \
  -u "username:application-password"

# Test audience filtering
curl "https://your-site.com/wp-json/wp/v2/guides?audience=hu-to-uk" \
  -u "username:application-password"

# Check available taxonomies
curl "https://your-site.com/wp-json/wp/v2/audience"
```

## Success Criteria

✅ **WordPress Setup**
- Plugin activated without errors
- Post types and taxonomies visible in admin
- Default terms created

✅ **Content Creation**  
- Can create guides for both portals
- Audience and locale fields work correctly
- Admin columns show proper values

✅ **API Integration**
- Basic endpoints return content
- Filtering by audience works
- Filtering by locale works  
- Combined filtering works

✅ **Frontend Integration**
- CMS client can fetch WordPress content
- Content appears on correct portal pages
- No errors in Next.js console

Once all tests pass, your WordPress blog system is ready for content creation!