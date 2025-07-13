const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAuthFlow() {
  try {
    console.log('🧪 Testing Authentication Flow...\n');

    // 1. Test Login
    console.log('1. Testing Login...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@urbansync.com',
      password: 'admin123'
    });
    
    console.log('✅ Login successful');
    console.log('Token:', loginResponse.data.token.substring(0, 50) + '...');
    console.log('User:', loginResponse.data.user.name);
    console.log('Role:', loginResponse.data.user.role);
    console.log('Department:', loginResponse.data.user.department);
    
    const token = loginResponse.data.token;

    // 2. Test Profile Endpoint
    console.log('\n2. Testing Profile Endpoint...');
    const profileResponse = await axios.get(`${API_BASE}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Profile endpoint working');
    console.log('User from profile:', profileResponse.data.user.name);

    // 3. Test Projects Endpoint
    console.log('\n3. Testing Projects Endpoint...');
    const projectsResponse = await axios.get(`${API_BASE}/projects`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Projects endpoint working');
    console.log('Number of projects:', projectsResponse.data.length);

    // 4. Test Create Project
    console.log('\n4. Testing Create Project...');
    const newProject = {
      name: 'Test Project',
      department: 'IT',
      urgency: 'medium',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      budget: 50000
    };
    
    const createResponse = await axios.post(`${API_BASE}/projects/create`, newProject, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Project creation successful');
    console.log('Created project:', createResponse.data.name);

    // 5. Test Projects After Creation
    console.log('\n5. Testing Projects After Creation...');
    const projectsAfterResponse = await axios.get(`${API_BASE}/projects`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Projects after creation:', projectsAfterResponse.data.length);

    console.log('\n🎉 All tests passed! Authentication flow is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAuthFlow(); 