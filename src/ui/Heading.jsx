import styled from 'styled-components';

const Heading = styled.h1`
  /* h1用 */
  ${({ as }) =>
    as === 'h1' &&
    `
    font-size: 2.4rem;
    font-weight: 700;
  `}

  /* h2用 */
  ${({ as }) =>
    as === 'h2' &&
    `
    font-size: 1.8rem;
    font-weight: 700;
  `}

  /* h3用 */
  ${({ as }) =>
    as === 'h3' &&
    `
    font-size: 1.3rem;
    font-weight: 600;
  `}
`;

export default Heading;
