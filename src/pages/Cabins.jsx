import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../services/apiCabins';
import Heading from '../ui/Heading';
import CabinTable from '../features/cabins/CabinTable';
import Spinner from '../ui/Spinner';
import Row from '../ui/Row';

function Cabins() {
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
    </>
  );
}

export default Cabins;
