# dorraki.github.io — v2

Static site: plain HTML, CSS and JS. No build step.

## Preview locally

```bash
cd site
python3 -m http.server 8000
# open http://localhost:8000
```

## Edit content

All text (roles, projects, publications, courses, students, awards) is in
`assets/js/data.js`. Edit that file; the page renders itself from it.

- Timeline bars are drawn from each role's `start` / `end` (`end: null` = ongoing).
  Update `now` at the top of the file to move the "NOW" marker.
- Project card images live in `assets/img/projects/`.
- Journal icons live in `assets/img/logos/j-*.png`.

## Deploy to GitHub Pages

Copy everything inside `site/` into the root of your `dorraki.github.io`
repository (replacing the old files), then commit and push.
