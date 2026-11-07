import { escapeHtml as escape } from "../lib/html.mjs";

export default class Page {
  data() {
    return {
      pagination: { data: "site.languages", size: 1, alias: "language" },
      permalink: ({ language }) => `${language}/index.html`,
    };
  }

  render({ site, language }) {
    const locale = site.locales[language];
    const firstId = site.items[0].id;
    const lines = (values) => values.map(escape).join("<br>");
    return `<!doctype html>
<!-- Generated from src/index.11ty.mjs and src/data/*.yaml. Do not edit. -->
<html lang="${language}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escape(locale.description)}">
    <meta name="theme-color" content="${escape(site.themeColor)}">
    <title>${escape(locale.title)}</title>
    <link rel="canonical" href="${escape(site.origin)}/${language}/">
${site.languages.map((code) => `    <link rel="alternate" hreflang="${code}" href="${escape(site.origin)}/${code}/">`).join("\n")}
    <link rel="stylesheet" href="../assets/style.css">
    <script src="../assets/script.js" defer></script>
  </head>
  <body>
    <a class="skip-link" href="#main">${escape(locale.skipLink)}</a>
    <div class="reading-progress" aria-hidden="true"></div>
    <header class="site-header">
      <a class="wordmark" href="#${escape(firstId)}">${escape(site.name)}<span class="brand-dot" aria-hidden="true"></span></a>
      <nav class="language-nav" aria-label="${escape(locale.languageLabel)}">
${site.languages.map((code) => code === language
    ? `        <span lang="${code}" aria-current="page">${escape(site.locales[code].name)}</span>`
    : `        <a href="../${code}/" lang="${code}" hreflang="${code}" data-language-link>${escape(site.locales[code].name)}</a>`).join("\n")}
      </nav>
    </header>
    <main id="main" tabindex="-1">
${site.items.map((item, index) => {
    const text = item.text[language];
    const heading = index === 0 ? "h1" : "h2";
    return `      <section class="chapter chapter-${item.kind}" id="${escape(item.id)}" aria-labelledby="${escape(item.id)}-title"${item.capacityBits !== null ? ` data-capacity-bits="${item.capacityBits}"` : ""}>
        <div class="chapter-content">${item.graphic ? `
          <div class="chapter-graphic" aria-hidden="true">
            <img src="../assets/${escape(item.graphic.src)}" width="72" height="72" alt="">
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
      <a href="#${escape(firstId)}">${escape(locale.backToStart)} <span aria-hidden="true">↑</span></a>
    </footer>
  </body>
</html>
`;
  }
}
