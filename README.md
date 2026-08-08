# xieziyu.github.io

Personal homepage, served straight from the repository root by GitHub Pages.

No build step, no dependencies. `index.html` plus one stylesheet, one script and a
handful of images. Editing a file and pushing is the whole deploy.

```
index.html                     the page
assets/css/main.css            tokens, layout, motion
assets/js/main.js              language toggle, scroll reveal
assets/fonts/                  Geist and Geist Mono, latin subset, self hosted
assets/img/                    avatar, project marks, project screenshots
```

## Notes

- **Language.** English and Chinese are both in the markup; `html[data-lang]` decides
  which is shown. Chinese is the default for every visitor, regardless of browser
  language; only a previous click on the toggle overrides it, and that choice is kept in
  `localStorage`. The inline script in `<head>` applies it before the first paint, so the
  page never flashes the wrong language.
- **Theme.** Dark only, deliberately. There is no light variant and no toggle; the
  palette lives in the `:root` block at the top of `main.css`, and `color-scheme: dark`
  keeps scrollbars and form controls in line. The accent is one hue at two weights:
  `--acc` is light enough to read as text on the dark surface, `--acc-fill` is deep
  enough to carry white text as a filled button. Do not use one where the other belongs.
- **The hero typeface.** LXGW WenKai (霞鹜文楷), SIL OFL 1.1, self hosted and **subset to
  the exact characters in the hero**, which is why it costs 6.9 KB instead of 20 MB. If
  you change the headline or the couplet, the new characters are not in the file: they
  fall through to the kai fallbacks (Kaiti SC, KaiTi) and will not quite match. To
  regenerate after an edit:

  ```bash
  pip install fonttools brotli
  curl -L -o /tmp/lxgw.ttf https://github.com/lxgw/LxgwWenKai/releases/download/v1.520/LXGWWenKai-Regular.ttf
  printf '%s' '千里之行，始于足下老子《道德经》缘由心生随遇而安身无挂碍一切随缘' > /tmp/chars.txt
  python3 -m fontTools.subset /tmp/lxgw.ttf --text-file=/tmp/chars.txt --flavor=woff2 \
    --layout-features='' --no-hinting --desubroutinize \
    --output-file=assets/fonts/lxgw-wenkai-subset.woff2
  ```
- **The chart.** `chart-ngx-echarts.png` is a real render from the ngx-echarts demo site,
  captured on `#/basic/basic-usage` with the site in dark mode so its background sits
  flush against the tile. The demo data is randomised on every load, so a fresh capture
  will not match the current bars.
- **Motion.** Reveal on scroll uses `IntersectionObserver` and is gated on `.js` so the
  page stays readable if the script never runs. `prefers-reduced-motion` disables it.
- **Numbers.** Star counts and npm download figures in the tiles are hand written and
  will drift. Refresh them from `api.github.com/repos/xieziyu/<name>` and
  `api.npmjs.org/downloads/point/last-month/<pkg>`.

## Local preview

```bash
python3 -m http.server 4321
```
