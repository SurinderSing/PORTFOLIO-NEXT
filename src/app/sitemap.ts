import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // WARNING: Update this URL whenever the production deployment domain changes!
  const baseUrl = 'https://surinder-singh-portfolio.vercel.app';

  // These should ideally be dynamic if you add a blog later
  const routes = ['', '/work', '/resume', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
