import React from 'react';
import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Price = styled.div`
  font-weight: 600;
`;

const Discount = styled.div`
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { image, name, maxCapacity, regularPrice, discount, id } = cabin;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries(['cabins']);
      toast.success('Cabin deleted successfully');
    },
    onError: error => {
      toast.error(error.message || 'Failed to delete cabin');
    },
  });

  return (
    <TableRow role="row">
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>{maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{discount ? `-${formatCurrency(discount)}` : ''}</Discount>
      <div>
        <button
          type="button"
          style={{
            color: 'red',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => mutate(id)}
        >
          Delete
        </button>
      </div>
    </TableRow>
  );
}

export default CabinRow;
