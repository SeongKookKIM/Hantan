'use client'

import { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from './lib/tnastack-query/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}
