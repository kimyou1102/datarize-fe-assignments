import styled from '@emotion/styled'

export type PriceRangeFrequencyRow = {
  range: string
  count: number
}

interface PriceRangeFrequencyTableProps {
  rows: PriceRangeFrequencyRow[]
}

function PriceRangeFrequencyTable({ rows }: PriceRangeFrequencyTableProps) {
  return (
    <S_TableCard>
      <S_Table>
        <thead>
          <S_HeadRow>
            <S_Th align="left">가격대 (원)</S_Th>
            <S_Th align="right">구매 건수</S_Th>
          </S_HeadRow>
        </thead>

        <tbody>
          {rows.map((row) => (
            <S_BodyRow key={row.range}>
              <S_Td align="left">{row.range}</S_Td>
              <S_Td align="right">
                <S_Count>{row.count.toLocaleString()}건</S_Count>
              </S_Td>
            </S_BodyRow>
          ))}
        </tbody>
      </S_Table>
    </S_TableCard>
  )
}

export default PriceRangeFrequencyTable

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

const S_Th = styled.th<{ align: 'left' | 'right' }>`
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

const S_Td = styled.td<{ align: 'left' | 'right' }>`
  padding: 22px 20px;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  text-align: ${({ align }) => align};
`

const S_Count = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`
