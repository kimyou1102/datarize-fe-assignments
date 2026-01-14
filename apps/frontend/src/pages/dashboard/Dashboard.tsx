import styled from '@emotion/styled'
import Header from './components/Header'
import PriceRangeFrequencySection from './components/PriceRangeFrequencySection'
import ConsumerListSection from './components/ConsumerListSection'

function Dashboard() {
  return (
    <S_Container>
      <Header />
      <S_Main>
        <PriceRangeFrequencySection />
        <ConsumerListSection />
      </S_Main>
    </S_Container>
  )
}

export default Dashboard

const S_Container = styled.div``

const S_Main = styled.main`
  display: flex;
  width: 100%;
  padding: 2rem;
  gap: 3rem;
`
