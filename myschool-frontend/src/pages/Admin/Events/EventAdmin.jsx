import { useState } from "react";
import { Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useGetEventsQuery } from "../../../features/events/eventApi";
import EventTable from "./EventTable";
import EventModal from "./EventModal";

const EventAdmin = () => {
  const { data: events, isLoading } = useGetEventsQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setIsEditingEvent] = useState(null);
  const [form] = Form.useForm();

  const handleOpenModal = (event = null) => {
    setIsEditingEvent(event);
    if (event) {
      form.setFieldValue({
        ...event,
        date: dayjs(event.date),
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsEditingEvent(null);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tadbirlar ro‘yxati</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleOpenModal()}
        >
          Yangi Tadbir
        </Button>
      </div>

      <EventTable
        handleOpenModal={handleOpenModal}
        events={events}
        loading={isLoading}
      />
      <EventModal
        form={form}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingEvent={editingEvent}
        setIsEditingEvent={setIsEditingEvent}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default EventAdmin;
