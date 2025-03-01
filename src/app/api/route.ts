import { NextResponse } from 'next/server';

export async function HEAD(): Promise<NextResponse> {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': '0',
    'Cache-Control': 'no-cache',
    ETag: '"12345abcdef"',
    'Last-Modified': new Date().toUTCString(),
  });
  return NextResponse.json({ status: 200 }, { headers });
}
