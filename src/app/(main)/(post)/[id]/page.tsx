'use client'

import { use } from 'react'
import { useHantan } from './hook/use-hantan'
import { useAuth } from '../../hooks/use-auth'
import { useFormHook } from '../../hooks/use-form'
import { PostComment } from '@/schemas/post'
import ErrorMessage from '../../components/input-field-error'
import HantanCommentList from '../../components/comment-list'

export interface HantansDetailPageProps {
  params: Promise<{ id: string }>
}

export default function HantansDetailPage({ params }: HantansDetailPageProps) {
  const { id } = use(params)

  const { data: postDetailData, isLoading, error } = useHantan(id)

  const { data: authData } = useAuth()

  const {
    register,
    handleSubmit,
    isSubmitted,
    isSubmitting,
    errors,
    handlerPostComment,
  } = useFormHook<PostComment>()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    throw new Error(error.message)
  }

  if (!postDetailData) {
    return <div>데이터를 불러오는데 실패하였습니다. 다시 시도해주세요.</div>
  }

  return (
    <main className={'h-screenVH min-h-[600] py-5'}>
      <h4 className={'text-2xl font-bold w-full'}>{postDetailData.title}</h4>
      <span className={'block w-full text-secondary font-semibold mt-1'}>
        {postDetailData.date.split('T')[0]}
      </span>

      <hr className={'w-full border my-3'} />

      <textarea
        name="HantanDetail"
        typeof="text"
        defaultValue={postDetailData.content}
        readOnly={true}
        className={
          'w-full resize-none block outline-none text-xl font-semibold h-auto min-h-[200] overflow-hidden'
        }
        ref={(textarea) => {
          if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = `${textarea.scrollHeight}px`
          }
        }}
      ></textarea>

      {/* Comment */}
      <div className={'mt-20 pb-20'}>
        <p className={'text-xl font-semibold text-primary'}>Comment</p>

        <hr className={'w-full border my-3'} />

        {/* 댓글 등록 */}
        <div className={'w-full bg-gray-200 rounded-lg py-5 px-3 mt-8'}>
          {/* {authData.isLogin ? <p>댓글 가능</p> : <p>로그인을 해주세요.</p>} */}
          <form
            onSubmit={handleSubmit((data) =>
              handlerPostComment(data, postDetailData)
            )}
          >
            <p className={'font-semibold'}>익명자{authData.user?.id}</p>
            <textarea
              typeof="text"
              id="postComment"
              placeholder="댓글을 입력해주세요."
              className={
                'text-area bg-transparent min-h-[50] text-lg border-none overflow-y-auto p-0 px-2'
              }
              aria-invalid={
                isSubmitted ? (errors.comment ? 'true' : 'false') : undefined
              }
              {...register('comment', {
                required: '* 필수 입력란입니다.',
              })}
              onInput={(e) => {
                const target = e.currentTarget
                target.style.height = 'auto'
                target.style.height = `${target.scrollHeight}px`
              }}
            />

            <div className={'mt-5 flex justify-end'}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={
                  'border py-[8] px-[16] font-semibold text-white bg-primary rounded-xl'
                }
              >
                등록
              </button>
            </div>
          </form>
          <ErrorMessage error={errors.comment} />
        </div>

        {/* 댓글 리스트 */}
        <HantanCommentList />
      </div>
    </main>
  )
}
