#!/usr/bin/env node

/**
 * OpenCode Git Workflow Skills - Uninstallation Script
 * 
 * This script removes the skill directories (with SKILL.md) from the user's
 * OpenCode skills directories.
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

/**
 * Get all target directories where skills might be installed.
 */
function getTargetSkillDirectories() {
  const homeDir = os.homedir();
  
  return [
    // OpenCode standard paths
    path.join(homeDir, '.opencode', 'skills'),
    path.join(homeDir, '.config', 'opencode', 'skills'),
    // Claude-compatible paths
    path.join(homeDir, '.claude', 'skills'),
    path.join(homeDir, '.agents', 'skills'),
    // Legacy path (backward compatibility)
    path.join(homeDir, '.opencodeskills'),
  ];
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

/**
 * Recursively remove a directory
 */
function removeDirectory(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      const curPath = path.join(dir, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDirectory(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dir);
  }
}

function uninstallSkills() {
  log('\n' + '='.repeat(60), 'bright');
  log('Use Git - OpenCode Skills Uninstallation', 'bright');
  log('='.repeat(60) + '\n', 'bright');

  const targetDirs = getTargetSkillDirectories();
  const sourceDir = getPackageSkillsDir();

  // Get skill directory names from package
  let skillNames = [];
  if (fs.existsSync(sourceDir)) {
    skillNames = fs.readdirSync(sourceDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
  } else {
    // Fallback: known skill names
    skillNames = ['git-workflow', 'git-master'];
  }

  if (skillNames.length === 0) {
    log('No skills to uninstall.\n', 'yellow');
    return;
  }

  log(`Found ${skillNames.length} skill(s) to remove:\n`, 'blue');
  skillNames.forEach(name => log(`  - ${name}`, 'cyan'));
  log('');

  let totalRemoved = 0;
  let totalNotFound = 0;
  let totalFailed = 0;

  for (const targetDir of targetDirs) {
    if (!fs.existsSync(targetDir)) {
      continue;
    }

    for (const skillName of skillNames) {
      const skillPath = path.join(targetDir, skillName);
      
      if (fs.existsSync(skillPath)) {
        try {
          removeDirectory(skillPath);
          log(`  ✓ Removed ${skillName} from ${targetDir}`, 'green');
          totalRemoved++;
        } catch (error) {
          log(`  ✗ Failed to remove ${skillName} from ${targetDir}: ${error.message}`, 'red');
          totalFailed++;
        }
      } else {
        totalNotFound++;
      }
    }
  }

  // Summary
  log('\n' + '='.repeat(60), 'bright');
  log('Uninstallation Summary', 'bright');
  log('='.repeat(60) + '\n', 'bright');

  if (totalRemoved > 0) {
    log(`✓ Removed: ${totalRemoved} skill(s)`, 'green');
  }
  if (totalNotFound > 0 && totalRemoved === 0) {
    log(`○ Not installed: ${skillNames.length} skill(s)`, 'yellow');
  }
  if (totalFailed > 0) {
    log(`✗ Failed: ${totalFailed} skill(s)`, 'red');
  }

  log('\n' + '-'.repeat(60), 'bright');
  log('Next Steps:', 'bright');
  log('-'.repeat(60), 'bright');
  log('1. Restart OpenCode or use /skill reload', 'cyan');
  log('2. Verify removal: /skill list\n', 'cyan');

  if (totalFailed > 0) {
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
