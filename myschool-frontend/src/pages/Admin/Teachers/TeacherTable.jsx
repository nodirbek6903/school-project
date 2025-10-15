import { Table, Button, Space, Image, Dropdown } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TeacherTable = ({ teachers, isLoading, onEdit, onDelete, onAccountClick }) => {
  const getAccountMenu = (teacher) => ({
    items: [
      {
        key: "info",
        label: "Login ma'lumotlari",
        onClick: () =>
          onAccountClick({ open: true, type: "info", teacher }),
      },
      {
        key: "password",
        label: "Parolni o'zgartirish",
        onClick: () =>
          onAccountClick({ open: true, type: "password", teacher }),
      },
    ],
  });

  const columns = [
    { title: "#", render: (_, __, i) => i + 1 },
    { title: "Ism", dataIndex: "firstName" },
    { title: "Familiya", dataIndex: "lastName" },
    {
      title: "Fanlar",
      dataIndex: "subjects",
      render: (subs) => subs?.map((s) => s.name).join(", ") || "—",
    },
    {
      title: "Rasm",
      render: (t) =>
        t.photo ? (
          <Image
            src={`${import.meta.env.VITE_FILE_URL}/uploads/${t.photo}`}
            alt={t.firstName}
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
      render: (t) =>
        t.user ? (
          <Dropdown menu={getAccountMenu(t)} trigger={["click"]}>
            <Button type="text">
              Mavjud
            </Button>
          </Dropdown>
        ) : (
          <Button
            type="dashed"
            onClick={() =>
              onAccountClick({ open: true, type: "create", teacher: t })
            }
          >
            Akkaunt yaratish
          </Button>
        ),
    },
    {
      title: "Amallar",
      render: (t) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(t)}>
            Tahrirlash
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(t._id)}>
            {`O'chirish`}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={[...teachers].reverse()}
      columns={columns}
      rowKey="_id"
      loading={isLoading}
      pagination={{ pageSize: 8 }}
    />
  );
};

export default TeacherTable;
