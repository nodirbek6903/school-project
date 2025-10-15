import { Modal, Form, Input, Button } from "antd";

const TeacherAccountModal = ({
  modal,
  onClose,
  onCreateAccount,
  onChangePassword,
}) => {
  const { open, type, teacher } = modal;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        type === "create"
          ? "Akkaunt yaratish"
          : type === "info"
          ? "Login ma'lumotlari"
          : "Parolni o'zgartirish"
      }
      footer={null}
    >
      {type === "create" && (
        <Form layout="vertical" onFinish={(v) => onCreateAccount(v, teacher._id)}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Parol"
            name="password"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password placeholder="Parol" />
          </Form.Item>
          <Button htmlType="submit" type="primary" block>
            Akkaunt yaratish
          </Button>
        </Form>
      )}

      {type === "info" && (
        <div>
          <p><b>Ism:</b> {teacher?.user?.fullName}</p>
          <p><b>Email:</b> {teacher?.user?.email}</p>
          <p><b>Roli:</b> {teacher?.user?.role}</p>
        </div>
      )}

      {type === "password" && (
        <Form
          layout="vertical"
          onFinish={(v) => onChangePassword(v, teacher?.user?._id)}
        >
          <Form.Item
            name="password"
            label="Yangi parol"
            rules={[{ required: true }]}
          >
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

export default TeacherAccountModal;
