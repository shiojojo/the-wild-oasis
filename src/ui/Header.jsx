import styled from 'styled-components';

const StyledHeader = styled.header`
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  padding: 2.4rem 1.6rem;
  background: var(--color-grey-50);
  box-shadow: var(--shadow-sm);
  z-index: 1;
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;
