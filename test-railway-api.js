const axios = require('axios');

// Replace with your actual Railway URL
const RAILWAY_URL = 'https://your-railway-url.railway.app'; // Replace this!

async function testRailwayAPI() {
  try {
    console.log('🧪 Testing Railway API...');
    console.log('URL:', RAILWAY_URL);
    
    // Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await axios.get(`${RAILWAY_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    
    // Test auth endpoints
    console.log('\n2. Testing auth endpoints...');
    
    // Test registration endpoint (should return 400 for missing data, not 405)
    try {
      await axios.post(`${RAILWAY_URL}/api/auth/register`, {});
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('✅ Registration endpoint exists (400 expected for empty data)');
      } else {
        console.log('❌ Registration endpoint issue:', error.response?.status);
      }
    }
    
    // Test login endpoint
    try {
      await axios.post(`${RAILWAY_URL}/api/auth/login`, {});
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('✅ Login endpoint exists (400 expected for empty data)');
      } else {
        console.log('❌ Login endpoint issue:', error.response?.status);
      }
    }
    
    console.log('\n🎉 API test completed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    }
  }
}

testRailwayAPI(); 