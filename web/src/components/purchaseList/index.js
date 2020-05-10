import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';

import { PurchaseList, Purchase } from './styles';

export default function purchaseList({ purchases }) {
  return (
    <PurchaseList>
      {purchases.map(purchase => (
        <Purchase key={purchase.id}>
          <span>
            De <strong>{purchase.vendor.name}</strong>
          </span>
          <span>{purchase.formattedDate}</span>
          <strong>{purchase.formattedTotalPrice}</strong>

          <Link to={`/purchase/${purchase.id}`}>
            <FiExternalLink size={16} color="#719192" />
          </Link>
        </Purchase>
      ))}
    </PurchaseList>
  );
}

purchaseList.propTypes = {
  purchases: PropTypes.arrayOf(PropTypes.object).isRequired,
};
