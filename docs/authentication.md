# Authentication and transactional email

## Distinct systems

- **Manual login:** Backend validates email/password and issues a session or token. **Gmail API is not involved.** Never accept client-controlled authentication bypasses such as `withAuth: false`.
- **Google login:** Backend verifies Google ID-token signature, audience, issuer, expiry and verified email. Link providers to an existing user only after identity checks.
- **Gmail API:** Sends transactional emails (password reset, email verification, invitations and later order notifications). It is **not** a login provider. Sender planned in [CCD-490](https://awowebops.atlassian.net/browse/CCD-490): `chopchowsd@gmail.com`. Delivery is not yet independently verified.
- **Password reset:** Send an HTTPS link with short-lived, single-use, securely stored token; validate server-side, invalidate on use, and return safe errors.
- **Store-admin invitation:** Scoped to store/role, expires, revocable, single-use; link does not authenticate the recipient. Acceptance requires verified account ownership.

## Tracking

- [CCD-486](https://awowebops.atlassian.net/browse/CCD-486): P0 passwordless bypass and credential rotation; backend draft PR #216, frontend draft PR #264 referenced in task.
- [CCD-489](https://awowebops.atlassian.net/browse/CCD-489): P0 sensitive user endpoints and token/session security.
- [CCD-487](https://awowebops.atlassian.net/browse/CCD-487): Google identity verification.
- [CCD-488](https://awowebops.atlassian.net/browse/CCD-488): Store-admin invitation workflow.
- [CCD-490](https://awowebops.atlassian.net/browse/CCD-490): Gmail API; backend PR #219 and frontend PR #269 referenced in task.
- [CCD-491](https://awowebops.atlassian.net/browse/CCD-491): Evaluate Resend **later**, after Gmail API metrics.

Jira issue status is not proof of deployed behavior. Verify code, CI, staging and production separately. Do not paste tokens or email addresses from live users into public logs.
