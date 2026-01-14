import styled from '@emotion/styled'
import { CustomerSummary, SortBy } from '../apis/getCustomers'

export interface CustomerPurchaseRow {
  id: number
  name: string
  purchaseCount: number
  totalAmount: number
}

export interface CustomerPurchaseTableProps {
  rows: CustomerSummary[]
  sortDirection: SortBy
  onClickSortTotalAmount: () => void
  onItemClick: (id: number) => void
}

function CustomerPurchaseTable({
  rows,
  sortDirection,
  onClickSortTotalAmount,
  onItemClick,
}: CustomerPurchaseTableProps) {
  return (
    <S_TableCard>
      <S_Table>
        <thead>
          <S_HeadRow>
            <S_Th align="left">ID</S_Th>
            <S_Th align="left">이름</S_Th>
            <S_Th align="center">구매 횟수</S_Th>
            <S_Th align="right">
              <S_SortButton type="button" onClick={onClickSortTotalAmount}>
                총 구매 금액
                <S_SortIcon>{sortDirection === 'asc' ? '↑' : '↓'}</S_SortIcon>
              </S_SortButton>
            </S_Th>
          </S_HeadRow>
        </thead>

        <tbody>
          {rows.map((row) => (
            <S_BodyRow key={row.id} onClick={() => onItemClick(row.id)}>
              <S_Td align="left">{row.id}</S_Td>
              <S_Td align="left">
                <S_Name>{row.name}</S_Name>
              </S_Td>
              <S_Td align="center">{row.count}회</S_Td>
              <S_Td align="right">
                <S_Amount>{row.totalAmount.toLocaleString()}원</S_Amount>
              </S_Td>
            </S_BodyRow>
          ))}
        </tbody>
      </S_Table>
    </S_TableCard>
  )
}

export default CustomerPurchaseTable

const S_TableCard = styled.div`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
`

const S_Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`

const S_HeadRow = styled.tr`
  background: #f9fafb;
`

const S_Th = styled.th<{ align: 'left' | 'center' | 'right' }>`
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 700;
  color: #6b7280;
  text-align: ${({ align }) => align};
  border-bottom: 1px solid #e5e7eb;
`

const S_BodyRow = styled.tr`
  &:not(:last-of-type) td {
    border-bottom: 1px solid #e5e7eb;
  }
`

const S_Td = styled.td<{ align: 'left' | 'center' | 'right' }>`
  padding: 20px;
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  text-align: ${({ align }) => align};
`

const S_Name = styled.span`
  font-weight: 700;
`

const S_Amount = styled.span`
  font-weight: 700;
`

const S_SortButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  border: none;
  background: transparent;
  padding: 0;

  font: inherit;
  color: inherit;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const S_SortIcon = styled.span`
  font-size: 14px;
`
