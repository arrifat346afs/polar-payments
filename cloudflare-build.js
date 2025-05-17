const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to execute shell commands
function exec(command) {
  console.log(`Executing: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
    process.exit(1);
  }
}

// Main build function
async function build() {
  console.log('Starting Cloudflare Pages build process...');
  
  // Install dependencies with legacy-peer-deps
  console.log('Installing dependencies...');
  exec('npm install --legacy-peer-deps');
  
  // Run the Cloudflare Next.js build
  console.log('Building with @cloudflare/next-on-pages...');
  exec('npx @cloudflare/next-on-pages');
  
  // Ensure the output directory exists
  const outputDir = path.join(process.cwd(), '.vercel', 'output', 'static');
  if (!fs.existsSync(outputDir)) {
    console.error('Build failed: Output directory not found.');
    process.exit(1);
  }
  
  console.log('Build completed successfully!');
}

// Run the build
build().catch(error => {
  console.error('Build failed with error:', error);
  process.exit(1);
});
