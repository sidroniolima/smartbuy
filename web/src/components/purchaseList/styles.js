import styled from 'styled-components';

export const PurchaseList = styled.ul`
  list-style: none;
  margin-top: 10px;
`;

export const Purchase = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 12px;
  margin-top: 8px;
  padding: 16px 6px;
  border-top: 1px solid #ddd;

  span {
    min-width: 250px;
    max-width: 250px;
  }
`;
