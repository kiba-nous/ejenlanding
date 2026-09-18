import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description?: string;
  /** Post-purchase and utility pages should not be indexed. */
  noindex?: boolean;
}

const SITE_NAME = 'EjenCukai';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Sets the document title and description for a route.
 *
 * Every page previously shared the one title baked into index.html, so the
 * browser tab, history and search results all read the same line no matter
 * which page the visitor was on.
 */
export function usePageMeta({ title, description, noindex }: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
    }
    upsertMeta('property', 'og:title', document.title);

    let robots: HTMLMetaElement | null = null;
    if (noindex) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex, nofollow';
      document.head.appendChild(robots);
    }

    return () => {
      document.title = previousTitle;
      robots?.remove();
    };
  }, [title, description, noindex]);
}
