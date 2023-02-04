import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  Form,
  Space,
  notification,
  Upload,
  Image,
  UploadProps,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  CREATING_BLOG,
  setModal,
  UPDATING_BLOG,
} from "../../store/blog-store/reducer";
import { MODAL_TYPE } from "../../constants";
import { UploadOutlined } from "@ant-design/icons";
import { IBlogType } from "../../interfaces";

export type IBStandardModalLayout = {
  params?: any;
  fetchData?: any;
};

const StandardModalLayout = ({ fetchData, params }: IBStandardModalLayout) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { modalVisible } = useSelector(({ blog }: any) => blog.blogReducer);
  const [fileList, setFileList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values: IBlogType) => {
    try {
      setIsLoading(true);
      const type = modalVisible?.type;
      const id = modalVisible?.data?.id;

      const dataSubmit = {
        ...modalVisible?.data,
        ...values,
        image: fileList[0]?.url,
      };

      if (type === MODAL_TYPE.CREATE) {
        CREATING_BLOG(dataSubmit).then((data) => {
          if (data) {
            setIsLoading(false);
            fetchData(params);
            notification.success({
              placement: "bottomRight",
              message: "Update Successful!",
              description: "The blog has been created successfully.",
            });
            onClose();
          }
        });
      } else {
        UPDATING_BLOG(id, dataSubmit).then((data) => {
          if (data) {
            setIsLoading(false);
            fetchData(params);
            notification.success({
              placement: "bottomRight",
              message: "Update Successful!",
              description: "The blog has been updated successfully.",
            });
            onClose();
          }
        });
      }
    } catch (err) {
      notification.error({
        placement: "bottomRight",
        message: "Failed!",
        description: "The blog has been updated failed",
      });
    }
  };

  const onClose = () => {
    dispatch(
      setModal({
        data: null,
        open: false,
        type: null,
      })
    );
  };

  const props: UploadProps = {
    name: "file",
    maxCount: 1,
    className: "upload-list-inline",
    listType: "picture",
    showUploadList: false,
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const blob = new Blob([reader.result || ""], { type: file.type });
        const url = URL.createObjectURL(blob);
        setFileList([
          {
            uid: "2",
            name: file.name,
            status: "done",
            file,
            url,
          },
        ]);
      };
    },
  };

  useEffect(() => {
    if (modalVisible) {
      if (modalVisible?.data?.image) {
        const file = modalVisible?.data?.image;
        setFileList([
          {
            uid: "2",
            name: modalVisible?.data?.title,
            status: "done",
            file,
            url: modalVisible?.data?.image,
          },
        ]);
      }
      form.setFields([
        {
          name: "title",
          value: modalVisible?.data?.title,
        },
        {
          name: "content",
          value: modalVisible?.data?.content,
        },
      ]);
    }
  }, [modalVisible]);

  return (
    <Modal
      title="Blogs"
      className="antd_modal"
      visible={modalVisible?.open}
      footer={null}
      onCancel={onClose}
    >
      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        labelAlign="left"
        scrollToFirstError
        autoComplete="on"
      >
        <Form.Item
          name="title"
          label={<label className="custom-label">Title</label>}
          rules={[{ required: true }]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          name="content"
          label={<label className="custom-label">Content</label>}
          rules={[{ required: true }]}
        >
          <Input placeholder="Content" />
        </Form.Item>

        <Form.Item label="Image">
          <Upload {...props} onRemove={() => setFileList([])}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          <div>
            {fileList.length > 0 ? (
              fileList.map((l: { url: string | undefined }, index: number) => (
                <div
                  key={index}
                  style={{
                    marginTop: "10px",
                    display: "flex",
                  }}
                >
                  <Image
                    preview={false}
                    src={l.url}
                    alt="image"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                    }}
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </Form.Item>

        <Space
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Form.Item className="mg-0">
            <Button type="default" onClick={() => onClose()}>
              Cancel
            </Button>
          </Form.Item>
          <Form.Item className="mg-0">
            <Button htmlType="submit" type="primary" loading={isLoading}>
              {modalVisible?.type === MODAL_TYPE.CREATE ? "Create" : "Update"}
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default StandardModalLayout;
