#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting UrbanSync Backend...');
console.log('Current directory:', process.cwd());

// Change to backend directory
process.chdir(path.join(__dirname, 'backend'));

console.log('Changed to backend directory:', process.cwd());

// Start the backend server
const server = spawn('npm', ['start'], {
  stdio: 'inherit',
  shell: true
});

server.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

server.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(code);
}); 