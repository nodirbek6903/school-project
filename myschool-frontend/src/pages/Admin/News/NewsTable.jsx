import { Button, Popconfirm, Table,Image, message } from "antd"
import dayjs from "dayjs";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {useDeleteNewsMutation} from "../../../features/news/newsApi"

const NewsTable = ({news,isLoading,onEdit}) => {
  const [deleteNews] = useDeleteNewsMutation();


  const handleDelete = async (id) => {
    try {
      await deleteNews(id).unwrap();
      message.success("Yangilik o'chirildi!");
    } catch (error) {
      console.error(error);
      message.error("Yangilikni o'chirishda xatolik yuz berdi!");
    }
  };

    const columns = [
    { title: "#", render: (_, __, i) => i + 1 },
    { title: "Sarlavha", dataIndex: "title" },
    {
      title: "Rasm",
      render: (record) =>
        record.image ? (
          <Image
            src={`${import.meta.env.VITE_FILE_URL}/uploads/${record.image}`}
            alt="news"
            width={80}
            height={60}
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
        ) : (
          "—"
        ),
    },
    {
      title: "Sana",
      render: (r) => dayjs(r.date).format("DD.MM.YYYY"),
    },
    {
      title: "Amallar",
      render: (record) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            type="default"
          >
            Tahrirlash
          </Button>

          <Popconfirm
            title="Yangilikni o'chirishni hohlaysizmi?"
            onConfirm={() => handleDelete(record._id)}
            okText="Ha"
            cancelText="Yo'q"
          >
            <Button danger icon={<DeleteOutlined />}>
              {`O'chirish`}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
    <Table
            dataSource={news}
            columns={columns}
            rowKey="_id"
            loading={isLoading}
            pagination={{ pageSize: 8 }}
            className="bg-white shadow rounded-lg"
          />
    </>
  )
}

export default NewsTable