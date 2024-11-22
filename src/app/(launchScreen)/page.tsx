'use client'

import Image from 'next/image'
import { useLaunchScreen } from './hooks/use-launchScreen'

export default function LaunchScreen() {
  // 런치스크린 실행
  useLaunchScreen()

  return (
    <main
      className={
        'w-full absolute top-0 left-0 h-screen z-10 bg-secondary flex items-center justify-center'
      }
    >
      <Image
        src={'/hantan_logo.png'}
        alt="Logo"
        width={250}
        height={100}
        className={
          'animate-fade-up animate-duration-[2000ms] animate-delay-500 animate-ease-linear'
        }
      />
    </main>
  )
}
