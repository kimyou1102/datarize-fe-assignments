import styled from '@emotion/styled'
import ConsumerListToolbar from './ConsumerListToolbar'
import { ChangeEvent, useState } from 'react'
import CustomerPurchaseTable from './CustomerPurchaseTable'
import { useCustomersQuery } from '@/pages/hooks/useCustomersQuery'
import Pagination from './Pagination'
import Modal from '@/components/Modal'
import PurchaseItemTable from './PurchaseItemsTable'

function ConsumerListSection() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [isOpen, setIsOpen] = useState(false)

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

  const [page, setPage] = useState(1)

  const { data } = useCustomersQuery({
    sortBy: sortDirection,
    name: keyword,
    limit: 10,
    from: dateRange.start,
    to: dateRange.end,
    page,
  })

  const rows = data?.data ?? []
  const currentPage = data?.pagination.page ?? 1
  const totalPages = data?.pagination.totalPages ?? 1

  const handleNextClick = () => {
    if (totalPages > page) {
      setPage((prev) => prev + 1)
    }
  }

  const handlePrevClick = () => {
    if (page > 0) {
      setPage((prev) => prev - 1)
    }
  }

  const handleCloseClick = () => {
    setIsOpen(false)
  }

  const handleRowClick = (id: number) => {
    setIsOpen(true)
  }

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
        onItemClick={handleRowClick}
      />
      <Pagination page={currentPage} totalPages={totalPages} onPrev={handlePrevClick} onNext={handleNextClick} />
      <Modal isOpen={isOpen} title="" onClose={handleCloseClick}>
        <PurchaseItemTable
          rows={[
            {
              date: '2025-10-07',
              quantity: 1,
              product: '네이비 맨투맨',
              price: 31000, // 제품 단가
              imgSrc: 'http://localhost:4000/imgs/sweatshirt.jpg',
            },
          ]}
        />
      </Modal>
    </S_Container>
  )
}

export default ConsumerListSection

const S_Container = styled.section`
  width: 100%;
`
