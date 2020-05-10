import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiTrash, FiCamera } from 'react-icons/fi';
import StyledModal from '~/components/styledModal';
import PhotoManager from '~/components/photoManager';
import { numberFormat } from '~/utils/numberFormat';

import { Container, Description, Qty, Value, Controls } from './styles';

export default function PurchaseItem({ item, handleDeleteAction, view }) {
  const [showPhotosModal, setShowPhotosModal] = useState(false);

  function handleInputClick() {
    const show = !showPhotosModal;
    setShowPhotosModal(show);
  }

  return (
    <Container>
      <StyledModal isOpen={showPhotosModal}>
        <PhotoManager />
      </StyledModal>
      {!view && (
        <button type="button" onClick={handleInputClick}>
          <FiCamera size={42} color="#ccc" />
        </button>
      )}
      <Description>
        <span>{item.product.vendorCode}</span>
        <strong>{item.product.description}</strong>
      </Description>
      <Qty>{item.orderQty}</Qty>
      <Value>{numberFormat(item.unitPrice)}</Value>
      {!view && (
        <Controls>
          <button type="button" onClick={() => handleDeleteAction(item)}>
            <FiTrash size="20" color="#3c4245" />
          </button>
        </Controls>
      )}
    </Container>
  );
}

PurchaseItem.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.shape({
      vendorCode: '',
      description: '',
    }),
    orderQty: '',
    unitPrice: '',
  }).isRequired,
  handleDeleteAction: PropTypes.func.isRequired,
  view: PropTypes.bool,
};

PurchaseItem.defaultProps = {
  view: false,
};
