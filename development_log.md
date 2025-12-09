# Development Log

## 2025-12-09: Initial Site Setup
**Goal**: Initialize personal portfolio structure using Jekyll Architect theme.

### Changes
- **Configuration**: Updated `_config.yml` with metadata, collections (`projects`, `devlog`), and plugins.
- **Structure**: Created `projects/`, `devlog/`, `assets/css/`, `_layouts/`, `_includes/`.
- **Theme Override**:
    - Created `assets/css/style.scss` to import `jekyll-theme-architect` and add custom "hacker" aesthetics (Dark mode, Monospace font, Cyan/Orange accents).
    - Created `_layouts/default.html` to override theme default, injecting custom Header and Footer.
    - Created `_includes/header.html` for global navigation.
    - Created `_includes/footer.html` with dynamic "Last updated" script.
- **Content**:
    - `index.md`: Landing page with featured projects.
    - `about.md`: Bio and philosophy.
    - `resume.md`: Skills and experience.
    - `projects/`: Added 5 project pages with front matter.
    - `devlog/`: Added 2 sample devlog entries.

### Next Steps
- Verify local build with `bundle exec jekyll serve`.
- Add real content/images to `assets/`.
- Refine CSS for mobile responsiveness if needed.
