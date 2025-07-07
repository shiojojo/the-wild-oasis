import styled, { css } from 'styled-components';

const horizon = css`
  flex-direction: row;
  gap: 0;
  align-items: center;
  justify-content: space-between;
`;

const vertical = css`
  flex-direction: column;
  gap: 1.6rem;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  ${({ type }) => (type === 'horizon' ? horizon : vertical)}
`;

export default Row;
