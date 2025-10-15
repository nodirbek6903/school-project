import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const StaffForm = ({ open, onClose, onSubmit, editingStaff }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => onSubmit(values, editingStaff);

  return (
    <Modal
      title={editingStaff ? "Xodimni tahrirlash" : "Yangi xodim"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={
          editingStaff
            ? {
                firstName: editingStaff?.firstName,
                lastName: editingStaff?.lastName,
                role: editingStaff?.role,
                contact: editingStaff?.contact,
              }
            : {}
        }
      >
        <Form.Item name="firstName" label="Ism" rules={[{ required: true }]}>
          <Input placeholder="Ism" />
        </Form.Item>
        <Form.Item name="lastName" label="Familiya" rules={[{ required: true }]}>
          <Input placeholder="Familiya" />
        </Form.Item>
        <Form.Item name="role" label="Lavozim" rules={[{ required: true }]}>
          <Input placeholder="Lavozim (masalan: administrator)" />
        </Form.Item>
        <Form.Item name="contact" label="Aloqa" rules={[{ required: true }]}>
          <Input placeholder="Telefon raqam" />
        </Form.Item>
        <Form.Item name="photo" label="Rasm" valuePropName="file">
          <Upload beforeUpload={() => false} maxCount={1} listType="picture">
            <Button icon={<UploadOutlined />}>Rasm tanlash</Button>
          </Upload>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          {editingStaff ? "Saqlash" : "Qo'shish"}
        </Button>
      </Form>
    </Modal>
  );
};

export default StaffForm;
