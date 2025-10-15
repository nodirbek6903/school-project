import { Button, DatePicker, Form, Input, message, Modal, Upload } from 'antd';
import {
  UploadOutlined,
} from "@ant-design/icons";
import {
  useCreateNewsMutation,
  useUpdateNewsMutation,
} from "../../../features/news/newsApi";



const NewsModal = ({editingNews,setEditingNews,form,isModalOpen,setIsModalOpen}) => {
    const [createNews] = useCreateNewsMutation();
    const [updateNews] = useUpdateNewsMutation();


    // 🆕 Qo‘shish yoki ✏️ tahrirlash
      const handleSaveNews = async (values) => {
        try {
          const formData = new FormData();
          formData.append("title", values.title);
          formData.append("content", values.content);
          formData.append("date", values.date.format("YYYY-MM-DD"));
    
          if (values.image?.file) {
            formData.append("image", values.image.file);
          }
    
          if (editingNews) {
            await updateNews({ id: editingNews._id, data: formData }).unwrap();
            message.success("Yangilik tahrirlandi!");
          } else {
            await createNews(formData).unwrap();
            message.success("Yangilik qo'shildi!");
          }
    
          setIsModalOpen(false);
          setEditingNews(null);
          form?.resetFields();
        } catch (error) {
          console.error(error);
          message.error("Amaliyotda xatolik yuz berdi!");
        }
      };

  return (

    <Modal
        title={
          editingNews ? "Yangilikni tahrirlash" : "Yangi yangilik qo'shish"
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingNews(null);
        }}
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSaveNews}
          className="space-y-4"
        >
          <Form.Item
            label="Sarlavha"
            name="title"
            rules={[{ required: true, message: "Sarlavha kiriting" }]}
          >
            <Input placeholder="Yangilik sarlavhasi" />
          </Form.Item>

          <Form.Item
            label="Tavsif (content)"
            name="content"
            rules={[{ required: true, message: "Yangilik matnini kiriting" }]}
          >
            <Input.TextArea rows={4} placeholder="Yangilik matni..." />
          </Form.Item>

          <Form.Item
            label="Sana"
            name="date"
            rules={[{ required: true, message: "Sana tanlang" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Rasm" name="image">
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Rasm yuklash</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            {editingNews ? "Yangilash" : "Saqlash"}
          </Button>
        </Form>
      </Modal>
  )
}

export default NewsModal