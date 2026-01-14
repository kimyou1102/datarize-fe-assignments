import styled from '@emotion/styled'

export interface PurchaseItemRow {
  date: string
  product: string
  price: number
  quantity: number
  imgSrc?: string
}

export interface PurchaseItemTableProps {
  rows: PurchaseItemRow[]
}

function PurchaseItemTable({ rows }: PurchaseItemTableProps) {
  const formatWon = (value: number) => {
    return `${value.toLocaleString()}원`
  }

  return (
    <S_TableCard>
      <S_Table>
        <thead>
          <S_HeadRow>
            <S_Th align="left">날짜</S_Th>
            <S_Th align="left">제품</S_Th>
            <S_Th align="right">단가</S_Th>
            <S_Th align="center">수량</S_Th>
            <S_Th align="right">소계</S_Th>
          </S_HeadRow>
        </thead>

        <tbody>
          {rows.map((row) => {
            const subtotal = row.price * row.quantity

            return (
              <S_BodyRow key={`${row.date}-${row.product}`}>
                <S_Td align="left">
                  <S_Date>{row.date}</S_Date>
                </S_Td>

                <S_Td align="left">
                  <S_ProductCell>
                    <S_Thumb aria-hidden="true">
                      {row.imgSrc ? <S_Img src={row.imgSrc} alt="" /> : <S_ThumbFallback />}
                    </S_Thumb>
                    <S_ProductName>{row.product}</S_ProductName>
                  </S_ProductCell>
                </S_Td>

                <S_Td align="right">{formatWon(row.price)}</S_Td>
                <S_Td align="center">{row.quantity}</S_Td>
                <S_Td align="right">
                  <S_Subtotal>{formatWon(subtotal)}</S_Subtotal>
                </S_Td>
              </S_BodyRow>
            )
          })}
        </tbody>
      </S_Table>
    </S_TableCard>
  )
}

export default PurchaseItemTable

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
  padding: 14px 16px;
  font-size: 14px;
  font-weight: 800;
  color: #6b7280;
  text-align: ${({ align }) => align};
  border-bottom: 1px solid #e5e7eb;
`

const S_BodyRow = styled.tr`
  &:not(:last-of-type) td {
    border-bottom: 1px solid #eef2f7;
  }
`

const S_Td = styled.td<{ align: 'left' | 'center' | 'right' }>`
  padding: 18px 16px;
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  text-align: ${({ align }) => align};
  vertical-align: middle;
`

const S_Date = styled.span`
  color: #6b7280;
  font-weight: 700;
`

const S_ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`

const S_Thumb = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  overflow: hidden;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  flex: 0 0 auto;
`

const S_Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const S_ThumbFallback = styled.div`
  width: 100%;
  height: 100%;
`

const S_ProductName = styled.div`
  font-weight: 800;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const S_Subtotal = styled.span`
  font-weight: 900;
`
