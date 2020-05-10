import React, { useState, useEffect } from 'react';
import { Select } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';
import Header from '~/components/header';
import PurchaseList from '~/components/purchaseList';
import { numberFormat } from '~/utils/numberFormat';
import { Content, PurchasePanel, LastsPurchasesPanel } from './styles';

export default function Dashboard() {
  const [vendors, setVendors] = useState(null);
  const [vendor, setVendor] = useState('');
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    async function fetchPurchases() {
      const response = await api.get('/latests-purchases');

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

    async function fetchVendors() {
      const response = await api.get('/vendors');

      if (response.data) {
        setVendors(response.data);
      }
    }

    fetchPurchases();
    fetchVendors();
  }, []);

  return (
    <>
      <Header />
      <Content>
        {vendors && (
          <PurchasePanel>
            <h1>Iniciar uma nova compra</h1>

            <div>
              <Select
                name="vendor"
                options={vendors.map(item => ({
                  id: item.id,
                  title: item.name,
                }))}
                onChange={e => setVendor(e.target.value)}
              />

              <Link to={`/purchase/vendor/${vendor}`}>Comprar</Link>
            </div>
          </PurchasePanel>
        )}

        <LastsPurchasesPanel>
          <h1>Últimas compras</h1>
          <PurchaseList purchases={purchases} />
        </LastsPurchasesPanel>
      </Content>
    </>
  );
}
