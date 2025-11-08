#!/usr/bin/env node

/**
 * Script to get YouTube Channel ID and information for @Betirement
 * Run with: node scripts/get-youtube-channel-info.js
 */

const https = require('https');

// Channel handle
const CHANNEL_HANDLE = '@Betirement';

console.log(`\n🔍 Looking up YouTube channel: ${CHANNEL_HANDLE}\n`);

// Instructions for manual lookup
console.log('📋 Manual Method:');
console.log('1. Go to: https://www.youtube.com/@Betirement');
console.log('2. Right-click and "View Page Source"');
console.log('3. Search for "channelId" in the source');
console.log('4. Copy the channel ID (starts with "UC")');
console.log('');

console.log('🌐 Or use online tools:');
console.log('• https://commentpicker.com/youtube-channel-id.php');
console.log('• Enter: @Betirement or https://www.youtube.com/@Betirement');
console.log('');

console.log('📝 Example Channel IDs format:');
console.log('• Starts with "UC" followed by 22 characters');
console.log('• Example: UCxxxxxxxxxxxxxxxxxxxxxx');
console.log('');

console.log('🔑 Getting YouTube API Key:');
console.log('1. Go to: https://console.cloud.google.com/');
console.log('2. Create a new project or select existing');
console.log('3. Enable "YouTube Data API v3"');
console.log('4. Go to "Credentials" → "Create Credentials" → "API Key"');
console.log('5. (Optional) Restrict the key to YouTube Data API v3');
console.log('');

console.log('📄 Add to .env.local:');
console.log('YOUTUBE_API_KEY=your_api_key_here');
console.log('YOUTUBE_CHANNEL_ID=UC_channel_id_here');
console.log('');

console.log('✅ Test the connection:');
console.log('1. Start the dev server: npm run dev');
console.log('2. Visit: http://localhost:3000/api/youtube/test');
console.log('3. Check the response for success or error details');
console.log('');

// Note about the Betirement channel
console.log('ℹ️  Channel Information:');
console.log('• Channel URL: https://www.youtube.com/@Betirement');
console.log('• Channel appears to focus on Bitcoin and retirement content');
console.log('• Make sure to use the exact channel ID found in the page source');
console.log('');

console.log('💡 Tips:');
console.log('• The channel ID never changes, even if the handle changes');
console.log('• API quotas reset daily at midnight Pacific Time');
console.log('• Free tier gives 10,000 units per day');
console.log('• Each video list request costs ~3 units');
console.log('');

process.exit(0);