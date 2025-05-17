const fs = require('fs-extra');
const path = require('path');

async function main() {
  // Ensure the .next/standalone directory exists
  if (!fs.existsSync('.next/standalone')) {
    console.error('Error: .next/standalone directory not found. Run "npm run build:cloudflare" first.');
    process.exit(1);
  }

  // Copy public directory to .next/standalone/public
  console.log('Copying public directory...');
  await fs.copy('public', '.next/standalone/public');

  // Copy .next/static to .next/standalone/.next/static
  console.log('Copying .next/static directory...');
  await fs.copy('.next/static', '.next/standalone/.next/static');

  // Copy _routes.json to .next/standalone
  console.log('Copying _routes.json...');
  await fs.copy('_routes.json', '.next/standalone/_routes.json');

  console.log('Deployment preparation complete!');
  console.log('You can now run "npm run pages:deploy" to deploy to Cloudflare Pages.');
}

main().catch(err => {
  console.error('Error during deployment preparation:', err);
  process.exit(1);
});
