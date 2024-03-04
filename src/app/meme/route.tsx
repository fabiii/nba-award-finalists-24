import { ImageResponse } from 'next/og'
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const hasText = searchParams.has('text')
  const text = hasText ? searchParams.get('text')?.slice(0, 100) : ''

  const imageData = await fetch(
    new URL('./meme-simply.png', import.meta.url)
  ).then((res) => res.arrayBuffer())

  const fontData = await fetch(
    new URL('../../../assets/Oswald-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <img width="1200" height="630" alt="meme" src={imageData} />
        <p
          style={{
            position: 'absolute',
            margin: 0,
            paddingTop: 450,
            color: '#ffffff',
            fontSize: 100,
            fontFamily: '"Oswald Bold"',
            textTransform: 'uppercase',
            textShadow:
              '5px 5px 3px #000, -5px 5px 3px #000, -5px -5px 0 #000, 5px -5px 0 #000',
          }}
        >
          {text}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Oswald Bold',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  )
}
