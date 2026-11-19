import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMeta {
  title: string;
  description?: string;
  /** Post-purchase and utility pages should not be indexed. */
  noindex?: boolean;
}

const SITE_NAME = 'eCukai';
const SITE_ORIGIN = 'https://ecukai.my';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function readMeta(attr: 'name' | 'property', key: string) {
  return document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)?.content;
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Sets the document title, description and canonical URL for a route.
 *
 * Every page previously shared the one title baked into index.html, so the
 * browser tab, history and search results all read the same line no matter
 * which page the visitor was on. The canonical link is per route too: leaving
 * index.html's homepage canonical in place tells Google every page is a
 * duplicate of the homepage.
 */
export function usePageMeta({ title, description, noindex }: PageMeta) {
  const { pathname } = useLocation();

  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription = readMeta('name', 'description');
    const previousOgDescription = readMeta('property', 'og:description');

    document.title = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
    }
    upsertMeta('property', 'og:title', document.title);

    // Trailing slash only on the root, matching the URLs in sitemap.xml.
    const url = `${SITE_ORIGIN}${pathname === '/' ? '/' : pathname.replace(/\/+$/, '')}`;
    setCanonical(url);
    upsertMeta('property', 'og:url', url);

    let robots: HTMLMetaElement | null = null;
    if (noindex) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex, nofollow';
      document.head.appendChild(robots);
    }

    return () => {
      document.title = previousTitle;
      if (previousDescription) upsertMeta('name', 'description', previousDescription);
      if (previousOgDescription) upsertMeta('property', 'og:description', previousOgDescription);
      robots?.remove();
    };
  }, [title, description, noindex, pathname]);
}
