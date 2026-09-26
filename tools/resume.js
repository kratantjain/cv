// Generates Kratant_Jain_Resume.docx and resume.html (for PDF) from one data source.
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, AlignmentType,
  LevelFormat, BorderStyle, TabStopType,
} = require('docx');

// ---------------------------------------------------------------- data
const R = {
  name: 'KRATANT JAIN',
  headline: 'QA Automation Architect  |  Lead QE  |  Test Automation Frameworks  |  Jenkins CI/CD  |  Python',
  contact: [
    { text: 'Bengaluru, India (open to remote)' },
    { text: 'kratantjain@gmail.com', url: 'mailto:kratantjain@gmail.com' },
    { text: 'linkedin.com/in/kratantjain', url: 'https://www.linkedin.com/in/kratantjain/' },
    { text: 'kratantjain.github.io/cv', url: 'https://kratantjain.github.io/cv/' },
  ],
  summary: 'Technical Specialist with 7+ years across QA automation, CI/CD orchestration, and internal platform engineering. At Sony India Software Centre I built, and now own, the test automation framework, Jenkins orchestration, and device management that run regression for customer-facing SDK releases: ~300 test libraries, ~250,000 test cases, 50+ engineers. Cut regression turnaround from 4–5 days to ~20 hours with 100% on-time milestone delivery. Previously led a 4-member QE team and owned performance testing for a connected-vehicle platform at Harman. Looking for remote Lead QE / SDET Lead or Automation Architect roles.',
  results: [
    'Regression turnaround: 4–5 days → ~20 hours (~75%); ~2 days of manual orchestration prep per cycle eliminated',
    'CI node environment setup: ~5 hours → ~30 minutes (~90%); devkit setup: ~4 hours, 3 people → ~30 minutes, 1 person (~87%)',
    'Devkit allocation conflicts: recurring → zero; library onboarding made self-service (~30 libraries added by engineers)',
    'Milestone delivery: 100% on time, one major SDK milestone delivered early',
  ],
  jobs: [
    {
      titles: [['Technical Specialist', 'Jul 2024 – Present']],
      company: 'Sony India Software Centre, Bengaluru',
      intro: "Own the automation platform that regression-tests Sony's customer-facing SDK: ~300 test libraries (~250,000 test cases) maintained by 50+ engineers, run across ~8 execution PCs and ~40 devkits. Most of the platform is my own design and code.",
      bullets: [
        'Built the next-generation test automation framework single-handedly, from scratch, as a pip-installable Python package replacing the legacy framework: auto-generated driver scripts, Jenkins execution pathways, and a result-validation utility that catches silent failures.',
        'Made library onboarding self-service through integration guidelines; ~30 libraries added by engineers from my team and other-region teams without going through the automation team.',
        'Designed a 3-tier Jenkins orchestration model (super orchestrator → per-PC orchestrator → single-library executor) with up to 10 parallel slots per machine; a spreadsheet-driven run plan removed ~2 days of manual prep per cycle.',
        'Built a device management service (Flask REST API + NiceGUI dashboard) to reserve, release, and health-check devkits; replaced a pool tool that assigned duplicate IPs, reaching zero allocation conflicts. Now used by other teams.',
        'Wrote a Python environment-setup framework for Windows CI agents (SDK source detection, zip integrity checks, registry writes with elevated-permission fallback): ~5 hours → ~30 minutes per node; adopted by other regions.',
        'Automated devkit setup in Jenkins (system/software updates, network configuration): ~4 hours with 3 people → ~30 minutes with 1.',
        'Built a local CLI mirroring the CI executor so 50+ library maintainers get matching results and reproduce CI failures on any machine; added pre-regression network health monitoring with email alerts and a run-time analytics pipeline.',
        'Led 50+ engineers through the SVN-to-Git migration using sparse checkout on a 300–400 GB repository; resolved Git LFS pointer-file issues.',
        'Own delivery: ~5 major regression runs per milestone, go/no-go calls, quality and risk reporting to management, and technical escalation for the full automation stack.',
        'Drafted the platform AI roadmap: LLM-based failure triage (flaky vs. environment vs. real defect), intelligent reruns, automatic library onboarding from README analysis, self-healing pipelines.',
      ],
    },
    {
      titles: [['Senior Test Engineer – Product Development', 'Apr 2023 – Jul 2024']],
      company: 'Harman Connected Services Corporation India Pvt. Ltd., Bengaluru',
      bullets: [
        'Led a 4-member QE team for global customers (1 performance, 3 framework maintenance across customers; co-located and remote).',
        'Owned performance testing for the customer delivery team: weekly JMeter load, stress, and endurance tests with realistic telematics traffic to set server operating limits; traced bottlenecks with Grafana and Graylog.',
        'Built Jenkins pipelines running performance tests as part of CI; architected a reusable Python + Robot Framework + Selenium framework for web and mobile apps.',
        'Validated device-to-cloud data flow over MQTT (publish/subscribe, payload integrity, reconnect/retry) for a microservices backend on Kafka, HiveMQ, WSO2, MongoDB, and PostgreSQL.',
        'Directed regression at each product stage and gave release sign-off; reviewed test cases and scripts; built Python/Pandas data tools and trained developers and QA on automation.',
      ],
    },
    {
      titles: [['Product Engineer', 'Apr 2021 – Mar 2023']],
      company: 'Harman Connected Services Corporation India Pvt. Ltd., Bengaluru',
      bullets: [
        'Gathered requirements with product and development teams; wrote test plans and detailed test cases for web and mobile telematics applications.',
        'Ran functional, integration, end-to-end, regression, and exploratory testing; JMeter load, stress, and endurance testing with bottlenecks reported to developers.',
        'Maintained the known-issues defect database and drove triage and closure; Agile/Scrum releases, code reviews, and mentoring juniors.',
      ],
    },
    {
      titles: [['Programmer Analyst', 'Aug 2020 – Apr 2021'], ['Programmer Analyst Trainee', 'Jul 2019 – Jul 2020']],
      company: 'Cognizant Technology Solutions',
      bullets: [
        'Took the Wellington client project live, largely single-handedly, delivering the "one-click fix" (users trigger the fix script on the SCCM server directly instead of raising a ticket); received the PASSION award.',
        'Automated image-based Citrix workflows with Tesseract OCR + OpenCV where UI automation failed; led to an OCR invoice-reading proof of concept for another client.',
        'Built a periodic Python ServiceNow user sync replacing manual onboarding; chatbot NLU intent/entity extraction with Rasa Core; Docker deployment of chatbot and platform images; Python MFA proof of concept.',
      ],
    },
    {
      titles: [['Intern, Cloud & Cybersecurity', 'Jun 2018 – Jul 2018']],
      company: 'Happiest Minds Technologies',
      bullets: [
        'Built Python tools for SQL injection and XSS checks on given URLs, and network machine discovery with likely vulnerabilities using Nmap.',
      ],
    },
  ],
  skills: [
    ['Languages', 'Python, SQL, Groovy (Jenkins DSL), PowerShell, Bash, C'],
    ['Automation', 'Custom Python frameworks (pip packages), Robot Framework, Pytest, Selenium, Appium/ADB (exposure)'],
    ['CI/CD', 'Jenkins (multi-tier orchestration, declarative pipelines, conditional stages), Git, Git LFS, SVN'],
    ['Performance', 'JMeter load/stress/endurance testing, capacity limits, bottleneck analysis'],
    ['Web & APIs', 'Flask REST APIs, NiceGUI, Django (basics)'],
    ['Data & Observability', 'Kafka, HiveMQ/MQTT, WSO2, MongoDB, PostgreSQL, Pandas, Grafana, Graylog'],
    ['Infrastructure', 'Windows CI agents, registry configuration, Docker, Ubuntu/Linux, VMware, AWS (basics)'],
    ['Other', 'Tesseract OCR, OpenCV, image comparison, NLU/Rasa, SQLi/XSS scanning, Nmap'],
    ['Quality Management', 'Test strategy, release sign-off, defect governance, JIRA, TestRail, Agile/Scrum'],
    ['Learning now', 'LangGraph, LangChain, CrewAI, RAG, Chroma, Hugging Face, n8n, MCP, LLM APIs'],
  ],
  education: { degree: 'B.Tech, Computer Science Engineering', school: 'Jaypee University of Engineering and Technology, Guna', years: '2015 – 2019' },
  extras: [
    ['Certifications', 'Scrum Master; Security White, Yellow and Green Belt; Python Programming Essentials; Python and Flask Bootcamp; Google Digital Unlocked'],
    ['Training', 'Jenkins DevOps Master; Robot Framework Level 2; Advanced Python; LPIC-2 Linux Kernel and System Startup; AWS Security Fundamentals; CEH v9; CCNA'],
    ['Recognition', 'PASSION award (Cognizant, Wellington go-live); customer and delivery-manager appreciation'],
    ['Languages', 'English, Hindi'],
  ],
};

