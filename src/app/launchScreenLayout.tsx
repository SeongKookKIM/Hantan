'use client'

import LaunchScreen from '@/app/launchScreen'
import { useLaunchScreen } from '@/lib/launchScreen/use-launchScreen'
import { PropsWithChildren } from 'react'
import { Providers } from '@/providers'

export default function LaunchScreenLayout({ children }: PropsWithChildren) {
  const { isLaunching } = useLaunchScreen()

  return isLaunching ? (
    <LaunchScreen />
  ) : (
    <Providers>
      <main className="relative">{children}</main>
    </Providers>
  )
}
