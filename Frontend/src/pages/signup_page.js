import React, { useState } from "react";
import { Grid, FormHelperText, IconButton } from "@material-ui/core";
import * as Actions from "../store/actions";
import { useDispatch } from "react-redux";
import { VisibilityOff, Visibility } from "@material-ui/icons";
// import { Link } from "react-router-dom";
/**
 * @author
 * @function SignupPage
 **/

const SignupPage = (props) => {
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
    <div className="signup-page">
      <div className="signup-block">
        <div className="signup-wrapper">
          <div className="signup-title">Create an account ?</div>
          <div className="signup-form-block">
            <form
              className="signup-form"
              autoComplete="false"
              onSubmit={handleSubmit}
            >
              <Grid container>
                <Grid item xs={12} md={5}>
                  <label for="first_name">First Name*</label>
                  <input
                    id="first_name"
                    onChange={handleChange("first_name")}
                    required
                  ></input>
                </Grid>
                <Grid item xs={12} md={5}>
                  <label id="last_name_label" for="last_name">
                    Last Name*
                  </label>
                  <input
                    id="last_name"
                    required
                    onChange={handleChange("last_name")}
                  ></input>
                </Grid>
                <Grid item xs={12}>
                  <label for="email">Email*</label>
                  <br />
                  <input
                    type="email"
                    id="email"
                    required
                    onChange={handleChange("email")}
                  ></input>
                </Grid>
                <Grid item xs={12}>
                  <label
                    for="tel"
                    onChange={handleChange("phone")}
                    id="phone"
                  >
                    Contact No. (optional)
                  </label>
                  <input
                    type="tel"
                    id="tel"
                    style={{ marginBottom: "10px" }}
                    onChange={handleChange("phone")}
                  ></input>
                </Grid>
                <Grid item xs={12}>
                  <label for="password" style={{ marginTop: "0" }}>
                    Password*{" "}
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </label>
                  <br />
                  <input
                    id="password"
                    style={{ marginTop: "0", marginBottom: "5px" }}
                    required
                    // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                  ></input>
                  <FormHelperText
                    style={{
                      fontSize: "13px",
                      color: "#ff002fd9",
                      fontStyle: "italic",
                      width: "90%",
                      marginBottom: "20px",
                    }}
                  >
                    **Password should contain 8-12 chars including uppercase,
                    lowercase, number,special char.
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <button className="submit-signup" type="submit">
                    SignUp
                  </button>

                  <a href="/login">
                    <div className="button-bottom-signup">
                      Already have an account?
                    </div>
                  </a>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
