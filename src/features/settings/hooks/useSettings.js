import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../../services/apiSettings';

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });
}
