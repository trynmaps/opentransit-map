import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ showModal, handleClose, children }) => {
  const showHideClassName = showModal ? 'modal-wrapper display-block' : 'modal-wrapper display-none';
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
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
