import Link from 'next/link'

export default function Navbar() {
  return (
    <nav>
      <Link href="/" className="text-lg font-bold mb-5">
        Restaurant Booking App
      </Link>
    </nav>
  )
}
