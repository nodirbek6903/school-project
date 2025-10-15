import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";

const StaffAccountModal = ({ modal, onClose, onCreateAccount, onChangePassword }) => {
  const { open, type, staff } = modal;
  const [form] = Form.useForm();

  // Modal yopilganda formani tozalash
  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      title={
        type === "create"
          ? "Akkaunt yaratish"
          : type === "info"
          ? "Login ma'lumotlari"
          : "Parolni o'zgartirish"
      }
      footer={null}
      destroyOnClose
    >
      {type === "create" && (
        <Form
          layout="vertical"
          form={form}
          onFinish={(v) => onCreateAccount(v, staff._id)}
        >
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Parol" name="password" rules={[{ required: true, min: 6 }]}>
            <Input.Password placeholder="Parol" />
          </Form.Item>
          <Button htmlType="submit" type="primary" block>
            Akkaunt yaratish
          </Button>
        </Form>
      )}

      {type === "info" && (
        <div>
          <p><b>F.I.Sh:</b> {staff?.user?.fullName}</p>
          <p><b>Login:</b> {staff?.user?.email}</p>
          <p><b>Roli:</b> {staff?.user?.role}</p>
        </div>
      )}

      {type === "password" && (
        <Form
          layout="vertical"
          form={form}
          onFinish={(v) => onChangePassword(v, staff?.user?._id)}
        >
          <Form.Item name="password" label="Yangi parol" rules={[{ required: true }]}>
            <Input.Password placeholder="Yangi parol" />
          </Form.Item>
          <Button htmlType="submit" type="primary" block>
            Yangilash
          </Button>
        </Form>
      )}
    </Modal>
  );
};

export default StaffAccountModal;
