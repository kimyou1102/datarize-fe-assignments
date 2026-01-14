import client from '@/api/client'

export interface Purchase {
  date: string
  customerName: string
  productName: string
  price: number
  quantity: number
}

interface PurchaseParams {
  from: string
  to: string
}

export async function getPurchases({ from, to }: PurchaseParams): Promise<Purchase[]> {
  return client.get<Purchase[]>({
    url: '/api/purchases',
    params: { from, to },
  })
}
