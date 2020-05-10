import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';
import { Form } from '@rocketseat/unform';
import api from '~/services/api';
import TInput from '~/components/tInput';
import StyledModal from '~/components/styledModal';

import { Container, ProductInfo, InventoryInfo } from './styles';
import NewProductForm from '../NewProductForm';

export default function NewItemForm({ handleAction }) {
  const [productModalIsOpen, setProductModalOpen] = useState(false);
  const [productVendorCode, setProductVendorCode] = useState('');
  const [productInventory, setProductInventory] = useState(null);

  function handleSubmit(data, { resetForm }) {
    if (!productInventory) {
      return;
    }
    handleAction({
      ...data,
      product: productInventory.product,
      product_id: productInventory.product.id,
    });

    resetForm();
    setProductInventory(null);
  }

  async function handleVendorCodeBlur() {
    if (!productVendorCode) {
      return;
    }

    try {
      const response = await api.get(
        `/inventory/${productVendorCode.toUpperCase()}`
      );

      if (response.data) {
        const { lastPurchaseDate, lastSellingDate, product } = response.data;

        const formattedData = {
          ...response.data,
          lastPurchaseDate: format(parseISO(lastPurchaseDate), 'dd/MM/yyyy'),
          lastSellingDate:
            lastSellingDate !== null
              ? format(parseISO(lastSellingDate), 'dd/MM/yyyy')
              : '',
          product_id: product.id,
          product,
        };

        setProductInventory(formattedData);
      }
    } catch (error) {
      setProductModalOpen(true);
    }
  }

  function cancelNewProduct() {
    setProductModalOpen(false);
  }

  return (
    <Container>
      <StyledModal isOpen={productModalIsOpen} contentLabel="Novo produto">
        <NewProductForm closeAction={cancelNewProduct} />
      </StyledModal>
      <Form onSubmit={handleSubmit}>
        <TInput
          type="text"
          placeholder="Código"
          name="productVendorCode"
          size="100px"
          autoComplete="off"
          onBlur={handleVendorCodeBlur}
          onChange={e => setProductVendorCode(e.target.value)}
          uppercase
        />

        <TInput
          type="text"
          placeholder="Descrição do produto"
          name="productDescription"
          size="300px"
          autoComplete="off"
          disabled={productInventory}
        />
        <TInput
          type="number"
          min="0"
          placeholder="Quantidade"
          name="orderQty"
          size="110px"
          autoComplete="off"
        />
        <TInput
          type="number"
          min="0"
          step="any"
          placeholder="Valor unitário"
          name="unitPrice"
          size="200px"
          autoComplete="off"
        />

        <button type="submit">
          <FiCheck color="#719192" size={32} />
        </button>
      </Form>
      {productInventory && (
        <InventoryInfo>
          <ProductInfo>
            <strong>Produto:</strong>
            <span>
              {productInventory.product.vendorCode}&nbsp; - &nbsp;
              {productInventory.product.description}
            </span>
          </ProductInfo>
          <ProductInfo>
            <strong>Saldo em estoque:</strong>
            <span>{productInventory.qty}</span>
          </ProductInfo>
          <ProductInfo>
            <strong>Última compra:</strong>
            <span>{productInventory.lastPurchaseDate}</span>
          </ProductInfo>
          <ProductInfo>
            <strong>Última venda:</strong>
            <span>{productInventory.lastSellingDate}</span>
          </ProductInfo>
        </InventoryInfo>
      )}
    </Container>
  );
}

NewItemForm.propTypes = {
  handleAction: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  vendorId: PropTypes.string.isRequired,
  selectedItem: PropTypes.shape({
    product: '',
    qty: '',
    price: '',
  }),
};

NewItemForm.defaultProps = {
  selectedItem: {
    product: '',
    qty: '',
    price: '',
  },
};
