# CI/CD Pipeline Guide

This document explains the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the Betirement website.

## Overview

The CI/CD pipeline consists of two main components:

1. **GitHub Actions**: Automated testing and validation
2. **Netlify**: Automated deployment and hosting

## GitHub Actions Workflows

### 1. CI/CD Pipeline (`.github/workflows/ci.yml`)

This workflow runs on every push and pull request to ensure code quality.

#### Triggers

- Push to `main` or `develop` branches
- Pull requests targeting `main` or `develop` branches

#### Jobs

**Lint Job**
- Runs ESLint to check code quality
- Ensures consistent code style
- Catches common errors and anti-patterns

**Build Job**
- Runs after lint job succeeds
- Creates a production build
- Verifies the application builds successfully
- Uploads build artifacts for inspection

**Type Check Job**
- Runs in parallel with build job (after lint)
- Validates TypeScript types
- Ensures type safety across the codebase

#### Workflow Diagram

```
Push/PR → Lint → Build → Success ✓
              ↘ Type Check ↗
```

### 2. Netlify Deploy Status (`.github/workflows/netlify-deploy.yml`)

This workflow provides deployment information and status.

#### Triggers

- Push to `main` branch
- Pull requests targeting `main` branch

#### Purpose

- Displays deployment information in GitHub Actions
- Shows branch and commit details
- Indicates whether it's a production or preview deployment
- Provides context for the Netlify deployment

## Netlify Deployment

### Automatic Deployments

Netlify automatically deploys the site when:

1. **Production Deployment**:
   - Trigger: Push to `main` branch
   - Destination: Production site (betirement.com)
   - Process:
     1. Netlify detects push to `main`
     2. Clones repository
     3. Installs dependencies (`npm ci`)
     4. Runs build command (`npm run build`)
     5. Deploys to production
     6. Invalidates CDN cache

2. **Preview Deployment**:
   - Trigger: Pull request opened/updated
   - Destination: Unique preview URL
   - Process:
     1. Netlify detects PR
     2. Creates preview deployment
     3. Generates unique URL
     4. Comments on PR with preview link
     5. Updates on each commit

### Build Configuration

Build settings are defined in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
```

### Deployment Flow

```
GitHub Push
    ↓
GitHub Actions (CI)
    ↓ (if passes)
Netlify Build
    ↓
Netlify Deploy
    ↓
CDN Distribution
    ↓
