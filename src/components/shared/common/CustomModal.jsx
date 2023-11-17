import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const CustomModal = ({ show, onHide, position, children }) => {
  return (
    <Modal show={show} onHide={onHide} centered={position === 'center'}>
      <Modal.Header closeButton>
        <Modal.Title>{position === 'center' ? 'Centered Modal' : 'Custom Modal'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

CustomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  position: PropTypes.oneOf(['left', 'right', 'center']),
  children: PropTypes.node,
};

export default CustomModal;
