/**
 * OpenCode Git Workflow Skills
 * 
 * Git workflow skills for OpenCode AI agent platform
 * 
 * @module opencodeskills-git-workflow
 * @version 2.1.0
 * @author OpenCode Community
 * @license MIT
 */

const path = require('path');
const fs = require('fs');

/**
 * Get the path to the skills directory
 * @returns {string} Path to skills directory
 */
function getSkillsDirectory() {
  return path.join(__dirname, 'skills');
}

/**
 * Get list of available skill files
 * @returns {string[]} Array of skill file names
 */
function getSkillFiles() {
  const skillsDir = getSkillsDirectory();
  if (!fs.existsSync(skillsDir)) {
    return [];
  }
  return fs.readdirSync(skillsDir)
    .filter(file => file.endsWith('.skill'));
}

/**
 * Get full path to a specific skill file
 * @param {string} skillName - Name of the skill (with or without .skill extension)
 * @returns {string|null} Full path to skill file or null if not found
 */
function getSkillPath(skillName) {
  if (!skillName.endsWith('.skill')) {
    skillName += '.skill';
  }
  const skillPath = path.join(getSkillsDirectory(), skillName);
  return fs.existsSync(skillPath) ? skillPath : null;
}

/**
 * Read skill file content
 * @param {string} skillName - Name of the skill
 * @returns {object|null} Parsed skill JSON or null if not found/invalid
 */
function readSkill(skillName) {
  const skillPath = getSkillPath(skillName);
  if (!skillPath) {
    return null;
  }
  
  try {
    const content = fs.readFileSync(skillPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading skill ${skillName}:`, error.message);
    return null;
  }
}

/**
 * Get information about all available skills
 * @returns {object[]} Array of skill information objects
 */
function getSkillsInfo() {
  const skillFiles = getSkillFiles();
  return skillFiles.map(file => {
    const skillName = file.replace('.skill', '');
    const skillData = readSkill(skillName);
    return {
      name: skillName,
      file: file,
      version: skillData?.version || 'unknown',
      description: skillData?.description || 'No description',
      author: skillData?.author || 'Unknown'
    };
  });
}

/**
 * Install skills to OpenCode skills directory
 * @returns {boolean} True if installation was successful
 */
function install() {
  const { execSync } = require('child_process');
  try {
    execSync('node ' + path.join(__dirname, 'bin', 'install.js'), {
      stdio: 'inherit'
    });
    return true;
  } catch (error) {
    console.error('Installation failed:', error.message);
    return false;
  }
}

/**
 * Uninstall skills from OpenCode skills directory
 * @returns {boolean} True if uninstallation was successful
 */
function uninstall() {
  const { execSync } = require('child_process');
  try {
    execSync('node ' + path.join(__dirname, 'bin', 'uninstall.js'), {
      stdio: 'inherit'
    });
    return true;
  } catch (error) {
    console.error('Uninstallation failed:', error.message);
    return false;
  }
}

// Export API
module.exports = {
  getSkillsDirectory,
  getSkillFiles,
  getSkillPath,
  readSkill,
  getSkillsInfo,
  install,
  uninstall,
  version: '2.1.0'
};

// If run directly, show info
if (require.main === module) {
  console.log('\n==================================');
  console.log('OpenCode Git Workflow Skills');
  console.log('==================================\n');
  
  const skills = getSkillsInfo();
  console.log('Available Skills:');
  console.log('-'.repeat(40));
  
  skills.forEach(skill => {
    console.log(`\n📦 ${skill.name}`);
    console.log(`   Version: ${skill.version}`);
    console.log(`   Description: ${skill.description}`);
    console.log(`   Author: ${skill.author}`);
  });
  
  console.log('\n' + '-'.repeat(40));
  console.log('\nTo install these skills:');
  console.log('  npm run install');
  console.log('  or: node bin/install.js');
  console.log('\nTo uninstall:');
  console.log('  npm run uninstall');
  console.log('  or: node bin/uninstall.js\n');
}
