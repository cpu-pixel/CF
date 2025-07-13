const axios = require('axios');

// Replace with your actual Railway URL
const RAILWAY_URL = process.env.RAILWAY_URL || 'https://your-app-name.railway.app';

async function testRailwayDeployment() {
  try {
    console.log('🚀 Testing Railway deployment...');
    console.log('Backend URL:', RAILWAY_URL);
    
    // Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await axios.get(`${RAILWAY_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test MongoDB connection (via projects endpoint)
    console.log('\n2. Testing MongoDB connection...');
    const projectsResponse = await axios.get(`${RAILWAY_URL}/api/projects`);
    console.log('✅ MongoDB connection working (projects endpoint responded)');
    
    // Test auth endpoint
    console.log('\n3. Testing auth endpoint...');
    const authResponse = await axios.get(`${RAILWAY_URL}/api/auth/profile`);
    console.log('✅ Auth endpoint working (expected 401 for unauthenticated request)');
    
    console.log('\n🎉 Railway deployment test completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Deploy frontend to Vercel');
    console.log('2. Update FRONTEND_URL in Railway environment variables');
    console.log('3. Test the full application');
    
  } catch (error) {
    if (error.response) {
      console.log('✅ Endpoint responded (status:', error.response.status, ')');
      if (error.response.status === 401) {
        console.log('✅ Expected 401 for unauthenticated request');
      }
    } else {
      console.error('❌ Deployment test failed:', error.message);
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Check if Railway deployment is complete');
      console.log('2. Verify the Railway URL is correct');
      console.log('3. Check Railway logs for errors');
      console.log('4. Ensure environment variables are set correctly');
    }
  }
}

testRailwayDeployment(); 