import client from '@/api/client'

interface CustomerPurchaseItem {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
}

export async function getCustomerPurchases(customerId: number): Promise<CustomerPurchaseItem[]> {
  return client.get<CustomerPurchaseItem[]>({
    url: `/api/customers/${customerId}/purchases`,
  })
}
