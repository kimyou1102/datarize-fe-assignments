import { http, HttpResponse } from 'msw'
import { customers } from './data'

const toTimestamp = (value?: string | null) => {
  if (!value) return undefined
  const time = Date.parse(value)
  return Number.isNaN(time) ? undefined : time
}

const isWithinRange = (date: string, from?: string | null, to?: string | null) => {
  const dateTime = Date.parse(date)
  if (Number.isNaN(dateTime)) return false
  const fromTime = toTimestamp(from)
  const toTime = toTimestamp(to)
  if (fromTime !== undefined && dateTime < fromTime) return false
  if (toTime !== undefined && dateTime > toTime) return false
  return true
}

const buildPurchaseFrequency = (from?: string | null, to?: string | null) => {
  const fromTime = toTimestamp(from)
  const toTime = toTimestamp(to)
  const isSingleDay = from && to && from === to
  const isWithin2025 =
    fromTime !== undefined &&
    toTime !== undefined &&
    fromTime >= Date.parse('2025-01-01') &&
    toTime <= Date.parse('2025-12-31')

  if (isSingleDay) {
    return [
      { range: '0 - 20000', count: 20 },
      { range: '20001 - 30000', count: 12 },
      { range: '100001 - Infinity', count: 4 },
    ]
  }

  if (isWithin2025) {
    return [
      { range: '0 - 20000', count: 80 },
      { range: '20001 - 30000', count: 45 },
      { range: '100001 - Infinity', count: 18 },
    ]
  }

  return [
    { range: '0 - 20000', count: 150 },
    { range: '20001 - 30000', count: 120 },
    { range: '100001 - Infinity', count: 50 },
  ]
}

const flattenPurchases = (from?: string | null, to?: string | null) =>
  customers.flatMap((customer) =>
    customer.purchases
      .filter((purchase) => isWithinRange(purchase.date, from, to))
      .map((purchase) => ({
        date: purchase.date,
        customerName: customer.name,
        productName: purchase.product,
        price: purchase.price,
        quantity: purchase.quantity,
      })),
  )

const buildCustomerStats = (from?: string | null, to?: string | null) =>
  customers.map((customer) => {
    const filteredPurchases = customer.purchases.filter((purchase) => isWithinRange(purchase.date, from, to))
    const totalAmount = filteredPurchases.reduce((sum, purchase) => sum + purchase.price * purchase.quantity, 0)
    return {
      id: customer.id,
      name: customer.name,
      count: filteredPurchases.length,
      totalAmount,
      purchases: filteredPurchases,
    }
  })

export const handlers = [
  http.get('/api/purchase-frequency', ({ request }) => {
    const url = new URL(request.url)
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')

    return HttpResponse.json(buildPurchaseFrequency(from, to))
  }),

  http.get('/api/purchases', ({ request }) => {
    const url = new URL(request.url)
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')

    return HttpResponse.json(flattenPurchases(from, to))
  }),

  http.get('/api/customers', ({ request }) => {
    const url = new URL(request.url)
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')
    const sortBy = url.searchParams.get('sortBy')
    const name = url.searchParams.get('name')?.toLowerCase() ?? ''
    const page = Number(url.searchParams.get('page') ?? '1')
    const limit = Math.min(Number(url.searchParams.get('limit') ?? '20'), 100)

    const customersWithStats = buildCustomerStats(from, to)
      .filter((customer) => customer.count > 0)
      .filter((customer) => (name ? customer.name.toLowerCase().includes(name) : true))

    if (sortBy === 'asc' || sortBy === 'desc') {
      customersWithStats.sort((a, b) =>
        sortBy === 'asc' ? a.totalAmount - b.totalAmount : b.totalAmount - a.totalAmount,
      )
    }

    const start = (Math.max(page, 1) - 1) * limit
    const data = customersWithStats.slice(start, start + limit).map(({ purchases: _purchases, ...rest }) => rest)
    const total = customersWithStats.length
    const totalPages = limit > 0 ? Math.ceil(total / limit) : 0

    return HttpResponse.json({
      data,
      pagination: {
        page: Math.max(page, 1),
        limit,
        total,
        totalPages,
      },
    })
  }),

  http.get('/api/customers/:id/purchases', ({ params, request }) => {
    const url = new URL(request.url)
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')
    const id = Number(params.id)
    const customer = customers.find((entry) => entry.id === id)

    if (!customer) {
      return HttpResponse.json([], { status: 404 })
    }

    const data = customer.purchases.filter((purchase) => isWithinRange(purchase.date, from, to))

    return HttpResponse.json(data)
  }),
]
