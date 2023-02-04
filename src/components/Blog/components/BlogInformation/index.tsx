import React from "react";
import { Avatar, List, Skeleton } from "antd";
import { IBlogType } from "../../../../interfaces";

export type IBlogInformationPage = {
  blogs: IBlogType[];
  isLoading: boolean;
  showDeleteConfirm: (values: IBlogType) => void;
  handleEditBlog: (data: IBlogType) => void;
};

const BlogÌnormation = ({
  handleEditBlog,
  showDeleteConfirm,
  isLoading,
  blogs,
}: IBlogInformationPage) => {
  return (
    <List
      className="demo-loadmore-list"
      loading={isLoading}
      itemLayout="horizontal"
      dataSource={blogs}
      renderItem={(item: IBlogType) => (
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

export default BlogÌnormation;
