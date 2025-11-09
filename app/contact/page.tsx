export default function ContactPage() {
  return (
    <section>
      <h1 className="h1 mb-6">Contact</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="h2 mb-2">My contacts</h2>
          <ul className="space-y-1">
            <li>Email: <a href="mailto:you@example.com">you@example.com</a></li>
            <li>Instagram: <a href="https://instagram.com/your">instagram.com/your</a></li>
            <li>LinkedIn: <a href="https://linkedin.com/in/your">linkedin.com/in/your</a></li>
          </ul>
        </div>
        <div>
          {/* @ts-expect-error Server/Client boundary simplified */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/placeholder.jpg" alt="" className="w-full rounded-2xl border border-neutral-800" />
        </div>
      </div>
      {/* Форма */}
      {/* @ts-expect-error client comp import okay */}
      {/* eslint-disable-next-line */}
      <div className="mt-6">
        {/* @ts-ignore */}
        {require('@/components/FormContact').default()}
      </div>
    </section>
  )
}
