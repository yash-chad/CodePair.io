import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import * as Actions from "../store/actions";
import { useDispatch } from "react-redux";
import { VisibilityOff, Visibility } from "@material-ui/icons";
/**
 * @author
 * @function LoginPage
 **/

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(Actions.login(values));
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
      <div className="signup-block login-block">
        <div className="signup-wrapper">
          <div className="signup-title login-title"> Welcome back !</div>
          <div className="signup-form-block">
            <form
              className="signup-form login-form"
              autoComplete="false"
              onSubmit={handleSubmit}
            >
              <Grid container>
                <Grid item xs={12}>
                  <label htmlFor="email">Email*</label>
                  <br />
                  <input
                    type="email"
                    style={{ marginBottom: "10px" }}
                    id="email"
                    required
                    onChange={handleChange("email")}
                  ></input>
                </Grid>

                <Grid item xs={12}>
                  <label htmlFor="password">
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
                    style={{ marginTop: "0" }}
                    required
                    // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                  ></input>{" "}
                </Grid>
                <Grid item xs={12}>
                  <button className="submit-signup" type="submit">
                    Login
                  </button>

                  <a href="/signup">
                    <div className="button-bottom-signup">
                      Create an account?
                    </div>
                  </a>
                  <div style={{ marginTop: "15px" }}></div>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
