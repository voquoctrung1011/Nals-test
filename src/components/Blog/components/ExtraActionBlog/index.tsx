import React from "react";
import { Select, Input, Button, Typography } from "antd";

import { SORT_TYPE } from "../../../../constants";

export type IExtraActionBlogPage = {
  searchValue: string;
  sortValue: string;
  onSearch: (values: string) => void;
  handleChangeValue: (e: { target: { value: string } }) => void;
  handleChangeSort: (values: string) => void;
  handleAddBlog: () => void;
};

const options = [
  {
    value: SORT_TYPE.DESC,
    label: SORT_TYPE.DESC.toUpperCase(),
  },
  {
    value: SORT_TYPE.ASC,
    label: SORT_TYPE.ASC.toUpperCase(),
  },
];

const ExtraActionBlog = ({
  searchValue,
  sortValue,
  onSearch,
  handleChangeValue,
  handleChangeSort,
  handleAddBlog,
}: IExtraActionBlogPage) => {
  return (
    <>
      <div className="space-action">
        <Input.Search
          value={searchValue}
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="middle"
          onSearch={onSearch}
          onChange={handleChangeValue}
        />
        <Select
          value={sortValue}
          style={{ width: "100%" }}
          placeholder="Sort"
          onChange={handleChangeSort}
          options={options}
        />
      </div>
      <div className="btn_add">
        <Typography.Title level={3}>List of Blogs</Typography.Title>

        <Button type="primary" onClick={handleAddBlog}>
          Add blog
        </Button>
      </div>
    </>
  );
};

export default ExtraActionBlog;
