import { useQuery } from '@tanstack/react-query'
import { getCustomers, SortBy } from '../dashboard/apis/getCustomers'

export interface UseCustomersInfiniteQueryParams {
  sortBy?: SortBy
  name?: string
  limit?: number
  from?: string
  to?: string
  page: number
}

export function useCustomersQuery(params: UseCustomersInfiniteQueryParams) {
  const from = params.from
  const to = params.to === '' ? params.from : params.to

  return useQuery({
    queryKey: [
      'customers',
      {
        sortBy: params.sortBy ?? 'desc',
        name: params.name ?? '',
        limit: params.limit ?? 20,
        page: params.page,
        from,
        to,
      },
    ],
    queryFn: () =>
      getCustomers({
        sortBy: params.sortBy,
        name: params.name,
        limit: params.limit,
        page: params.page,
        from,
        to,
      }),
  })
}
