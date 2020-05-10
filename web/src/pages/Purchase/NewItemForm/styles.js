import styled from 'styled-components';

export const Container = styled.div`
  margin: 20px 0;
  padding: 20px 10px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07);

  form {
    display: flex;
    justify-content: center;

    button {
      padding: 3px 5px;
      border: 0;
      margin-left: 10px;
      background: #fff;
      border: 1px solid #719192;
      border-radius: 4px;
    }
  }
`;

export const InventoryInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin-top: 20px;
  padding: 20px;
`;

export const ProductInfo = styled.div`
  strong {
    font-size: 90%;
    font-weight: 700;
    margin-right: 5px;
  }

  span {
    font-size: 85%;
    font-weight: 400;
    margin-right: 10px;
    background: rgba(113, 145, 146, 0.3);
    padding: 5px 5px;
  }
`;
