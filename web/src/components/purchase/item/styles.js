import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px 10px;
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;

  &:first-of-type {
    border-top: none;
  }

  img {
    width: auto;
    height: 80px;
  }

  button {
    border: 1px dashed #ddd;
    background-size: cover;
    background: none;
    cursor: pointer;
    height: 80px;
    min-width: 80px;
    max-width: 80px;
    padding: 0 25px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Description = styled.div`
  font-size: 110%;
  color: #555;
  font-weight: 100;
  margin-left: 20px;

  display: flex;
  justify-content: flex-start;

  span {
    margin-left: 20px;
    min-width: 100px;
    max-width: 100px;
  }

  strong {
    margin-left: 20px;
    min-width: 300px;
    max-width: 300px;
  }
`;

export const Qty = styled.span`
  color: #777;
  font-weight: 100;
  width: 20px;
  min-width: 100px;
  max-width: 100px;
  margin-left: 20px;
`;

export const Value = styled.span`
  color: #777;
  font-weight: 100;
  min-width: 100px;
  max-width: 100px;
  margin-left: 20px;
`;

export const Controls = styled.div`
  border-left: 20px;
  width: auto;

  button {
    border: 0;
    background: none;
    margin-right: 15px;

    width: 30px;
    max-width: 30px;
  }
`;
