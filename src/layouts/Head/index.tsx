import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const Head = () => {
  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={new Array(1).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `Home`,
          };
        })}
      />
    </Header>
  );
};

export default Head;
