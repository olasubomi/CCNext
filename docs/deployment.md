# Deployments and environments

## Deployment workflow

- Backend source: [ChopChowSD](https://github.com/olasubomi/ChopChowSD). Render `chopchowsd` auto-deploys commits on `master`; `chopchowserver2` auto-deploys commits on `staging/ccd-490-password-reset`.
- Frontend source: [CCNext](https://github.com/olasubomi/CCNext). Vercel project `chopchow` serves `www.chopchow.app`; verify production branch in Vercel before releases.
- Extra backend Vercel project `chopchowserver` exists. Its role is unconfirmed; **do not deploy there as a replacement for Render** without an architecture decision.
- Documentation-only changes should use a PR. Backend branches with auto-deploy must be treated as deploy triggers.

## Before staging QA

1. Verify the staging Render API URL, health, branch and database isolation.
2. Configure frontend Preview `NEXT_PUBLIC_API_URL` to the approved staging API URL. It is currently Production-only, causing `NEXT_PUBLIC_API_URL must be set for deployed environments` at build time.
3. Resolve Axios `get` import warnings in `pages/marketplace/index.js` and `src/components/public-market/input.jsx`.
4. Redeploy Preview; Next.js `NEXT_PUBLIC_*` variables are embedded at build time.
5. Test customer, supplier and admin manual login; Google ID-token verification; forgot/reset password (single-use and expiry); store-admin invites; failed and unauthorized cases.
6. Review the related Jira tasks and GitHub PRs before any merge.

## Production release checklist

- PR reviewed, automated tests pass, staging end-to-end tests pass.
- Production frontend-to-backend URL and MongoDB database verified.
- Secrets provisioned in hosting provider; no secret values in logs, GitHub or Jira.
- Rollback deployment identified; expected session invalidation communicated if JWT secrets rotate.
- Merge/deploy deliberately, monitor error logs and auth flows, update Jira with evidence.

## References

[Jira CCD board](https://awowebops.atlassian.net/jira/software/projects/CCD/boards) · [Security hotfix CCD-486](https://awowebops.atlassian.net/browse/CCD-486) · [User endpoints CCD-489](https://awowebops.atlassian.net/browse/CCD-489) · [Gmail API CCD-490](https://awowebops.atlassian.net/browse/CCD-490).
