import { escapeHtml as escape } from "../lib/html.mjs";

const lines = (values) => values.map(escape).join("<br>");

function renderSource({ url, label }) {
  const icon = '<svg width="12" height="12" aria-hidden="true" focusable="false"><use href="#external-link"/></svg>';
  return `<li><a href="${escape(url)}" target="_blank" rel="noopener" aria-describedby="new-window">${escape(label)}${icon}</a></li>`;
}

function renderChapter(item, index) {
  const { text } = item;
  const heading = index === 0 ? "h1" : "h2";
  return `      <section class="chapter chapter-${item.kind}" id="${escape(item.id)}" aria-labelledby="${escape(item.id)}-title"${item.capacityBits !== null ? ` data-capacity-bits="${item.capacityBits}"` : ""}>
        <div class="chapter-content">${item.graphic ? `
          <img class="chapter-graphic" src="assets/${escape(item.graphic.src)}" width="72" height="72" alt="">` : ""}
          <div class="chapter-copy">
            <${heading} id="${escape(item.id)}-title">${lines(text.heading)}</${heading}>${text.capacity ? `
            <p class="chapter-measure">${escape(text.capacity)}</p>
            <p class="chapter-era">${escape(text.era)}</p>` : ""}
            <p class="intro">${lines(text.description)}</p>${text.note ? `
            <p class="development-note">${escape(text.note)}</p>` : ""}${item.sources.length ? `
            <ul class="sources">${item.sources.map(renderSource).join("")}</ul>` : ""}
          </div>
        </div>
      </section>`;
}

export default class Page {
  data() {
    return {
      permalink: "index.html",
    };
  }

  render({ site }) {
    const firstId = site.items[0].id;
    const notes = site.capacityNotes;
    const backToStart = `<a href="#top" data-back-to-start>${escape(site.backToStart)}<span aria-hidden="true">↑</span></a>`;
    return `<!doctype html>
<!-- Generated from src/index.11ty.mjs and src/data/*.yaml. Do not edit. -->
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escape(site.description)}">
    <meta name="theme-color" content="${escape(site.themeColor)}">
    <title>${escape(site.title)}</title>
    <link rel="canonical" href="${escape(site.origin)}/">
    <link rel="stylesheet" href="assets/style.css">
    <script src="assets/script.js" defer></script>
  </head>
  <body>
    <a class="skip-link" href="#main">${escape(site.skipLink)}</a>
    <svg class="icon-definitions" width="0" height="0" aria-hidden="true" focusable="false">
      <symbol id="external-link" viewBox="0 0 16 16">
        <path d="M9 2.5h4.5V7m0-4.5L7 9m.5-5H3.5v8.5H12V8.5" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </symbol>
    </svg>
    <span id="new-window" hidden>新しいタブまたはウィンドウで開く</span>
    <div class="reading-progress" aria-hidden="true"></div>
    <header class="site-header" id="top" tabindex="-1">
      <a class="wordmark" href="#${escape(firstId)}">${escape(site.name)}<span class="brand-dot" aria-hidden="true"></span></a>
    </header>
    <main id="main" tabindex="-1">
${site.items.map(renderChapter).join("\n")}
    </main>
    <footer class="site-footer">${notes ? `
      <div class="footer-notes" id="capacity-notes">
        <div class="footer-notes-nav">${backToStart}</div>
        <div class="footer-notes-content">
          <h2>${escape(notes.heading)}</h2>
          <dl>
${notes.entries.map((entry) => `            <div>
              <dt>${escape(entry.heading)}</dt>
              <dd>${escape(entry.description)}</dd>
            </div>`).join("\n")}
          </dl>
        </div>
      </div>` : ""}
      <div class="footer-bar">
        <span>${escape(site.name)}</span>
        ${backToStart}
      </div>
    </footer>
  </body>
</html>
`;
  }
}
