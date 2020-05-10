import React from 'react';
import PropTypes from 'prop-types';
import { ModalStyled, ModalHeader } from './styles';

export default function styledModal({ isOpen, children }) {
  return (
    <ModalStyled isOpen={isOpen}>
      <ModalHeader />
      {children}
    </ModalStyled>
  );
}

styledModal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
};

styledModal.defaultProps = {
  isOpen: false,
};
