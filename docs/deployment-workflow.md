# Chop Chow staging and production release workflow

Tracking: [CCD-496](https://awowebops.atlassian.net/browse/CCD-496)

## Environments

| | Frontend (CCNext) | Backend (ChopChowSD) |
|---|---|---|
| Staging branch | `staging-main` | `staging-main` |
| Production branch | `main` | `master` |
| Staging service | https://staging.chopchow.app (Vercel `cc-next-dev`) | https://chopchowserver2.onrender.com (Render `chopchowserver2`) |
| Production frontend | https://www.chopchow.app | Production Render service |

Staging frontend and Vercel pull-request previews use `NEXT_PUBLIC_API_URL=https://chopchowserver2.onrender.com/api`.
Staging backend uses `APP_URL=https://staging.chopchow.app` for password-reset links and CORS.
Secrets must stay in deployment settings, never in the repository.

**Before using staging for tests that create or modify data, verify that the backend database is isolated from production.** Database isolation has not been independently confirmed as part of CCD-496.

## Day-to-day changes

1. Create a short-lived `feature/*`, `fix/*`, or `docs/*` branch from the current `staging-main` in the affected repository.
2. Open a pull request targeting `staging-main`. Review changes and ensure the CI checks pass. Never use production credentials in CI.
3. Merge into `staging-main`; Vercel and Render deploy the staging branches automatically.
4. Wait for the frontend and backend deployments to be READY/LIVE. Test the complete affected flow at **https://staging.chopchow.app**. Record the tested commits and results in Jira.
5. If a change spans frontend and backend, ensure both staging deployments are compatible before approving release.

## Production release (explicit approval required)

1. Obtain explicit release approval from the Chop Chow owner after staging acceptance. No automatic promotion from staging to production.
2. Open a pull request from `staging-main` to frontend `main` and, when backend changes are needed, from backend `staging-main` to `master`. Review the **entire** diff; staging may contain other unfinished work. If so, release only approved changes using a separate release branch or cherry-picks.
3. Confirm production-specific environment variables, payment settings, CORS, domains, database migrations and rollback plan. Do not point production to staging data or vice versa.
4. Require passing checks and reviewer approval before merge. Configure GitHub branch protection/rulesets on `main` and `master` separately; the existence/enforcement of those rules is not yet verified.
5. Merge and deploy in the dependency-safe order. Smoke-test login, password reset, ordering, and checkout against production with safe test procedures.
6. Record deployment SHA, release time, verification and rollback instructions in Jira.

## CI

- Frontend: `.github/workflows/staging-frontend-build.yml` runs the Next.js build for staging pull requests and pushes.
- Backend: `.github/workflows/staging-backend-checks.yml` runs mocked Gmail API transport tests for staging pull requests and pushes.
- CI jobs do not establish end-to-end functionality by themselves; manual staging acceptance is required.
- Verify GitHub Actions runs actually pass before making these required checks in branch protection.

## Rollback

If production verification fails, halt further promotion, roll back to the last known-good production deployment/commit, and restore compatible backend/frontend versions. Coordinate any schema rollback separately; database changes may not be reversible.
