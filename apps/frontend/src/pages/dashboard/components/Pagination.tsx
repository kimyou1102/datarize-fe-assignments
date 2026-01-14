import ChevronLeftIcon from '@/components/icon/ChevronLeftIcon'
import ChevronRightIcon from '@/components/icon/ChevronRightIcon'
import styled from '@emotion/styled'

export interface PaginationProps {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}

function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
  const isPrevDisabled = page <= 1
  const isNextDisabled = page >= totalPages || totalPages <= 0

  return (
    <S_Wrapper aria-label="페이지네이션">
      <S_IconButton type="button" onClick={onPrev} disabled={isPrevDisabled} aria-label="이전 페이지">
        <ChevronLeftIcon />
      </S_IconButton>

      <S_PageText aria-label="현재 페이지 / 전체 페이지">
        <S_Current>{page}</S_Current>
        <S_Slash>/</S_Slash>
        <S_Total>{totalPages}</S_Total>
      </S_PageText>

      <S_IconButton type="button" onClick={onNext} disabled={isNextDisabled} aria-label="다음 페이지">
        <ChevronRightIcon />
      </S_IconButton>
    </S_Wrapper>
  )
}

export default Pagination

const S_Wrapper = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 12px;
`

const S_IconButton = styled.button`
  width: 44px;
  height: 44px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;

  cursor: pointer;

  &:hover:not(:disabled) {
    background: #f9fafb;
  }

  &:active:not(:disabled) {
    background: #f3f4f6;
  }

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #111827;
  }
`

const S_PageText = styled.div`
  min-width: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: 700;
  color: #111827;
`

const S_Current = styled.span``

const S_Slash = styled.span`
  margin: 0 6px;
  color: #9ca3af;
`

const S_Total = styled.span`
  color: #111827;
`
