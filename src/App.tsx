import React from "react";
import { Provider } from "react-redux";
import "antd/dist/antd.css";

import "./styles/styles.scss";
import Main from "./pages";
import store from "./store";
import Authorization from "./utils/Authorization";

const App = () => {
  return (
    <Provider store={store}>
      <Authorization>
        <Main />
      </Authorization>
    </Provider>
  );
};

export default App;
