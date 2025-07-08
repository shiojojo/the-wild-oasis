import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  grid-column: 1 / 2;
  background: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  z-index: 2;
  padding: 2.4rem 1.6rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
