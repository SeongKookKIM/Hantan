'use client'

import { useFormHook } from '../hooks/use-form'

export default function Login() {
  const {
    register,
    handleSubmit,
    isSubmitted,
    isSubmitting,
    errors,
    handleSubmitForm,
  } = useFormHook()

  return (
    <main
      className={
        'h-screenVH min-h-[600] flex flex-col justify-center items-center gap-5 relative'
      }
    >
      {/* Login Label */}
      <h4 className={'font-semibold text-xl mb-5'}>Login</h4>

      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className={'w-full flex flex-col justify-center items-center'}
      >
        {/* ID */}
        <div className={'w-full flex items-center gap-4 px-8'}>
          <label htmlFor="userID" className={'input-label'}>
            아이디
          </label>
          <input
            type="text"
            id="userID"
            placeholder="아이디를 입력해주세요."
            className={'input-field'}
            aria-invalid={
              isSubmitted ? (errors.id ? 'true' : 'false') : undefined
            }
            {...register('id', {
              required: '*아이디를 입력해주세요.',
            })}
          />
        </div>
        {errors.id && (
          <p className={'text-error'}>{errors.id.message?.toString()}</p>
        )}

        {/* Password */}
        <div className={'w-full flex items-center gap-4 px-8 mt-10'}>
          <label htmlFor="userPassword" className={'input-label'}>
            Password
          </label>
          <input
            type="password"
            id="userPassword"
            className={'input-field'}
            placeholder="비밀번호를 입력해주세요."
            aria-invalid={
              isSubmitted ? (errors.password ? 'true' : 'false') : undefined
            }
            {...register('password', {
              required: '* 비밀번호를 입력해주세요.',
            })}
          />
        </div>

        {errors.password && (
          <p className={'text-error'}>{errors.password.message?.toString()}</p>
        )}

        {/* SignUp, Find ID, PASSWORD */}
        <div className={'mt-10 w-full flex justify-start px-8 gap-3'}>
          <span className={'text-sm text-secondary cursor-pointer'}>
            회원가입
          </span>
          <span className={'text-sm text-secondary cursor-pointer'}>
            아이디·비밀번호 찾기
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={
            'mt-8 w-1/2 rounded py-3 text-xl font-semibold bg-secondary text-white'
          }
        >
          로그인
        </button>
      </form>

      {/* OAuth */}
      <div className={'px-8 w-full'}>
        <button
          type="button"
          className={
            'mt-8 w-full border-secondary rounded text-xl font-semibold py-3 shadow'
          }
        >
          구글로그인
        </button>
      </div>
    </main>
  )
}
