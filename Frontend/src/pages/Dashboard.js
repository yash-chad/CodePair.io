import React, { useEffect } from "react";
import { Grid, Icon } from "@material-ui/core";
import { ViewComfy, Person } from "@material-ui/icons";
import SideNav from "../components/SideNav";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";
import history from "../history";

export default function Dashboard(props) {
  const dispatch = useDispatch();

  const myRooms = useSelector((state) => state.room.my_rooms);
  const preview = useSelector((state) => state.content.preview);
  const user = useSelector((state) => state.user.current_user);

  useEffect(() => {
    dispatch(Actions.getMyRooms);
    dispatch(Actions.getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    myRooms.forEach((element) => {
      dispatch(Actions.getCustomContent(element.room_id));
    });
    preview.reverse();
    //eslint-disable-next-line
  }, [myRooms, dispatch]);

  return (
    <React.Fragment>
      <Grid container>
        <Grid container item xs={2} lg={2} style={{ height: "100%" }}>
          <Grid item xs={3} style={{ height: "100%", overflowY: "auto" }}>
            <SideNav {...props} />
          </Grid>
          <Grid item xs={9}>
            <div className="room-nav">
              <header className="room-nav-header profile-header">
                <Icon
                  style={{
                    color: "#f9a719",
                    fontSize: "2rem",
                    fontWeight: "600",
                  }}
                >
                  <Person />
                </Icon>
                &nbsp; Profile
              </header>
              <div className="room-nav-content ">
                <div className="nav-sec">
                  {/* <div className="notes-divider" /> */}
                  <h1 className="sec-head">
                    <div className="profile-pic"></div>
                    <div className="details">
                      {user.first_name} {user.last_name}
                      <br />
                      <br />
                      {user.email}
                      <br />
                      <br />
                    </div>
                  </h1>
                  <div className="participants"></div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <div className="dashboard">
            <div className="user-rooms-section">
              <h2 className="user-rooms-section-head">
                {" "}
                <Icon
                  style={{
                    color: "#7289DA",
                    fontSize: "2.9rem",
                    fontWeight: "600",
                  }}
                >
                  <ViewComfy />
                </Icon>{" "}
                &nbsp;Your Rooms
              </h2>
              <div className="user-rooms">
                <Grid container style={{ width: "100%", margin: "0px auto" }}>
                  {myRooms.map((room, idx) => {
                    return (
                      <Grid key={idx} item xs={2}>
                        <a href={"/rooms/" + room.room_id}>
                          <h4 className="user-room-name">{room.room_name}</h4>
                          <div className="user-room">
                            {preview[myRooms.length - idx - 1]}
                          </div>
                        </a>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="notes">
            <div className="notes-scrollable">
              <h1 className="notes-heading">
                <button
                  className="logout"
                  onClick={() => {
                    localStorage.setItem("token", "");
                    history.push("/login");
                    window.location.reload();
                  }}
                >
                  logout
                </button>
              </h1>
              <div className="notes-content"></div>
            </div>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
