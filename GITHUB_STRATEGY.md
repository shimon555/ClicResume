# ClicResume GitHub Strategy

## Executive Summary

ClicResume needs a licensing and repository strategy that maximizes community visibility and contributions while preventing direct commercial cloning. This document recommends adopting the **Functional Source License (FSL-1.1-MIT)** with an **Open Core** model, splitting the project into a public community repository and a private proprietary repository.

---

## Current Problem

The project currently uses an **MIT License**, which is the most permissive open-source license available. Under MIT, anyone can legally clone the entire codebase, replace the branding, deploy it on a competing domain, and sell it as a paid service. This directly contradicts your goal of protecting against commercial cloning.

**The MIT license must be replaced before publishing the repository.**

---

## 1. Licensing Recommendation

### Recommended: Functional Source License (FSL-1.1-MIT)

The FSL was created by Sentry specifically for SaaS companies facing this exact tension. It is the best fit for ClicResume for these reasons:

**What it allows:**
- Anyone can view, read, and study the source code
- Anyone can use the code for internal/personal use
- Anyone can use it for non-commercial education and research
- Anyone can fork, modify, and submit pull requests
- Professional services providers can help licensees use it

**What it prohibits:**
- Offering the software (or substantially similar functionality) as a competing commercial product or service
- Creating a SaaS that substitutes for ClicResume using ClicResume's code

**Key feature:** Each version automatically converts to full MIT license after 2 years. This builds trust with the community — they know the code will eventually be fully open.

### License Comparison

| Factor | MIT | AGPL-3.0 | BSL-1.1 | FSL-1.1-MIT |
|--------|-----|----------|---------|-------------|
| Source visible | Yes | Yes | Yes | Yes |
| Community PRs | Yes | Yes | Yes | Yes |
| Prevents commercial cloning | No | Partially | Yes | Yes |
| Conversion to open source | Already OSS | Already OSS | 4 years max | 2 years |
| Complexity/variability | Low | Medium | High (custom grants) | Low (fixed terms) |
| OSI-approved | Yes | Yes | No | No |
| SaaS precedent | Many | Cal.com (former) | HashiCorp, MariaDB | Sentry, Codecov |
| Best for solo founder SaaS | No | No | Good | Best |

### Why Not the Alternatives

**MIT (current):** Zero protection. Anyone can clone and compete commercially. Not viable for your goals.

**AGPL-3.0:** Requires anyone who modifies and deploys the code to publish their modifications. This offers some protection (competitors must open-source their changes), but it does NOT prevent someone from running a competing service. Cal.com used AGPL before eventually going closed-source precisely because AGPL wasn't enough protection.

**BSL-1.1:** Good option (used by HashiCorp/Terraform, MariaDB), but each implementation requires writing a custom "Additional Use Grant" clause. This creates legal variability and makes it harder for contributors to understand their rights. The 4-year conversion window is also longer than FSL's 2 years.

**SSPL (MongoDB):** Extremely restrictive — essentially requires anyone offering the software as a service to open-source their entire infrastructure stack. This scares away legitimate contributors and is considered overly aggressive for a product like ClicResume.

### Legal Notes

- FSL is NOT an OSI-approved "open source" license. Call the project "source-available" or "fair source" in public communications, not "open source."
- FSL is well-documented and has SPDX identifiers (FSL-1.1-MIT).
- The license was drafted by Heather Meeker, a leading open-source IP attorney.
- For maximum protection, consider having an Israeli IP lawyer review the license for local enforceability.

---

## 2. Trademark Protection

Licensing protects the code. **Trademarks protect the brand.** These are independent legal mechanisms and you need both.

### What to Protect

- The name "ClicResume" / "קורות חיים בקליק"
- The logo and logo mark
- The domain clicresume.co.il
- The visual identity (color scheme, design language)

### Actions

