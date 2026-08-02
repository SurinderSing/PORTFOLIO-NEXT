import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    // WARNING: Update this URL whenever the production deployment domain changes!
    sitemap: 'https://surinder-singh-portfolio.vercel.app/sitemap.xml',
  };
}
