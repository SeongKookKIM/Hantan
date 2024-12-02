'use client'

import { useFormHook } from '@/app/(main)/hooks/use-form'
import { UserResetPassword } from '@/schemas/user'
import { useSearchParams } from 'next/navigation'

export default function PasswordReset() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const {
    register,
    handleSubmit,
    isSubmitted,
    isSubmitting,
    errors,
    watch,
    handlerResetPassword,
  } = useFormHook<UserResetPassword>()

  const password = watch('password', '')

  return (
    <main
      className={
        'h-screenVH min-h-[600] flex flex-col justify-center items-center gap-5'
      }
    >
      {/* Reset Label */}
      <h4 className={'font-semibold text-2xl mb-5 text-primary'}>
        Reset Password
      </h4>

      <form
        onSubmit={handleSubmit((data) => handlerResetPassword(data, id))}
        className={'w-full flex flex-col justify-center items-center'}
      >
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
            변경하기
          </button>
        </div>
      </form>
    </main>
  )
}
