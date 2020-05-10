import styled from 'styled-components';

export const PurchaseHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;

  button {
    padding: 20px 30px;
    border: 0;
    margin-left: 10px;
    background: #fff;
    border: 1px solid #719192;
    border-radius: 4px;
  }
`;

export const VendorInfo = styled.div`
  display: flex;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07);
  justify-content: flex-start;
  width: 80%;
  margin-right: 10px;
  padding: 15px;
  color: #555;
  background: #fff;

  svg {
    margin: 0 30px 0 20px;
  }

  div {
    strong {
      font-size: 140%;
      font-weight: 100;

      span {
        font-size: 50%;
        color: #999;
      }
    }
    p {
      display: block;
      font-size: 90%;
      font-weight: 100;
      color: #999;
    }
  }
`;

export const PurchaseInfo = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07);
  justify-content: space-between;
  width: 20%;
  padding: 15px;
  background: #fff;
`;

export const PurchaseValue = styled.p`
  color: #3c4245;
  font-size: 300%;
  font-weight: 100;

  span {
    font-size: 30%;
    margin-right: 10px;
    font-weight: 100;
  }
`;

export const PurchaseQty = styled.p`
  color: #666;
  font-size: 85%;
  font-weight: 100;
`;
