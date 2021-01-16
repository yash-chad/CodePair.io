import { React } from "react";
import { Switch } from "react-router-dom";
// import CodeEditor from "./components/codeEditor";
// import Login from "./pages/login";
// import Signup from "./pages/signup";
import Main from "./pages/main";
// import ModalC from "./components/modal";
// import PageNotFound from "./pages/404";
import Dashboard from "./pages/Dashboard";
// import Pusher from "./pages/SyncingEditor/index";
import JoinRoomPage from "./pages/joinRoom";
import AuthRoute from "./components/AuthRouter";
import Storage from "./lib/storage";
import ProtectedRoute from "./components/ProtectedRoute";
import Toast from "./components/Toast";
import LoginPage from "./pages/login_page";
import SignupPage from "./pages/signup_page";
const { config } = Storage();
config();

export default function App(props) {
  return (
    <div className="App">
      <Switch>
        <AuthRoute exact path="/login" component={LoginPage} />
        <AuthRoute exact path="/signup" component={SignupPage} />

        {/* <ProtectedRoute exact path="/pusher" component={Pusher} />
        <ProtectedRoute exact path="/modal" component={ModalC} /> */}
        <ProtectedRoute exact path="/rooms/:room_id" component={Main} />
        {/* <ProtectedRoute exact path="/code" component={CodeEditor} /> */}
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute
          exact
          path="/invitation/:room_id"
          component={JoinRoomPage}
        />

        <ProtectedRoute path="/" component={Dashboard} />
      </Switch>
      <Toast />
    </div>
  );
}
