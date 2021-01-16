import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../store/actions";

export default function FormDialog() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.room.dialog);
  const setOpen = (newState) => {
    dispatch(Actions.setDialog(newState));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [room_name, set_room_name] = useState("");
  const handleChange = (event) => {
    set_room_name(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(Actions.createRoom(room_name));
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{ borderRadius: "8px" }}
      >
        <div className="customized-dialog">
          <h1 className="dialog-title" style={{}} id="form-dialog-title">
            Create a new room
          </h1>
          <DialogContent style={{}}>
            <form onSubmit={handleSubmit}>
              <div className="dialog-text">
                <div className="dialog-desc">
                  Your room is where you and your friends collaborate and work.
                  Make it and check it out!
                  {/* Enter the name of the new Room to be created: */}
                </div>
                <div id="name-label">Room Name :</div>
                <input
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Room Name"
                  placeholder="Type your room name here..."
                  fullWidth
                  value={room_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <DialogActions>
                <div className="buttons">
                  <button type="submit" className="dialog-save">
                    CREATE
                  </button>
                  <button onClick={handleClose} className="dialog-cancel">
                    Cancel
                  </button>
                </div>
              </DialogActions>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
