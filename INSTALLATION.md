# Installation Guide

## Prerequisites

- [OpenCode](https://github.com/opencode-ai/opencode) installed and configured
- Git 2.20+ installed
- Basic Git knowledge

## Installation Methods

### Method 1: Direct Copy (Recommended)

1. **Clone this repository:**
```bash
git clone https://github.com/yourusername/opencodeskills-git-workflow.git
cd opencodeskills-git-workflow
```

2. **Copy skill files to OpenCode directory:**

**macOS/Linux:**
```bash
# Create skills directory if not exists
mkdir -p ~/.opencodeskills

# Copy skills
cp *.skill ~/.opencodeskills/

# Verify installation
ls ~/.opencodeskills/
```

**Windows:**
```powershell
# Create skills directory if not exists
mkdir %USERPROFILE%\.opencodeskills 2>nul

# Copy skills
copy *.skill %USERPROFILE%\.opencodeskills\

# Verify installation
dir %USERPROFILE%\.opencodeskills\
```

3. **Restart OpenCode or reload skills:**
   - Restart OpenCode application, OR
   - Use command: `/skill reload` in OpenCode chat

### Method 2: Symlink (For Development)

If you want to contribute or frequently update skills:

**macOS/Linux:**
```bash
git clone https://github.com/yourusername/opencodeskills-git-workflow.git
cd opencodeskills-git-workflow

# Create symlinks
ln -sf "$(pwd)/git-workflow.skill" ~/.opencodeskills/git-workflow.skill
ln -sf "$(pwd)/git-master.skill" ~/.opencodeskills/git-master.skill
```

**Windows (PowerShell as Administrator):**
```powershell
git clone https://github.com/yourusername/opencodeskills-git-workflow.git
cd opencodeskills-git-workflow

# Create symlinks
New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\.opencodeskills\git-workflow.skill" -Target "$(pwd)\git-workflow.skill"
New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\.opencodeskills\git-master.skill" -Target "$(pwd)\git-master.skill"
```

### Method 3: One-liner Installation

**macOS/Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/yourusername/opencodeskills-git-workflow/main/install.sh | bash
```

**Windows (PowerShell):**
```powershell
iwr -useb https://raw.githubusercontent.com/yourusername/opencodeskills-git-workflow/main/install.ps1 | iex
```

## Verification

After installation, verify skills are loaded:

1. **List loaded skills in OpenCode:**
   ```
   /skill list
   ```

2. **Test git-workflow skill:**
   ```
   Create a feature branch for user authentication
   ```

3. **Test git-master skill:**
   ```
   Help me organize my commits before pushing
   ```

## Directory Structure

Your OpenCode skills directory should look like this after installation:

```
~/.opencodeskills/
├── git-workflow.skill      # Git Flow workflow rules
├── git-master.skill        # Advanced Git operations
└── ... (other skills)
```

## Uninstallation

To remove these skills:

**macOS/Linux:**
```bash
rm ~/.opencodeskills/git-workflow.skill
rm ~/.opencodeskills/git-master.skill
```

**Windows:**
```powershell
del %USERPROFILE%\.opencodeskills\git-workflow.skill
del %USERPROFILE%\.opencodeskills\git-master.skill
```

Then restart OpenCode.

## Troubleshooting

### Skills not showing up

1. **Check directory location:**
   - macOS/Linux: `~/.opencodeskills/`
   - Windows: `%USERPROFILE%\.opencodeskills\`

2. **Verify file permissions:**
   ```bash
   # macOS/Linux
   ls -la ~/.opencodeskills/
   ```

3. **Restart OpenCode completely** (not just the chat session)

4. **Check OpenCode version** (requires version X.X.X+)

### Invalid skill format

If OpenCode reports invalid skill format:

1. Ensure `.skill` files are valid JSON
2. Check for syntax errors with:
   ```bash
   # macOS/Linux
   python3 -m json.tool git-workflow.skill > /dev/null && echo "Valid JSON"
   
   # Windows
   python -m json.tool git-workflow.skill > nul && echo Valid JSON
   ```

### Conflicts with other skills

These skills may conflict with other Git-related skills. To resolve:

1. Remove conflicting skills, OR
2. Rename skill files to change priority, OR
3. Use explicit skill selection in OpenCode:
   ```
   /use git-workflow
   Create a feature branch...
   ```

## Next Steps

After installation, see [USAGE.md](USAGE.md) for detailed usage examples.

## Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/opencodeskills-git-workflow/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/opencodeskills-git-workflow/discussions)
