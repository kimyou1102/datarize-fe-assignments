export type RawPriceRangeFrequency = {
  range: string
  count: number
}

export function formatPriceRangeFrequencyRows(data: RawPriceRangeFrequency[]) {
  return data.map(({ range, count }) => {
    const [startRaw, endRaw] = range.split(' - ')

    const start = Number(startRaw)
    const end = endRaw === 'Infinity' ? Infinity : Number(endRaw)

    return {
      range: formatRangeLabel(start, end),
      count,
    }
  })
}

function formatRangeLabel(start: number, end: number) {
  if (end === Infinity) {
    return `${formatPrice(start)} 이상`
  }

  return `${formatPrice(start)} - ${formatPrice(end)}`
}

function formatPrice(value: number) {
  return value.toLocaleString()
}
