import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Surinder Singh | Frontend Developer Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#090d16',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '60px 80px',
          fontFamily: 'monospace',
          color: '#f8fafc',
          border: '1px solid #1e293b',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#0f172a',
            padding: '10px 20px',
            borderRadius: '9999px',
            border: '1px solid #334155',
            fontSize: 20,
            color: '#38bdf8',
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'inline-block',
            }}
          />
          <span>surindersingh.dev • Available for Opportunities</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            Surinder Singh
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: '#38bdf8',
            }}
          >
            Senior Frontend Engineer &amp; Web Architect
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#94a3b8',
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            React • Next.js • TypeScript • Micro-Frontends • AI-Powered Web
            Systems
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #1e293b',
            paddingTop: '24px',
            fontSize: 18,
            color: '#64748b',
          }}
        >
          <div>Delhi, India • High Performance SaaS</div>
          <div style={{ color: '#38bdf8' }}>
            https://surinder-singh-portfolio.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
