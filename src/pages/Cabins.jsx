import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../services/apiCabins';
import Heading from '../ui/Heading';
import CabinTable from '../features/cabins/CabinTable';
import Spinner from '../ui/Spinner';
import Row from '../ui/Row';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import Button from '../ui/Button';

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  const {
    data: cabins = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        {isLoading && <Spinner />}
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
        {!isLoading && !error && <CabinTable cabins={cabins} />}
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