1. **Register the trademark** with the Israel Patent Office (Reshut HaPatentim) for "ClicResume" in software/internet services (Class 42).
2. **Include a TRADEMARK.md** in the repository (template provided below).
3. **The FSL already includes trademark protection** — Section "Trademarks" states: "you have no right under these Terms and Conditions to use our trademarks, trade names, service marks or product names."
4. **Set up monitoring** — Google Alerts for "ClicResume" and periodic domain-name checks.

### Cost vs. Risk

Trademark registration in Israel costs approximately 1,500-3,000 NIS. Without registration, you have common-law rights (weaker). Given that your concern is commercial cloning, formal registration is strongly recommended.

---

## 3. Repository Strategy: Open Core Model

### What Goes Public

These components are safe to publish because they provide value to the community but are insufficient alone to create a competing SaaS:

| Component | Why Public |
|-----------|-----------|
| Frontend UI components (form editor, preview) | Attracts contributors, demonstrates quality |
| Resume templates (HTML/CSS rendering) | Community can contribute new templates |
| CSS/styling | Low competitive value |
| i18n framework and translations | Community can add languages |
| Demo data (profession examples) | Community can expand |
| Export logic (PDF/image generation) | Helps contributors understand the pipeline |
| Documentation (README, CONTRIBUTING, etc.) | Required for community engagement |
| Analytics framework (event definitions) | Shows privacy commitment |
| Landing page | Marketing asset |

### What Stays Private

These components are your competitive moat and must remain in a separate private repository:

| Component | Why Private |
|-----------|------------|
| AI-powered features (content suggestions, optimization) | Core product differentiator |
| User authentication and account management | SaaS infrastructure |
| Billing/payment/subscription logic | Revenue infrastructure |
| Backend API server | SaaS backend |
| Admin dashboard | Operational tooling |
| Proprietary algorithms (matching, scoring) | IP |
| Database schema and migrations | Infrastructure detail |
| Deployment configuration and secrets | Security |
| A/B testing and growth experiments | Business strategy |

### Repository Structure

```
ORGANIZATION: clicresume (GitHub org)

clicresume/clicresume          (PUBLIC - FSL-1.1-MIT)
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   ├── feature_request.yml
│   │   └── template_request.yml
│   ├── pull_request_template.md
│   ├── FUNDING.yml
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── components/           # UI components
│   ├── templates/            # Resume templates
│   ├── styles/               # CSS
│   ├── export/               # PDF/image export
│   ├── i18n/                 # Translations
│   └── analytics.js          # Event framework (no keys)
├── demos/                    # Example data by profession
├── assets/                   # Logo, icons
├── docs/
│   ├── ARCHITECTURE.md
│   ├── PRIVACY.md
│   ├── ANALYTICS.md
│   └── ROADMAP.md
├── LICENSE                   # FSL-1.1-MIT
├── TRADEMARK.md
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── CHANGELOG.md

clicresume/clicresume-server   (PRIVATE)
├── api/                      # Backend endpoints
├── auth/                     # Authentication
├── billing/                  # Stripe/payment
├── ai/                       # AI features
├── admin/                    # Admin dashboard
├── db/                       # Schema, migrations
└── deploy/                   # Infrastructure
```

---

## 4. How Successful SaaS Companies Handle This

### GitLab (Open Core, MIT + Proprietary)
- CE (Community Edition) is MIT-licensed, fully open
- EE (Enterprise Edition) features are proprietary
- Clear tier separation in documentation
- Largest open-core success story

### Sentry (FSL-1.1-Apache)
- All code is source-available under FSL
- No feature gating between self-hosted and SaaS
- Monetizes through hosted service, support, and scale
- Created FSL specifically for this use case

### Cal.com (formerly AGPL, now closed-source)
- Started fully open under AGPL
- Experienced competitive cloning despite AGPL
- Eventually moved to closed source in 2025, releasing a community fork (Cal.diy) under MIT
- Cautionary tale: AGPL alone was not enough protection

