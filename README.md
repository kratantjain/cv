# Kratant Jain — Portfolio CV

**Live site:** https://kratantjain.github.io/cv/

---

## Repo Structure

```
/
├── index.html              ← Main portfolio page
├── style.css               ← Full premium dark stylesheet
├── script.js               ← Interactions: scroll reveal, nav, counters
├── images/
│   └── profilepic-modified.png   ← Your existing profile photo (keep in place)
└── README.md
```

---

## Deployment

This is a pure static site. No build step required.

1. Clone or pull the repo
2. Replace `index.html`, `style.css`, `script.js` with the new files
3. Keep `images/profilepic-modified.png` in place (it is still referenced)
4. Commit and push to `main` or `gh-pages` branch
5. GitHub Pages will serve it automatically

---

## Placeholders to fill manually

| Location | What to check/update |
|---|---|
| `index.html` — meta `og:image` | Points to `images/profilepic-modified.png` — verify the path is correct after deploy |
| `index.html` — Twitter username | `twitter.com/kratantjain` — update if your handle is different |
| `images/profilepic-modified.png` | Keep the existing file. If you replace it with a higher-res photo, use square crop and same filename. |
| `index.html` — GitHub link | `github.com/kratantjain` — correct as-is |
| `index.html` — LinkedIn link | `linkedin.com/in/kratantjain` — correct as-is |
| Impact metrics (`~75%`, `~90%`, `~87%`, `50+`) | These are approximate public-safe figures from your career document. Adjust only if your actual numbers have changed significantly. |

---

## Optional enhancements

- **Favicon:** An inline SVG favicon is already embedded in the `<head>` (no file needed).
- **Social preview image:** For better LinkedIn/Twitter link previews, create a 1200×630 PNG at `images/social-preview.png` and update the `og:image` tag.
- **Custom domain:** Add a `CNAME` file at the repo root with your domain name if you set up a custom domain later.

---

## Confidentiality summary

The following content was intentionally generalized:
- Internal framework and platform names replaced with generic descriptors ("proprietary CI/CD orchestration system", "internal automation platform", "developer CLI tool")
- SDK product names not mentioned — described as "SDK regression testing" without product specifics
- Internal milestone/release names not mentioned
- Internal utility names not mentioned
- Infrastructure topology described in safe scale terms (~8 machines, ~40 devices, ~50 nodes, ~50 engineers)
- Impact metrics shared as approximate percentages (safe per your career document guidelines)
- Client/product names within Sony/Harman not mentioned — only employer names used (safe for public CV)

Employer names included (Sony India Software Centre, Harman Connected Services, Harman India, Cognizant Technology Solutions, Happiest Minds Technologies) — these are standard public resume information.
