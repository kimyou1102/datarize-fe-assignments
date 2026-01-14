import client from '@/api/client'

export type SortBy = 'asc' | 'desc'

export interface CustomerSummary {
  id: number
  name: string
  count: number
  totalAmount: number
}

export interface Pagination {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface CustomerListResponse {
  data: CustomerSummary[]
  pagination: Pagination
}

export interface GetCustomersParams {
  sortBy?: SortBy
  name?: string
  page?: number
  limit?: number
  from?: string
  to?: string
}

export async function getCustomers(params: GetCustomersParams): Promise<CustomerListResponse> {
  const { sortBy, name, page, limit, from, to } = params

  return client.get<CustomerListResponse>({
    url: '/api/customers',
    params: {
      sortBy,
      name,
      page,
      limit,
      from,
      to,
    },
  })
}
