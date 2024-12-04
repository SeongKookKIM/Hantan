'use client'

import { UserFindPassword } from '@/schemas/user'
import { useFormHook } from '../../hooks/use-form'
import InputField from '../../components/input-field'
import ErrorMessage from '../../components/input-field-error'
import InputLabel from '../../components/input-field-label'

export default function FindPassword() {
  const {
    register,
    handleSubmit,
    isSubmitted,
    isSubmitting,
    errors,
    handlerFindUserPassword,
  } = useFormHook<UserFindPassword>()

  return (
    <main className={'h-screenVH min-h-[600] flex flex-col gap-[100]'}>
      {/* FindId Label */}
      <h4
        className={
          'w-full font-semibold text-2xl my-5 text-primary text-center'
        }
      >
        Find Password
      </h4>

      <form
        onSubmit={handleSubmit(handlerFindUserPassword)}
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

        {/* Submit Button */}
        <div className={'mt-10 px-8 w-full'}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={
              'w-full rounded py-3 text-xl font-semibold bg-primary text-white'
            }
          >
            비밀번호 재설정
          </button>
        </div>
      </form>
    </main>
  )
}
