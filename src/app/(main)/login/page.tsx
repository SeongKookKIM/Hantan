'use client'

import { useFormHook } from '../hooks/use-form'

export default function Login() {
  const { register, handleSubmit, isSubmitted, isSubmitting, errors } =
    useFormHook()

  return (
    <main
      className={'h-screenVH flex flex-col justify-center items-center gap-5'}
    >
      <form className={'flex flex-col justify-center items-center gap-4'}>
        {/* Login Label */}
        <label className={'font-semibold text-xl'}>로그인</label>

        {/* ID */}
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          aria-invalid={
            isSubmitted ? (errors.id ? 'true' : 'false') : undefined
          }
          {...register('id', {
            required: '*아이디를 입력해주세요.',
          })}
        />
        {errors.id && (
          <p className="login-alert">{errors.id.message?.toString()}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          aria-invalid={
            isSubmitted ? (errors.password ? 'true' : 'false') : undefined
          }
          {...register('password', {
            required: '* 비밀번호를 입력해주세요.',
          })}
        />
        {errors.password && (
          <p className="login-alert">{errors.password.message?.toString()}</p>
        )}

        {/* SignUp, Find ID, PASSWORD */}
        <div>
          <span>회원가입</span>
          <span>아이디·비밀번호 찾기</span>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>
          로그인
        </button>
      </form>

      <button type="button">구글로그인</button>
    </main>
  )
}
