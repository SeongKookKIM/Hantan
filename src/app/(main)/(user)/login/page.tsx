'use client'

import Link from 'next/link'
import { useFormHook } from '../../hooks/use-form'
import { UserLogin } from '@/schemas/user'
import InputField from '../../components/input-field'
import ErrorMessage from '../../components/input-field-error'
import InputLabel from '../../components/input-field-label'

export default function Login() {
  const {
    register,
    handleSubmit,
    isSubmitted,
    isSubmitting,
    errors,
    handleLoginSubmitForm,
  } = useFormHook<UserLogin>()

  return (
    <main
      className={
        'h-screenVH min-h-[600] flex flex-col justify-center items-center gap-5 relative'
      }
    >
      {/* Login Label */}
      <h4 className={'font-semibold text-2xl mb-5 text-primary'}>Login</h4>

      <form
        onSubmit={handleSubmit(handleLoginSubmitForm)}
        className={'w-full flex flex-col justify-center items-center'}
      >
        {/* ID */}
        <div className={'w-full flex items-center gap-4 px-8'}>
          <InputLabel htmlFor="userId" content="아이디" />
          <InputField
            type="text"
            id="userId"
            placeholder="아이디를 입력해주세요."
            error={errors.userId}
            register={register('userId', {
              required: '* 아이디를 입력해주세요.',
            })}
            isSubmitted={isSubmitted}
          />
        </div>
        <ErrorMessage error={errors.userId} />

        {/* Password */}
        <div className={'w-full flex items-center gap-4 px-8 mt-10'}>
          <InputLabel htmlFor="userPassword" content="Password" />
          <InputField
            type="password"
            id="userPassword"
            placeholder="비밀번호를 입력해주세요."
            error={errors.password}
            register={register('password', {
              required: '* 비밀번호를 입력해주세요.',
            })}
            isSubmitted={isSubmitted}
          />
        </div>
        <ErrorMessage error={errors.password} />

        {/* SignUp, Find ID, PASSWORD */}
        <div className={'mt-10 w-full flex justify-start px-8 gap-3'}>
          <Link href={'/signUp'}>
            <span className={'text-sm text-secondary cursor-pointer'}>
              회원가입
            </span>
          </Link>
          <Link href={'/findUser'}>
            <span className={'text-sm text-secondary cursor-pointer'}>
              아이디·비밀번호 찾기
            </span>
          </Link>
        </div>

        {/* Submit Button */}
        <div className={'mt-8 px-8 w-full'}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={
              'w-full rounded py-3 text-xl font-semibold bg-primary text-white'
            }
          >
            로그인
          </button>
        </div>
      </form>

      {/* OAuth */}
      <div className={'px-8 mt-8 w-full'}>
        <button
          type="button"
          className={
            'w-full border-secondary rounded text-xl font-semibold py-3 shadow'
          }
        >
          구글로그인
        </button>
      </div>
    </main>
  )
}
