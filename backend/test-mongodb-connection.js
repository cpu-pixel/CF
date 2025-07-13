const mongoose = require('mongoose');

// Replace this with your actual MongoDB Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://urbansync-user:pheobo@urbansync-cluster.ts7n6zi.mongodb.net/?retryWrites=true&w=majority&appName=urbansync-cluster';

async function testConnection() {
  try {
    console.log('🔌 Testing MongoDB Atlas connection...');
    console.log('Connection string:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test creating a simple document
    const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String, timestamp: Date }));
    const testDoc = new TestModel({ name: 'connection-test', timestamp: new Date() });
    await testDoc.save();
    console.log('✅ Successfully created test document!');
    
    // Clean up
    await TestModel.deleteOne({ name: 'connection-test' });
    console.log('✅ Successfully cleaned up test document!');
    
    await mongoose.disconnect();
    console.log('✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your connection string');
    console.log('2. Verify your database username and password');
    console.log('3. Ensure your IP is whitelisted in Network Access');
    console.log('4. Check if your cluster is running');
  }
}

testConnection(); 