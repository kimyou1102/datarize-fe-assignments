import styled from '@emotion/styled'
import { useState } from 'react'
import PriceRangeFrequencyToolbar from './PriceRangeFrequencyToolbar'
import PriceRangeFrequencyTable from './PriceRangeFrequencyTable'
import { formatPriceRangeFrequencyRows } from '@/utils/formatPriceRangeFrequencyRows'

function PriceRangeFrequencySection() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const handleChangeStartDate = (date: string) => {
    setDateRange((prev) => ({ ...prev, start: date }))
  }

  const handleChangeEndDate = (date: string) => {
    setDateRange((prev) => ({ ...prev, end: date }))
  }

  const handleReset = () => {}

  const handleDownloadCsv = () => {}

  const dummy = [
    { range: '0 - 20000', count: 150 },
    { range: '20001 - 30000', count: 120 },
    { range: '100001 - Infinity', count: 120 },
  ]

  const rows = formatPriceRangeFrequencyRows(dummy)

  return (
    <S_Container>
      <PriceRangeFrequencyToolbar
        dateRange={dateRange}
        onChangeStartDate={handleChangeStartDate}
        onChangeEndDate={handleChangeEndDate}
        onReset={handleReset}
        onDownloadCsv={handleDownloadCsv}
      />
      <PriceRangeFrequencyTable rows={rows} />
    </S_Container>
  )
}

export default PriceRangeFrequencySection

const S_Container = styled.section``
