import client from '@/api/client'

interface PurchaseFrequency {
  range: string
  count: number
}

interface PurchaseFrequencyParams {
  from: string
  to: string
}

export async function getPurchaseFrequency({ from, to }: PurchaseFrequencyParams): Promise<PurchaseFrequency[]> {
  return client.get<PurchaseFrequency[]>({
    url: '/api/purchase-frequency',
    params: { from, to },
  })
}
