import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import _ from "lodash";

import { getLocalStorage } from "../utils/storage";
import routes from "../layouts/StandardConfigLayout/routerConfig";
import { IRoute } from "../interfaces";

const { Content } = Layout;
const App = () => {
  const [currentRoutes, setCurrentRoutes] = useState<IRoute[]>([]);
  const accessToken = getLocalStorage("access_token");

  useEffect(() => {
    let currentRoutes = [];
    if (!accessToken) {
      currentRoutes = routes.filter(
        (route) => route.auth.length === 0 || route.auth.includes("guest")
      );
    } else {
      routes.forEach((route) => {
        const roles = route.auth;
        let intersection = _.intersection(roles, ["user"]);
        if (intersection.length > 0) {
          currentRoutes.push(route);
        }
      });
    }
    setCurrentRoutes(currentRoutes);
  }, [accessToken]);

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Routes>
        {currentRoutes?.map((c: IRoute) => {
          return (
            <Route
              key={c?.path}
              path={c?.path}
              element={
                <>
                  <Content>
                    <c.component />
                  </Content>
                </>
              }
            />
          );
        })}
      </Routes>
    </Layout>
  );
};

export default App;
