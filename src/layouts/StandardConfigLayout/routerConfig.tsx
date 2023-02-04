import { Navigate } from "react-router-dom";
import Utils from "../../utils/Utils";
import PagesConfigs from "../../pages/PagesConfigs";

const routeConfigs = [...PagesConfigs];

const routes = [
  ...Utils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    component: () => <Navigate to={{ pathname: "/blog" }} />,
    auth: ["guest", "user"],
  },
];

export default routes;
