import styled from 'styled-components';
import GlobalStyles from './styles/GlabalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

const StyledDiv = styled.div`
  padding: 1em;
  background: #f8f9fa;
  border-radius: 8px;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledDiv>
        <Row type="vertical">
          <Row type="horizon">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button size="medium" variation="primary">
                Click in
              </Button>
              <Button size="small" variation="medium">
                Click out
              </Button>
            </div>
          </Row>
          <Row type="vertical">
            <Heading as="h3">Form</Heading>
            <form>
              <Input placeholder="Type here..." />
              <Input placeholder="Type here..." />
            </form>
          </Row>
        </Row>
      </StyledDiv>
    </>
  );
}

export default App;
