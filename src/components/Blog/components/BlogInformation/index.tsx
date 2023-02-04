import React from "react";
import { Image, List, Skeleton, Typography } from "antd";

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
              avatar={
                <Image
                  preview={false}
                  src={item?.image}
                  width={100}
                  height={80}
                  alt={item?.title}
                />
              }
              title={
                <Typography.Paragraph
                  ellipsis={{ rows: 1 }}
                  style={{ margin: 0 }}
                >
                  <a href={`/blog/${item?.id}`}>{item.title}</a>
                </Typography.Paragraph>
              }
              description={
                <Typography.Paragraph ellipsis={{ rows: 2 }}>
                  {item?.content}
                </Typography.Paragraph>
              }
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default BlogÌnormation;
