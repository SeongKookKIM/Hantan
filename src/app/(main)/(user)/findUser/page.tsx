import Link from 'next/link'

export default function FindUser() {
  return (
    <main
      className={
        'h-screenVH min-h-[600] flex flex-col justify-center items-center gap-5'
      }
    >
      {/* FindUser Label */}
      <h4 className={'font-semibold text-2xl mb-5 text-primary'}>FindUser</h4>

      {/* Find ID */}
      <div className={'flex flex-col gap-8 w-2/3'}>
        <Link href={'/findUser/id'}>
          <button
            type="button"
            className={
              'w-full rounded py-3 text-xl font-semibold bg-primary text-white'
            }
          >
            아이디 찾기
          </button>
        </Link>

        {/* Find Password */}
        <Link href={'/findUser/password'}>
          <button
            type="button"
            className={
              'w-full rounded py-3 text-xl font-semibold bg-secondary text-white'
            }
          >
            비밀번호 찾기
          </button>
        </Link>
      </div>
    </main>
  )
}
