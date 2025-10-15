import { useMemo, useState } from "react";
import {
  useGetBooksQuery,
  useAddBooksMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from "../../../features/librarys/booksApi";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Space,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const BookAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [search, setSearch] = useState("");
  const [form] = Form.useForm();

  const { data: books = [], isLoading } = useGetBooksQuery();
  const [addBook] = useAddBooksMutation();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  const filterBooks = useMemo(() => {
    return books.filter((book) =>
      book.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [books, search]);

  const handleOpenModal = (book = null) => {
    setEditingBook(book);
    if (book) {
      form.setFieldsValue({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        copies: book.copies,
        availableCopies: book.availableCopies,
        category: book.category,
        publishedyear: book.publishedyear,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingBook) {
        await updateBook({ id: editingBook._id, data:values }).unwrap();
        message.success("Kitob yangilandi!");
      } else {
        await addBook(values).unwrap();
        message.success("Yangi kitob qo‘shildi!");
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Xatolik: kitobni saqlab bo‘lmadi!");
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Kitobni o‘chirish",
      content: "Haqiqatdan ham o‘chirmoqchimisiz?",
      okText: "Ha",
      cancelText: "Bekor qilish",
      onOk: async () => {
        await deleteBook(id);
        message.success("Kitob o‘chirildi!");
      },
    });
  };

  const columns = [
    { title: "#", render: (_, __, i) => i + 1 },
    { title: "Kitob nomi", dataIndex: "title" },
    { title: "Muallif", dataIndex: "author" },
    { title: "Kategoriya", dataIndex: "category" },
    { title: "ISBN", dataIndex: "isbn" },
    { title: "Jami nusxalar", dataIndex: "copies" },
    { title: "Mavjud nusxalar", dataIndex: "availableCopies" },
    { title: "Chop etilgan yil", dataIndex: "publishedyear" },
    {
      title: "Amallar",
      render: (book) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleOpenModal(book)}>
            Tahrirlash
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(book._id)}
          >
            O‘chirish
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-2xl font-bold">Kutubxona — Kitoblar</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleOpenModal()}
        >
          Yangi kitob
        </Button>
      </div>

      <div className="search-box mb-6 flex items-center gap-2">
        <Input
          placeholder="Kitob nomi boyicha qidirish..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          style={{ width: 300 }}
        />
        {search && (
          <span className="text-gray-500">
            Natijalar: {filterBooks.length} ta
          </span>
        )}
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <Table
          dataSource={filterBooks}
          columns={columns}
          rowKey="_id"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Modal
        title={editingBook ? "Kitobni tahrirlash" : "Yangi kitob qo‘shish"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-3"
        >
          <Form.Item
            label="Kitob nomi"
            name="title"
            rules={[{ required: true, message: "Kitob nomini kiriting" }]}
          >
            <Input placeholder="Masalan: Alkimyogar" />
          </Form.Item>

          <Form.Item
            label="Muallif"
            name="author"
            rules={[{ required: true, message: "Muallifni kiriting" }]}
          >
            <Input placeholder="Masalan: Paulo Coelho" />
          </Form.Item>

          <Form.Item label="ISBN" name="isbn">
            <Input placeholder="Masalan: 978-1234567890" />
          </Form.Item>

          <Form.Item label="Kategoriya" name="category">
            <Input placeholder="Masalan: Badiiy adabiyot" />
          </Form.Item>

          <Form.Item label="Chop etilgan yil" name="publishedyear">
            <InputNumber min={1000} max={9999} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Jami nusxalar"
            name="copies"
            rules={[{ required: true, message: "Nusxa sonini kiriting" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Mavjud nusxalar"
            name="availableCopies"
            rules={[
              { required: true, message: "Mavjud nusxalar sonini kiriting" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingBook ? "Saqlash" : "Qo‘shish"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BookAdmin;
