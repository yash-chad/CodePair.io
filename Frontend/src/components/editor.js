import React from "react";
import Pusher from "../pages/SyncingEditor/index";
import { useSelector } from "react-redux";
/**
 * @author
 * @function Editor
 **/

const Editor = (props) => {
  const room_name = useSelector((state) => state.room.room_name);
  return (
    <div style={{ background: "#36393F" }}>
      <div className="editor-header">
        <div className="editor-heading">
          <span className="hash"># &nbsp;</span>
          {room_name}
        </div>
      </div>
      <div className="sync-editor">
        <Pusher style={{ height: "100%" }} />
      </div>
    </div>
  );
};

export default Editor;