// ---------------------------------------------------------------- DOCX
const FONT = 'Calibri';
const ACCENT = '1F3A5F';
const W = 11906, MARGIN = 850; // A4, ~0.6in margins
const RIGHT = W - 2 * MARGIN;

const t = (text, o = {}) => new TextRun({ text, font: FONT, size: 20, ...o });
const heading = (text) => new Paragraph({
  spacing: { before: 200, after: 80 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 2 } },
  children: [t(text.toUpperCase(), { bold: true, size: 22, color: ACCENT, characterSpacing: 20 })],
});
const bullet = (text) => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 30 }, children: [t(text)] });
const titleLine = ([title, dates], first) => new Paragraph({
  spacing: { before: first ? 140 : 0, after: 0 },
  tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }],
  children: [t(title, { bold: true, size: 21 }), t('\t' + dates, { bold: true })],
});
const labelled = ([label, value]) => new Paragraph({ spacing: { after: 30 }, children: [t(label + ': ', { bold: true }), t(value)] });
const sep = () => t('  |  ', { size: 19, color: '777777' });

const contactRuns = [];
R.contact.forEach((c, i) => {
  if (i) contactRuns.push(sep());
  contactRuns.push(c.url
    ? new ExternalHyperlink({ link: c.url, children: [t(c.text, { color: ACCENT, size: 19 })] })
    : t(c.text, { size: 19 }));
});

