import React from 'react';
import { FaGem } from 'react-icons/fa';
import { numberFormat } from '~/utils/numberFormat';

import {
  PurchaseHeader,
  VendorInfo,
  PurchaseInfo,
  PurchaseValue,
  PurchaseQty,
} from './styles';

export default function purchaseHeader({
  vendorCode,
  vendorName,
  vendorLastBuy,
  purchaseValue,
  purchaseQty,
}) {
  return (
    <PurchaseHeader>
      <VendorInfo>
        <FaGem size={64} color="#719192" />
        <div>
          <strong>
            {vendorName} <span>({vendorCode})</span>
          </strong>
          <p>{`última compra em ${vendorLastBuy}`}</p>
        </div>
      </VendorInfo>
      <PurchaseInfo>
        <PurchaseValue>
          <span>R$</span>
          {numberFormat(purchaseValue)}
        </PurchaseValue>

        <PurchaseQty>{`${numberFormat(purchaseQty)} itens`}</PurchaseQty>
      </PurchaseInfo>
    </PurchaseHeader>
  );
}
