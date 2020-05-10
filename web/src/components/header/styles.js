import styled from 'styled-components';

export const Container = styled.div`
  background: #fafafa;
  padding: 0 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07);
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #719192;
    }

    a {
      margin-right: 15px;
      font-size: 120%;
      color: #719192;
    }
  }

  aside {
    align-items: center;
    text-align: right;

    strong {
      display: block;
      font-size: 90%;
      font-weight: 700;
      color: #3c4245;
    }

    a {
      display: block;
      font-size: 80%;
      font-weight: 400;
      color: #5f6769;
      font-size: 12px;
    }
  }
`;
