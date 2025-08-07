import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useCreateCabin({ onSuccess: onSuccessCallback } = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCabin,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['cabins']);
      toast.success('Cabin created successfully');
      if (onSuccessCallback) onSuccessCallback(...args);
    },
    onError: error => {
      toast.error(error.message || 'Failed to create cabin');
    },
  });
}
