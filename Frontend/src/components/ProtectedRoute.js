import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute(props) {
  const Component = props.component;
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return isAuthenticated ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
}
