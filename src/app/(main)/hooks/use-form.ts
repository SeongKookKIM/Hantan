import { FieldValues, useForm } from 'react-hook-form'

export const useFormHook = <T extends FieldValues>() => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm<T>()

  //   Login Submit
  const handleLoginSubmitForm = async (data: T) => {
    await new Promise((r) => setTimeout(r, 1000))

    console.log(data)
  }

  // Sign Up Submit
  const handlerSignUpSubmitForm = async (data: T) => {
    console.log(data)
  }

  return {
    register,
    handleSubmit,
    isSubmitted,
    isSubmitting,
    errors,
    watch,
    handleLoginSubmitForm,
    handlerSignUpSubmitForm,
  }
}
