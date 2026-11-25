import { escapeHtml } from "../lib/html.mjs";

export default class Sitemap {
  data() {
    return { permalink: "sitemap.xml" };
  }

  render({ site }) {
    const homeUrl = escapeHtml(`${site.origin}/`);
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${homeUrl}</loc></url>
</urlset>
`;
  }
}
