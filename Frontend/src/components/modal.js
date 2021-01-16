import React, { useState } from "react";
import { Modal } from "@material-ui/core";

const ModalC = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <button onClick={handleOpen}>Open Modal</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <h1>Modal</h1>
      </Modal>
    </React.Fragment>
  );
};

export default ModalC;
