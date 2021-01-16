import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import { Alert } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../store/actions";

const Toast = () => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.utils.toastType);
  const open = useSelector((state) => state.utils.toastOpen);
  const message = useSelector((state) => state.utils.toastMessage);

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open
        autoHideDuration={6000}
      >
        <Collapse in={open}>
          <Alert
            severity={type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  dispatch(Actions.closeToast());
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {message}
          </Alert>
        </Collapse>
      </Snackbar>
    </React.Fragment>
  );
};

export default Toast;
