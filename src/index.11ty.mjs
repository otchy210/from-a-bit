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
    const next = site.items[index + 1];
    return `      <section class="chapter chapter-${item.kind === "outlook" ? "storage" : escape(item.id)}" id="${escape(item.id)}" aria-labelledby="${escape(item.id)}-title"${item.capacityBits !== null ? ` data-capacity-bits="${item.capacityBits}"` : ""}>
        <div class="chapter-copy">
          <p class="eyebrow">${escape(text.eyebrow)}</p>
          <${heading} id="${escape(item.id)}-title">${lines(text.heading)}</${heading}>
          <p class="intro">${lines(text.description)}</p>${text.note ? `
          <p class="development-note">${escape(text.note)}</p>` : ""}
        </div>${item.graphic ? `
        <figure class="data-figure">
          <div class="${item.graphic.count === 1 ? "bit" : "byte"}-visual" aria-hidden="true">${'<span class="bit-dot"></span>'.repeat(item.graphic.count)}</div>
          <figcaption><strong>${escape(text.figure.label)}${text.figure.equation ? ` <span class="equation">${escape(text.figure.equation)}</span>` : ""}</strong> <span>${escape(text.figure.caption)}</span></figcaption>
        </figure>` : ""}${item.sources.length ? `
        <ul class="sources">${item.sources.map((source) => `<li><a href="${escape(source.url)}">${escape(source.label)}</a></li>`).join("")}</ul>` : ""}${next ? `
        <a class="next-chapter" href="#${escape(next.id)}">${escape(text.nextLabel)} <span aria-hidden="true">↓</span></a>` : ""}
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
