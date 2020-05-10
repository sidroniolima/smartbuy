import styled from 'styled-components';
import Modal from 'styled-react-modal';

export const ModalStyled = Modal.styled`
  padding: 10px;
  width: 60rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalHeader = styled.div`
  background: #000;
  height: 14px;

  display: flex;
  align-self: flex-start;
`;
