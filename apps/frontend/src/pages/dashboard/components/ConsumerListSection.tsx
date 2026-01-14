import styled from '@emotion/styled'
import ConsumerListToolbar from './ConsumerListToolbar'
import { ChangeEvent, useState } from 'react'
import CustomerPurchaseTable from './CustomerPurchaseTable'
import { useCustomersInfiniteQuery } from '@/pages/hooks/useCustomersInfiniteQuery'

function ConsumerListSection() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const handleChangeStartDate = (date: string) => {
    setDateRange((prev) => ({ ...prev, start: date }))
  }

  const handleChangeEndDate = (date: string) => {
    setDateRange((prev) => ({ ...prev, end: date }))
  }

  const handleReset = () => {
    setDateRange({ start: '', end: '' })
  }

  const handleClickSortTotalAmount = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  const [keyword, setKeyword] = useState('')

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const { data } = useCustomersInfiniteQuery({
    sortBy: sortDirection,
    name: keyword,
    limit: 20,
    from: dateRange.start,
    to: dateRange.end,
  })

  const rows = data?.rows ?? []

  return (
    <S_Container>
      <ConsumerListToolbar
        dateRange={dateRange}
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
        onChangeStartDate={handleChangeStartDate}
        onChangeEndDate={handleChangeEndDate}
        onReset={handleReset}
      />
      <CustomerPurchaseTable
        rows={rows}
        sortDirection={sortDirection}
        onClickSortTotalAmount={handleClickSortTotalAmount}
      />
    </S_Container>
  )
}

export default ConsumerListSection

const S_Container = styled.section`
  width: 100%;
`
