import { supabaseServer } from "@/lib/supabaseServer"

export async function POST(req: Request) {
  const supabase = supabaseServer()
  const body = await req.json()

  const { name, email, message } = body

  const { error } = await supabase
    .from("contact_messages")   // ← ИСПОЛЬЗУЕМ ТВОЮ ТАБЛИЦУ
    .insert([{ name, email, message }])

  if (error) {
    console.error(error)
    return new Response("Error saving message", { status: 500 })
  }

  return new Response("Success", { status: 200 })
}

