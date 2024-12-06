import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import LaunchScreenLayout from './launchScreenLayout'
import { Providers } from '@/providers'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Hantan',
  description:
    '당신의 마음 속 고민과 걱정거리를 익명으로 털어놓아보세요. 이름을 밝히지 않고도 편하게 이야기하실 수 있는 안전한 공간입니다. 힘들었던 일, 속상했던 감정, 혹은 누구에게도 말하지 못했던 고민이 있다면 자유롭게 나눠주세요. 때로는 마음을 나누는 것만으로도 큰 위로가 될 수 있습니다.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LaunchScreenLayout>{children}</LaunchScreenLayout>
        </Providers>
      </body>
    </html>
  )
}
