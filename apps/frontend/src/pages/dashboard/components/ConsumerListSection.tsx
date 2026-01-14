import styled from '@emotion/styled'
import ConsumerListToolbar from './ConsumerListToolbar'
import { ChangeEvent, useState } from 'react'
import CustomerPurchaseTable from './CustomerPurchaseTable'
import { useCustomersQuery } from '@/pages/hooks/useCustomersQuery'
import Pagination from './Pagination'
import Modal from '@/components/Modal'
import PurchaseItemTable from './PurchaseItemsTable'
import { useQuery } from '@tanstack/react-query'
import { getCustomerPurchases } from '../apis/getCustomerPurchases'

function ConsumerListSection() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [isOpen, setIsOpen] = useState(false)
  const [customerId, setCustomerId] = useState<number | null>(null)
  const [modalTitle, setModalTitle] = useState('')

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

  const handleRowClick = (id: number, title: string) => {
    setIsOpen(true)
    setCustomerId(id)
    setModalTitle(title)
  }

  const { data: customerPurchasesData } = useQuery({
    queryKey: ['customer-purchases', customerId, dateRange.start, dateRange.end],
    queryFn: () =>
      getCustomerPurchases({
        customerId: customerId!,
        from: dateRange.start,
        to: dateRange.end === '' ? dateRange.start : dateRange.end,
      }),
    enabled: !!customerId,
  })

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
      <Modal isOpen={isOpen} title={modalTitle} onClose={handleCloseClick}>
        <PurchaseItemTable rows={customerPurchasesData ?? []} />
      </Modal>
    </S_Container>
  )
}

export default ConsumerListSection

const S_Container = styled.section`
  width: 100%;
`
