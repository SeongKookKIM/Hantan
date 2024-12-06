'use client'

import LaunchScreen from '@/app/launchScreen'
import { useLaunchScreen } from '@/lib/launchScreen/use-launchScreen'
import { PropsWithChildren } from 'react'

export default function LaunchScreenLayout({ children }: PropsWithChildren) {
  const { isLaunching } = useLaunchScreen()

  return isLaunching ? (
    <LaunchScreen />
  ) : (
    <main className="relative">{children}</main>
  )
}
