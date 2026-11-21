# Chop Chow infrastructure inventory

_Last verified: 2026-11-21. URLs and branches reflect connected hosting configuration, not a completed end-to-end traffic audit._

## Repository and hosting map

| Component | Repository | Hosting account / project | Branch | URL | Confidence |
|---|---|---|---|---|---|
| Customer-facing frontend | [CCNext](https://github.com/olasubomi/CCNext) | Vercel project `chopchow` | Production branch: verify in Vercel | https://www.chopchow.app | Domain confirmed |
| Production backend candidate | [ChopChowSD](https://github.com/olasubomi/ChopChowSD) | Render `chopchowsd` | `master` | https://chopchowsd.onrender.com | Service and branch confirmed; live frontend routing not yet traced |
| Staging backend candidate | [ChopChowSD](https://github.com/olasubomi/ChopChowSD) | Render `chopchowserver2` | `staging/ccd-490-password-reset` | https://chopchowserver2.onrender.com | Service and branch confirmed |
| Additional backend deployment | [ChopChowSD](https://github.com/olasubomi/ChopChowSD) | Vercel project `chopchowserver` | Preview seen: `hotfix/require-password-authentication` | https://chopchowserver.vercel.app | Production role **unverified** |

Render workspace: **Olasubomi O Awokoya's Workspace**, connected via `chopchowsd@gmail.com`, workspace ID `tea-csps3ti3esus73eogurg`. The two services above have auto-deploy on commit; PR previews are disabled. [Production candidate dashboard](https://dashboard.render.com/web/srv-cjoisa5he99c73d6tjbg) · [Staging candidate dashboard](https://dashboard.render.com/web/srv-clj4radae00c7383p71g).

Second connected Render workspace: **Subomi's workspace**, via `subomi@awokorp.com`, workspace ID `tea-dbvkml60tbcc738qf4q0`. **No Render services returned** as of the verification date. This does not inventory other hosting providers or prove that account owns no other resources.

Vercel projects are in the `olasubomis-projects-078efd3e` team. Frontend: `chopchow`; additional backend: `chopchowserver`.

## Important verification gaps

1. Confirm the **actual production API URL** used by the deployed frontend (Vercel production `NEXT_PUBLIC_API_URL`) before changing traffic or calling either Render service live.
2. Confirm backend MongoDB database names and isolation using secret **names / destinations only**, never copy credentials into documentation.
3. Confirm which Render service receives live authentication requests, and whether the Vercel backend project is obsolete.
4. Preview frontend builds currently fail because `NEXT_PUBLIC_API_URL` is scoped to Production only; verify a safe staging API URL and add Preview scope before rebuilding.
5. Jira task [CCD-490](https://awowebops.atlassian.net/browse/CCD-490) references Render secrets for Gmail API; confirm actual configuration before assuming email sending works.

## Security rules

Do not commit .env files, OAuth client secrets, refresh tokens, JWT secrets, database URIs with credentials, or reset tokens. Document **variable names and owning platform only**. Never point staging at production data without explicit review. Rotate compromised credentials through the relevant provider, with a coordinated rollout.
