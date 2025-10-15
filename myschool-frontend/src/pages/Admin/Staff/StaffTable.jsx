import { Table, Button, Space, Image, Dropdown } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const StaffTable = ({ staffs, isLoading, onEdit, onDelete, onAccountClick }) => {
  const getAccountMenu = (staff) => ({
    items: [
      {
        key: "info",
        label: "Login ma'lumotlari",
        onClick: () => onAccountClick({ open: true, type: "info", staff }),
      },
      {
        key: "password",
        label: "Parolni o'zgartirish",
        onClick: () => onAccountClick({ open: true, type: "password", staff }),
      },
    ],
  });

  const columns = [
    { title: "#", render: (_, __, i) => i + 1 },
    { title: "Ism", dataIndex: "firstName" },
    { title: "Familiya", dataIndex: "lastName" },
    { title: "Lavozimi", dataIndex: "role" },
    { title: "Aloqa", dataIndex: "contact" },
    {
      title: "Rasm",
      render: (s) =>
        s.photo ? (
          <Image
            src={`${import.meta.env.VITE_FILE_URL}/uploads/${s.photo}`}
            alt={s.firstName}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
        ) : (
          "—"
        ),
    },
    {
      title: "Akkaunt",
      render: (s) =>
        s.user ? (
          <Dropdown menu={getAccountMenu(s)} trigger={["click"]}>
            <Button type="text">Mavjud</Button>
          </Dropdown>
        ) : (
          <Button
            type="dashed"
            onClick={() => onAccountClick({ open: true, type: "create", staff: s })}
          >
            Akkaunt yaratish
          </Button>
        ),
    },
    {
      title: "Amallar",
      render: (s) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(s)}>
            Tahrirlash
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(s._id)}>
            {`O'chirish`}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={[...staffs].reverse()}
      columns={columns}
      rowKey="_id"
      loading={isLoading}
      pagination={{ pageSize: 8 }}
    />
  );
};

export default StaffTable;
