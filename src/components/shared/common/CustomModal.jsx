import React from 'react'
import Modal from 'react-bootstrap/Modal'

const CustomModal = ({ show, onHide, children }) => {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}

export default CustomModal
