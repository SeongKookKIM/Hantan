'use client'

import Link from 'next/link'
import HantanGraph from '../components/hantan-graph'
import { useAuth } from '../hooks/use-auth'

export default function Menu() {
  const { logout, data: authData } = useAuth()

  return (
    <main className={'h-screenVH min-h-[600]'}>
      <div className={'mt-5'}>
        <h3 className={'text-3xl font-bold'}>
          익명자{authData.user?.id}님 반갑습니다!
        </h3>
      </div>

      <hr className={'my-5'} />

      <div>
        <p className={'text-2xl font-bold'}>이번 달 나의 기분</p>
        <HantanGraph />
      </div>
      <ul className={'text-xl font-semibold my-5 flex flex-col gap-3'}>
        <li className={'text-primary font-bold'}>
          <Link href={'/hantanWrite'}>한탄 작성하기</Link>
        </li>
        <li>
          <Link href={'/myHantans'}>내가 쓴 한탄 보기</Link>
        </li>
        <li>
          <Link href={'/'}>내가 좋아요 한 한탄보기</Link>
        </li>
        <li>
          <Link href={'/'}>내가 댓글 쓴 한탄 보기</Link>
        </li>
      </ul>

      <hr />

      <ul className={'text-xl font-semibold my-5 flex flex-col gap-3'}>
        <li>
          <Link href={'/'}>비밀번호 수정</Link>
        </li>
        <li>
          <Link href={'/'}>라이브러리 라이센스</Link>
        </li>
      </ul>
      <button
        type="button"
        className={
          'w-full rounded py-3 text-xl font-semibold bg-secondary text-white'
        }
        onClick={logout}
      >
        로그아웃
      </button>
    </main>
  )
}
