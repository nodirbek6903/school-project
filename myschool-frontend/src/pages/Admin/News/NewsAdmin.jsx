import { useState } from "react";
import {
  Button,
  Form,
} from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
import {
  useGetNewsQuery,
} from "../../../features/news/newsApi";
import dayjs from "dayjs";
import NewsTable from "./NewsTable"
import NewsModal from "./NewsModal"

const NewsAdmin = () => {
  const { data: news = [], isLoading } = useGetNewsQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [form] = Form.useForm();


  

  const handleEdit = (record) => {
    setEditingNews(record);
    setIsModalOpen(true);
    form.setFieldsValue({
      title: record.title,
      content: record.content,
      date: dayjs(record.date),
    });
  };

  const handleAdd = () => {
    setEditingNews(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Yangiliklar boshqaruvi</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          {`Yangilik qo'shish`}
        </Button>
      </div>

      <NewsTable
      news={news}
      onEdit={handleEdit}
      isLoading={isLoading}
      />

      <NewsModal
      editingNews={editingNews}
      setEditingNews={setEditingNews}
      form={form}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default NewsAdmin;
