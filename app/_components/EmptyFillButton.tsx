import Link from 'next/link'
import { ReactNode } from 'react'

const className =
  'rounded-lg border-2 border-black px-6 py-3 transition-all duration-300 hover:bg-black hover:text-white'

export default function EmptyFillButton({
  children,
  onClick,
  type = 'button',
  to,
}: {
  children: ReactNode
  onClick: () => void | null
  type: 'button' | 'submit' | 'reset' | undefined
  to: string | undefined
}) {
  if (to) {
    return (
      <Link href={to} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  )
}
