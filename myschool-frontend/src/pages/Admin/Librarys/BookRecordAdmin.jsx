import { useState } from "react"
import {useAddBookRecordMutation,useGetBookRecordsQuery,useUpdateBookRecordMutation} from "../../../features/librarys/bookRecordsApi"
import {useGetBooksQuery} from "../../../features/librarys/booksApi"
import {useGetStudentsQuery} from "../../../features/students/studentApi"
import {Table,Button,Modal,Form,Select,DatePicker,Tag,message} from "antd"
import {PlusOutlined,RollbackOutlined} from "@ant-design/icons"
import dayjs from "dayjs"


const BookRecordAdmin = () => {
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const {data: records = [], isLoading} = useGetBookRecordsQuery()
  const {data: books = []} = useGetBooksQuery()
  const {data: students = []} = useGetStudentsQuery()
  const [addBookRecord] = useAddBookRecordMutation()
  const [updateBookRecord] = useUpdateBookRecordMutation()

  const handleAddRecord = async (values) => {
    try {
      await addBookRecord(values).unwrap()
      message.success("Kitob berildi!")
      form.resetFields()
      setIsModalOpen(false)
    } catch (error) {
      console.error(error)
      message.error("Xatolik:kitob berilmadi!")
    }
  }

  const handleReturnBook = async (record) => {
    Modal.confirm({
      title: "Kitob qaytarildimi?",
      content:`${record?.student?.firstName} ${record?.student?.lastName} tomonidan olingan kitob qaytarildi deb belgilansinmi?`,
      okText:"Ha",
      cancelText:"Yo'q",
      onOk: async () => {
        try {
          await updateBookRecord({
            id:record._id
          }).unwrap()
          message.success("Kitob qaytarilgan deb belgilandi!")
        } catch (error) {
          console.error(error)
          message.error("Xatolik:qaytarilgan deb belgilab bo'lmadi!")
        }
      }
    })
  }

  const columns = [
    { title: "#", render: (_, __, i) => i + 1 },
    {
      title:"O'quvchi",
      render: (record) => `${record?.student?.firstName || ""} ${record?.student?.lastName || ""}`
    },
    {
      title:"Kitob",
      render: (record) => record?.book?.title || ""
    },
    {
      title:"Berilgan sana",
      render:(r) => dayjs(r.issuedDate).format("DD.MM.YYYY")
    },
    {
      title:"Qaytarish muddati",
      render:(r) => dayjs(r.dueDate).format("DD.MM.YYYY")
    },
    {
      title:"Holat",
      render: (r) => r.status === "issued" ? (
        <Tag color="orange">Berilgan</Tag>
      ) : (
        <Tag color="green">Qaytarilgan</Tag>
      )
    },
    {
      title:"Amallar",
      render: (record) => record.status === "issued" && (
        <Button 
        icon={<RollbackOutlined />}
        type="primary"
        onClick={() => handleReturnBook(record)}
        >
          Qaytarilgan deb belgilash
        </Button>
      )
    }
  ]

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kutubxona — Kitob berish</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Yangi yozuv
        </Button>
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <Table
          dataSource={records}
          columns={columns}
          rowKey="_id"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Modal
        title="Yangi kitob berish"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleAddRecord}
          className="space-y-4"
        >
          <Form.Item
            label="O‘quvchi"
            name="student"
            rules={[{ required: true, message: "O‘quvchini tanlang" }]}
          >
            <Select
              showSearch
              placeholder="O‘quvchini tanlang"
              optionFilterProp="children"
            >
              {students?.map((s) => (
                <Select.Option key={s._id} value={s._id}>
                  {s.firstName} {s.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Kitob"
            name="book"
            rules={[{ required: true, message: "Kitobni tanlang" }]}
          >
            <Select showSearch placeholder="Kitobni tanlang">
              {books?.map((b) => (
                <Select.Option key={b._id} value={b._id}>
                  {b.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Qaytarish muddati"
            name="dueDate"
            rules={[{ required: true, message: "Qaytarish muddatini kiriting" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Kitob berish
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default BookRecordAdmin