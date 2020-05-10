import React, { useState, useEffect } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Header from '~/components/header';
import List from '~/components/purchaseList';
import api from '~/services/api';
import { numberFormat } from '~/utils/numberFormat';

import { Container, Content } from './styles';

export default function PurchaseList() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    async function fetchPurchases() {
      const response = await api.get('/purchases');

      if (response.data) {
        const formatted = response.data.map(item => ({
          ...item,
          formattedDate: formatRelative(parseISO(item.orderDate), new Date(), {
            locale: pt,
          }),
          formattedTotalPrice: numberFormat(item.totalPrice),
        }));
        setPurchases(formatted);
      }
    }

    fetchPurchases();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <List purchases={purchases} />
        </Content>
      </Container>
    </>
  );
}
