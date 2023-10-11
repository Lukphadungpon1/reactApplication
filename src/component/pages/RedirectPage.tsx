import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/slices/authSlice";

type Props = {};

const RedirectPage = (props: Props) => {
  const authReducer = useSelector(authSelector);

  React.useEffect(() => {
    window.location.replace(
      authReducer.extranalLink === ""
        ? "http://kth-server-02/intranet/"
        : authReducer.extranalLink
    );
  }, []);
  return (
    <div>
      <h3>Redirecting...</h3>
    </div>
  );
};

export default RedirectPage;
