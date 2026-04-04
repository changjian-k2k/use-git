#!/usr/bin/env node

/**
 * OpenCode Git Workflow Skills - Installation Script
 * 
 * This script installs the skill files to the user's OpenCode skills directory
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getSkillsDirectory() {
  const homeDir = os.homedir();
  
  switch (process.platform) {
    case 'win32':
      return path.join(homeDir, '.opencodeskills');
    case 'darwin':
    case 'linux':
    default:
      return path.join(homeDir, '.opencodeskills');
  }
}

function getPackageSkillsDir() {
  // Find the package root (where skills/ directory exists)
  let currentDir = __dirname;
  
  while (currentDir !== path.parse(currentDir).root) {
    const skillsDir = path.join(currentDir, 'skills');
    if (fs.existsSync(skillsDir)) {
      return skillsDir;
    }
    currentDir = path.dirname(currentDir);
  }
  
  // Fallback to relative path from bin/
  return path.join(__dirname, '..', 'skills');
}

function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    log(`Created directory: ${dir}`, 'cyan');
  }
}

function copySkillFile(source, target) {
  try {
    fs.copyFileSync(source, target);
    return true;
  } catch (error) {
    log(`Error copying ${path.basename(source)}: ${error.message}`, 'red');
    return false;
  }
}

function installSkills() {
  log('\n' + '='.repeat(60), 'bright');
  log('OpenCode Git Workflow Skills - Installation', 'bright');
  log('='.repeat(60) + '\n', 'bright');

  // Get directories
  const targetDir = getSkillsDirectory();
  const sourceDir = getPackageSkillsDir();

  log(`Source directory: ${sourceDir}`, 'cyan');
  log(`Target directory: ${targetDir}\n`, 'cyan');

  // Ensure target directory exists
  ensureDirectoryExists(targetDir);

  // Check if source directory exists
  if (!fs.existsSync(sourceDir)) {
    log(`Error: Skills directory not found at ${sourceDir}`, 'red');
    log('If you installed from npm, the skills should be included in the package.', 'yellow');
    process.exit(1);
  }

  // Get all skill files
  const skillFiles = fs.readdirSync(sourceDir)
    .filter(file => file.endsWith('.skill'))
    .map(file => ({
      name: file,
      source: path.join(sourceDir, file),
      target: path.join(targetDir, file)
    }));

  if (skillFiles.length === 0) {
    log('No skill files found in the package!', 'red');
    process.exit(1);
  }

  log(`Found ${skillFiles.length} skill file(s) to install:\n`, 'blue');

  // Install each skill file
  let installed = 0;
  let skipped = 0;
  let failed = 0;

  skillFiles.forEach(skill => {
    const exists = fs.existsSync(skill.target);
    const action = exists ? 'Updating' : 'Installing';
    
    log(`${action} ${skill.name}...`, exists ? 'yellow' : 'green');
    
    if (copySkillFile(skill.source, skill.target)) {
      if (exists) {
        skipped++;
        log(`  ✓ Updated`, 'green');
      } else {
        installed++;
        log(`  ✓ Installed`, 'green');
      }
    } else {
      failed++;
      log(`  ✗ Failed`, 'red');
    }
  });

  // Summary
  log('\n' + '='.repeat(60), 'bright');
  log('Installation Summary', 'bright');
  log('='.repeat(60) + '\n', 'bright');

  if (installed > 0) {
    log(`✓ Installed: ${installed} skill(s)`, 'green');
  }
  if (skipped > 0) {
    log(`✓ Updated: ${skipped} skill(s)`, 'yellow');
  }
  if (failed > 0) {
    log(`✗ Failed: ${failed} skill(s)`, 'red');
  }

  log('\n' + '-'.repeat(60), 'bright');
  log('Next Steps:', 'bright');
  log('-'.repeat(60), 'bright');
  log('1. Restart OpenCode or use /skill reload', 'cyan');
  log('2. Verify installation: /skill list', 'cyan');
  log('3. Try it: "Help me with git workflow"\n', 'cyan');

  if (failed > 0) {
    process.exit(1);
  }
}

// Run installation
installSkills();
