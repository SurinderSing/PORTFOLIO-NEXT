import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { frameable: false, error: 'Missing url query parameter' },
      { status: 400 }
    );
  }

  // Validate URL format
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return NextResponse.json(
        { frameable: false, error: 'Invalid URL protocol' },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { frameable: false, error: 'Invalid URL format' },
      { status: 400 }
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
      cache: 'force-cache',
      next: { revalidate: 86400 }, // Cache response for 24 hours
    });
    clearTimeout(timeout);

    const xfo = response.headers.get('x-frame-options')?.toLowerCase();
    const csp = response.headers.get('content-security-policy')?.toLowerCase();

    const isBlockedByXFO = xfo === 'deny' || xfo === 'sameorigin';
    const isBlockedByCSP =
      !!csp &&
      (csp.includes("frame-ancestors 'none'") ||
        csp.includes("frame-ancestors 'self'"));

    if (isBlockedByXFO || isBlockedByCSP) {
      return NextResponse.json(
        {
          frameable: false,
          reason: isBlockedByXFO
            ? `X-Frame-Options: ${xfo}`
            : 'CSP frame-ancestors',
        },
        {
          headers: {
            'Cache-Control':
              'public, s-maxage=86400, stale-while-revalidate=604800',
          },
        }
      );
    }

    return NextResponse.json(
      { frameable: true },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      }
    );
  } catch (err: any) {
    // If fetching timed out or network failed, return false so client uses static cover image safely
    return NextResponse.json(
      {
        frameable: false,
        reason: err.message || 'Connection timeout or network error',
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600',
        },
      }
    );
  }
}
