import React, { useEffect, useState } from "react";
import { Icon } from "@material-ui/core";
import { BorderColor, DeleteForever, Description } from "@material-ui/icons";
import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../store/actions/notesActions";
import { useDispatch, useSelector } from "react-redux";

const Notes = (props) => {
  const dispatch = useDispatch();

  let [current_id, setId] = useState(0);
  let [data, setData] = useState("");

  const room_id = useSelector((state) => state.room.room_id);
  const notes_list = useSelector((state) => state.notes.notes_list);
  useEffect(() => {
    dispatch(getNotes({ room_id }));
    // eslint-disable-next-line
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteNote({ note_id: id }));
    setTimeout(() => {
      dispatch(getNotes({ room_id }));
    }, 100);
    setId(0);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (current_id) {
      dispatch(updateNote({ note_id: current_id, data }));
    } else {
      dispatch(addNote({ room_id, data }));
    }
    e.target.reset();
    setData("");
    setId(0);
    setTimeout(() => {
      dispatch(getNotes({ room_id }));
    }, 100);
  };

  return (
    <div className="notes">
      <div className="notes-header"></div>

      <div className="notes-scrollable">
        <h1 style={{ display: "inline-block" }} className="notes-heading">
          <Icon
            style={{
              color: "#7289DA",
              fontSize: "2.2rem",
              fontWeight: "600",
            }}
          >
            {/* <List /> */}
            <Description />
          </Icon>
          &nbsp; Notes - {notes_list.length}
        </h1>
        <div className="notes-content">
          <form onSubmit={handleSave} className="note-form">
            <textarea
              autoFocus
              className="note"
              id="new"
              name="data"
              required
              value={data || ""}
              style={{ width: "93%" }}
              placeholder="New Note..."
              onChange={(e) => {
                setData(e.target.value);
              }}
            ></textarea>

            <button type="submit" className="new-note">
              Save Note +
            </button>
          </form>

          {/* <div className="notes-divider" /> */}
          {notes_list.map((note) => {
            return (
              <div key={note.note_id}>
                <div className="note">
                  {note.data}
                  <div className="note-icons">
                    <button
                      className="edit-note"
                      onClick={() => {
                        setId(note.note_id);
                        setData(note.data);
                      }}
                    >
                      <Icon
                        style={{
                          color: "#7289DA",
                          fontSize: "1.8rem",
                          fontWeight: "600",
                        }}
                      >
                        <BorderColor />
                      </Icon>
                    </button>
                    <button
                      className="delete-note"
                      onClick={(event) => {
                        setId(note.note_id);
                        handleDelete(note.note_id);
                      }}
                    >
                      <Icon
                        style={{
                          color: "red",
                          fontSize: "1.8rem",
                          fontWeight: "600",
                        }}
                      >
                        <DeleteForever />
                      </Icon>
                    </button>
                  </div>
                </div>
                {/* Read more... */}
                {/* {note.data.length > 400 ? (
                  <div className="note">
                    {note.data.substring(0, 400)}
                    <div className="read-more">&nbsp;Read more...</div>
                    <div className="note-icons">
                      <button
                        className="edit-note"
                        onClick={() => {
                          setId(note.note_id);
                          setData(note.data);
                        }}
                      >
                        <Icon
                          style={{
                            color: "#7289DA",
                            fontSize: "1.8rem",
                            fontWeight: "600",
                          }}
                        >
                          <BorderColor />
                        </Icon>
                      </button>
                      <button
                        className="delete-note"
                        onClick={(event) => {
                          setId(note.note_id);
                          handleDelete(note.note_id);
                        }}
                      >
                        <Icon
                          style={{
                            color: "red",
                            fontSize: "1.8rem",
                            fontWeight: "600",
                          }}
                        >
                          <DeleteForever />
                        </Icon>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="note">
                    {note.data}
                    <div className="note-icons">
                      <button
                        className="edit-note"
                        onClick={() => {
                          setId(note.note_id);
                          setData(note.data);
                        }}
                      >
                        <Icon
                          style={{
                            color: "#7289DA",
                            fontSize: "1.8rem",
                            fontWeight: "600",
                          }}
                        >
                          <BorderColor />
                        </Icon>
                      </button>
                      <button
                        className="delete-note"
                        onClick={(event) => {
                          setId(note.note_id);
                          handleDelete(note.note_id);
                        }}
                      >
                        <Icon
                          style={{
                            color: "red",
                            fontSize: "1.8rem",
                            fontWeight: "600",
                          }}
                        >
                          <DeleteForever />
                        </Icon>
                      </button>
                    </div>
                  </div>
                )} */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
