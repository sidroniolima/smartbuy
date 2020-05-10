import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 40px;
  background: #fff;
  border-radius: 4px;

  form {
    display: flex;
    align-items: center;
  }
`;

export const Title = styled.div`
  margin-bottom: 20px;

  h1 {
    font-size: 26px;
    color: #aaa;
  }
`;

export const Button = styled.button`
  padding: 3px 5px;
  border: 0;
  background: #fff;
  border: 1px solid #719192;
  border-radius: 4px;
  margin-right: 10px;
`;

export const ProductRow = styled.div`
  margin-bottom: 15px;
`;

export const ActionRow = styled.div`
  text-align: right;
`;

export const PhotosRow = styled.div`
  h1 {
    font-size: 14px;
    font-weight: 400;
    color: #719192;
    margin-top: 10px;
  }

  padding: 15px 0;
  border-top: 1px solid #cecece;
`;
