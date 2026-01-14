import DateRangeFilter from '@/components/DateRangeFilter'
import SearchInput from '@/components/Input'
import styled from '@emotion/styled'
import { ChangeEvent, useState } from 'react'
import SearchIcon from './SearchIcon'

interface ConsumerListToolbarProps {
  dateRange: {
    start: string
    end: string
  }
  onChangeStartDate: (value: string) => void
  onChangeEndDate: (value: string) => void
  onReset: () => void
}

function ConsumerListToolbar({ dateRange, onChangeStartDate, onChangeEndDate, onReset }: ConsumerListToolbarProps) {
  const [keyword, setKeyword] = useState('')

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }
  return (
    <S_Card>
      <S_TopRow>
        <S_Title>고객 목록</S_Title>
      </S_TopRow>
      <DateRangeFilter
        value={dateRange}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        onReset={onReset}
      />
      <SearchInput
        value={keyword}
        onChange={handleKeywordChange}
        placeholder="이름으로 검색..."
        icon={<SearchIcon />}
      />
    </S_Card>
  )
}

export default ConsumerListToolbar

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
