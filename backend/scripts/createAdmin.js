const mongoose = require('mongoose');
const User = require('../models/user.model');

mongoose.connect('mongodb://localhost:27017/urbansync', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@urbansync.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@urbansync.com');
      console.log('Password: admin123');
      mongoose.disconnect();
      return;
    }

    // Create admin user
    const adminUser = new User({
      name: 'System Administrator',
      email: 'admin@urbansync.com',
      password: 'admin123',
      department: 'IT',
      role: 'admin'
    });

    await adminUser.save();
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@urbansync.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role: admin');
    console.log('🏢 Department: IT');
    
    // Create a test manager user
    const managerUser = new User({
      name: 'John Manager',
      email: 'manager@urbansync.com',
      password: 'manager123',
      department: 'Public Works',
      role: 'manager'
    });

    await managerUser.save();
    
    console.log('\n✅ Manager user created successfully!');
    console.log('📧 Email: manager@urbansync.com');
    console.log('🔑 Password: manager123');
    console.log('👤 Role: manager');
    console.log('🏢 Department: Public Works');
    
    // Create a test regular user
    const regularUser = new User({
      name: 'Jane User',
      email: 'user@urbansync.com',
      password: 'user123',
      department: 'Transportation',
      role: 'user'
    });

    await regularUser.save();
    
    console.log('\n✅ Regular user created successfully!');
    console.log('📧 Email: user@urbansync.com');
    console.log('🔑 Password: user123');
    console.log('👤 Role: user');
    console.log('🏢 Department: Transportation');
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error creating users:', error);
    mongoose.disconnect();
  }
})
.catch(err => {
  console.error('Database connection error:', err);
  mongoose.disconnect();
}); 