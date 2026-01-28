# GitHub Actions Workflows

This directory contains GitHub Actions workflows for running Playwright tests in CI/CD.

## Available Workflows

### 1. `playwright.yml` - Simple Workflow WITHOUT Cache (Recommended Start)
- **No package-lock.json required**
- Runs all tests in a single job
- Uses `npm install` instead of `npm ci`
- Easy to set up
- Best for projects with < 100 tests

### 2. `playwright-with-cache.yml` - Simple Workflow WITH Cache
- **Requires package-lock.json**
- Uses npm caching for faster builds
- Uses `npm ci` for deterministic installs
- Best when you have package-lock.json committed

### 3. `playwright-sharded.yml` - Sharded Workflow (For larger projects)
- Runs tests in parallel across 4 shards
- Merges reports at the end
- Best for projects with 100+ tests
- Faster execution time

## Setup Instructions

### Step 1: Choose Your Workflow

**For most projects, use the simple workflow:**
```bash
# Keep: .github/workflows/playwright.yml
# Delete: .github/workflows/playwright-sharded.yml (optional)
```

**For large test suites, use the sharded workflow:**
```bash
# Rename: playwright-sharded.yml to playwright.yml
# Or keep both and modify triggers
```

### Step 2: Configure Secrets

Add these secrets to your GitHub repository:
1. Go to `Settings` → `Secrets and variables` → `Actions`
2. Click `New repository secret`
3. Add the following:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `BASE_URL` | Your application URL | `https://your-app.com` |
| `TEST_USERNAME` | Test user email/username | `test@example.com` |
| `TEST_PASSWORD` | Test user password | `SecurePass123!` |

### Step 3: Push to GitHub

```bash
git add .github/
git commit -m "Add Playwright CI workflows"
git push
```

The workflow will automatically run on:
- Push to `main`, `master`, or `develop` branches
- Pull requests to these branches
- Manual trigger via GitHub UI

## Key Changes from v3 to v4

### ❌ Old (Deprecated - v3)
```yaml
- uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

### ✅ New (Current - v4)
```yaml
- uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 30
```

## Features

### ✅ What's Included

- **Parallel execution** (sharded workflow)
- **Artifact uploads** (reports, videos, screenshots)
- **Test result retention** (30 days for reports, 7 days for videos)
- **Environment variable support**
- **PR comments** with test results (optional)
- **GitHub Pages deployment** for reports (optional)

### 🔧 Customization Options

#### Change Node.js Version
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change to 16, 18, 20, etc.
```

#### Change Browsers
```yaml
- name: Run Playwright tests
  run: npx playwright test --project=chromium  # Only Chrome
```

#### Change Number of Shards
```yaml
strategy:
  matrix:
    shardIndex: [1, 2, 3, 4, 5, 6]  # 6 shards
    shardTotal: [6]
```

#### Run Only Specific Tests
```yaml
- name: Run Playwright tests
  run: npx playwright test tests/login.spec.ts
```

#### Add Tags
```yaml
- name: Run Smoke tests
  run: npx playwright test --grep @smoke
```

## Viewing Results

### Option 1: Artifacts Tab
1. Go to `Actions` tab in GitHub
2. Click on the workflow run
3. Scroll to `Artifacts` section
4. Download `playwright-report`

### Option 2: GitHub Pages (Optional)
Uncomment the deployment step in the workflow to publish reports to GitHub Pages.

### Option 3: PR Comments (Optional)
Install the PR comment action to see results directly in pull requests.

## Troubleshooting

### Lock File Not Found Error

**Error Message:**
```
Dependencies lock file is not found. Supported file patterns: package-lock.json
```

**Solution 1 - Use workflow without cache:**
Use `playwright.yml` (already configured without cache)

**Solution 2 - Generate package-lock.json:**
```bash
cd your-project
npm install
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

Then use `playwright-with-cache.yml` workflow.

### Tests Failing in CI but Passing Locally

**Issue**: Different environment
**Solution**: 
```yaml
env:
  CI: true
  HEADLESS: true
```

### Browser Installation Issues

**Issue**: Browsers not found
**Solution**: Ensure `--with-deps` flag is used:
```yaml
run: npx playwright install --with-deps
```

### Timeout Issues

**Issue**: Tests timing out
**Solution**: Increase timeout:
```yaml
jobs:
  test:
    timeout-minutes: 90  # Increase from 60
```

### Artifact Upload Failures

**Issue**: No files found
**Solution**: Use `if-no-files-found: ignore`:
```yaml
- uses: actions/upload-artifact@v4
  with:
    if-no-files-found: ignore
```

## Best Practices

1. ✅ **Always use latest action versions** (v4 for artifacts)
2. ✅ **Set appropriate retention days** to save storage
3. ✅ **Use matrix strategy** for parallel execution
4. ✅ **Cache npm dependencies** with `cache: 'npm'`
5. ✅ **Use secrets** for sensitive data
6. ✅ **Add conditional uploads** (`if: always()` for reports)
7. ✅ **Keep workflows DRY** with reusable workflows

## Monitoring

### View Workflow Status
```
https://github.com/YOUR_USERNAME/YOUR_REPO/actions
```

### View Test Trends
Enable GitHub Insights to track:
- Test pass/fail rates
- Execution time trends
- Flaky test detection

## Support

For issues with:
- **GitHub Actions**: https://github.com/actions
- **Playwright**: https://github.com/microsoft/playwright
- **This workflow**: Check project issues or documentation
