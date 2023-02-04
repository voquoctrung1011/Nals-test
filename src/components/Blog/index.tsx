import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Pagination, Modal, Typography } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";

import {
  DELETING_BLOG,
  FETCH_ALL_BLOG,
  setBlog,
  setModal,
} from "../../store/blog-store/reducer";
import StandardModalLayout from "../../layouts/StandardModal";
import {
  MODAL_TYPE,
  PAGE_LIMIT,
  SORT_BY_TYPE,
  SORT_TYPE,
} from "../../constants";
import Head from "../../layouts/Head";
import Footer from "../../layouts/Footer";
import ExtraActionBlog from "./components/ExtraActionBlog";
import BlogInformation from "./components/BlogInformation";
import { IBlogType, IParam } from "../../interfaces";

const { Content } = Layout;

const Blog = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { blogs } = useSelector(({ blog }: any) => blog.blogReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [amoutOfBlogs, setAmountOfBlogs] = useState(1);

  const params: IParam = search
    ? JSON.parse(
        '{"' +
          decodeURI(search)
            .replace("?", "")
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      )
    : {};
  const [searchValue, setSearchValue] = useState(params?.search || "");
  const [sortValue, setSortValue] = useState(params?.order || SORT_TYPE.DESC);

  const dataSubmit: IParam = {
    page: params?.page || 1,
    limit: params?.limit || PAGE_LIMIT,
    sortBy: params?.sortBy || SORT_BY_TYPE.TITLE,
    search: searchValue,
    order: sortValue,
  };

  //  fetch all blogs to get total page
  const fetchAllBlogs = async () => {
    const newSubmit = _.pick(dataSubmit, ["sortBy", "order"]);
    const data = await FETCH_ALL_BLOG({ ...newSubmit });
    if (data) {
      setAmountOfBlogs(data?.length);
    }
  };

  // fetch blog by page
  const fetchBlogByPage = async ({ ...values }) => {
    const data = await FETCH_ALL_BLOG({ ...values });
    if (data) {
      const query = "?" + new URLSearchParams(values).toString();
      navigate({
        pathname: "/blog",
        search: query,
      });
      dispatch(setBlog(data));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
    fetchBlogByPage(dataSubmit);
  }, []);

  const handleEditBlog = (data: IBlogType) => {
    dispatch(
      setModal({
        data: data,
        open: true,
        type: MODAL_TYPE.UPDATE,
      })
    );
  };

  const showDeleteConfirm = (data: IBlogType) => {
    Modal.confirm({
      title: "Are you sure delete this blog?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteBlog(data);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDeleteBlog = (data: IBlogType) => {
    setIsLoading(true);
    DELETING_BLOG(data?.id).then((res) => {
      if (res === 200) {
        fetchAllBlogs();
        fetchBlogByPage(dataSubmit);
      }
    });
  };

  const handleChangeValue = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const onSearch = async (value: string) => {
    setIsLoading(true);
    setSearchValue(value);
    await fetchBlogByPage({ ...dataSubmit, search: value });
  };

  const handleChangeSort = async (value: string) => {
    setIsLoading(true);
    setSortValue(value);
    await fetchBlogByPage({ ...dataSubmit, order: value });
  };

  const handleChangePage = async (page: number) => {
    setIsLoading(true);
    await fetchBlogByPage({ ...dataSubmit, page: page });
  };

  const handleAddBlog = () => {
    dispatch(
      setModal({
        data: null,
        open: true,
        type: MODAL_TYPE.CREATE,
      })
    );
  };

  return (
    <Layout className="layout">
      <Head />
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        <div className="site-layout-content">
          <Typography.Title level={1}>Blogs</Typography.Title>

          <ExtraActionBlog
            onSearch={onSearch}
            handleChangeValue={handleChangeValue}
            handleChangeSort={handleChangeSort}
            searchValue={searchValue}
            sortValue={sortValue}
            handleAddBlog={handleAddBlog}
          />

          <BlogInformation
            blogs={blogs}
            isLoading={isLoading}
            handleEditBlog={handleEditBlog}
            showDeleteConfirm={showDeleteConfirm}
          />

          {amoutOfBlogs > 1 && (
            <Pagination
              defaultCurrent={params?.page || 1}
              total={amoutOfBlogs}
              onChange={handleChangePage}
            />
          )}
        </div>
      </Content>

      <StandardModalLayout fetchData={fetchBlogByPage} params={dataSubmit} />

      <Footer />
    </Layout>
  );
};

export default Blog;
