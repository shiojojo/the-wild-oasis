import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const StyledMain = styled.main`
  grid-row: 2 / -1;
  grid-column: 2 / 3;
  background: var(--color-grey-100);
  overflow-y: auto;
  padding: 3.2rem 4.8rem 6.4rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      <Header />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledAppLayout>
  );
}

export default AppLayout;
