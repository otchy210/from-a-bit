import { escapeHtml as escape } from "../lib/html.mjs";
import { capacityBoundaries } from "../lib/capacity.mjs";

const lines = (values) => values.map(escape).join("<br>");

function renderSource({ url, label }) {
  const icon = '<svg width="12" height="12" aria-hidden="true" focusable="false"><use href="#external-link"/></svg>';
  return `<li><a href="${escape(url)}" target="_blank" rel="noopener" aria-describedby="new-window">${escape(label)}${icon}</a></li>`;
}

function renderCapacityScale(bits, previousBits) {
  if (bits === null) return "";
  const mark = capacityBoundaries(bits, previousBits).findLast(({ crossed }) => crossed);
  return `
          <div class="capacity-scale${mark ? " has-capacity-mark" : ""}" aria-hidden="true" hidden>
            <span class="capacity-line"></span>${mark ? `
            <span class="capacity-mark${mark.percent > 75 ? " mark-at-end" : ""}" data-position="${mark.percent}" style="--mark-color:var(--capacity-${mark.unit.toLowerCase()})"><span>1 ${mark.unit}</span></span>
          ` : ""}</div>`;
}

function renderChapter(item, index, previousBits) {
  const { text } = item;
  const heading = index === 0 ? "h1" : "h2";
  return `      <section class="chapter chapter-${item.kind}" id="${escape(item.id)}" aria-labelledby="${escape(item.id)}-title"${item.capacityBits !== null ? ` data-capacity-bits="${item.capacityBits}"` : ""}>
        <div class="chapter-content">${renderCapacityScale(item.capacityBits, previousBits)}${item.graphic ? `
          <img class="chapter-graphic" src="assets/${escape(item.graphic.src)}" width="72" height="72" alt=""${index >= 2 ? ' loading="lazy"' : ""}>` : ""}
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
    const homeUrl = `${site.origin}/`;
    const canonical = escape(homeUrl);
    const siteMetadata = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: homeUrl,
    }).replaceAll("<", "\\u003c");
    const socialImage = escape(new URL("assets/social-card.png", site.origin).href);
    const title = escape(site.title);
    const description = escape(site.description);
    const socialImageAlt = escape(site.socialImageAlt);
    const backToStart = `<a href="#top" data-back-to-start>${escape(site.backToStart)}<span aria-hidden="true">↑</span></a>`;
    let previousBits = 0n;
    const chapters = site.items.map((item, index) => {
      const chapter = renderChapter(item, index, previousBits);
      previousBits = item.capacityBits ?? previousBits;
      return chapter;
    });
    return `<!doctype html>
<!-- Generated from src/index.11ty.mjs and src/data/*.yaml. Do not edit. -->
<html lang="ja">
  <head prefix="og: https://ogp.me/ns#">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${description}">
    <meta name="theme-color" content="${escape(site.themeColor)}">
    <title>${title}</title>
    <link rel="canonical" href="${canonical}">
    <link rel="icon" href="favicon.png" type="image/png" sizes="96x96">
    <script type="application/ld+json">${siteMetadata}</script>
    <meta property="og:type" content="website">
    <meta property="og:locale" content="ja_JP">
    <meta property="og:site_name" content="${escape(site.name)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${socialImage}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${socialImageAlt}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${socialImage}">
    <meta name="twitter:image:alt" content="${socialImageAlt}">
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
${chapters.join("\n")}
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
