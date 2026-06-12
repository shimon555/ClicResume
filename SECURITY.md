# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in ClicResume, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, email: **shimonamsellem@gmail.com**

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if you have one)

You will receive a response within 72 hours acknowledging receipt. We will work with you to understand and address the issue before any public disclosure.

## Scope

This policy covers the ClicResume source code in this repository and the production deployment at clicresume.co.il.

## Security Model

ClicResume is designed with privacy and security as core principles:

- **No server-side data storage** — resume content stays in the user's browser (localStorage)
- **No authentication** — there are no user accounts to compromise
- **No backend API** — the public version is a static web application
- **Analytics are anonymous** — no personal data is collected
- **Dependencies are minimal** — reducing attack surface

## Supported Versions

Only the latest version deployed at clicresume.co.il is actively maintained with security updates.
