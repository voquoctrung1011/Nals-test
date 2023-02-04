import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Col,
  Layout,
  Row,
  Image,
  Typography,
  Button,
  Modal,
  Space,
  Spin,
} from "antd";
import {
  DeleteOutlined,
  ExclamationCircleFilled,
  EditOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import _ from "lodash";

import { MODAL_TYPE } from "../../constants";
import { IBlogType } from "../../interfaces";
import {
  FETCH_DETAIL_BLOG,
  DELETING_BLOG,
  setModal,
} from "../../store/blog-store/reducer";
import Head from "../../layouts/Head";
import Footer from "../../layouts/Footer";
import moment from "moment";
import StandardModalLayout from "../../layouts/StandardModal";

const { Content } = Layout;

const BlogDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [detailBlog, setDetailBlog] = useState<IBlogType>();

  const fetchDetailBlog = async (_: any) => {
    const data = await FETCH_DETAIL_BLOG(id);

    if (data) {
      setDetailBlog(data);
      setInitialLoading(false);
    }
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure delete this blog?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteBlog();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDeleteBlog = () => {
    setIsLoading(true);
    DELETING_BLOG(id).then((res) => {
      if (res === 200) {
        setIsLoading(false);
        navigate("/blog");
      }
    });
  };

  const handleEditBlog = () => {
    dispatch(
      setModal({
        data: detailBlog,
        open: true,
        type: MODAL_TYPE.UPDATE,
      })
    );
  };

  useEffect(() => {
    fetchDetailBlog(null);
  }, [id]);

  return (
    <Layout className="layout">
      <Head />
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        <div className="site-layout-content">
          {!initialLoading ? (
            <Row gutter={[32, 32]}>
              <Col sm={24} xl={12} className="detail-blog">
                <Image preview={false} src={detailBlog?.image} width="100%" />
              </Col>
              <Col sm={24} xl={12}>
                <Typography.Title level={1} style={{ color: "#1677ff" }}>
                  {detailBlog?.title}
                </Typography.Title>
                <Typography.Title level={4}>
                  {detailBlog?.content}
                </Typography.Title>
                <Typography.Title level={5} style={{ marginBottom: 20 }}>
                  Date Created:{" "}
                  {moment(detailBlog?.createdAt).format("MM/DD/YYYY")}
                </Typography.Title>
                <Space direction="horizontal">
                  <Button
                    type="primary"
                    ghost
                    size="large"
                    icon={<EditOutlined />}
                    onClick={handleEditBlog}
                  >
                    Edit
                  </Button>
                  <Button
                    size="large"
                    danger
                    icon={<DeleteOutlined />}
                    loading={isLoading}
                    onClick={showDeleteConfirm}
                  >
                    Delete
                  </Button>
                </Space>
              </Col>
            </Row>
          ) : (
            <Spin spinning={initialLoading} />
          )}
        </div>

        <StandardModalLayout fetchData={fetchDetailBlog} params={null} />
      </Content>

      <Footer />
    </Layout>
  );
};

export default BlogDetail;
