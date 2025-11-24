import { redirect } from 'next/navigation'

export default function Home() {
  return (
    <section className="card">
      <h1 className="h1 mb-4">About me</h1>
      <p>Short bio, statement, skills, exhibitions, etc.</p>
    </section>
  )
  redirect('/about')
}