### Lessons for ClicResume

1. **Use FSL, not AGPL.** Cal.com's experience proves AGPL doesn't prevent SaaS competition.
2. **Separate public and private clearly.** GitLab's model works because the boundary is obvious.
3. **Document the tier boundary.** Explain in your README and CONTRIBUTING.md which features are community vs. proprietary. This reduces friction.
4. **Ship fast.** Your best protection is always being ahead of any potential clone.

---

## 5. Contributor Strategy

### Contributor License Agreement (CLA)

Require a lightweight CLA (or DCO — Developer Certificate of Origin) for all contributors. This ensures:
- You retain the right to change the license in the future if needed
- Contributors confirm they have the right to contribute the code
- No ambiguity about IP ownership

**Recommended approach:** Use a CLA-bot (like CLA Assistant on GitHub) that requires contributors to sign a CLA before their first PR is merged.

### What Contributors Can Do

- Submit bug fixes and improvements
- Add new resume templates
- Add translations and i18n improvements
- Improve documentation
- Add demo data for new professions
- Improve accessibility
- Report and discuss issues

### What Contributors Cannot Do

- Contribute to private/proprietary features (those are in the private repo)
- Remove or modify the license
- Remove branding or attribution

---

## 6. Implementation Checklist

### Immediate (Before Publishing)

- [ ] Replace MIT license with FSL-1.1-MIT
- [ ] Create GitHub organization "clicresume"
- [ ] Set up the public repository with proper structure
- [ ] Add all template files (README, CONTRIBUTING, CODE_OF_CONDUCT, etc.)
- [ ] Add TRADEMARK.md
- [ ] Add SECURITY.md
- [ ] Configure issue templates (YAML format)
- [ ] Set up branch protection on main
- [ ] Move any private/proprietary code to a separate private repo
- [ ] Review all files for accidentally committed secrets or API keys

### Short-Term (First Month)

- [ ] Register "ClicResume" trademark in Israel
- [ ] Set up CLA-bot
- [ ] Create a public roadmap (GitHub Projects or Issues)
- [ ] Write 2-3 "good first issue" tickets to attract contributors
- [ ] Set up GitHub Actions CI pipeline
- [ ] Add FUNDING.yml for GitHub Sponsors

### Medium-Term (First Quarter)

- [ ] Set up Google Alerts for brand monitoring
- [ ] Evaluate community engagement and adjust strategy
- [ ] Consider creating a Discord or GitHub Discussions for community
- [ ] Publish a blog post about the project's open-source philosophy

---

## 7. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Competitor clones public code | Medium | Low (public code alone isn't enough for a competing SaaS) | FSL prevents competing use; private repo protects core IP |
| Competitor forks after 2-year conversion | Low | Medium | By then, ClicResume should be far ahead; brand/community are established |
| Contributor disputes over license | Low | Medium | CLA prevents ambiguity |
| Someone uses brand/logo | Medium | Medium | Trademark registration + TRADEMARK.md + FSL trademark clause |
| Low community engagement | High | Low (no worse than a private repo) | "Good first issues," clear docs, responsive maintainership |
| Legal challenge to FSL | Very Low | High | FSL is well-drafted; consult Israeli IP lawyer for local review |

---

## Appendix: Language for Public Communications

When describing ClicResume publicly, use these terms:

**Do say:**
- "Source-available" or "fair source"
- "Community-driven development"
- "Free to use"
- "Converts to MIT after 2 years"

**Don't say:**
- "Open source" (FSL is not OSI-approved; this could invite criticism)
- "Free software" (FSF definition doesn't apply)

**Sample blurb for README:**
> ClicResume is a free, source-available resume builder. The code is published under the Functional Source License (FSL-1.1-MIT), which allows you to view, use, and contribute to the code. Each version automatically converts to the MIT license after two years. Commercial competing use is restricted — see LICENSE for details.
