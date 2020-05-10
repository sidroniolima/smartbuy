import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import api from '~/services/api';
import history from '~/services/history';
import Header from '~/components/header';
import NewItemForm from './NewItemForm';
import PurchaseHeader from '~/components/purchase/header';
import PurchaseItem from '~/components/purchase/item';
import { Content, Footer } from './styles';

export default function Purchase({ match }) {
  const [items, setItems] = useState([]);
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    async function fetchVendorById(id) {
      const response = await api.get(`/vendors/${id}`);

      if (response.data) {
        setVendor(response.data);
      }
    }

    if (match.params.id) {
      fetchVendorById(match.params.id);
    }
  }, [match.params.id]);

  const hasItems = useMemo(() => items.length > 0, [items]);

  const purchaseQty = useMemo(() => {
    if (items.length === 0) {
      return 0;
    }
    return items
      .map(item => item.orderQty * 1)
      .reduce((prev, next) => prev + next);
  }, [items]);

  const purchaseValue = useMemo(() => {
    if (items.length === 0) {
      return 0.0;
    }
    return items
      .map(item => item.orderQty * item.unitPrice)
      .reduce((prev, next) => prev + next, 0);
  }, [items]);

  function addItem(item) {
    setItems([...items, item]);
  }

  function deleteItem(item) {
    setItems([...items.filter(i => i !== item)]);
  }

  async function handleSavePurchaseButton() {
    const itemsWithoutProduct = items.map(item => ({ ...item, product: null }));
    const purchase = {
      orderDate: new Date(),
      vendor_id: vendor.id,
      items: itemsWithoutProduct,
    };

    try {
      await api.post('/purchases', purchase);
      toast.success('Venda salva com sucesso.');
      history.push('/purchases');
    } catch (err) {
      toast.success('Não foi possível salvar a venda. Verifique seus itens.');
      console.tron.log(err);
    }
  }

  return (
    <>
      <Header />

      {vendor && (
        <Content>
          <PurchaseHeader
            vendorCode={vendor.erpCode}
            vendorName={vendor.name}
            vendorLastBuy=""
            purchaseValue={purchaseValue}
            purchaseQty={purchaseQty}
          />

          <NewItemForm handleAction={addItem} vendorId={vendor.id.toString()} />

          {hasItems &&
            items.map(item => (
              <PurchaseItem
                item={item}
                key={item.product.vendorCode}
                handleDeleteAction={deleteItem}
              />
            ))}
          {hasItems && (
            <Footer>
              <button type="button" onClick={handleSavePurchaseButton}>
                <FiSave size="32" color="#719192" />
              </button>
            </Footer>
          )}
        </Content>
      )}
    </>
  );
}

Purchase.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
