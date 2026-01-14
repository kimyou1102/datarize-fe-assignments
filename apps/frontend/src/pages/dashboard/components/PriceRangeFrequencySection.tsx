import styled from '@emotion/styled'
import { useState } from 'react'
import PriceRangeFrequencyToolbar from './PriceRangeFrequencyToolbar'
import PriceRangeFrequencyTable from './PriceRangeFrequencyTable'
import { formatPriceRangeFrequencyRows } from '@/utils/formatPriceRangeFrequencyRows'
import { useQuery } from '@tanstack/react-query'
import { getPurchaseFrequency } from '../apis/getPurchaseFrequency'

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

  const handleDownloadCsv = () => {}

  const { data } = useQuery({
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
      <PriceRangeFrequencyTable rows={data ? formatPriceRangeFrequencyRows(data) : []} />
    </S_Container>
  )
}

export default PriceRangeFrequencySection
const S_Container = styled.section``
