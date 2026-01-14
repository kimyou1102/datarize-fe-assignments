import styled from '@emotion/styled'
import { useState } from 'react'
import PriceRangeFrequencyToolbar from './PriceRangeFrequencyToolbar'

function PriceRangeFrequencySection() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const handleChangeStartDate = (date: string) => {}

  const handleChangeEndDate = (date: string) => {}

  const handleReset = () => {}

  const handleDownloadCsv = () => {}

  return (
    <S_Container>
      <PriceRangeFrequencyToolbar
        dateRange={dateRange}
        onChangeStartDate={handleChangeStartDate}
        onChangeEndDate={handleChangeEndDate}
        onReset={handleReset}
        onDownloadCsv={handleDownloadCsv}
      />
    </S_Container>
  )
}

export default PriceRangeFrequencySection

const S_Container = styled.section``
