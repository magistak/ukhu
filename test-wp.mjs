// Test WordPress connection
import { getGuides } from '@ukhu/cms-client';

console.log('Testing WordPress connection...');
console.log('WP_API_URL:', process.env.WP_API_URL);
console.log('WP_API_TOKEN:', process.env.WP_API_TOKEN ? 'Set' : 'Not set');

try {
  const guides = await getGuides({ locale: 'en' });
  console.log('✅ WordPress connected!');
  console.log(`Found ${guides.length} guides:`, guides.map(g => g.title));
} catch (error) {
  console.log('❌ WordPress connection failed:');
  console.error(error);
  console.log('\n📝 Using mock data instead');
}