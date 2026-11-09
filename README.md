# kalyanivasave.github.io

Kalyani Wasave's portfolio: articles, a glossary and two working labs on configurable products and variant-heavy portfolios.

Plain HTML, CSS and JavaScript. No build step: edit a file, commit, push, and GitHub Pages publishes it.

## Where things are

| Path | What it is |
|---|---|
| `index.html` | Home page |
| `index.html` sections | About, experience, education, other work and contact with resume downloads all live on the home page |
| `glossary.html` | Glossary. To add a term, copy one `<div class="term-row">` block and keep the list alphabetical |
| `articles/` | Articles. Copy an existing article file to start a new one, then add a card for it to `articles/index.html`, the home page and `sitemap.xml`. Cover illustrations live in `assets/img/` |
| `builds/` | Labs: `index.html` (hub), the Configure-to-Order Rules Lab (`rules-lab.*`, model and tests in `rules-lab.js`) and the Variant Portfolio Lab (`portfolio-lab.*`, model in `portfolio-lab.js`) |
| `glossary/` | Full glossary entries, one page per term, linked from `glossary.html` |
| `assets/site.css` | All styles and colours |
| `resume/` | The three current resume PDFs. Replace a file with the same name to update it |
| `v1/` | The previous portfolio, kept untouched. Live at `/v1/`, hidden from search engines by `robots.txt` |

Every page shares the same header and footer. If you change the navigation, change it in every HTML file.

## Going back to the old portfolio

The old site is saved under the git tag `v1-legacy`. To restore it as the main site, ask Claude in VS Code: "Restore the portfolio exactly as it was at tag v1-legacy, then commit and push."
