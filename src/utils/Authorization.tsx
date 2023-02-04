import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getLocalStorage } from "./storage";

const Authorization = (props?: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const accessToken = getLocalStorage("access_token");

  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/login");
  //   } else {
  //     if (pathname === "/login") {
  //       navigate("/");
  //     } else {
  //       navigate(pathname);
  //     }
  //   }
  // }, [accessToken, pathname]);

  return props.children;
};

export default Authorization;
