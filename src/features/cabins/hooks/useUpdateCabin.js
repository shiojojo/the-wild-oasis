import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCabin } from '../../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useUpdateCabin({ onSuccess: onSuccessCallback } = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateCabin(id, data),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['cabins']);
      toast.success('Cabin updated successfully');
      if (onSuccessCallback) onSuccessCallback(...args);
    },
    onError: error => {
      toast.error(error.message || 'Failed to update cabin');
    },
  });
}
