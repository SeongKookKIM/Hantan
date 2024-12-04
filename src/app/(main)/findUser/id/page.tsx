'use client'

import { UserFindId } from '@/schemas/user'
import { useFormHook } from '../../hooks/use-form'
import Link from 'next/link'
import InputField from '../../components/input-field'
import ErrorMessage from '../../components/input-field-error'

export default function FIndId() {
  const {
    register,
    handleSubmit,
    isSubmitted,
    isSubmitting,
    errors,
    handlerFindUserId,
    isFind,
    findUserId,
  } = useFormHook<UserFindId>()

  return (
    <main className={'h-screenVH min-h-[600] flex flex-col gap-[100]'}>
      {/* FindId Label */}
      <h4
        className={
          'w-full font-semibold text-2xl my-5 text-primary text-center'
        }
      >
        Find ID
      </h4>

      {/* 이메일 입력 */}
      <form onSubmit={handleSubmit(handlerFindUserId)} className="w-full mt-10">
        <label className={'block font-semibold mb-3'}>
          회원가입한 이메일을 입력해주세요
        </label>

        <div className="flex gap-10">
          <InputField
            type="text"
            id="userEmail"
            placeholder="이메일을 입력해주세요."
            register={register('userEmail', {
              required: '* 필수 입력란입니다.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: '* 올바른 이메일 주소를 입력하세요.',
              },
            })}
            error={errors.userEmail}
            isSubmitted={isSubmitted}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={'w-[100] rounded bg-primary text-white font-semibold'}
          >
            입력
          </button>
        </div>
        <ErrorMessage error={errors.userEmail} className="text-left" />
      </form>

      {/* Result */}
      {isFind && (
        <div>
          {findUserId ? (
            <p className={'text-lg font-semibold text-center'}>
              회원님의 아이디는
              <br />
              <span className={'inline-block mr-2 text-2xl text-primary'}>
                {findUserId}
              </span>
              입니다.
            </p>
          ) : (
            <p className={'text-lg font-semibold text-center'}>
              해당 이메일로 가입된 사용자를 찾을 수 없습니다.
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className={'flex flex-col gap-3'}>
        <Link href={'/login'} className={'w-auto'}>
          로그인 페이지로
        </Link>
        <Link href={'/findUser/password'} className="inline-block">
          비밀번호 찾기
        </Link>
      </div>
    </main>
  )
}
