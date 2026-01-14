import styled from '@emotion/styled'
import ConsumerListToolbar from './ConsumerListToolbar'
import { useState } from 'react'

function ConsumerListSection() {
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

  return (
    <S_Container>
      <ConsumerListToolbar
        dateRange={dateRange}
        onChangeStartDate={handleChangeStartDate}
        onChangeEndDate={handleChangeEndDate}
        onReset={handleReset}
      />
    </S_Container>
  )
}

export default ConsumerListSection

const S_Container = styled.section`
  width: 100%;
`
