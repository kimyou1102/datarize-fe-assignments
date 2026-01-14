import styled from '@emotion/styled'
import DatePicker from './DatePicker'

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

        <S_CsvButton type="button" onClick={onDownloadCsv}>
          CSV 다운로드
        </S_CsvButton>
      </S_TopRow>

      <S_BottomRow>
        <S_DatePickersWrapper>
          <DatePicker value={dateRange.start} onDateChange={onChangeStartDate} />
          <DatePicker value={dateRange.end} onDateChange={onChangeEndDate} />
        </S_DatePickersWrapper>

        <S_ResetButton type="button" onClick={onReset}>
          초기화
        </S_ResetButton>
      </S_BottomRow>
    </S_Card>
  )
}

export default PriceRangeFrequencyToolbar

const S_Card = styled.section`
  width: 100%;
  padding: 20px 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
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

const S_CsvButton = styled.button`
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

const S_BottomRow = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
`

const S_DatePickersWrapper = styled.div`
  display: flex;
`

const S_ResetButton = styled.button`
  border: 0;
  background: transparent;
  padding: 10px 6px;
  color: #111827;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
    border-radius: 8px;
  }
`
