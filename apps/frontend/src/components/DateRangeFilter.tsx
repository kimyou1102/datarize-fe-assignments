import DatePicker from '@/pages/dashboard/components/DatePicker'
import styled from '@emotion/styled'

export type DateRangeValue = {
  start: string
  end: string
}

type DateRangeFilterProps = {
  value: DateRangeValue
  onChangeStartDate: (date: string) => void
  onChangeEndDate: (date: string) => void
  onReset: () => void
}

function DateRangeFilter({ value, onChangeStartDate, onChangeEndDate, onReset }: DateRangeFilterProps) {
  return (
    <S_Wrapper>
      <S_DatePickersWrapper>
        <DatePicker value={value.start} onDateChange={onChangeStartDate} max={value.end || undefined} />
        <DatePicker value={value.end} onDateChange={onChangeEndDate} min={value.start || undefined} />
      </S_DatePickersWrapper>

      <S_ResetButton type="button" onClick={onReset}>
        초기화
      </S_ResetButton>
    </S_Wrapper>
  )
}

export default DateRangeFilter

const S_Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const S_DatePickersWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
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
