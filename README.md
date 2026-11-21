# Chop Chow Web (CCNext)

Next.js frontend for Chop Chow's customer ordering, supplier and administrator experiences.

## Documentation

- [Infrastructure and hosting](docs/infrastructure.md)
- [Deployments and environments](docs/deployment.md)
- [Authentication and email](docs/authentication.md)
- [Developer onboarding](docs/developer-guide.md)

## Service map

Production website: https://www.chopchow.app (Vercel project `chopchow`). Backend repository: [ChopChowSD](https://github.com/olasubomi/ChopChowSD). Render backend services: `chopchowsd` (`master`) and `chopchowserver2` (`staging/ccd-490-password-reset`). Verify the production `NEXT_PUBLIC_API_URL` before declaring which backend is live.

**Known issue:** Vercel Preview currently lacks `NEXT_PUBLIC_API_URL` and fails during build. Do not copy production API credentials or database connections into Preview. See [deployment guide](docs/deployment.md).

Jira: https://awowebops.atlassian.net/browse/CCD-486. Inspect `package.json` for local commands.
