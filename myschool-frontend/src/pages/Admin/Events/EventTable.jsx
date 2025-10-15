import { Button, message, Modal, Popconfirm, Table, Image, Tag } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, DeleteOutlined, EditOutlined, PictureOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { useDeleteEventsMutation } from "../../../features/events/eventApi";

const EventTable = ({ events, loading, handleOpenModal }) => {
  const [deleteEvent] = useDeleteEventsMutation();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id).unwrap();
      message.success("Tadbir o'chirildi!");
    } catch (error) {
      message.error("O'chirishda xatolik yuz berdi!");
    }
  };

  const handleShowImages = (images) => {
    if (!images || images.length === 0) {
      message.info("Bu tadbir uchun rasm mavjud emas.");
      return;
    }
    setSelectedImages(images);
    setIsImageModalOpen(true);
  };

  const renderStatus = (status) => {
    switch (status) {
      case "upcoming":
        return (
          <Tag
            icon={<ClockCircleOutlined />}
            color="gold"
            style={{
              padding: "5px 10px",
              borderRadius: "8px",
              fontWeight: "500",
            }}
          >
            Kutilmoqda
          </Tag>
        );
      case "completed":
        return (
          <Tag
            icon={<CheckCircleOutlined />}
            color="green"
            style={{
              padding: "5px 10px",
              borderRadius: "8px",
              fontWeight: "500",
            }}
          >
            Tugallangan
          </Tag>
        );
    }
  };

  const columns = [
    { title: "#", render: (_, __, i) => i + 1 },
    { title: "Nomi", dataIndex: "title" },
    {
      title: "Rasmlar",
      dataIndex: "images",
      render: (images) =>
        images && images.length > 0 ? (
          <Button
            icon={<PictureOutlined />}
            onClick={() => handleShowImages(images)}
            size="small"
          >
            {`Ko‘rish (${images.length})`}
          </Button>
        ) : (
          "—"
        ),
    },
    { title: "Tavsif", dataIndex: "description", ellipsis: true },
    { title: "Lokatsiya", dataIndex: "location" },
    {
      title: "Sana",
      dataIndex: "date",
      render: (text) => dayjs(text).format("DD.MM.YYYY"),
    },
    {
      title: "Holati",
      dataIndex: "status",
      render: (status) => renderStatus(status),
    },
    {
      title: "Amallar",
      render: (record) => (
        <div className="flex gap-2">
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleOpenModal(record)}
           />
          <Popconfirm
            title="Tadbirni o'chirishni hohlaysizmi?"
            onConfirm={() => handleDelete(record._id)}
            okText="Ha"
            cancelText="Yo'q"
          >
            <Button danger icon={<DeleteOutlined />} />

          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={events || []}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="bg-white shadow rounded-lg"
      />

      <Modal
        title="Tadbir rasmlari"
        open={isImageModalOpen}
        onCancel={() => setIsImageModalOpen(false)}
        footer={null}
        width={800}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          {selectedImages.map((img, index) => (
            <Image
              key={index}
              src={`${import.meta.env.VITE_FILE_URL}/uploads/${img}`}
              alt={`event-img-${index}`}
              width={200}
              height={150}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default EventTable;
