import styled from '@emotion/styled'

interface DatePickerInputProps {
  value: string
  onDateChange: (value: string) => void
}

function DatePicker({ value, onDateChange }: DatePickerInputProps) {
  return (
    <S_Wrapper>
      <S_Input type="date" value={value} onChange={(e) => onDateChange(e.target.value)} placeholder="시작년월" />
    </S_Wrapper>
  )
}

export default DatePicker

const S_Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`

const S_Input = styled.input`
  width: 180px;
  padding: 12px 40px 12px 14px;

  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;

  font-size: 14px;
  font-weight: 600;
  color: #111827;

  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`
