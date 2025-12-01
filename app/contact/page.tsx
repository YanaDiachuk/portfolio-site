import FormContact from '@/components/FormContact'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch'
}

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <h1 className="h1">Contact</h1>

      <p className="text-neutral-300">
        Please send me a message using the form below:
      </p>

      <div className="mt-8">
        <FormContact />
      </div>

      <div className="mt-10 flex flex-col space-y-2">
        <a
          href="https://instagram.com/___your_instagram___"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-neutral-200 hover:text-white"
        >
          Instagram
        </a>

        <a
          href="https://www.linkedin.com/in/___your_linkedin___"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-neutral-200 hover:text-white"
        >
          LinkedIn
        </a>
      </div>
    </section>
  )
}
