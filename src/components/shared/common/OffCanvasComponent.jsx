import React from 'react'
import { Offcanvas } from 'react-bootstrap'

const OffCanvasComponent = ({ show, handleClose, title, triggerElement, children, placement }) => {
  return (
    <>
      {triggerElement}
      <Offcanvas show={show} onHide={handleClose} placement={placement}>
        <Offcanvas.Header>
          {/* <Offcanvas.Header closeButton> */}

          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default OffCanvasComponent
