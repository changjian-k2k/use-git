#!/usr/bin/env node

/**
 * OpenCode Git Workflow Skills - Uninstallation Script
 * 
 * This script removes the skill files from the user's OpenCode skills directory
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
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getSkillsDirectory() {
  const homeDir = os.homedir();
  return path.join(homeDir, '.opencodeskills');
}

function getPackageSkillsDir() {
  let currentDir = __dirname;
  
  while (currentDir !== path.parse(currentDir).root) {
    const skillsDir = path.join(currentDir, 'skills');
    if (fs.existsSync(skillsDir)) {
      return skillsDir;
    }
    currentDir = path.dirname(currentDir);
  }
  
  return path.join(__dirname, '..', 'skills');
}

function uninstallSkills() {
  log('\n' + '='.repeat(60), 'bright');
  log('OpenCode Git Workflow Skills - Uninstallation', 'bright');
  log('='.repeat(60) + '\n', 'bright');

  const targetDir = getSkillsDirectory();
  const sourceDir = getPackageSkillsDir();

  // Check if target directory exists
  if (!fs.existsSync(targetDir)) {
    log('OpenCode skills directory not found.', 'yellow');
    log('Nothing to uninstall.\n', 'yellow');
    return;
  }

  // Get skill files from package
  let skillFiles = [];
  if (fs.existsSync(sourceDir)) {
    skillFiles = fs.readdirSync(sourceDir)
      .filter(file => file.endsWith('.skill'));
  } else {
    // Fallback: try to uninstall known skill files
    skillFiles = [
      'git-workflow.skill',
      'git-master.skill'
    ];
  }

  if (skillFiles.length === 0) {
    log('No skills to uninstall.\n', 'yellow');
    return;
  }

  log(`Found ${skillFiles.length} skill file(s) to remove:\n`, 'blue');

  let removed = 0;
  let notFound = 0;
  let failed = 0;

  skillFiles.forEach(filename => {
    const targetPath = path.join(targetDir, filename);
    
    if (fs.existsSync(targetPath)) {
      try {
        fs.unlinkSync(targetPath);
        log(`✓ Removed: ${filename}`, 'green');
        removed++;
      } catch (error) {
        log(`✗ Failed to remove ${filename}: ${error.message}`, 'red');
        failed++;
      }
    } else {
      log(`○ Not found: ${filename}`, 'yellow');
      notFound++;
    }
  });

  // Summary
  log('\n' + '='.repeat(60), 'bright');
  log('Uninstallation Summary', 'bright');
  log('='.repeat(60) + '\n', 'bright');

  if (removed > 0) {
    log(`✓ Removed: ${removed} skill(s)`, 'green');
  }
  if (notFound > 0) {
    log(`○ Not installed: ${notFound} skill(s)`, 'yellow');
  }
  if (failed > 0) {
    log(`✗ Failed: ${failed} skill(s)`, 'red');
  }

  log('\n' + '-'.repeat(60), 'bright');
  log('Next Steps:', 'bright');
  log('-'.repeat(60), 'bright');
  log('1. Restart OpenCode or use /skill reload', 'cyan');
  log('2. Verify removal: /skill list\n', 'cyan');

  if (failed > 0) {
    process.exit(1);
  }
}

// Ask for confirmation if running interactively
if (process.stdin.isTTY) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Are you sure you want to uninstall Git Workflow skills? (y/N) ', (answer) => {
    rl.close();
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      uninstallSkills();
    } else {
      log('\nUninstallation cancelled.', 'yellow');
      process.exit(0);
    }
  });
} else {
  // Non-interactive mode (e.g., npm uninstall)
  uninstallSkills();
}
