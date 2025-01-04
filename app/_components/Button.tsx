import Link from 'next/link'
import { ReactNode } from 'react'

export default function Button({
  children,
  onClick,
  type = 'button',
  to,
}: {
  children: ReactNode
  onClick: () => void | undefined
  type: 'button' | 'submit' | 'reset' | undefined
  to: string | undefined
}) {
  const className =
    'mt-5 rounded-md bg-blue-500 px-5 py-2.5 text-white transition-all duration-200 hover:bg-blue-600 hover:underline'
  if (to) {
    return (
      <Link href={to} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  )
}
