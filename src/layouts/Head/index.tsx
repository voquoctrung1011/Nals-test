import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const Head = () => {
  const navigate = useNavigate();

  const onToogleRoute = (e: { key: string }) => {
    navigate(e.key);
  };
  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        onClick={onToogleRoute}
        items={[
          {
            label: "Blog",
            key: "/blog",
          },
        ]}
      />
    </Header>
  );
};

export default Head;
