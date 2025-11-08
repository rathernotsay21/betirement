#!/usr/bin/env node

/**
 * Content Backup Script
 * Creates a backup of all content files
 * Usage: node scripts/backup-content.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BACKUP_DIR = path.join(process.cwd(), 'backups');
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
const BACKUP_NAME = `betirement-backup-${TIMESTAMP}`;
const BACKUP_PATH = path.join(BACKUP_DIR, BACKUP_NAME);

console.log('💾 Creating content backup...\n');

/**
 * Create backup directory
 */
function createBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log('✅ Created backups directory');
  }
  
  if (!fs.existsSync(BACKUP_PATH)) {
    fs.mkdirSync(BACKUP_PATH, { recursive: true });
    console.log(`✅ Created backup directory: ${BACKUP_NAME}\n`);
  }
}

/**
 * Copy directory recursively
 */
function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️  Source directory not found: ${src}`);
    return false;
  }
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  
  return true;
}

/**
 * Copy file
 */
function copyFile(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️  Source file not found: ${src}`);
    return false;
  }
  
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  fs.copyFileSync(src, dest);
  return true;
}

/**
 * Backup blog posts
 */
function backupBlogPosts() {
  console.log('📝 Backing up blog posts...');
  const src = path.join(process.cwd(), 'src/data/blog');
  const dest = path.join(BACKUP_PATH, 'blog');
  
  if (copyDirectory(src, dest)) {
    const files = fs.readdirSync(dest).filter(f => f.endsWith('.md'));
    console.log(`✅ Backed up ${files.length} blog posts\n`);
  }
}

/**
 * Backup images
 */
function backupImages() {
  console.log('🖼️  Backing up images...');
  const src = path.join(process.cwd(), 'public/images');
  const dest = path.join(BACKUP_PATH, 'images');
  
  if (copyDirectory(src, dest)) {
    console.log('✅ Backed up images\n');
  }
}

/**
 * Backup data files
 */
function backupDataFiles() {
  console.log('📊 Backing up data files...');
  const dataFiles = [
    'src/data/resources/resources.json',
    'src/data/testimonials/testimonials.json',
    'src/data/glossary/terms.json',
    'src/data/quiz/start-here-quiz.json',
    'src/data/community/membership-tiers.json'
  ];
  
  let backedUp = 0;
  for (const file of dataFiles) {
    const src = path.join(process.cwd(), file);
    const dest = path.join(BACKUP_PATH, 'data', path.basename(file));
    
    if (copyFile(src, dest)) {
      backedUp++;
    }
  }
  
  console.log(`✅ Backed up ${backedUp} data files\n`);
}

/**
 * Backup configuration files
 */
function backupConfigFiles() {
  console.log('⚙️  Backing up configuration files...');
  const configFiles = [
    'src/config/site.ts',
    'src/config/navigation.ts',
    'next.config.mjs',
    'tailwind.config.ts',
    'netlify.toml',
    '.env.example',
    'package.json'
  ];
  
  let backedUp = 0;
  for (const file of configFiles) {
    const src = path.join(process.cwd(), file);
    const dest = path.join(BACKUP_PATH, 'config', path.basename(file));
    
    if (copyFile(src, dest)) {
      backedUp++;
    }
  }
  
  console.log(`✅ Backed up ${backedUp} configuration files\n`);
}

/**
 * Backup documentation
 */
function backupDocumentation() {
  console.log('📚 Backing up documentation...');
  const src = path.join(process.cwd(), 'docs');
  const dest = path.join(BACKUP_PATH, 'docs');
  
  if (copyDirectory(src, dest)) {
    console.log('✅ Backed up documentation\n');
  }
}

/**
 * Create backup manifest
 */
function createManifest() {
  console.log('📋 Creating backup manifest...');
  
  const manifest = {
    backupDate: new Date().toISOString(),
    backupName: BACKUP_NAME,
    contents: {
      blogPosts: fs.existsSync(path.join(BACKUP_PATH, 'blog')),
      images: fs.existsSync(path.join(BACKUP_PATH, 'images')),
      dataFiles: fs.existsSync(path.join(BACKUP_PATH, 'data')),
      configFiles: fs.existsSync(path.join(BACKUP_PATH, 'config')),
      documentation: fs.existsSync(path.join(BACKUP_PATH, 'docs'))
    },
    notes: [
      'This backup includes all content files, images, and configuration.',
      'To restore, copy files back to their original locations.',
      'Environment variables are NOT included - refer to .env.example.',
      'Database backups (if applicable) should be done separately.'
    ]
  };
  
  const manifestPath = path.join(BACKUP_PATH, 'MANIFEST.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log('✅ Created backup manifest\n');
}

/**
 * Create README for backup
 */
function createBackupReadme() {
  const readme = `# Betirement Content Backup

**Backup Date:** ${new Date().toISOString()}

## Contents

This backup includes:

- Blog posts (Markdown files)
- Images and assets
- Data files (JSON)
- Configuration files
- Documentation

## Restoration

To restore from this backup:

1. Copy blog posts from \`blog/\` to \`src/data/blog/\`
2. Copy images from \`images/\` to \`public/images/\`
3. Copy data files from \`data/\` to \`src/data/\`
4. Copy config files from \`config/\` to project root (review before overwriting)
5. Copy documentation from \`docs/\` to \`docs/\`

## Important Notes

- Environment variables are NOT included in this backup
- Refer to \`.env.example\` for required environment variables
- Database backups (if applicable) should be restored separately
- Test thoroughly after restoration

## Backup Verification

Check that all expected files are present:

\`\`\`bash
# Count blog posts
ls blog/*.md | wc -l

# Check images directory
ls -R images/

# Verify data files
ls data/*.json
\`\`\`

## Support

For questions about this backup, refer to:
- \`docs/DEPLOYMENT.md\`
- \`docs/ENVIRONMENT_VARIABLES.md\`
- Project README.md
`;
  
  const readmePath = path.join(BACKUP_PATH, 'README.md');
  fs.writeFileSync(readmePath, readme);
}

/**
 * Calculate backup size
 */
function calculateBackupSize() {
  try {
    const output = execSync(`du -sh "${BACKUP_PATH}"`, { encoding: 'utf8' });
    const size = output.split('\t')[0];
    return size;
  } catch {
    return 'Unknown';
  }
}

/**
 * Print summary
 */
function printSummary() {
  console.log('='.repeat(60));
  console.log('📊 BACKUP SUMMARY');
  console.log('='.repeat(60) + '\n');
  
  console.log(`Backup Name: ${BACKUP_NAME}`);
  console.log(`Backup Location: ${BACKUP_PATH}`);
  console.log(`Backup Size: ${calculateBackupSize()}`);
  console.log(`Backup Date: ${new Date().toISOString()}\n`);
  
  console.log('Contents:');
  console.log('  ✅ Blog posts');
  console.log('  ✅ Images');
  console.log('  ✅ Data files');
  console.log('  ✅ Configuration files');
  console.log('  ✅ Documentation');
  console.log('  ✅ Backup manifest');
  console.log('  ✅ Restoration instructions\n');
  
  console.log('🎉 Backup completed successfully!\n');
  console.log(`To restore, see: ${path.join(BACKUP_PATH, 'README.md')}\n`);
}

/**
 * Main execution
 */
function main() {
  try {
    createBackupDir();
    backupBlogPosts();
    backupImages();
    backupDataFiles();
    backupConfigFiles();
    backupDocumentation();
    createManifest();
    createBackupReadme();
    printSummary();
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during backup:', error);
    process.exit(1);
  }
}

main();
