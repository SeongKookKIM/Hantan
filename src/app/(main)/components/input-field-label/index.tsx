interface InputLabelProps {
  htmlFor: string
  content: string
}

export default function InputLabel({ htmlFor, content }: InputLabelProps) {
  return (
    <label htmlFor={htmlFor} className={'input-label'}>
      {content}
    </label>
  )
}
