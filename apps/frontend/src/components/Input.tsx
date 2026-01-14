import styled from '@emotion/styled'
import { ChangeEvent, ComponentPropsWithRef } from 'react'

type SearchInputProps = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  icon?: React.ReactNode
}

export default function SearchInput({
  value,
  onChange,
  placeholder,
  icon,
  ...rest
}: ComponentPropsWithRef<'input'> & SearchInputProps) {
  return (
    <S_Wrapper>
      {icon && <S_Icon aria-hidden="true">{icon}</S_Icon>}

      <S_Input type="text" value={value} onChange={onChange} placeholder={placeholder} {...rest} />
    </S_Wrapper>
  )
}

const S_Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const S_Input = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;

  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;

  font-size: 14px;
  font-weight: 500;
  color: #111827;

  &::placeholder {
    color: #9ca3af;
  }

  &:hover {
    background: #f9fafb;
  }

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`

const S_Icon = styled.span`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  pointer-events: none;

  svg {
    width: 18px;
    height: 18px;
    color: #6b7280;
  }
`
