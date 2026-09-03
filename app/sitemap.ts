import type { MetadataRoute } from 'next';
import { publicAppUrl } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicAppUrl();
  return ['', '/pricing', '/privacy', '/terms', '/login'].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