const docChildren = [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [t(R.name, { bold: true, size: 36, color: ACCENT, characterSpacing: 40 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [t(R.headline, { size: 21, bold: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: contactRuns }),
  heading('Summary'),
  new Paragraph({ spacing: { after: 60 }, children: [t(R.summary)] }),
  heading('Key Results'),
  ...R.results.map(bullet),
  heading('Experience'),
];
R.jobs.forEach((j) => {
  j.titles.forEach((tl, i) => docChildren.push(titleLine(tl, i === 0)));
  docChildren.push(new Paragraph({ spacing: { after: 50 }, children: [t(j.company, { italics: true, color: '444444' })] }));
  if (j.intro) docChildren.push(new Paragraph({ spacing: { after: 40 }, children: [t(j.intro)] }));
  j.bullets.forEach((b) => docChildren.push(bullet(b)));
});
docChildren.push(
  heading('Skills'), ...R.skills.map(labelled),
  heading('Education'),
  new Paragraph({ spacing: { after: 40 }, tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }],
    children: [t(R.education.degree, { bold: true }), t('\t' + R.education.years, { bold: true })] }),
  new Paragraph({ spacing: { after: 40 }, children: [t(R.education.school, { italics: true, color: '444444' })] }),
  heading('Certifications, Training & Recognition'), ...R.extras.map(labelled),
);

const doc = new Document({
  creator: 'Kratant Jain',
  title: 'Kratant Jain — Resume',
  styles: { default: { document: { run: { font: FONT, size: 20 } } } },
  numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 300, hanging: 200 } } } }] }] },
  sections: [{
    properties: { page: { size: { width: W, height: 16838 }, margin: { top: 720, bottom: 720, left: MARGIN, right: MARGIN } } },
    children: docChildren,
  }],
});

// ---------------------------------------------------------------- HTML (for PDF)
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ul = (items) => `<ul>${items.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`;
const lab = (rows) => rows.map(([l, v]) => `<p class="lab"><b>${esc(l)}:</b> ${esc(v)}</p>`).join('');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Kratant Jain — Resume</title><style>
@page { size: A4; margin: 11mm 13mm; }
body { font-family: Carlito, Calibri, 'Liberation Sans', Arial, sans-serif; font-size: 9.5pt; color: #111; line-height: 1.25; margin: 0; }
h1 { text-align: center; font-size: 18pt; letter-spacing: 2px; color: #${ACCENT}; margin: 0 0 1pt; }
.headline { text-align: center; font-weight: bold; font-size: 10.5pt; margin: 0 0 2pt; white-space: pre; }
.contact { text-align: center; font-size: 9.5pt; margin: 0 0 3pt; }
.contact a { color: #${ACCENT}; text-decoration: none; }
.contact .sep { color: #777; margin: 0 6px; }
h2 { font-size: 11pt; color: #${ACCENT}; letter-spacing: 1px; border-bottom: 0.75pt solid #${ACCENT}; margin: 8pt 0 3pt; padding-bottom: 1pt; }
.title { display: flex; justify-content: space-between; font-weight: bold; font-size: 10pt; margin-top: 5pt; }
.title + .title { margin-top: 0; }
.title span:last-child { font-size: 10pt; white-space: nowrap; }
.company { font-style: italic; color: #444; margin: 0 0 2.5pt; }
p { margin: 0 0 3pt; }
ul { margin: 0 0 0 15pt; padding: 0; }
li { margin: 0 0 1pt; }
.lab { margin: 0 0 1.5pt; }
.job { break-inside: auto; }
</style></head><body>
<h1>${esc(R.name)}</h1>
<p class="headline">${esc(R.headline)}</p>
<p class="contact">${R.contact.map((c) => c.url ? `<a href="${esc(c.url)}">${esc(c.text)}</a>` : esc(c.text)).join('<span class="sep">|</span>')}</p>
<h2>SUMMARY</h2><p>${esc(R.summary)}</p>
<h2>KEY RESULTS</h2>${ul(R.results)}
<h2>EXPERIENCE</h2>
${R.jobs.map((j) => `<div class="job">${j.titles.map(([a, b]) => `<div class="title"><span>${esc(a)}</span><span>${esc(b)}</span></div>`).join('')}
<p class="company">${esc(j.company)}</p>${j.intro ? `<p>${esc(j.intro)}</p>` : ''}${ul(j.bullets)}</div>`).join('\n')}
<h2>SKILLS</h2>${lab(R.skills)}
<h2>EDUCATION</h2><div class="title" style="margin-top:0"><span>${esc(R.education.degree)}</span><span>${esc(R.education.years)}</span></div><p class="company">${esc(R.education.school)}</p>
<h2>CERTIFICATIONS, TRAINING &amp; RECOGNITION</h2>${lab(R.extras)}
</body></html>`;

const [docxOut, htmlOut] = process.argv.slice(2);
fs.writeFileSync(htmlOut, html);
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(docxOut, buf); console.log('wrote', docxOut, htmlOut); });
