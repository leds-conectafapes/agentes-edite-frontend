export function formatMoney(value: number) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'BRT',
  })
    .format(value)
    .replace('BRT', '')
}
