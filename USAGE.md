# Usage Guide

This guide provides detailed examples of how to use the Git Workflow skills in OpenCode.

## Table of Contents

- [git-workflow](#git-workflow)
  - [Feature Development](#feature-development)
  - [Merge Workflow](#merge-workflow)
  - [Verification Process](#verification-process)
- [git-master](#git-master)
  - [Commit Mode](#commit-mode)
  - [Rebase Mode](#rebase-mode)
  - [History Search Mode](#history-search-mode)

---

## git-workflow

### Feature Development

#### 1. Starting a New Feature

```
User: I need to add user authentication to the project

OpenCode: I'll create a feature branch for user authentication.

[OpenCode creates and switches to feature/user-auth branch]

Working on feature/user-auth branch...
```

#### 2. Implementing Changes

```
User: Add the login form and backend validation

OpenCode: [Makes code changes]

[OpenCode commits changes to feature/user-auth]
```

#### 3. Completing the Feature

When the feature is complete, OpenCode will prompt you:

```
Feature [user authentication] is complete on branch [feature/user-auth].

Summary:
- Added login form UI
- Implemented backend validation
- Added session management
- Added unit tests

Verification Status:
- [x] Code quality: PASS
- [x] Build/Tests: PASS
- [ ] Documentation: PENDING

Next steps:
1. Review code: git diff develop...feature/user-auth
2. Choose action:
   • 'Test it' - I'll run verification checks
   • 'Approve merge' - Merge to develop
   • 'Request changes' - I'll make adjustments
   • 'Do not merge' - Keep in feature branch

Awaiting your instruction.
```

#### 4. User Actions

**Option A: Request Testing**
```
User: Test it

OpenCode: Running verification checks...
- LSP diagnostics: PASS
- Build: PASS
- Unit tests: PASS

Verification Results for [feature/user-auth]:

Code Quality: PASS
Build Status: PASS
Tests: PASS

Ready for merge approval?
```

**Option B: Approve Merge**
```
User: Approve merge

OpenCode: ✅ Successfully merged [feature/user-auth] to develop.

Commit: a1b2c3d
Message: Merge feature/user-auth: Add user authentication

Summary:
- Login form with validation
- Backend session management
- Unit tests (coverage: 95%)

Next: Delete feature branch with `git branch -d feature/user-auth`
```

**Option C: Do Not Merge**
```
User: Do not merge

OpenCode: Understood. Branch [feature/user-auth] will remain open.
You can continue working on it or create additional changes.
```

### Merge Workflow

#### Standard Git Flow (develop branch exists)

```
Feature Branch → develop → main/master
```

#### GitHub Flow (no develop branch)

```
Feature Branch → main
```

#### Handling Merge Conflicts

```
User: Merge my feature branch

OpenCode: ⚠️ Merge conflicts detected!

Conflicts in:
- src/auth.js
- tests/auth.test.js

I'll guide you through resolution:
1. Open src/auth.js and resolve conflicts
2. Mark resolved: git add src/auth.js
3. Repeat for tests/auth.test.js
4. Complete merge: git commit

Would you like me to show the conflicting sections?
```

### Verification Process

#### Automatic Verification

OpenCode automatically runs these checks:

1. **Code Quality** (LSP diagnostics)
   - Syntax errors
   - Type errors
   - Lint violations

2. **Build Verification**
   - Compile check (if build system available)
   - Dependency resolution

3. **Tests** (if test framework configured)
   - Unit tests
   - Integration tests

#### Manual Verification

For verification that requires manual testing:

```
User: Test it

OpenCode: Automatic checks:
- LSP diagnostics: PASS
- Build: PASS
- Unit tests: PASS

Some tests require manual verification:

Please test the changes:
1. Checkout branch: feature/user-auth
2. Build/compile: npm run build
3. Run manual tests:
   - Test login with valid credentials
   - Test login with invalid credentials
   - Test session timeout
4. Report: PASS or FAIL with details

Awaiting your feedback...
```

---

## git-master

### Commit Mode

#### Creating Atomic Commits

```
User: Commit my changes

OpenCode: Analyzing changes...
Files changed: 8
Minimum commits required: 3

Detected Style:
- Language: English
- Style: SEMANTIC (feat:, fix:, etc.)
- Reference: "feat: add user model", "fix: validation bug"

Commit Plan:
============
Files changed: 8
Minimum commits required: 3
Planned commits: 4
Status: PASS

COMMIT 1: feat: add user authentication model
  - src/models/user.js
  - src/models/user.test.js
  Justification: Implementation + its test

COMMIT 2: feat: implement login controller
  - src/controllers/auth.js
  - src/controllers/auth.test.js
  Justification: Implementation + its test

COMMIT 3: feat: add authentication middleware
  - src/middleware/auth.js
  Justification: Independent middleware component

COMMIT 4: chore: update dependencies
  - package.json
  - package-lock.json
  Justification: Dependency update, separate concern

Proceed with these commits?
```

#### Style Detection

OpenCode automatically detects your project's commit style:

```
Style Detection Result
======================
Analyzed: 30 commits from git log

Language: ENGLISH
  - English commits: 28 (93%)
  - Other: 2 (7%)

Style: SEMANTIC
  - Semantic (feat:, fix:, etc): 25 (83%)
  - Plain: 3 (10%)
  - Short: 2 (7%)

Reference examples:
  1. "feat: add user authentication"
  2. "fix: resolve login timeout issue"
  3. "chore: update dependencies"

All commits will follow: ENGLISH + SEMANTIC
```

#### Commit Messages

Based on detected style:

**Semantic Style:**
```
feat: add user authentication
fix: resolve validation bug
docs: update API documentation
test: add authentication tests
refactor: simplify login logic
```

**Plain Style:**
```
Add user authentication
Fix validation bug
Update API documentation
```

### Rebase Mode

#### Squashing Commits

```
User: Squash my commits

OpenCode: Current history:
- a1b2c3d Fix typo
- b2c3d4e Add error handling
- c3d4e5f Implement login
- d4e5f6a Initial auth setup

Strategy: SQUASH into single commit

Result:
- Combined: "feat: implement user authentication"
  (includes: initial setup, login, error handling, typo fix)

Proceed with squash?
```

#### Interactive Rebase

```
User: Reorder my commits

OpenCode: Current order:
1. Add tests
2. Implement feature
3. Add model
4. Setup database

Recommended order (dependencies):
1. Setup database
2. Add model
3. Implement feature
4. Add tests

Apply this reordering?
```

#### Rebasing Onto Main

```
User: Update my branch with latest main

OpenCode: Rebasing feature/auth onto main...

Current state:
- feature/auth is 3 commits ahead of old main
- main has 5 new commits

Running: git rebase main

✅ Successfully rebased!

New history:
- main commits (5)
- feature/auth commits (3)

No conflicts! Ready to continue work.
```

### History Search Mode

#### Finding When Code Was Added

```
User: When was the authentication added?

OpenCode: Searching history...

SEARCH QUERY: "authentication"
SEARCH TYPE: PICKAXE
COMMAND USED: git log -S "authentication" --oneline

RESULTS:
  Commit       Date           Message
  ---------    ----------     --------------------------------
  a1b2c3d      2024-06-15     feat: add user authentication
  b2c3d4e      2024-05-20     refactor: extract auth logic

MOST RELEVANT COMMIT: a1b2c3d
DETAILS:
  Author: John Doe <john@example.com>
  Date: 2024-06-15
  Files changed: 5
  
Actions:
- View full commit: git show a1b2c3d
- See related: git log --ancestry-path a1b2c3d..HEAD
```

#### Finding Who Wrote Code

```
User: Who wrote this line in auth.js?

OpenCode: Running git blame...

Line 42: const token = jwt.sign(payload, secret);

^abc1234 (Jane Smith  2024-06-15 10:30:00 +0900 42) const token = jwt.sign(payload, secret);

Written by: Jane Smith <jane@example.com>
Commit: abc1234
Date: 2024-06-15 10:30:00
Message: "feat: implement JWT token generation"
```

#### Binary Search for Bugs

```
User: When did this bug start?

OpenCode: Starting git bisect...

Step 1: Mark current state
- Current commit: BAD (has bug)

Step 2: Find good commit
- Last known good: v1.2.0
- git bisect good v1.2.0

Bisecting... (3 commits to check)

Commit to test: a1b2c3d
Please test this commit and tell me if the bug exists:
- 'good' = no bug
- 'bad' = bug exists
```

## Tips and Best Practices

### 1. Always Review Before Merging

Even with automatic verification, always review:
- Code changes
- Test coverage
- Documentation updates

### 2. Keep Feature Branches Short-Lived

```
Ideal: 1-3 days
Acceptable: 1 week
Too long: > 2 weeks
```

### 3. Atomic Commits

Each commit should:
- Do one thing well
- Be reversible independently
- Have clear, descriptive message

### 4. Clean History

Before merging:
- Squash fixup commits
- Reorder if needed for clarity
- Ensure commit messages follow project style

## Common Commands Quick Reference

| Task | Example |
|------|---------|
| Create feature | "Create feature branch for user auth" |
| Complete feature | "I'm done with the feature" |
| Organize commits | "Clean up my commit history" |
| Find code origin | "When was X added?" |
| Update branch | "Update my branch with main" |
| Check author | "Who wrote this line?" |
| Find bug origin | "When did this bug start?" |

## Troubleshooting

### Skill not responding correctly

1. Check skill is loaded: `/skill list`
2. Use explicit skill trigger: `/use git-workflow ...`
3. Check OpenCode version compatibility

### Unexpected behavior

Report issues with:
- OpenCode version
- Git version
- Exact command used
- Expected vs actual behavior

---

For installation instructions, see [INSTALLATION.md](INSTALLATION.md).
