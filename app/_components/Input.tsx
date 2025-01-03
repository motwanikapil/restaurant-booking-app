import { FieldError } from 'react-hook-form'

export default function Input({
  type,
  placeholder,
  register,
  name,
  errors,
  autoComplete,
  id,
}: {
  type: string
  placeholder: string
  register: any
  name: string
  errors: FieldError | undefined
  autoComplete: string
  id: string
}) {
  return (
    <article>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full border-b-2 px-2 py-1.5 outline-none transition-all duration-300 focus:border-gray-500 ${
          type === 'number'
            ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            : ''
        }`}
        {...register(name)}
        id={id ?? ''}
        autoComplete={autoComplete}
      />
      {errors?.message && (
        <p className="mt-3 text-wrap text-red-600">{`${errors.message
          .slice(0, 1)
          .toUpperCase()}${errors.message.slice(1)}`}</p>
      )}
    </article>
  )
}
