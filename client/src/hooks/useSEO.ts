import { useEffect } from "react";
import { BASE_URL, OG_IMAGE, SITE_NAME, getPageMeta } from "@shared/seoMeta";

/**
 * Sets document title, meta description, canonical URL, Open Graph, and
 * Twitter Card tags for the current page. Keeps client-side navigation in
 * sync with the server-injected meta tags so Google's JS renderer and
 * social-media crawlers always see accurate metadata.
 */
export function useSEO(path: string) {
  useEffect(() => {
    const meta = getPageMeta(path);
    const url = `${BASE_URL}${path}`;

    // Title
    document.title = meta.title;

    // Helper: upsert a <meta> tag
    function setMeta(attr: string, key: string, value: string) {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    }

    // Description
    setMeta("name", "description", meta.description);

    // Canonical
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);

    // Open Graph
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", meta.ogImage || OG_IMAGE);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE_NAME);

    // Twitter Card
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", meta.ogImage || OG_IMAGE);
    setMeta("name", "twitter:card", "summary_large_image");
  }, [path]);
}
