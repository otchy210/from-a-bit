import { escapeHtml as escape } from "../lib/html.mjs";

export default class Page {
  data() {
    return {
      permalink: "index.html",
    };
  }

  render({ site }) {
    const firstId = site.items[0].id;
    const lines = (values) => values.map(escape).join("<br>");
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
    <div class="reading-progress" aria-hidden="true"></div>
    <header class="site-header">
      <a class="wordmark" href="#${escape(firstId)}">${escape(site.name)}<span class="brand-dot" aria-hidden="true"></span></a>
    </header>
    <main id="main" tabindex="-1">
${site.items.map((item, index) => {
    const text = item.text;
    const heading = index === 0 ? "h1" : "h2";
    return `      <section class="chapter chapter-${item.kind}" id="${escape(item.id)}" aria-labelledby="${escape(item.id)}-title"${item.capacityBits !== null ? ` data-capacity-bits="${item.capacityBits}"` : ""}>
        <div class="chapter-content">${item.graphic ? `
          <div class="chapter-graphic" aria-hidden="true">
            <img src="assets/${escape(item.graphic.src)}" width="72" height="72" alt="">
          </div>` : ""}
          <div class="chapter-copy">
            <${heading} id="${escape(item.id)}-title">${lines(text.heading)}</${heading}>
            <p class="intro">${lines(text.description)}</p>${text.note ? `
            <p class="development-note">${escape(text.note)}</p>` : ""}${item.sources.length ? `
            <ul class="sources">${item.sources.map((source) => `<li><a href="${escape(source.url)}">${escape(source.label)}</a></li>`).join("")}</ul>` : ""}
          </div>
        </div>
      </section>`;
  }).join("\n")}
    </main>
    <footer class="site-footer">
      <span>${escape(site.name)}</span>
      <a href="#${escape(firstId)}">${escape(site.backToStart)} <span aria-hidden="true">↑</span></a>
    </footer>
  </body>
</html>
`;
  }
}
