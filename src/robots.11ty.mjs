export default class Robots {
  data() {
    return { permalink: "robots.txt" };
  }

  render({ site }) {
    return `User-agent: *
Allow: /

Sitemap: ${site.origin}/sitemap.xml
`;
  }
}
