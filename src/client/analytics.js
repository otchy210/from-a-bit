export function enableAnalytics() {
  const { analyticsId } = document.documentElement.dataset;
  if (!analyticsId) return;

  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical || new URL(canonical.href).origin !== window.location.origin) return;

  window.dataLayer ??= [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", analyticsId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
  document.head.append(tag);
}
