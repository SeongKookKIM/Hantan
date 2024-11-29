'use client'

import { UserSignUp } from '@/schemas/user'
import { useFormHook } from '../hooks/use-form'

export default function SignUp() {
  const {
    register,
    handleSubmit,
    isSubmitted,
    isSubmitting,
    errors,
    watch,
    handlerSignUpSubmitForm,
  } = useFormHook<UserSignUp>()

  const password = watch('password', '')

  return (
    <main
      className={
        'h-screenVH min-h-[600] flex flex-col justify-center items-center gap-5 relative'
      }
    >
      {/* Login Label */}
      <h4 className={'font-semibold text-2xl mb-5 text-primary'}>SignUp</h4>

      <form
        onSubmit={handleSubmit(handlerSignUpSubmitForm)}
        className={'w-full flex flex-col justify-center items-center'}
      >
        {/* ID */}
        <div className={'w-full flex items-center gap-4 px-8'}>
          <label htmlFor="userId" className={'input-label'}>
            아이디
          </label>
          <input
            type="text"
            id="userId"
            placeholder="아이디를 입력해주세요."
            className={'input-field'}
            aria-invalid={
              isSubmitted ? (errors.userId ? 'true' : 'false') : undefined
            }
            {...register('userId', {
              required: '* 필수 입력란입니다.',
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
                message: '* 영어와 숫자를 포함한 아이디를 입력해주세요.',
              },
            })}
          />
        </div>
        {errors.userId && (
          <p className={'text-error'}>{errors.userId.message?.toString()}</p>
        )}

        {/* Email */}
        <div className={'w-full flex items-center gap-4 px-8 mt-10'}>
          <label htmlFor="userEmail" className={'input-label'}>
            E-mail
          </label>
          <input
            type="text"
            id="userEmail"
            placeholder="이메일을 입력해주세요."
            className={'input-field'}
            aria-invalid={
              isSubmitted ? (errors.userEmail ? 'true' : 'false') : undefined
            }
            {...register('userEmail', {
              required: '* 필수 입력란입니다.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: '* 올바른 이메일 주소를 입력하세요.',
              },
            })}
          />
        </div>
        {errors.userEmail && (
          <p className={'text-error'}>{errors.userEmail.message?.toString()}</p>
        )}

        {/* Password */}
        <div className={'w-full flex items-center gap-4 px-8 mt-10'}>
          <label htmlFor="userPassword" className={'input-label'}>
            Password
          </label>
          <input
            type="password"
            id="userPassword"
            className={'input-field placeholder:text-sm'}
            placeholder="숫자+영문자+특수문자 조합으로 8자리 이상"
            aria-invalid={
              isSubmitted ? (errors.password ? 'true' : 'false') : undefined
            }
            {...register('password', {
              required: '* 필수 입력란입니다.',
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                message:
                  '* 숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.',
              },
            })}
          />
        </div>

        {errors.password && (
          <p className={'text-error'}>{errors.password.message?.toString()}</p>
        )}

        {/* Confirm Password */}
        <div className={'w-full flex items-center gap-4 px-8 mt-10'}>
          <label htmlFor="userConfirmPassword" className={'input-label'}>
            Confirm
          </label>
          <input
            type="password"
            id="userConfirmPassword"
            className={'input-field'}
            placeholder="비밀번호 재확인"
            aria-invalid={
              isSubmitted
                ? errors.confirmPassword
                  ? 'true'
                  : 'false'
                : undefined
            }
            {...register('confirmPassword', {
              required: '* 필수 입력란입니다.',
              validate: (value) =>
                value === password || '* 비밀번호가 일치하지 않습니다.',
            })}
          />
        </div>

        {errors.confirmPassword && (
          <p className={'text-error'}>
            {errors.confirmPassword.message?.toString()}
          </p>
        )}

        {/* Submit Button */}
        <div className={'mt-8 px-8 w-full'}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={
              'w-full rounded py-3 text-xl font-semibold bg-primary text-white'
            }
          >
            가입하기
          </button>
        </div>
      </form>
    </main>
  )
}
