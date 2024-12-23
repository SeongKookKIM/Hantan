'use client'

import { use } from 'react'
import { useHantan } from './hook/use-hantan'

export interface HantansDetailPageProps {
  params: Promise<{ id: string }>
}

export default function HantansDetailPage({ params }: HantansDetailPageProps) {
  const { id } = use(params)

  const { data, isLoading, error } = useHantan(id)

  return <main className={'h-screenVH min-h-[600] mt-5'}>디테일 페이지</main>
}
