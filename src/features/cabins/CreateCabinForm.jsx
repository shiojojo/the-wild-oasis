import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { createCabin, updateCabin } from '../../services/apiCabins';
import FormRow from '../../ui/FormRow';

function CreateCabinForm({ cabin }) {
  const isEdit = Boolean(cabin);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: isEdit
      ? {
          name: cabin.name || '',
          maxCapacity: cabin.maxCapacity || 1,
          regularPrice: cabin.regularPrice || 1,
          discount: cabin.discount || 0,
          description: cabin.description || '',
          image: undefined, // 画像は新規アップロード時のみ
        }
      : {},
  });
  const queryClient = useQueryClient();
  const { mutate: createMutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries(['cabins']);
      toast.success('Cabin created successfully');
      reset();
    },
    onError: error => {
      toast.error(error.message || 'Failed to create cabin');
    },
  });
  // 編集用のmutationはここで用意（例: updateCabin）
  const { mutate: updateMutate, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => updateCabin(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['cabins']);
      toast.success('Cabin updated successfully');
      reset();
    },
    onError: error => {
      toast.error(error.message || 'Failed to update cabin');
    },
  });

  function onSubmit(data) {
    const newData = { ...data, image: data.image?.[0] };
    if (isEdit) {
      // updateCabin APIを呼ぶ
      updateMutate({ id: cabin.id, data: newData });
    } else {
      createMutate(newData);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          min={1}
          disabled={isCreating}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Minimum is 1' },
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          min={1}
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Minimum is 1' },
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          min={0}
          disabled={isCreating}
          {...register('discount', {
            valueAsNumber: true,
            min: { value: 0, message: 'Minimum is 0' },
            validate: value =>
              value <= (Number(getValues('regularPrice')) || 0) ||
              'Discount cannot exceed price',
          })}
        />
      </FormRow>

      <FormRow label="Description for website">
        <Textarea
          id="description"
          disabled={isCreating}
          {...register('description')}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating || isUpdating}
          {...register('image', {
            required: !isEdit ? 'Image is required' : false,
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isCreating || isUpdating}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating || isUpdating}>
          {isEdit ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
