import React from 'react'
import styled from '@emotion/styled'

import CloseIcon from './icon/CloseIcon'
import useModalClose from '@/hooks/useModalClose'

export interface ModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const { handleBackdropMouseDown } = useModalClose({
    isOpen,
    onClose,
  })

  if (!isOpen) return null

  return (
    <S_Backdrop onMouseDown={handleBackdropMouseDown} role="presentation">
      <S_Panel role="dialog" aria-modal="true">
        <S_Header>
          <S_TitleArea>{title}</S_TitleArea>
          <S_CloseButton type="button" onClick={onClose} aria-label="닫기">
            <CloseIcon />
          </S_CloseButton>
        </S_Header>

        <S_Body>{children}</S_Body>
      </S_Panel>
    </S_Backdrop>
  )
}

export default Modal

const S_Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;
  background: rgba(0, 0, 0, 0.55);
`

const S_Panel = styled.div`
  width: min(980px, 100%);
  max-height: min(760px, 100%);

  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;

  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const S_Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 18px 20px;
  border-bottom: 1px solid #e5e7eb;
`

const S_TitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  min-width: 0;
  color: #111827;
  font-weight: 800;
  font-size: 18px;
`

const S_CloseButton = styled.button`
  width: 36px;
  height: 36px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: transparent;
  cursor: pointer;

  border-radius: 10px;

  &:hover {
    background: #f3f4f6;
  }

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #374151;
  }
`

const S_Body = styled.div`
  padding: 18px 20px 22px;
  overflow: auto;
`
