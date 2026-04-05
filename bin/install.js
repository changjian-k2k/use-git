#!/usr/bin/env node

/**
 * OpenCode Git Workflow Skills - Installation Script
 * 
 * This script installs the skill directories (with SKILL.md) to the user's
 * OpenCode skills directory following the standard SKILL.md format.
 * 
 * Standard structure:
 *   ~/.opencode/skills/<name>/SKILL.md
 *   ~/.claude/skills/<name>/SKILL.md
 *   ~/.agents/skills/<name>/SKILL.md
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

/**
 * Get all target directories where skills should be installed.
 * OpenCode searches multiple locations for skills.
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

/**
 * Recursively copy a directory
 */
function copyDirectory(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  const entries = fs.readdirSync(source, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(target, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Check if a directory is a valid skill (contains SKILL.md)
 */
function isValidSkillDir(dir) {
  return fs.existsSync(path.join(dir, 'SKILL.md'));
}

function installSkills() {
  log('\n' + '='.repeat(60), 'bright');
  log('Use Git - OpenCode Skills Installation', 'bright');
  log('='.repeat(60) + '\n', 'bright');

  // Get directories
  const targetDirs = getTargetSkillDirectories();
  const sourceDir = getPackageSkillsDir();

  log(`Source directory: ${sourceDir}`, 'cyan');
  log(`Target directories:\n`, 'cyan');
  targetDirs.forEach(dir => log(`  - ${dir}`, 'cyan'));
  log('');

  // Check if source directory exists
  if (!fs.existsSync(sourceDir)) {
    log(`Error: Skills directory not found at ${sourceDir}`, 'red');
    log('If you installed from npm, the skills should be included in the package.', 'yellow');
    process.exit(1);
  }

  // Get all skill directories (each subdirectory with SKILL.md)
  const skillDirs = fs.readdirSync(sourceDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(sourceDir, entry.name))
    .filter(dir => isValidSkillDir(dir));

  if (skillDirs.length === 0) {
    log('No valid skill directories found in the package!', 'red');
    log('Each skill must be a directory containing SKILL.md', 'yellow');
    process.exit(1);
  }

  log(`Found ${skillDirs.length} skill(s) to install:\n`, 'blue');
  skillDirs.forEach(dir => {
    const skillName = path.basename(dir);
    log(`  - ${skillName}`, 'cyan');
  });
  log('');

  // Install to each target directory
  let totalInstalled = 0;
  let totalUpdated = 0;
  let totalFailed = 0;

  for (const targetDir of targetDirs) {
    // Skip if target parent doesn't exist and can't be created
    const parentDir = path.dirname(targetDir);
    if (!fs.existsSync(parentDir)) {
      try {
        fs.mkdirSync(parentDir, { recursive: true });
      } catch (e) {
        // Skip this target if parent can't be created
        continue;
      }
    }

    // Ensure target directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    let installed = 0;
    let updated = 0;
    let failed = 0;

    for (const skillDir of skillDirs) {
      const skillName = path.basename(skillDir);
      const targetSkillDir = path.join(targetDir, skillName);
      const exists = fs.existsSync(path.join(targetSkillDir, 'SKILL.md'));
      const action = exists ? 'Updating' : 'Installing';
      
      try {
        copyDirectory(skillDir, targetSkillDir);
        if (exists) {
          updated++;
          log(`  ✓ ${action} ${skillName} → ${targetDir} (updated)`, 'green');
        } else {
          installed++;
          log(`  ✓ ${action} ${skillName} → ${targetDir}`, 'green');
        }
      } catch (error) {
        failed++;
        log(`  ✗ Failed to install ${skillName} → ${targetDir}: ${error.message}`, 'red');
      }
    }

    if (installed > 0 || updated > 0) {
      totalInstalled += installed;
      totalUpdated += updated;
      totalFailed += failed;
    }
  }

  // Summary
  log('\n' + '='.repeat(60), 'bright');
  log('Installation Summary', 'bright');
  log('='.repeat(60) + '\n', 'bright');

  if (totalInstalled > 0) {
    log(`✓ Installed: ${totalInstalled} skill(s)`, 'green');
  }
  if (totalUpdated > 0) {
    log(`✓ Updated: ${totalUpdated} skill(s)`, 'yellow');
  }
  if (totalFailed > 0) {
    log(`✗ Failed: ${totalFailed} skill(s)`, 'red');
  }

  log('\n' + '-'.repeat(60), 'bright');
  log('Next Steps:', 'bright');
  log('-'.repeat(60), 'bright');
  log('1. Restart OpenCode or use /skill reload', 'cyan');
  log('2. Verify installation: /skill list', 'cyan');
  log('3. Try it: "Help me with git workflow"\n', 'cyan');

  if (totalFailed > 0) {
    process.exit(1);
  }
}

// Run installation
installSkills();
