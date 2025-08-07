import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../../services/apiCabins';

export function useCabins() {
  return useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });
}
