export const money = (cents: number) => {
  const dollars = Math.round(cents / 100)
  return `$${dollars}`
}
