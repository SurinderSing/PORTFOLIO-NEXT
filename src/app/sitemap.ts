import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/supabase-queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // WARNING: Update this URL whenever the production deployment domain changes!
  const baseUrl = 'https://surinder-singh-portfolio.vercel.app';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  try {
    const posts = await getBlogPosts({ status: 'PUBLISHED' });
    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(
        post.updated_at || post.published_at || post.created_at || Date.now()
      ),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error generating dynamic blog routes for sitemap:', error);
    return staticRoutes;
  }
}
