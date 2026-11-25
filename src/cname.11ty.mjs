export default class Cname {
  data() {
    return { permalink: "CNAME", eleventyAllowMissingExtension: true };
  }

  render({ site }) {
    return `${new URL(site.origin).hostname}\n`;
  }
}
