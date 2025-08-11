import { useState } from 'react';
import { useCreateCabin } from './hooks/useCreateCabin';
import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useDeleteCabin } from './hooks/useDeleteCabin';
import CreateCabinForm from './CreateCabinForm';

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
  const { image, name, maxCapacity, regularPrice, discount, id, description } =
    cabin;
  const { mutate, isLoading } = useDeleteCabin();
  const [showEditForm, setShowEditForm] = useState(false);
  const { mutate: createMutate, isLoading: isCreating } = useCreateCabin();

  // 複製ボタンの処理
  const handleDuplicate = () => {
    // 画像がFile型でない場合はURLで複製（APIが許せば）
    // nameに「(複製)」を付与
    createMutate({
      name: name + 'copy',
      maxCapacity,
      regularPrice,
      discount,
      description: description || '',
      image, // 画像はURLのまま渡す（APIが許せば）
    });
  };

  return (
    <>
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
              color: 'green',
              background: 'none',
              border: 'none',
              cursor: isLoading || isCreating ? 'not-allowed' : 'pointer',
              marginRight: '1rem',
            }}
            onClick={handleDuplicate}
            disabled={isLoading || isCreating}
          >
            複製
          </button>
          <button
            type="button"
            style={{
              color: 'blue',
              background: 'none',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              marginRight: '1rem',
            }}
            onClick={() => setShowEditForm(show => !show)}
            disabled={isLoading}
          >
            Edit
          </button>
          <button
            type="button"
            style={{
              color: 'red',
              background: 'none',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
            onClick={() => mutate(id)}
            disabled={isLoading}
          >
            Delete
          </button>
        </div>
      </TableRow>
      {showEditForm && (
        <CreateCabinForm
          cabin={cabin}
          onClose={() => setShowEditForm(false)}
          // CreateCabinForm側でisCreating/isUpdatingでボタン無効化済み
        />
      )}
    </>
  );
}

export default CabinRow;
