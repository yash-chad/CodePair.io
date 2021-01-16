import React, { useEffect } from "react";
import { Box, Icon, Tooltip } from "@material-ui/core";
import NewRoomDialog from "./NewRoomDialog";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import history from "../history";

export default function SideNav(props) {
  const dispatch = useDispatch();
  const my_rooms = useSelector((state) => state.room.my_rooms);

  const handleClick = (room_id) => {
    history.push(`/rooms/${room_id}`);
    window.location.reload();
  };

  const redirectDashboard = () => {
    history.push(`/dashboard`);
    window.location.reload();
  };

  useEffect(() => {
    dispatch(Actions.getMyRooms());
  }, [dispatch]);
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className="sidenavbar"
      >
        {/* Logo */}
        <button className="button-nav logo" onClick={() => redirectDashboard()}>
          {/* <Icon></Icon> */}
        </button>
        {/* division */}
        <div className="divider"></div>
        {/* Create room  */}
        <button className="button-nav" id="create">
          <Icon
            style={{
              color: "#43B581",
              fontSize: "2.1rem",
              fontWeight: "600",
            }}
            onClick={() => dispatch(Actions.setDialog(true))}
          >
            +
          </Icon>
        </button>
        {/* Rooms */}

        <div className="rooms">
          {my_rooms.map((item) => {
            return (
              <Tooltip
                key={item.room_id}
                placement="right-start"
                title={item.room_name}
              >
                <button
                  onClick={() => handleClick(item.room_id)}
                  className="button-nav"
                >
                  {item.room_name[0]}
                </button>
              </Tooltip>
            );
          })}
        </div>
      </Box>
      <NewRoomDialog />
    </>
  );
}
