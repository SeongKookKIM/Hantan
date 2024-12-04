'use client'

import { UserSignUp } from '@/schemas/user'
import { useFormHook } from '../hooks/use-form'
import InputField from '../components/input-field'
import ErrorMessage from '../components/input-field-error'
import InputLabel from '../components/input-field-label'

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
      {/* SignUp Label */}
      <h4 className={'font-semibold text-2xl mb-5 text-primary'}>SignUp</h4>

      <form
        onSubmit={handleSubmit(handlerSignUpSubmitForm)}
        className={'w-full flex flex-col justify-center items-center'}
      >
        {/* ID */}
        <div className={'w-full flex items-center gap-4 px-8'}>
          <InputLabel htmlFor="userId" content="아이디" />
          <InputField
            type="text"
            id="userId"
            placeholder="아이디를 입력해주세요."
            register={register('userId', {
              required: '* 필수 입력란입니다.',
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
                message: '* 영어와 숫자를 포함한 아이디를 입력해주세요.',
              },
            })}
            error={errors.userId}
            isSubmitted={isSubmitted}
          />
        </div>
        <ErrorMessage error={errors.userId} />

        {/* Email */}
        <div className={'w-full flex items-center gap-4 px-8 mt-10'}>
          <InputLabel htmlFor="userEmail" content="E-mail" />
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
        </div>
        <ErrorMessage error={errors.userEmail} />

        {/* Password */}
        <div className={'w-full flex items-center gap-4 px-8 mt-10'}>
          <InputLabel htmlFor="userPassword" content="Password" />
          <InputField
            type="password"
            id="userPassword"
            className="placeholder:text-sm"
            placeholder="숫자+영문자+특수문자 조합으로 8자리 이상"
            register={register('password', {
              required: '* 필수 입력란입니다.',
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                message:
                  '* 숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.',
              },
            })}
            error={errors.password}
            isSubmitted={isSubmitted}
          />
        </div>
        <ErrorMessage error={errors.password} />

        {/* Confirm Password */}
        <div className={'w-full flex items-center gap-4 px-8 mt-10'}>
          <InputLabel htmlFor="userConfirmPassword" content="Confirm" />
          <InputField
            type="password"
            id="userConfirmPassword"
            placeholder="비밀번호 재확인"
            register={register('confirmPassword', {
              required: '* 필수 입력란입니다.',
              validate: (value) =>
                value === password || '* 비밀번호가 일치하지 않습니다.',
            })}
            error={errors.confirmPassword}
            isSubmitted={isSubmitted}
          />
        </div>
        <ErrorMessage error={errors.confirmPassword} />

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
