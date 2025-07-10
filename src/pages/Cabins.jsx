import { useEffect, useState } from 'react';
import { getCabins } from '../services/apiCabins';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Cabins() {
  const [cabins, setCabins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCabins() {
      try {
        const data = await getCabins();
        setCabins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCabins();
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {cabins.map(cabin => (
            <li key={cabin.id}>
              {cabin.name || `Cabin ${cabin.id}`}
              <br />
              <img
                src={cabin.image}
                alt={cabin.name || `Cabin ${cabin.id}`}
                style={{ width: '200px', height: 'auto', marginTop: '8px' }}
              />
            </li>
          ))}
        </ul>
      )}
    </Row>
  );
}

export default Cabins;
