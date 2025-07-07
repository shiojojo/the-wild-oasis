import styled, { css } from 'styled-components';

const horizontal = css`
  align-items: center;
  justify-content: space-between;
`;

const vertical = css`
  flex-direction: column;
  gap: 1.6rem;
`;

const Row = styled.div`
  display: flex;
  ${({ type }) => (type === 'horizontal' ? horizontal : vertical)}
`;

export default Row;
