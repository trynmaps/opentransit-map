import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ show, handleClose, children }) => {
  const showHideClassName = show ? 'modal-wrapper display-block' : 'modal-wrapper display-none';
  return (
    <div className={showHideClassName}>
      <section className="modal">
        {children}
        <button onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
