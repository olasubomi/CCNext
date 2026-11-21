# Developer guide

## Start here

1. Read [Infrastructure](infrastructure.md), [Deployment](deployment.md), and [Authentication](authentication.md).
2. Find the relevant Jira issue in the [CCD project](https://awowebops.atlassian.net/jira/software/projects/CCD/boards) and check linked PRs and comments.
3. Clone the relevant repository; inspect `package.json` for supported Node version and scripts rather than relying on old scaffold instructions.
4. Request access to GitHub, Vercel, Render and MongoDB from an authorized admin. Obtain environment variables via the provider's secret store; never share credentials in tickets or chat.
5. Work on a feature branch; open a PR with Jira reference, test steps and deployment impact.
6. Test against an isolated staging backend/database. Never run destructive scripts against production without approval.

## Ownership and escalation

GitHub contains source and review history. Jira tracks requirements and acceptance criteria. Vercel hosts the public frontend and an additional backend project of unverified role. Render hosts two Chop Chow backend services. MongoDB Atlas holds application data (database and cluster mappings still to be verified).

## Documentation maintenance

When a hosting account, branch, domain, API URL, environment variable **name**, or deployment procedure changes, update these docs in the same PR. Record verification date and mark unknowns explicitly. Do not document secret values.
