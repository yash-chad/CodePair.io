import React, { useEffect, useState } from "react";
import { Icon, Tooltip } from "@material-ui/core";
import { Face } from "@material-ui/icons";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import invite from "../images/invite.jpg";

/**
 * @author
 * @function RoomNav
 **/

const RoomNav = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.current_user);
  const room_id = useSelector((state) => state.room.room_id);
  // const room_name = useSelector((state) => state.room.room_name);

  const participants_central = useSelector((state) => state.room.participants);
  const [participants, set_participants] = useState([]);

  const [copied, set_copied] = useState("Click to Copy Invite Link!");
  const handleCopy = () => {
    set_copied("Copied!");
    const room_id = window.location.pathname.split("/").slice(-1)[0];
    const room_link = `http://localhost:3000/invitation/${room_id}`;
    navigator.clipboard.writeText(room_link);
  };

  useEffect(() => {
    dispatch(Actions.getRoomParticipants(room_id));
    dispatch(Actions.getRoomName(room_id));
    dispatch(Actions.getCurrentUser());
  }, [dispatch, room_id]);

  useEffect(() => {
    set_participants(participants_central);
  }, [participants_central]);

  return (
    <div className="room-nav">
      <header className="room-nav-header">{user.first_name}'s CodePair</header>
      <div className="room-nav-content ">
        <div className="nav-sec">
          <div className="invite">
            <img
              style={{ marginLeft: "7px" }}
              src={invite}
              width="80%"
              alt="invite"
            />
            <div className="invite-text">
              An adventure begins. Let's add some friends!
            </div>
            <Tooltip title={copied}>
              <button className="copy-link" onClick={handleCopy}>
                Invite People
              </button>
            </Tooltip>
          </div>
          <div className="notes-divider" />
          <h1 className="sec-head">Members</h1>
          <div className="participants">
            {participants.map((item) => {
              return (
                <div key={item.user_id} className="sec-content">
                  <Icon
                    style={{
                      color: "#f9a719",
                      fontSize: "1.8rem",
                      fontWeight: "600",
                    }}
                  >
                    <Face fontSize="large" />
                  </Icon>
                  &nbsp; {item.first_name} {item.last_name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomNav;
