import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Surinder Singh | Frontend Developer Portfolio',
    short_name: 'Surinder Singh',
    description:
      'Portfolio of Surinder Singh, Senior Frontend Developer specializing in React, Next.js, TypeScript, and modern web architectures.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090d16',
    theme_color: '#090d16',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
