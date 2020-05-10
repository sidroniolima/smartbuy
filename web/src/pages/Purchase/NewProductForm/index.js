import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FiSave, FiXSquare } from 'react-icons/fi';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '~/services/api';
import TInput from '~/components/tInput';
import TSelect from '~/components/tSelect';
import PhotoManager from '~/components/photoManager';

import { Container, Title, Button, ProductRow, PhotosRow } from './styles';

export default function NewProductForm({ closeAction }) {
  const vendorId = useSelector(state => state.purchase.vendorId);
  const [savedProduct, setSavedProduct] = useState(null);

  async function handleSubmit(data) {
    try {
      const response = await api.post('/products', {
        ...data,
        vendorCode: data.vendorCode.toUpperCase(),
        vendorId,
      });

      if (response.data) {
        setSavedProduct(response.data);
        toast.info('O produto foi salvo. Agora você pode incluir as fotos.');
      }
    } catch (error) {
      toast.error('Não foi possível salvar o produto. Confira os campos.');
    }
  }

  function handleReset() {
    closeAction();
  }

  return (
    <Container>
      <ProductRow>
        <Title>
          <h1>Novo Produto</h1>
        </Title>
        <Form onSubmit={handleSubmit} onReset={handleReset}>
          <TInput
            type="text"
            placeholder="Código do vendedor"
            name="vendorCode"
            size="150px"
            autoComplete="off"
            uppercase
          />

          <TSelect
            options={[
              {
                id: '1',
                title: 'Brinco',
              },
            ]}
            size="200px"
            name="groupId"
          />

          <TInput
            type="text"
            placeholder="Descrição do produto"
            name="description"
            size="350px"
            autoComplete="off"
          />

          <Button type="submit">
            <FiSave size="32" color="#719192" />
          </Button>

          <Button type="reset">
            <FiXSquare size="32" color="#719192" />
          </Button>
        </Form>
      </ProductRow>

      {savedProduct && (
        <PhotosRow>
          <PhotoManager productId={savedProduct.id} />
        </PhotosRow>
      )}
    </Container>
  );
}

NewProductForm.propTypes = {
  closeAction: PropTypes.func.isRequired,
};
