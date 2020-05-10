import React, { useState, useEffect } from 'react';
import api from '~/services/api';
import Header from '~/components/header';
import PurchaseHeader from '~/components/purchase/header';
import PurchaseItem from '~/components/purchase/item';
import zeroFill from '~/utils/zeroFill';
import { numberFormat } from '~/utils/numberFormat';

import { Container } from './styles';

export default function PurchaseView({ match }) {
  const [purchase, setPurchase] = useState(null);

  useEffect(() => {
    async function fetchPurchaseById(id) {
      const response = await api.get(`purchases/${id}`);

      if (response.data) {
        setPurchase(response.data);
      }
    }

    const { id } = match.params;

    fetchPurchaseById(id);
  }, [match.params, match.params.id]);

  return (
    <>
      <Header />
      {purchase && (
        <Container>
          <PurchaseHeader
            vendorCode={purchase.vendor.erpCode}
            vendorName={purchase.vendor.name}
            vendorLastBuy="..."
            purchaseValue={purchase.totalPrice}
            purchaseQty={0}
          />

          {purchase &&
            purchase.items.map(item => (
              <PurchaseItem
                item={item}
                key={item.product.id}
                handleDeleteAction={() => {}}
                view
              />
            ))}
        </Container>
      )}
    </>
  );
}
