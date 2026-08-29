/**
 * Image Provider Validation Utility
 *
 * Validates cover image URLs against a whitelist of supported image providers.
 * Prevents broken images from unsupported domains that aren't configured in
 * Next.js remotePatterns (next.config.mjs).
 */

/** Supported image provider configurations */
export interface ImageProvider {
  /** Display name of the provider */
  name: string;
  /** Hostname pattern(s) to match against */
  hostnames: string[];
  /** Example URL for user guidance */
  exampleUrl: string;
}

/** Whitelist of allowed image hosting providers */
export const SUPPORTED_IMAGE_PROVIDERS: ImageProvider[] = [
  {
    name: 'Unsplash',
    hostnames: ['images.unsplash.com'],
    exampleUrl: 'https://images.unsplash.com/photo-...',
  },
  {
    name: 'Supabase Storage',
    hostnames: ['irqstahzdalcbusyubbo.supabase.co'],
    exampleUrl:
      'https://irqstahzdalcbusyubbo.supabase.co/storage/v1/object/public/media/...',
  },
  {
    name: 'Imgur',
    hostnames: ['i.imgur.com'],
    exampleUrl: 'https://i.imgur.com/xxxxx.jpg',
  },
  {
    name: 'GitHub',
    hostnames: [
      'raw.githubusercontent.com',
      'user-images.githubusercontent.com',
      'github.com',
    ],
    exampleUrl: 'https://raw.githubusercontent.com/user/repo/main/image.png',
  },
  {
    name: 'Postimages',
    hostnames: ['i.postimg.cc'],
    exampleUrl: 'https://i.postimg.cc/xxxxx/image.jpg',
  },
  {
    name: 'ImgBB',
    hostnames: ['i.ibb.co'],
    exampleUrl: 'https://i.ibb.co/xxxxx/image.jpg',
  },
];

/** All allowed hostnames flattened for quick lookup */
const ALLOWED_HOSTNAMES = new Set(
  SUPPORTED_IMAGE_PROVIDERS.flatMap((p) => p.hostnames)
);

export interface ImageValidationResult {
  valid: boolean;
  error?: string;
  providerName?: string;
}

/**
 * Validate that a cover image URL comes from a supported provider.
 * Returns { valid: true, providerName } if allowed, or { valid: false, error } if not.
 * Empty/blank URLs are considered valid (no cover image).
 */
export function validateImageUrl(url: string): ImageValidationResult {
  const trimmed = url.trim();

  // Empty URL is valid (no cover image)
  if (!trimmed) {
    return { valid: true };
  }

  // Must be a valid URL
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return {
      valid: false,
      error: 'Invalid URL format. Please enter a valid image URL.',
    };
  }

  // Must be HTTPS
  if (parsed.protocol !== 'https:') {
    return {
      valid: false,
      error: 'Only HTTPS image URLs are supported for security.',
    };
  }

  // Check against allowed hostnames
  const hostname = parsed.hostname;
  if (ALLOWED_HOSTNAMES.has(hostname)) {
    const provider = SUPPORTED_IMAGE_PROVIDERS.find((p) =>
      p.hostnames.includes(hostname)
    );
    return { valid: true, providerName: provider?.name };
  }

  // Not in whitelist
  return {
    valid: false,
    error: `"${hostname}" is not a supported image provider. Please use one of our supported providers.`,
  };
}

/**
 * Get a formatted list of supported provider names for display.
 */
export function getSupportedProviderNames(): string[] {
  return SUPPORTED_IMAGE_PROVIDERS.map((p) => p.name);
}
