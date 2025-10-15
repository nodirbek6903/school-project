import {
  useCreateEventsMutation,
  useUpdateEventsMutation,
} from "../../../features/events/eventApi";
import { DatePicker, Form, Input, message, Modal, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EventModal = ({
  form,
  editingEvent,
  isModalOpen,
  setIsModalOpen,
  setIsEditingEvent,
  handleCloseModal,
}) => {
  const [createEvent] = useCreateEventsMutation();
  const [updateEvent] = useUpdateEventsMutation();

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key !== "images") {
          formData.append(key, values[key]);
        }
      });
      if (values.images) {
        values.images.fileList.forEach((file) => {
          formData.append("images", file.originFileObj);
        });
      }

      if (editingEvent) {
        await updateEvent({ id: editingEvent._id, data: formData }).unwrap();
        message.success("Tadbir yangilandi!");
      } else {
        await createEvent(formData).unwrap();
        message.success("Yangi tadbir qo'shildi!");
      }

      handleCloseModal();
    } catch (error) {
      message.error("Xatolik yuz berdi!");
    }
  };

  return (
    <Modal
      title={editingEvent ? "Tadbirni tahrirlash" : "Yangi tadbir qo'shish"}
      open={isModalOpen}
      onCancel={handleCloseModal}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="Tadbir nomi"
          rules={[{ required: true, message: "Nom kiriting!" }]}
        >
          <Input placeholder="Tadbir nomini kiriting" />
        </Form.Item>

        <Form.Item name="description" label="Tavsif">
          <Input.TextArea rows={3} placeholder="Tadbir tavsifi..." />
        </Form.Item>

        <Form.Item
          name="location"
          label="Manzil"
          rules={[{ required: true, message: "Manzil kiriting!" }]}
        >
          <Input placeholder="Tadbir manzili" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Sana"
          rules={[{ required: true, message: "Sana tanlang!" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item name="images" label="Rasmlar">
          <Upload multiple beforeUpload={() => false} listType="picture">
            <Button icon={<UploadOutlined />}>Rasm yuklash</Button>
          </Upload>
        </Form.Item>

        <div className="flex justify-end">
          <Button onClick={handleCloseModal} className="mr-2">
            Bekor qilish
          </Button>
          <Button type="primary" htmlType="submit">
            Saqlash
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EventModal;
