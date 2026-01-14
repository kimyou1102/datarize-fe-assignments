import styled from '@emotion/styled'

function Header() {
  return (
    <S_Header>
      <S_Title>쇼핑몰 구매 데이터 대시보드</S_Title>
    </S_Header>
  )
}

export default Header

const S_Header = styled.header`
  padding: 2rem;
`

const S_Title = styled.h1`
  font-size: 22px;
  font-weight: bold;
`
