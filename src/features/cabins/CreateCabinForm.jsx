import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { createCabin } from '../../services/apiCabins';
import FormRow from '../../ui/FormRow';

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
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

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          min={1}
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
          {...register('description')}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isLoading}
          {...register('image')}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          Add cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
