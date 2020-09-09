export function toCurrency(currencyType: string, value: number, formatType: string = 'de-DE') {
  return `${currencyType} ${new Intl.NumberFormat(formatType).format(value)}`
}