Live Site
```

## Status Checks

### Required Checks

Before merging a pull request, these checks must pass:

- ✓ Lint (ESLint)
- ✓ Build (Production build)
- ✓ Type Check (TypeScript)
- ✓ Netlify Preview Deploy

### Viewing Status

**In GitHub**:
- Check the "Checks" tab on any pull request
- Green checkmarks indicate passing tests
- Red X indicates failures
- Yellow circle indicates in-progress

**In Netlify**:
- Go to "Deploys" in Netlify dashboard
- View build logs for detailed information
- Check deploy status (Success, Failed, Building)

## Build Badges

### GitHub Actions Badge

Shows the status of the CI/CD pipeline:

```markdown
[![CI/CD Pipeline](https://github.com/YOUR_USERNAME/betirement-website/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/betirement-website/actions/workflows/ci.yml)
```

**Status Indicators**:
- 🟢 Green "passing" - All checks passed
- 🔴 Red "failing" - One or more checks failed
- 🟡 Yellow "running" - Checks in progress

### Netlify Status Badge

Shows the status of the latest deployment:

```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_SITE_NAME/deploys)
```

**Status Indicators**:
- 🟢 Green "success" - Deployed successfully
- 🔴 Red "failed" - Deployment failed
- 🟡 Yellow "building" - Build in progress

## Troubleshooting

### CI/CD Pipeline Failures

#### Lint Failures

**Symptoms**: ESLint job fails with errors

**Common Causes**:
- Code style violations
- Unused variables
- Missing dependencies
- Import errors

**Solutions**:
```bash
# Run lint locally
npm run lint

# Auto-fix issues
npm run lint -- --fix

# Check specific file
npx eslint path/to/file.ts
```

#### Build Failures

**Symptoms**: Build job fails during `npm run build`

**Common Causes**:
- TypeScript errors
- Missing environment variables
- Import errors
- Syntax errors

**Solutions**:
```bash
# Build locally
npm run build

# Check for errors
npm run build 2>&1 | tee build.log

# Clear cache and rebuild
rm -rf .next
npm run build
```

#### Type Check Failures

**Symptoms**: Type check job fails

**Common Causes**:
- Type mismatches
- Missing type definitions
- Incorrect type annotations

**Solutions**:
```bash
# Run type check locally
npx tsc --noEmit

# Check specific file
npx tsc --noEmit path/to/file.ts

# Install missing types
npm install --save-dev @types/package-name
```

### Netlify Deployment Failures

#### Build Timeout

**Symptoms**: Build exceeds time limit

**Solutions**:
- Optimize build process
- Remove unnecessary dependencies
- Contact Netlify support for increased limits

#### Environment Variable Errors

**Symptoms**: Build fails with "undefined" errors

**Solutions**:
- Verify all required environment variables are set in Netlify
- Check variable names match exactly (case-sensitive)
- Ensure variables are available in correct scope

#### Out of Memory

**Symptoms**: Build fails with memory errors

**Solutions**:
- Optimize build process
- Reduce bundle size
- Contact Netlify support for increased memory

## Best Practices

### Before Pushing

1. **Test locally**:
   ```bash
   npm run lint
   npm run build
   npx tsc --noEmit
   ```

2. **Fix issues before pushing**:
   - Address all lint errors
   - Fix type errors
   - Ensure build succeeds

3. **Commit clean code**:
   - Format code: `npm run format`
   - Write clear commit messages
   - Keep commits focused and atomic

### Pull Request Workflow

1. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit**:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push and create PR**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Wait for checks**:
   - All GitHub Actions checks must pass
   - Netlify preview must deploy successfully

5. **Review preview deployment**:
   - Click preview URL in Netlify bot comment
   - Test changes thoroughly
   - Verify mobile responsiveness

6. **Request review**:
   - Assign reviewers
   - Address feedback
   - Update PR as needed

7. **Merge when ready**:
   - All checks passing
   - Approved by reviewers
   - Preview deployment verified

### Deployment Best Practices

1. **Deploy during low-traffic periods**: Minimize impact on users
2. **Monitor after deployment**: Watch for errors or issues
3. **Test thoroughly in preview**: Catch issues before production
4. **Keep deployments small**: Easier to debug and rollback
5. **Document changes**: Update CHANGELOG.md for significant changes

## Monitoring

### GitHub Actions

**View workflow runs**:
1. Go to "Actions" tab in GitHub repository
2. Select workflow to view
3. Click on specific run for details
4. View logs for each job

**Enable notifications**:
1. Go to repository settings
2. Navigate to "Notifications"
3. Enable email notifications for workflow failures

### Netlify

**View deployment logs**:
1. Go to Netlify dashboard
2. Click "Deploys"
3. Select deployment to view
4. Click "Deploy log" for detailed logs

**Enable notifications**:
1. Go to "Site settings" → "Build & deploy"
2. Click "Deploy notifications"
3. Add email or Slack notifications

## Performance Optimization

### Build Time Optimization

**Current build times**:
- Lint: ~30 seconds
- Type Check: ~45 seconds
- Build: ~2-3 minutes
- Total: ~3-4 minutes

**Optimization strategies**:
1. **Cache dependencies**: Already enabled with `cache: 'npm'`
2. **Parallel jobs**: Type check runs parallel to build
3. **Incremental builds**: Next.js incremental static regeneration
4. **Optimize dependencies**: Keep `node_modules` lean

### Deployment Time Optimization

**Netlify optimizations**:
1. **Build cache**: Automatically enabled
2. **Asset optimization**: Automatic image and asset optimization
3. **CDN distribution**: Global edge network
4. **Incremental deploys**: Only changed files are updated

## Security

### Secrets Management

**GitHub Actions**:
- Use GitHub Secrets for sensitive data
- Never commit secrets to repository
- Rotate secrets periodically

**Netlify**:
- Store API keys in environment variables
- Mark sensitive variables as "Sensitive"
- Use different keys for preview and production

### Branch Protection

**Recommended settings**:
1. Require pull request reviews
2. Require status checks to pass
3. Require branches to be up to date
4. Restrict who can push to main

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Deployment Guide](./DEPLOYMENT.md)
- [Netlify Setup Guide](./NETLIFY_SETUP.md)

## Support

For CI/CD issues:
- Check workflow logs in GitHub Actions
- Review Netlify build logs
- Consult documentation
- Create issue in repository
