import styled from 'styled-components';
import img from '~/assets/sem-imagem-150-100.png';

export const Container = styled.div`
  background: #fff;

  display: flex;
  flex-direction: row;
`;

export const PhotoCapture = styled.div`
  display: flex;
  flex-direction: column;

  margin-right: 20px;

  video {
    margin: 0;
    padding: 0;
  }
`;

export const Button = styled.button`
  border: 1px solid #ccc;
  border-radius: 4px;
  background-size: cover;
  background: none;
  cursor: pointer;
  padding: 8px;
`;

export const PhotoList = styled.ul`
  display: grid;
  align-content: flex-start;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 4px;
  margin-top: 25px;
`;

export const Photo = styled.li`
  display: flex;
  justify-content: center;
  align-content: center;

  border: 1px solid #c8c8c8;
  padding: 1px;
  margin: 2px;

  width: 150px;
  height: 100px;

  background: url(${img}) no-repeat top center;
  opacity: ${props => (props.noImage ? 0.3 : 1)};

  img {
    width: 146px;
    height: 96px;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-left: 20px;

  button {
    border: 0;
  }
`;
