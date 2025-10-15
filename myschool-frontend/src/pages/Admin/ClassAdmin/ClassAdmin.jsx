import { useState } from "react";
import {
  useGetClassesQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} from "../../../features/class/classApi";
import { useGetTeachersQuery } from "../../../features/teachers/teachersApi";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
  Select,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ClassAdmin = () => {
  const { data: classes, isLoading } = useGetClassesQuery();
  const { data: teachers = [] } = useGetTeachersQuery(); // 🔹 Barcha o‘qituvchilarni olish

  const [createClass] = useCreateClassMutation();
  const [updateClass] = useUpdateClassMutation();
  const [deleteClass] = useDeleteClassMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [form] = Form.useForm();

  const openModal = (classData = null) => {
    setEditingClass(classData);
    if (classData) {
      form.setFieldsValue({
        ...classData,
        classTeacher: classData.classTeacher?._id || undefined,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingClass(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // 🔹 classTeacher ixtiyoriy, shuning uchun undefined bo‘lsa o‘chiramiz
      if (!values.classTeacher) delete values.classTeacher;

      if (editingClass) {
        await updateClass({ id: editingClass._id, data: values }).unwrap();
        message.success("Sinf yangilandi");
      } else {
        await createClass(values).unwrap();
        message.success("Yangi sinf qo‘shildi");
      }

      handleCancel();
    } catch (err) {
      console.error(err);
      message.error("Xatolik yuz berdi");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClass(id).unwrap();
      message.success("Sinf o‘chirildi");
    } catch (err) {
      console.error(err);
      message.error("O‘chirishda xato");
    }
  };

  const columns = [
    {
      title: "Sinf nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Daraja",
      dataIndex: "gradeLevel",
      key: "gradeLevel",
    },
    {
      title: "Bo‘lim",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Sinf rahbari",
      dataIndex: "classTeacher",
      key: "classTeacher",
      render: (teacher) =>
        teacher ? teacher.firstName + " " + teacher.lastName : "—",
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openModal(record)}>
            Tahrirlash
          </Button>
          <Popconfirm
            title="Haqiqatan ham o‘chirasizmi?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<DeleteOutlined />} danger>
              O‘chirish
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sinf boshqaruvi</h1>

      <Button type="primary" onClick={() => openModal()} className="mb-4">
        + Yangi sinf
      </Button>

      <Table
        loading={isLoading}
        columns={columns}
        dataSource={classes || []}
        rowKey="_id"
      />

      <Modal
        title={editingClass ? "Sinfni tahrirlash" : "Yangi sinf qo‘shish"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Saqlash"
        cancelText="Bekor qilish"
        width={500}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Sinf nomi"
            rules={[{ required: true, message: "Sinf nomi kiritilishi shart!" }]}
          >
            <Input placeholder="Masalan: 5-A" />
          </Form.Item>

          <Form.Item
            name="gradeLevel"
            label="Daraja"
            rules={[{ required: true, message: "Daraja kiritilishi shart!" }]}
          >
            <Input type="number" placeholder="Masalan: 5" />
          </Form.Item>

          <Form.Item name="section" label="Bo‘lim">
            <Input placeholder="Masalan: A" />
          </Form.Item>

          {/* 🔹 Sinf rahbari tanlash (ixtiyoriy) */}
          <Form.Item name="classTeacher" label="Sinf rahbari (ixtiyoriy)">
            <Select
              allowClear
              placeholder="Sinf rahbarini tanlang"
              options={teachers.map((t) => ({
                value: t._id,
                label: `${t.firstName} ${t.lastName}`,
              }))}
              showSearch
              filterOption={(input, option) =>
                option?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            name="startYear"
            label="Boshlanish yili"
            rules={[{ required: true, message: "Yil kiritilishi shart!" }]}
          >
            <Input type="number" placeholder="Masalan: 2024" />
          </Form.Item>

          <Form.Item name="graduationYear" label="Tugatish yili">
            <Input type="number" placeholder="Masalan: 2035" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClassAdmin;
