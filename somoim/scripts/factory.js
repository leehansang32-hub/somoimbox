const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read config
const configPath = path.join(__dirname, '../app-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

console.log(`🏭 Starting Factory for: ${config.appName}`);

// 1. Update Metadata (appName, description)
const layoutPath = path.join(__dirname, '../src/app/layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

layoutContent = layoutContent.replace(/title: ".*"/, `title: "${config.appName}"`);
layoutContent = layoutContent.replace(/description: ".*"/, `description: "${config.description}"`);

fs.writeFileSync(layoutPath, layoutContent);
console.log('✅ Updated Metadata');

// 2. Update Theme (Primary Color)
const cssPath = path.join(__dirname, '../src/app/globals.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Simple regex replacement for primary color (assuming oklch format)
if (config.theme.primaryColor) {
    cssContent = cssContent.replace(/--primary: oklch\(.*?\);/, `--primary: ${config.theme.primaryColor};`);
}

fs.writeFileSync(cssPath, cssContent);
console.log('✅ Updated Theme');

// 3. Feature Flags (Optional - for now just logging)
console.log('ℹ️  Features enabled:', config.features);

console.log('🎉 Factory Build Complete! Run "npm run dev" to see changes.');
