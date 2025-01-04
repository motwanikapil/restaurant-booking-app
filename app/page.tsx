// @ts-nocheck
import Image from 'next/image'
import EmptyFillButton from './_components/EmptyFillButton'

export default function page() {
  return (
    <main className='pt-5'>
      <section className='grid md:grid-cols-2 place-items-center'>
        <article className='flex flex-col gap-3 px-5'>
          <span className='font-semibold text-2xl text-wrap my-3'>
            Discover the best dining experiences in your city with ease and
            style.
          </span>
          <ul className='text-lg'>
            <li>
              ✨ Savor the Flavors Explore restaurants offering exquisite
              cuisines to tantalize your taste buds.
            </li>
            <li>
              ✨ Dine with Elegance Find places with impeccable ambiance to
              match every occasion.
            </li>
            <li>
              ✨ Book with Confidence Reserve your table in just a few clicks
              and enjoy seamless dining experiences.
            </li>
          </ul>
          <article className='w-72 mx-auto mt-5'>
            <EmptyFillButton to='/booking'>
              <span className='text-semibold text-lg'>Book your table now</span>
            </EmptyFillButton>
          </article>
        </article>
        <article>
          <Image
            src='/homepage_image.jpg'
            alt='man drinking coffee'
            width='350'
            height='700'
            className='hidden md:block rounded-lg'
          />
        </article>
      </section>
    </main>
  )
}
