import styled from '@emotion/styled'
import { useState } from 'react'
import PriceRangeFrequencyToolbar from './PriceRangeFrequencyToolbar'
import PriceRangeFrequencyTable from './PriceRangeFrequencyTable'
import { formatPriceRangeFrequencyRows } from '@/utils/formatPriceRangeFrequencyRows'
import { useQuery } from '@tanstack/react-query'
import { getPurchaseFrequency } from '../apis/getPurchaseFrequency'
import { useQueryClient } from '@tanstack/react-query'
import { getPurchases } from '../apis/getPurchases'
import { downloadPurchaseCsv } from '@/utils/purchageCsv'

function PriceRangeFrequencySection() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const handleChangeStartDate = (date: string) => {
    setDateRange((prev) => ({ ...prev, start: date }))
  }

  const handleChangeEndDate = (date: string) => {
    setDateRange((prev) => ({ ...prev, end: date }))
  }

  const handleReset = () => {
    setDateRange({ start: '', end: '' })
  }

  const queryClient = useQueryClient()

  const handleDownloadCsv = async () => {
    if (!dateRange.start) {
      alert('날짜를 선택해주세요.')
      return
    }

    const from = dateRange.start
    const to = dateRange.end === '' ? dateRange.start : dateRange.end

    const data = await queryClient.fetchQuery({
      queryKey: ['purchases', from, to],
      queryFn: () => getPurchases({ from, to }),
    })

    downloadPurchaseCsv(data, `purchase_${from}_${to}.csv`)
  }

  const { data: purchaseFrequencyData } = useQuery({
    queryKey: ['purchase-frequency', dateRange.start, dateRange.end ?? dateRange.start],
    queryFn: () =>
      getPurchaseFrequency({
        from: dateRange.start,
        to: dateRange.end === '' ? dateRange.start : dateRange.end,
      }),
    enabled: Boolean(dateRange.start),
  })

  return (
    <S_Container>
      <PriceRangeFrequencyToolbar
        dateRange={dateRange}
        onChangeStartDate={handleChangeStartDate}
        onChangeEndDate={handleChangeEndDate}
        onReset={handleReset}
        onDownloadCsv={handleDownloadCsv}
      />
      <PriceRangeFrequencyTable
        rows={purchaseFrequencyData ? formatPriceRangeFrequencyRows(purchaseFrequencyData) : []}
      />
    </S_Container>
  )
}

export default PriceRangeFrequencySection
const S_Container = styled.section``
