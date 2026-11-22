import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Ranjith T — Building useful things, not tutorial demos'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px',
          background: 'linear-gradient(135deg, #05070d 0%, #0a1120 55%, #120d29 100%)',
          color: '#e9efff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 54,
              height: 54,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(62,231,255,0.5)',
              color: '#3ee7ff',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            RT
          </div>
          <div style={{ fontSize: 18, letterSpacing: 4, color: '#8b9bb8' }}>
            RANJITH T / PORTFOLIO
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 24, color: '#3ee7ff', letterSpacing: 3 }}>
            // COMPUTER SCIENCE ENGINEERING STUDENT
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: -3,
            }}
          >
            Building useful things,
          </div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: -3,
              background: 'linear-gradient(90deg, #9df3ff, #a78bfa)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            not tutorial demos.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            fontSize: 18,
            color: '#8b9bb8',
          }}
        >
          <span>Care-AI · FormLink · LEARNOFFLINE · Mini-Runner</span>
          <span style={{ color: '#3ee7ff' }}>github.com/ranjith11102007</span>
        </div>
      </div>
    ),
    size,
  )
}
