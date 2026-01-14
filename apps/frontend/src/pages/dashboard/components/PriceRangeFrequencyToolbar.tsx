import styled from '@emotion/styled'
import DateRangeFilter from '@/components/DateRangeFilter'

interface PriceRangeFrequencyToolbarProps {
  dateRange: {
    start: string
    end: string
  }
  onChangeStartDate: (value: string) => void
  onChangeEndDate: (value: string) => void
  onReset: () => void
  onDownloadCsv: () => void
}

function PriceRangeFrequencyToolbar({
  dateRange,
  onChangeStartDate,
  onChangeEndDate,
  onReset,
  onDownloadCsv,
}: PriceRangeFrequencyToolbarProps) {
  return (
    <S_Card>
      <S_TopRow>
        <S_Title>가격대별 구매 빈도</S_Title>

        <S_Button type="button" onClick={onDownloadCsv}>
          CSV 다운로드
        </S_Button>
      </S_TopRow>
      <DateRangeFilter
        value={dateRange}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        onReset={onReset}
      />
    </S_Card>
  )
}

export default PriceRangeFrequencyToolbar

const S_Card = styled.div`
  width: 100%;
  padding: 20px 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const S_TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

const S_Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.2px;
  color: #111827;
`

const S_Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }

  &:active {
    background: #f3f4f6;
  }

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
`
