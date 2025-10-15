import { Modal, Form, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useGetSubjectsQuery } from "../../../features/subjects/subjectApi";

const TeacherForm = ({ open, onClose, onSubmit, editingTeacher }) => {
  const { data: subjects = [] } = useGetSubjectsQuery();
  const [form] = Form.useForm();

  const handleFinish = (values) => onSubmit(values, editingTeacher);

  return (
    <Modal
      title={editingTeacher ? "O'qituvchini tahrirlash" : "Yangi o'qituvchi"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={
          editingTeacher
            ? {
                firstName: editingTeacher?.firstName,
                lastName: editingTeacher?.lastName,
                subjects: editingTeacher?.subjects?.map((s) => s._id),
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
        <Form.Item name="subjects" label="Fanlar" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            placeholder="Fanlarni tanlang"
            options={subjects.map((s) => ({ label: s.name, value: s._id }))}
          />
        </Form.Item>
        <Form.Item name="photo" label="Rasm" valuePropName="file">
          <Upload beforeUpload={() => false} maxCount={1} listType="picture">
            <Button icon={<UploadOutlined />}>Rasm tanlash</Button>
          </Upload>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          {editingTeacher ? "Saqlash" : "Qo'shish"}
        </Button>
      </Form>
    </Modal>
  );
};

export default TeacherForm;
