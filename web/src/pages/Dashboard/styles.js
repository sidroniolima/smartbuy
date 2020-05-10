import styled from 'styled-components';

export const Content = styled.div`
  max-width: 900px;
  margin: 20px auto;
  padding: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

export const PurchasePanel = styled.div`
  background: #fff;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 15px;

  h1 {
    color: #719192;
    text-align: center;
    font-size: 14px;
  }

  div {
    margin-top: 15px;
    display: flex;
    justify-content: center;

    select {
      background: #efefef;
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #666;
      margin: 0 0 12px;
      width: 70%;
      font-size: 16px;
      outline: 0;

      option {
        color: #666;
        font-size: 14px;
      }
    }

    a {
      margin-left: 20px;
      border: 1px solid #3c4245;
      color: #3c4245;
      padding: 6px 12px;
      height: 44px;
      vertical-align: bottom;
      display: flex;
      align-items: center;
      border-radius: 4px;
/*       pointer-events: ${props => (!props.enabled ? 'none' : '')};
      opacity: ${props => {
        return !props.enabled ? 0.4 : 1;
      }}; */
    }
  }
`;

export const LastsPurchasesPanel = styled.div`
  background: #fff;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 15px;
  margin-top: 15px;

  h1 {
    color: #719192;
    text-align: center;
    font-size: 14px;
  }
`;
