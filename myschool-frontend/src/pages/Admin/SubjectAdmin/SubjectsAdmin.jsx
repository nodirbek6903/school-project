import { useState } from "react";
import {
  useGetSubjectsQuery,
  useAddSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} from "../../../features/subjects/subjectApi";

import {
  Button,
  Input,
  Table,
  message,
  Modal,
  Form,
  Space,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const SubjectAdmin = () => {
  const [editingSubject, setEditingSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: subjects = [], isLoading } = useGetSubjectsQuery();
  const [addSubject] = useAddSubjectMutation();
  const [updateSubject] = useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();

  const [form] = Form.useForm();

  const handleOpenModal = (subject = null) => {
    setEditingSubject(subject);
    if (subject) {
      form.setFieldsValue({
        name: subject.name,
        description: subject.description,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingSubject) {
        await updateSubject({ id: editingSubject._id, ...values }).unwrap();
        message.success("Fan yangilandi");
      } else {
        await addSubject(values).unwrap();
        message.success("Yangi fan qo‘shildi");
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("Xatolik: fanni saqlab bo‘lmadi!");
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "O‘chirishni tasdiqlang",
      content: "Bu fanni o‘chirmoqchimisiz?",
      okText: "Ha",
      cancelText: "Bekor qilish",
      onOk: async () => {
        await deleteSubject(id);
        message.success("Fan o‘chirildi ✅");
      },
    });
  };

  const columns = [
    { title: "#", render: (_, __, i) => i + 1 },
    { title: "Fan nomi", dataIndex: "name" },
    {
      title: "Izoh",
      dataIndex: "description",
      render: (t) => t || "—",
    },
    {
      title: "Amallar",
      render: (s) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleOpenModal(s)}>
            Tahrirlash
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(s._id)}
          >
            O‘chirish
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fanlar boshqaruvi</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleOpenModal()}
        >
          Yangi fan
        </Button>
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <Table
          dataSource={subjects}
          columns={columns}
          rowKey="_id"
          loading={isLoading}
          pagination={{ pageSize: 8 }}
        />
      </div>

      <Modal
        title={editingSubject ? "Fanni tahrirlash" : "Yangi fan qo‘shish"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <Form.Item
            label="Fan nomi"
            name="name"
            rules={[{ required: true, message: "Fan nomi kiritilishi shart" }]}
          >
            <Input placeholder="Masalan: Matematika" />
          </Form.Item>

          <Form.Item label="Izoh" name="description">
            <Input.TextArea rows={3} placeholder="Fan haqida qisqacha ma'lumot" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingSubject ? "Saqlash" : "Qo‘shish"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubjectAdmin;
