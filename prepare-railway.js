#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing UrbanSync for Railway deployment...');

// Copy backend package.json to root for Railway
const backendPackagePath = path.join(__dirname, 'backend', 'package.json');
const rootPackagePath = path.join(__dirname, 'package.json');

if (fs.existsSync(backendPackagePath)) {
  const backendPackage = JSON.parse(fs.readFileSync(backendPackagePath, 'utf8'));
  
  // Update the start script to run server.js directly
  backendPackage.scripts.start = 'node server.js';
  
  // Write to root
  fs.writeFileSync(rootPackagePath, JSON.stringify(backendPackage, null, 2));
  console.log('✅ Copied backend package.json to root');
  
  // Copy server.js to root
  const serverPath = path.join(__dirname, 'backend', 'server.js');
  const rootServerPath = path.join(__dirname, 'server.js');
  
  if (fs.existsSync(serverPath)) {
    fs.copyFileSync(serverPath, rootServerPath);
    console.log('✅ Copied server.js to root');
  }
  
  // Copy other backend files
  const backendFiles = [
    'models',
    'routes', 
    'middleware',
    'scripts'
  ];
  
  backendFiles.forEach(dir => {
    const srcPath = path.join(__dirname, 'backend', dir);
    const destPath = path.join(__dirname, dir);
    
    if (fs.existsSync(srcPath)) {
      if (fs.lstatSync(srcPath).isDirectory()) {
        // Copy directory recursively
        copyDir(srcPath, destPath);
        console.log(`✅ Copied ${dir} directory to root`);
      } else {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Copied ${dir} to root`);
      }
    }
  });
  
  console.log('🎉 Railway preparation complete!');
} else {
  console.error('❌ Backend package.json not found');
  process.exit(1);
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
} 