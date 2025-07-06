import styled from 'styled-components';
import GlobalStyles from './styles/GlabalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';

const StyledDiv = styled.div`
  padding: 2em;
  background: #f8f9fa;
  border-radius: 8px;
  max-width: 400px;
  margin: 2em auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledDiv>
        <Heading as="h1">Heading 1</Heading>
        <Heading as="h2">Heading 2</Heading>
        <Heading as="h3">Heading 3</Heading>
        <Input placeholder="Type here..." />
        <Button size="medium" variation="primary">
          Click me
        </Button>
      </StyledDiv>
    </>
  );
}

export default App;
