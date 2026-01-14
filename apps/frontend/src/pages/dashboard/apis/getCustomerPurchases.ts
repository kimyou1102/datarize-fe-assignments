import client from '@/api/client'

interface CustomerPurchaseItem {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
}

interface getCustomerPurchasesParams {
  customerId: number
  from: string
  to: string
}

export async function getCustomerPurchases({
  customerId,
  from,
  to,
}: getCustomerPurchasesParams): Promise<CustomerPurchaseItem[]> {
  return client.get<CustomerPurchaseItem[]>({
    url: `/api/customers/${customerId}/purchases`,
    params: {
      from,
      to,
    },
  })
}
