import { useState, useEffect } from "react";
import {
  useAddTimetableMutation,
  useDeleteTimetableMutation,
  useGetTimetablesQuery,
  useUpdateTimetableMutation,
  useLazyGetTimetableByClassQuery,
} from "../../../features/timetable/timetableApi";
import { useGetClassesQuery } from "../../../features/class/classApi";
import { useGetTeachersQuery } from "../../../features/teachers/teachersApi";
import { useGetSubjectsQuery } from "../../../features/subjects/subjectApi";
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  TimePicker,
  Input,
  message,
  Space,
  Tabs,
} from "antd";
import dayjs from "dayjs";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TimetableAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [selectedClass, setSelectedClass] = useState("all");
  const [form] = Form.useForm();

  // 🔹 Query hooks
  const { data: classes = [] } = useGetClassesQuery();
  const { data: teachers = [] } = useGetTeachersQuery();
  const { data: subjects = [] } = useGetSubjectsQuery();
  const { data: allTimetables = [], isLoading } = useGetTimetablesQuery();
  const [getTimetableByClass, { data: classTimetables = [] }] =
    useLazyGetTimetableByClassQuery();

  const [addTimetable] = useAddTimetableMutation();
  const [updateTimetable] = useUpdateTimetableMutation();
  const [deleteTimetable] = useDeleteTimetableMutation();

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // 🔹 Filter jadval class bo‘yicha
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
  if (selectedClass === "all") {
    setFilteredData(allTimetables);
  } else {
    setFilteredData(classTimetables || []);
  }
}, [selectedClass, allTimetables, classTimetables]);


  const handleClassChange = (classId) => {
    setSelectedClass(classId);
    if (classId !== "all") {
      getTimetableByClass(classId);
    }
  };

  const handleOpenModal = (row = null) => {
    setEditingRow(row);
    if (row) {
      form.setFieldsValue({
        class: row.class?._id || row.class,
        day: row.day,
        subject: row.subject?._id || row.subject,
        teacher: row.teacher?._id || row.teacher,
        startTime: dayjs(row.startTime, "HH:mm"),
        endTime: dayjs(row.endTime, "HH:mm"),
        classroom: row.classroom,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    const formData = {
      class: values.class,
      day: values.day,
      subject: values.subject,
      teacher: values.teacher,
      startTime: values.startTime.format("HH:mm"),
      endTime: values.endTime.format("HH:mm"),
      classroom: values.classroom,
    };

    try {
      if (editingRow) {
        await updateTimetable({ id: editingRow._id, formData }).unwrap();
        message.success("Dars jadvali yangilandi");
      } else {
        await addTimetable(formData).unwrap();
        message.success("Yangi dars jadvali qo‘shildi");
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Xatolik: jadvalni saqlab bo‘lmadi!");
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Dars jadvalini o‘chirish",
      content: "Haqiqatdan ham o‘chirmoqchimisiz?",
      okText: "Ha",
      cancelText: "Bekor qilish",
      onOk: async () => {
        await deleteTimetable(id);
        message.success("Jadval o‘chirildi");
      },
    });
  };

  const columns = [
    { title: "#", render: (_, __, i) => i + 1 },
    { title: "Sinf", dataIndex: ["class", "name"] },
    { title: "Kun", dataIndex: "day" },
    {
      title: "Fan",
      render: (t) => t.subject?.name || "-",
    },

    {
      title: "O'qituvchi",
      render: (t) =>
        `${t.teacher?.firstName || ""} ${t.teacher?.lastName || ""}`,
    },
    { title: "Boshlanish", dataIndex: "startTime" },
    { title: "Tugash", dataIndex: "endTime" },
    { title: "Xona", dataIndex: "classroom" },
    {
      title: "Amallar",
      render: (row) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleOpenModal(row)}>
            Tahrirlash
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(row._id)}
          >
            O‘chirish
          </Button>
        </Space>
      ),
    },
  ];

  // 🔹 Haftalik jadvalni kunlar bo‘yicha ajratish
  const groupedByDay = daysOfWeek.map((day) => ({
    key: day,
    label: day,
    children: (
      <Table
        dataSource={filteredData.filter((t) => t.day === day)}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />
    ),
  }));

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-2xl font-bold">Dars jadvali</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleOpenModal()}
        >
          Yangi jadval
        </Button>
      </div>

      {/* 🔹 Sinf tanlash filtri */}
      <div className="bg-white p-4 mb-6 shadow rounded-lg flex items-center gap-4">
        <span className="font-medium">Sinf tanlang:</span>
        <Select
          value={selectedClass}
          onChange={handleClassChange}
          style={{ width: 250 }}
          options={[
            { label: "Barcha sinflar", value: "all" },
            ...classes.map((cls) => ({
              label: cls.name,
              value: cls._id,
            })),
          ]}
        />
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        {isLoading ? (
          <p>Yuklanmoqda...</p>
        ) : (
          <Tabs defaultActiveKey="Monday" items={groupedByDay} />
        )}
      </div>

      <Modal
        title={editingRow ? "Jadvalni tahrirlash" : "Yangi jadval qo‘shish"}
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
          <Form.Item label="Sinf" name="class" rules={[{ required: true }]}>
            <Select
              placeholder="Sinfni tanlang"
              options={classes.map((cls) => ({
                label: cls.name,
                value: cls._id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Kun" name="day" rules={[{ required: true }]}>
            <Select
              placeholder="Hafta kunini tanlang"
              options={daysOfWeek.map((d) => ({ label: d, value: d }))}
            />
          </Form.Item>
          <Form.Item label="Fan" name="subject" rules={[{ required: true }]}>
            <Select
              placeholder="Fan tanlang"
              options={subjects.map((subj) => ({
                label: subj.name,
                value: subj._id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="O‘qituvchi"
            name="teacher"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="O‘qituvchi tanlang"
              options={teachers.map((t) => ({
                label: `${t.firstName} ${t.lastName}`,
                value: t._id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Boshlanish vaqti"
            name="startTime"
            rules={[{ required: true }]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Tugash vaqti"
            name="endTime"
            rules={[{ required: true }]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Xona" name="classroom">
            <Input placeholder="Xona nomi yoki raqami (ixtiyoriy)" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingRow ? "Saqlash" : "Qo‘shish"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TimetableAdmin;
