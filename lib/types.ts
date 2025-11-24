export type Artwork = {
  id: string; slug: string; title: string; description: string | null;
  image_url: string | null; price_cents: number; in_stock: boolean;
}
export type Post = {
  id: string; slug: string; title: string; excerpt: string | null;
  content_md: string | null; published_at: string | null;
}
export type Tag = { id: string; name: string }
export type ContactMessageInput = { name?: string; email?: string; message: string }

