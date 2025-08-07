import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries(['cabins']);
      toast.success('Cabin deleted successfully');
    },
    onError: error => {
      toast.error(error.message || 'Failed to delete cabin');
    },
  });
}
