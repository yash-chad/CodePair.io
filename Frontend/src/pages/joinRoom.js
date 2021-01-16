import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import * as Actions from "../store/actions";

export default function JoinRoom(props) {
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = () => {
    const room_id = window.location.pathname.split("/").slice(-1)[0];
    dispatch(Actions.joinRoom(room_id, props.history));
    setOpen(false);
  };

  return (
    <div style={{ background: "#2F3136" }}>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <h1 className="dialog-title" id="responsive-dialog-title">
          {"Join this Room ?"}
        </h1>
        <DialogContent>
          <DialogContentText>
            <p>
              Welcome to Codeshare! Don't Worry we do not share your data
              anywhere.
              <br /> Are you sure you want to join this room ??
            </p>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions> */}

        <button onClick={handleSubmit} className="welcome" autoFocus>
          Agree
        </button>

        {/* </DialogActions> */}
      </Dialog>
    </div>
  );
}
