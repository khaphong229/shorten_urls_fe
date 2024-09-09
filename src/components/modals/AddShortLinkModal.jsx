import React, { useState } from "react";
import { Modal, Form, Input, notification } from "antd";
import { createLink } from "../../services/shorten";

function AddShortLinkModal() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  function showNotification(type, mess, des) {
    return notification[type]({
      message: mess,
      description: des,
      duration: 2,
      placement: "top",
    });
  }
  const onCreate = async (values) => {
    const { original_link, alias } = values;
    const data = {
      original_url: original_link,
      alias: alias,
    };
    try {
      const res = await createLink(data);
      if (res.data.success) {
        showNotification("success", "Thành công", res.data.message);
      } else {
        showNotification("warning", "Thất bại", res.data.message);
      }
    } catch (error) {
      showNotification("error", "Lỗi", "Lỗi trong quá trình rút gọn");
    }
  };

  return (
    <>
      <Modal
        open={open}
        title="Tạo liên kết nhanh"
        okText="Tạo"
        cancelText="Hủy"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="original_link"
          label="Liên kết gốc"
          rules={[{ required: true, message: "Vui lòng nhập link" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="alias"
          label="Alias (Tùy chọn)"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
}

export default AddShortLinkModal;
