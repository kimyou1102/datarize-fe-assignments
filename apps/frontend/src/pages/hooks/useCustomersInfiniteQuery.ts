import { useInfiniteQuery } from '@tanstack/react-query'
import { CustomerListResponse, getCustomers, SortBy } from '../dashboard/apis/getCustomers'

export interface UseCustomersInfiniteQueryParams {
  sortBy?: SortBy
  name?: string
  limit?: number
  from?: string
  to?: string
}

export function useCustomersInfiniteQuery(params: UseCustomersInfiniteQueryParams) {
  return useInfiniteQuery<CustomerListResponse>({
    queryKey: [
      'customers',
      {
        sortBy: params.sortBy ?? 'desc',
        name: params.name ?? '',
        limit: params.limit ?? 20,
        from: params.from,
        to: params.to,
      },
    ],
    queryFn: ({ pageParam }) =>
      getCustomers({
        sortBy: params.sortBy,
        name: params.name,
        limit: params.limit,
        page: typeof pageParam === 'number' ? pageParam : 1,
        from: params.from,
        to: params.to === '' ? params.from : params.to,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNext) {
        return lastPage.pagination.page + 1
      }
      return undefined
    },
  })
}
