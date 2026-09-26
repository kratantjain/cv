# Kratant Jain — Portfolio CV

**Live site:** https://kratantjain.github.io/cv/

Static single-page site served by GitHub Pages. No build step for the site itself.

## Repo structure

```
/
├── index.html                  ← Portfolio page
├── style.css                   ← Stylesheet
├── script.js                   ← Nav, scroll reveal, impact counters, footer year
├── favicon.ico                 ← Fallback icon (inline SVG favicon is primary)
├── images/
│   └── profilepic-modified.png ← Profile photo (also used for link previews)
├── Kratant_Jain_Resume.pdf     ← Resume linked from the site
├── Kratant_Jain_Resume.docx    ← Same resume, ATS-friendly Word format
└── tools/
    ├── resume.js               ← Single source for the resume (DOCX + HTML)
    └── pdf.js                  ← Prints the HTML resume to PDF
```

## Updating the resume

All resume content lives in the `R` object at the top of `tools/resume.js`, so the DOCX and PDF stay identical.

```bash
cd tools
npm install docx playwright-core
node resume.js ../Kratant_Jain_Resume.docx resume.html
node pdf.js resume.html ../Kratant_Jain_Resume.pdf /path/to/chromium
```

When you change the resume, make the same change in `index.html`.

## Content rules for public versions

- Use exact titles and dates (they must match relieving letters):
  - Sony India Software Centre — Technical Specialist, Jul 2024 – present
  - Harman Connected Services Corporation India Pvt. Ltd. — Senior Test Engineer – Product Development, Apr 2023 – 22 Jul 2024; Product Engineer, 21 Apr 2021 – Mar 2023
  - Cognizant Technology Solutions — Programmer Analyst, Aug 2020 – Apr 2021; Programmer Analyst Trainee, Jul 2019 – Jul 2020
  - Happiest Minds Technologies — Intern, Cloud & Cybersecurity, Jun – Jul 2018
- No internal Sony tool or milestone names. Describe them generically ("next-generation test automation framework", "device management service", "local CLI that mirrors CI execution", "a major SDK milestone").
- SDK, devkits, Sony, and scale numbers (~300 libraries, ~250,000 test cases, ~40 devkits, ~8 PCs, 50+ engineers) are fine to share.
- Say "test libraries", never "test suites".
- The public resume leaves out the phone number.
