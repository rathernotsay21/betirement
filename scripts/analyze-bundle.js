#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes Next.js bundle size and identifies optimization opportunities
 */

const fs = require('fs');
const path = require('path');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function analyzeBundle() {
  const buildDir = path.join(process.cwd(), '.next');
  
  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  console.log('\n📦 Analyzing Next.js Bundle...\n');

  // Read build manifest
  const buildManifestPath = path.join(buildDir, 'build-manifest.json');
  if (!fs.existsSync(buildManifestPath)) {
    console.error('❌ Build manifest not found.');
    process.exit(1);
  }

  const buildManifest = JSON.parse(fs.readFileSync(buildManifestPath, 'utf8'));

  // Analyze pages
  const pages = Object.keys(buildManifest.pages);
  console.log(`📄 Total Pages: ${pages.length}\n`);

  // Analyze static directory
  const staticDir = path.join(buildDir, 'static');
  if (fs.existsSync(staticDir)) {
    const chunks = path.join(staticDir, 'chunks');
    if (fs.existsSync(chunks)) {
      const files = fs.readdirSync(chunks);
      let totalSize = 0;
      const largeFiles = [];

      files.forEach(file => {
        const filePath = path.join(chunks, file);
        const stats = fs.statSync(filePath);
        totalSize += stats.size;

        if (stats.size > 100000) { // Files larger than 100KB
          largeFiles.push({
            name: file,
            size: stats.size,
          });
        }
      });

      console.log(`📊 Chunk Analysis:`);
      console.log(`   Total chunks: ${files.length}`);
      console.log(`   Total size: ${formatBytes(totalSize)}`);
      console.log(`   Average size: ${formatBytes(totalSize / files.length)}\n`);

      if (largeFiles.length > 0) {
        console.log(`⚠️  Large Chunks (>100KB):`);
        largeFiles
          .sort((a, b) => b.size - a.size)
          .forEach(file => {
            console.log(`   ${file.name}: ${formatBytes(file.size)}`);
          });
        console.log('');
      }
    }
  }

  // Check for common optimization opportunities
  console.log('💡 Optimization Recommendations:\n');

  const recommendations = [];

  // Check for large dependencies
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
  );

  const largeDeps = [
    'moment',
    'lodash',
    'date-fns',
    'axios',
    'jquery',
  ];

  largeDeps.forEach(dep => {
    if (packageJson.dependencies?.[dep]) {
      recommendations.push(
        `Consider replacing ${dep} with a lighter alternative or use tree-shaking`
      );
    }
  });

  // Check for dynamic imports
  const appDir = path.join(process.cwd(), 'app');
  const srcDir = path.join(process.cwd(), 'src');
  
  let dynamicImportsFound = false;
  
  function checkForDynamicImports(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      if (file.isDirectory()) {
        checkForDynamicImports(path.join(dir, file.name));
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
        const content = fs.readFileSync(path.join(dir, file.name), 'utf8');
        if (content.includes('dynamic(') || content.includes('import(')) {
          dynamicImportsFound = true;
        }
      }
    });
  }

  checkForDynamicImports(appDir);
  checkForDynamicImports(srcDir);

  if (!dynamicImportsFound) {
    recommendations.push(
      'Consider using dynamic imports for heavy components (e.g., modals, charts)'
    );
  }

  // Output recommendations
  if (recommendations.length > 0) {
    recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec}`);
    });
  } else {
    console.log('✅ No major optimization opportunities detected');
  }

  console.log('\n📈 Performance Tips:\n');
  console.log('1. Use Next.js Image component for all images');
  console.log('2. Implement code splitting with dynamic imports');
  console.log('3. Minimize use of client components');
  console.log('4. Use font optimization with next/font');
  console.log('5. Enable compression in production');
  console.log('6. Implement proper caching strategies');
  console.log('7. Monitor bundle size with each deployment\n');
}

analyzeBundle();
