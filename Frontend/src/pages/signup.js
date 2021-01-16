import React, { useState } from "react";
import {
  Grid,
  Button,
  InputLabel,
  IconButton,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import * as Actions from "../store/actions";
import { useDispatch } from "react-redux";
import { VisibilityOff, Visibility } from "@material-ui/icons";

const Signup = (props) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
    first_name: "",
    last_name: "",
    phone: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(Actions.signup(values, props.history));
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        md={6}
        style={{
          background:
            "linear-gradient(125deg, rgba(53,69,111,1) 0%, rgba(26,38,74,1) 43%, rgba(10,18,39,1) 77%, rgba(8,14,31,1) 100%)",
        }}
      >
        <h1 style={{ fontSize: "4.5em", margin: " 10%" }}>
          <div style={{ color: "rgb(75 94 144 / 70%)" }}>Blockchain</div>
          <div style={{ color: "white" }}>Revolution</div>
          <div style={{ color: "white" }}>In Advertising</div>
          <div style={{ fontSize: "0.3em", color: "#55A8FD", marginTop: "5%" }}>
            In Advertising, &nbsp; In Advertising, &nbsp; In Advertising
          </div>
        </h1>
      </Grid>
      <Grid
        container
        item
        direction="column"
        className="form"
        // justify="space-between"
        // alignItems="center"
        xs={12}
        md={6}
      >
        <div></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "5%",
          }}
        >
          <Grid container className="greet">
            <div>
              <h2 style={{ fontSize: "2em" }}>Hello!</h2>
              <span style={{ color: "rgba(0, 0, 0, 0.54)" }}>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s.
              </span>
            </div>
          </Grid>
          <form autoComplete="false" onSubmit={handleSubmit}>
            <InputLabel
              style={{ marginBottom: "15px" }}
              className="label"
              htmlFor="email"
            >
              Email Address*
            </InputLabel>
            <TextField
              type="email"
              required
              id="email"
              className="input"
              onChange={handleChange("email")}
            />
            <Grid container>
              <Grid item>
                <InputLabel
                  style={{ marginBottom: "15px" }}
                  className="label"
                  htmlFor="first_name"
                >
                  First Name*
                </InputLabel>
                <TextField
                  required
                  id="first_name"
                  //   className="input"
                  onChange={handleChange("first_name")}
                />
              </Grid>
              <Grid item>
                <InputLabel
                  style={{ marginBottom: "15px" }}
                  className="label"
                  htmlFor="last_name"
                >
                  Last Name*
                </InputLabel>
                <TextField
                  required
                  id="last_name"
                  //   className="input"
                  onChange={handleChange("last_name")}
                />
              </Grid>
            </Grid>
            <InputLabel
              style={{ marginBottom: "15px" }}
              className="label"
              htmlFor="phone"
            >
              Contact No (optional)
            </InputLabel>
            <TextField
              type="tel"
              inputProps={
                {
                  // pattern: "[2-9]{2}d{8}",
                }
              }
              id="phone"
              className="input"
              onChange={handleChange("phone")}
            />
            <InputLabel className="label" htmlFor="filled-adornment-password">
              Password*{" "}
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputLabel>
            <TextField
              required
              className="input"
              // error
              // inputProps={
              //   {
              //     // pattern:
              //     //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$",
              //     // helperText:
              //     //   "8-12 chars with at least 1 uppercase,lowercase,number,special char :!@#$%^&*_=+-",
              //   }
              // }
              id="filled-adornment-password"
              style={{ marginBottom: "4px" }}
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
            />
            <FormHelperText style={{ fontSize: "13px", width: "65%" }}>
              Password should contain 8-12 chars including uppercase, lowercase,
              {/* <br /> */}
              number,special char.
            </FormHelperText>

            <div style={{ height: 20 }} />
            <Button
              className="button"
              type="submit"
              style={{
                background: "#55A8FD",
                color: "white",
                borderRadius: "2px",
                padding: "10px 50px",
                textTransform: "none",
                marginTop: "25px",
                fontSize: "18px",
              }}
              variant="contained"
            >
              Sign Up
            </Button>
          </form>
          <div />
          <div style={{ marginTop: "30px" }}>
            Have an account? &nbsp;
            <a
              style={{
                color: "#55A8FD",
                textDecoration: "none",
                fontStyle: "none",
              }}
              href="/login"
            >
              Sign In
            </a>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Signup;
