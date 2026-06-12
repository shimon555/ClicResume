# Contributing to ClicResume

Thank you for your interest in contributing. ClicResume exists to help people create professional resumes for free, and every contribution helps further that mission.

## How to Contribute

### Report Bugs

Found something broken? [Open a bug report](../../issues/new?template=bug_report.yml). Include steps to reproduce, your browser/OS, and a screenshot if it's a UI issue.

### Suggest Features

Have an idea? [Open a feature request](../../issues/new?template=feature_request.yml). Describe the problem you're solving, not just the solution.

### Submit Code

1. Fork the repository
2. Create a branch from `main` (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test in Chrome, Firefox, and Safari — both desktop and mobile
5. Submit a pull request using the PR template

### Good First Contributions

Look for issues labeled [`good first issue`](../../labels/good%20first%20issue). These are scoped, well-described tasks ideal for newcomers.

Some standing opportunities:

- **New resume templates** — add a template in `src/templates/`
- **Translations** — add English strings via the i18n system in `src/i18n.js`
- **Profession examples** — add JSON demo data in `demos/`
- **Accessibility improvements** — keyboard navigation, screen readers, ARIA labels
- **PDF export testing** — test across browsers and report issues
- **Documentation** — fix typos, improve explanations, add examples

## Guidelines

### Code

- Keep it simple. Avoid adding dependencies unless clearly justified.
- Follow existing code style and patterns.
- Use ES modules. No build step should be required.
- Test RTL layout — Hebrew is the primary language.
- Mobile and desktop must both work.

### Privacy

This is a core principle, not a suggestion:

- **Never** send resume content to any server.
- **Never** add tracking that collects personal information.
- Any analytics must be anonymous, event-based, and consented to.
- If your change affects privacy behavior, update `PRIVACY.md`.

### Language and Tone

- Hebrew text in the app should be simple, clear, and non-judgmental.
- The goal is to help people feel confident about their resume.
- English UI strings should follow the same philosophy.

### Commits

- Use clear, descriptive commit messages.
- One logical change per commit.
- Reference issue numbers where applicable (`Fixes #42`).

## Pull Request Process

1. Fill out the PR template completely.
2. Include "what changed," "why," and "how you tested."
3. Add a screenshot for any UI change.
4. Ensure your code doesn't break existing functionality.
5. A maintainer will review your PR within a few days.

## What's in Scope

This public repository contains the community-facing parts of ClicResume: the editor UI, templates, export logic, styling, translations, and documentation. AI features, backend services, and billing are maintained separately.

## Contributor License Agreement

By submitting a pull request, you agree that your contribution is licensed under the same FSL-1.1-MIT license as the project. You confirm that you have the right to make the contribution and that it does not infringe on any third-party rights.

## Code of Conduct

All contributors are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Be respectful, constructive, and kind.

## Questions?

Open a [Discussion](../../discussions) or comment on an existing issue. We're happy to help.
