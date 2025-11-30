
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <section className="card flex flex-col md:flex-row gap-8 items-start">

      {/* Фото слева */}
      <div className="md:w-1/3 w-full">
        <Image
          src="/pangie2.png"     // твоё фото — положить в public/me.jpg
          width={800}
          height={1000}
          alt="Angie portrait"
          className="rounded-2xl object-cover w-full"
        />
      </div>

      {/* Текст справа */}
      <div className="md:w-2/3 w-full space-y-4 text-neutral-300">


        <h1 className="h1 mb-4">About me</h1>

       <p>
        Hey, I’m Angie, hope your little journey through my site is a whole experience (｡•ᴗ•｡)♡
      </p>

      <p>
        I’m into talented people, weird rare things, abandoned mysterious buildings,
        pretty views, sticky textures and delicate sounds.
      </p>

      <p>
        I’m obsessed with autumn and the ocean. And Italy. Yeah, that’s my entire personalit (ﾉ◕ヮ◕)
      </p>

      <p>
        I cannot stand soggy winter weather, early mornings, my long pointy nose
        and shallow people. So here we are.
      </p>

      <p>
        On this website you can{' '}
        <Link href="/artworks" className="underline hover:opacity-70">
          check out my work
        </Link>{' '}
        and if you vibe with it hard enough, you can even snag a piece.
      </p>

      <p>
        If you want to{' '}
        <Link href="/contact" className="underline hover:opacity-70">
          message me
        </Link>
        , feel free — it honestly makes my day (⁀ᗢ⁀)
      </p>

      <p>
        Let’s link up, let’s be friends, let’s create cool things together.
        Hope your little journey through my site is a whole experience.
      </p>
      </div>

    </section>
  )
}

