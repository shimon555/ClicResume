<div align="center">

# ClicResume | קורות חיים בקליק

**Free, AI-powered resume builder for Hebrew speakers**

[Website](https://clicresume.co.il) · [Report Bug](../../issues/new?template=bug_report.yml) · [Request Feature](../../issues/new?template=feature_request.yml) · [Roadmap](docs/ROADMAP.md)

[![License: FSL-1.1-MIT](https://img.shields.io/badge/License-FSL--1.1--MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## About

ClicResume helps people create professional, well-structured resumes quickly and confidently. It is designed for Hebrew speakers and supports full RTL layouts, with English support planned.

The project is **free to use** and always will be. No sign-up required. Your resume data stays in your browser — nothing is sent to a server.

### Features

- **Live editor and preview** — see changes in real time
- **6 professional templates** with 6 color schemes
- **Full Hebrew RTL support** — first-class, not an afterthought
- **Privacy-first** — resume content never leaves your browser
- **Multiple export formats** — PDF (ATS-friendly), PNG, JPEG, JSON
- **Auto-save drafts** — local browser storage
- **Writing tips** — guidance for each section
- **Profession examples** — data science, marketing, nursing, accounting
- **Drag & drop sections** — customize order and visibility
- **Import/export JSON** — backup and share resume data

## Getting Started

ClicResume runs as a static web app. No build step required.

```bash
# Option 1: npx
npx serve .

# Option 2: Python
python3 -m http.server 8000

# Option 3: VS Code Live Server extension
```

Then open `http://localhost:8000` in your browser.

## Project Structure

```
src/
  app.js              # Main Alpine.js component
  cv-data.js          # Data model
  sections.js         # Section definitions
  templates/          # 6 resume templates
  export/             # PDF / image / JSON export
  styles/             # CSS
  i18n.js             # Internationalization framework
  analytics.js        # Privacy-conscious analytics
demos/                # Example data by profession
assets/               # Logo and branding
```

See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for full technical details.

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Good ways to contribute:

- Add new resume templates
- Add translations (English support coming soon)
- Add example data for more professions
- Fix bugs and improve accessibility
- Improve documentation
- Test PDF export across browsers

## License

This project is licensed under the **Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)**.

You can view, use, modify, and contribute to the code. Commercial competing use is restricted. Each version converts to the MIT license after two years.

See [LICENSE](LICENSE) for the full text, and [TRADEMARK.md](TRADEMARK.md) for brand usage guidelines.

> **Note:** This is a source-available license, not an OSI-approved open-source license. See the [FSL FAQ](https://fsl.software/) for details.

## Privacy

Resume content never leaves the user's browser. Analytics (when consented to) are anonymous and event-based. See [PRIVACY.md](docs/PRIVACY.md).

## Trademark

"ClicResume" and "קורות חיים בקליק" are trademarks of Shimon Amsellem. See [TRADEMARK.md](TRADEMARK.md) for usage guidelines.

## Support the Project

ClicResume is and will remain free. If you find it useful and want to support development:

- Star this repository
- Share it with someone who needs a resume
- [Report issues](../../issues) and suggest improvements
- Contribute code or translations
