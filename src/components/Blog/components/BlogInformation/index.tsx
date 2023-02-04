/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Avatar, List, Skeleton } from "antd";

const Blog = ({ handleEditBlog, showDeleteConfirm, isLoading, blogs }: any) => {
  return (
    <List
      className="demo-loadmore-list"
      loading={isLoading}
      itemLayout="horizontal"
      dataSource={blogs}
      renderItem={(item: any) => (
        <List.Item
          actions={[
            <a key="list-loadmore-edit" onClick={() => handleEditBlog(item)}>
              Edit
            </a>,
            <a
              style={{ color: "red" }}
              key="list-loadmore-more"
              onClick={() => showDeleteConfirm(item)}
            >
              Delete
            </a>,
          ]}
        >
          <Skeleton avatar title={false} loading={isLoading} active>
            <List.Item.Meta
              avatar={<Avatar src={item?.image} />}
              title={<a href="">{item.title}</a>}
              description={item?.content}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default Blog;
