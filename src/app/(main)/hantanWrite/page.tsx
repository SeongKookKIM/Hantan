'use client'

import { PostWrite } from '@/schemas/post'
import { useFormHook } from '../hooks/use-form'
import InputLabel from '../components/input-field-label'
import InputField from '../components/input-field'
import ErrorMessage from '../components/input-field-error'

export default function HantanWrite() {
  const {
    register,
    handleSubmit,
    isSubmitted,
    isSubmitting,
    errors,
    handlerPostWrite,
  } = useFormHook<PostWrite>()

  return (
    <main className={'h-screenVH min-h-[600]'}>
      <form onSubmit={handleSubmit(handlerPostWrite)} className={'py-5'}>
        {/* Title */}
        <div className={'flex flex-col gap-3'}>
          <InputLabel htmlFor="postTitle" content="제목" />
          <InputField
            type="text"
            id="postTitle"
            placeholder="제목을 입력해주세요."
            error={errors.title}
            register={register('title', {
              required: '* 제목을 입력해주세요.',
            })}
            isSubmitted={isSubmitted}
          />
        </div>
        <ErrorMessage error={errors.title} className="text-left" />

        {/* Content */}
        <div className={'mt-5 flex flex-col gap-3'}>
          <InputLabel htmlFor="postContent" content="내용" />
          <textarea
            typeof="text"
            id="postContent"
            placeholder="상세 내용을 입력해주세요."
            className={
              'text-area bg-transparent min-h-[500] text-lg overflow-y-auto border mt-0'
            }
            aria-invalid={
              isSubmitted ? (errors.content ? 'true' : 'false') : undefined
            }
            {...register('content', {
              required: '* 필수 입력란입니다.',
            })}
          />
        </div>
        <ErrorMessage error={errors.content} className="text-left" />

        {/* Submit Button */}
        <div className={'my-8 w-full'}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={
              'w-full rounded py-3 text-xl font-semibold bg-primary text-white'
            }
          >
            작성하기
          </button>
        </div>
      </form>
    </main>
  )
}
