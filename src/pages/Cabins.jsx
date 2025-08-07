import { useState } from 'react';
import Heading from '../ui/Heading';
import CabinTable from '../features/cabins/CabinTable';
import Spinner from '../ui/Spinner';
import Row from '../ui/Row';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import Button from '../ui/Button';

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Row>
        <Button onClick={() => setShowForm(show => !show)}>
          {showForm ? 'Close form' : 'Add new cabin'}
        </Button>
      </Row>
      {showForm && (
        <Row>
          <CreateCabinForm />
        </Row>
      )}
    </>
  );
}

export default Cabins;
