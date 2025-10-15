import { useState } from "react";
import {
  useGetStudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} from "../../../features/students/studentApi";
import { useGetClassesQuery } from "../../../features/class/classApi";
import {
  Button,
  Input,
  Upload,
  Table,
  message,
  Modal,
  Form,
  DatePicker,
  Image,
  Space,
  Select,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const StudentAdmin = () => {
  const [editingStudent, setEditingStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: students = [], isLoading } = useGetStudentsQuery();
  const { data: classes = [] } = useGetClassesQuery();

  const [addStudent] = useAddStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();

  const [form] = Form.useForm();

  const handleOpenModal = (student = null) => {
    setEditingStudent(student);
    if (student) {
      form.setFieldsValue({
        firstName: student.firstName,
        lastName: student.lastName,
        birthday: student.birthday ? dayjs(student.birthday) : null,
        classId: student.class?._id || student.class,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };


  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("birthday", values.birthday.format("YYYY-MM-DD"));
    formData.append("classId", values.classId);

    if (values.photo && values.photo.file) {
      formData.append("photo", values.photo.file);
    }

    try {
      if (editingStudent) {
        await updateStudent({ id: editingStudent._id, formData }).unwrap();
        message.success("O‘quvchi yangilandi");
      } else {
        await addStudent(formData).unwrap();
        message.success("Yangi o‘quvchi qo‘shildi ");
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("Xatolik: o‘quvchini saqlab bo‘lmadi!");
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "O‘chirishni tasdiqlang",
      content: "Haqiqatan ham bu o‘quvchini o‘chirmoqchimisiz?",
      okText: "Ha, o‘chir",
      cancelText: "Bekor qilish",
      onOk: async () => {
        await deleteStudent(id);
        message.success("O‘quvchi o‘chirildi ✅");
      },
    });
  };

  const columns = [
    { title: "#", render: (_, __, i) => i + 1 },
    { title: "Ism", dataIndex: "firstName" },
    { title: "Familiya", dataIndex: "lastName" },
    {
      title: "Tug‘ilgan sana",
      dataIndex: "birthday",
      render: (b) => (b ? dayjs(b).format("DD.MM.YYYY") : "—"),
    },
    {
      title: "Sinf",
      render: (s) => s.class?.name || s.classId,
    },
    {
      title: "Rasm",
      render: (s) =>
        s.photo ? (
          <Image
            src={`${import.meta.env.VITE_FILE_URL}/uploads/${s.photo}`}
            alt={s.firstName}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
        ) : (
          "—"
        ),
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
        <h1 className="text-2xl font-bold">O‘quvchilar boshqaruvi</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleOpenModal()}
        >
          Yangi o‘quvchi
        </Button>
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <Table
          dataSource={[...students].reverse()}
          columns={columns}
          rowKey="_id"
          loading={isLoading}
          pagination={{ pageSize: 8 }}
        />
      </div>

      <Modal
        title={
          editingStudent
            ? "O‘quvchini tahrirlash"
            : "Yangi o‘quvchi qo‘shish"
        }
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
            label="Ism"
            name="firstName"
            rules={[{ required: true, message: "Ism kiritilishi shart" }]}
          >
            <Input placeholder="Ism kiriting" />
          </Form.Item>

          <Form.Item
            label="Familiya"
            name="lastName"
            rules={[{ required: true, message: "Familiya kiritilishi shart" }]}
          >
            <Input placeholder="Familiya kiriting" />
          </Form.Item>

          <Form.Item
            label="Tug‘ilgan sana"
            name="birthday"
            rules={[{ required: true, message: "Sana kiritilishi shart" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          {/* 🔹 Class tanlash Select orqali */}
          <Form.Item
            label="Sinf"
            name="classId"
            rules={[{ required: true, message: "Sinf tanlanishi shart" }]}
          >
            <Select
              placeholder="Sinf tanlang"
              options={classes?.map((c) => ({
                label: c.name,
                value: c._id,
              }))}
            />
          </Form.Item>

          <Form.Item label="Rasm" name="photo" valuePropName="file">
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Rasm tanlash</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingStudent ? "Saqlash" : "Qo‘shish"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentAdmin;
