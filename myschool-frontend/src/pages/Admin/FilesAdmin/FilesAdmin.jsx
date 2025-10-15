import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Popconfirm,
} from "antd";
import { UploadOutlined, PlusOutlined, DeleteOutlined, FileTextOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  useGetFilesQuery,
  useAddFilesMutation,
  useDeleteFileMutation,
} from "../../../features/files/filesApi";

const { Option } = Select;

const FilesAdmin = () => {
  const { data: files, isLoading } = useGetFilesQuery();
  const [addFile] = useAddFilesMutation();
  const [deleteFile] = useDeleteFileMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);

  const handleAddFile = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      if (key !== "file") formData.append(key, val);
    });
    formData.append("file", values.file[0].originFileObj);

    try {
      setUploading(true);
      await addFile(formData).unwrap();
      message.success("Fayl muvaffaqiyatli yuklandi!");
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Fayl yuklashda xatolik yuz berdi!");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFile(id).unwrap();
      message.success("Fayl o‘chirildi!");
    } catch (error) {
      message.error("O‘chirishda xatolik!");
    }
  };

  const columns = [
    { title: "#", render: (_, __, i) => i + 1 },
    { title: "Sarlavha", dataIndex: "title" },
    { title: "Tavsif", dataIndex: "description" },
    { title: "Kategoriya", dataIndex: "category" },
    {
      title: "Fayl nomi",
      dataIndex: "file",
      render: (file) => (
        <a
          href={`${import.meta.env.VITE_FILE_URL}/uploads/files/${file}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileTextOutlined /> {file}
        </a>
      ),
    },
    {
      title: "Hajmi (KB)",
      dataIndex: "fileSize",
      render: (size) => (size ? (size / (1024)).toFixed(2) : "—"),
    },
    {
      title: "Yuklangan sana",
      dataIndex: "uploadedDate",
      render: (text) => dayjs(text).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Amallar",
      render: (record) => (
        <Popconfirm
          title="Faylni o‘chirishni xohlaysizmi?"
          onConfirm={() => handleDelete(record._id)}
          okText="Ha"
          cancelText="Yo‘q"
        >
          <Button danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold"> Yuklangan fayllar</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Yangi fayl
        </Button>
      </div>

      <Table
        dataSource={files || []}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{ pageSize: 6 }}
      />

      <Modal
        title="Yangi fayl yuklash"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Yuklash"
        cancelText="Bekor qilish"
        confirmLoading={uploading}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleAddFile}
        >
          <Form.Item
            label="Sarlavha"
            name="title"
            rules={[{ required: true, message: "Sarlavha kiriting!" }]}
          >
            <Input placeholder="Masalan: 2-chorak hisobot fayli" />
          </Form.Item>

          <Form.Item label="Tavsif" name="description">
            <Input.TextArea rows={3} placeholder="Fayl haqida qisqacha" />
          </Form.Item>

          <Form.Item
            label="Kategoriya"
            name="category"
            initialValue="boshqa"
          >
            <Select>
              <Option value="dastur">Dastur</Option>
              <Option value="jadval">Jadval</Option>
              <Option value="hisobot">Hisobot</Option>
              <Option value="hujjat">Hujjat</Option>
              <Option value="boshqa">Boshqa</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Fayl"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
            rules={[{ required: true, message: "Fayl yuklang!" }]}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Fayl tanlash</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FilesAdmin;
