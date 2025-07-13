const crypto = require('crypto');

// Generate a secure random JWT secret
const generateJWTSecret = () => {
  // Generate 64 random bytes and convert to base64
  const secret = crypto.randomBytes(64).toString('base64');
  return secret;
};

// Generate multiple options
console.log('🔐 Generating secure JWT secrets...\n');

console.log('Option 1 (Base64 - Recommended):');
console.log(generateJWTSecret());
console.log();

console.log('Option 2 (Hex):');
console.log(crypto.randomBytes(64).toString('hex'));
console.log();

console.log('Option 3 (URL Safe):');
console.log(crypto.randomBytes(64).toString('base64url'));
console.log();

console.log('📋 Usage:');
console.log('1. Copy one of the secrets above');
console.log('2. Set it as JWT_SECRET environment variable');
console.log('3. Never commit this secret to version control');
console.log('4. Use different secrets for development and production');