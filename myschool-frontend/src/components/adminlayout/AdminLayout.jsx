import { Layout, Menu, Button, message } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  ApartmentOutlined,
  TableOutlined,
  BarChartOutlined,
  NotificationOutlined,
  ReadOutlined,
  FileOutlined,
  IdcardOutlined,
  BookOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const { Header, Sider, Content, Footer } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = localStorage.getItem("role");

  const menuByRole = {
    admin: [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: <Link to="/admin/dashboard">Dashboard</Link>,
      },
      {
        key: "2",
        icon: <TeamOutlined />,
        label: <Link to="/admin/students">O‘quvchilar</Link>,
      },
      {
        key: "3",
        icon: <UserOutlined />,
        label: <Link to="/admin/teachers">O‘qituvchilar</Link>,
      },
      {
        key: "sub1",
        icon: <ApartmentOutlined />,
        label: "Sinflar",
        children: [
          {
            key: "4-1",
            icon: <BookOutlined />,
            label: <Link to="/admin/classes">Sinflar ro‘yxati</Link>,
          },
          {
            key: "4-2",
            icon: <TableOutlined />,
            label: <Link to="/admin/classes/timetable">Dars jadvali</Link>,
          },
          {
            key: "4-3",
            icon: <BarChartOutlined />,
            label: <Link to="/admin/classes/grades">Baholar</Link>,
          },
          {
            key: "4-4",
            icon: <CalendarOutlined />,
            label: <Link to="/admin/classes/attendance">Davomat</Link>,
          },
        ],
      },
      {
        key: "sub2",
        icon: <NotificationOutlined />,
        label: "News / Events",
        children: [
          {
            key: "5-1",
            icon: <NotificationOutlined />,
            label: <Link to="/admin/news">News</Link>,
          },
          {
            key: "5-2",
            icon: <ScheduleOutlined />,
            label: <Link to="/admin/events">Events</Link>,
          },
        ],
      },
      {
        key: "sub3",
        icon: <ReadOutlined />,
        label: "Kutubxona",
        children: [
          {
            key: "6-1",
            icon: <BookOutlined />,
            label: <Link to="/admin/books">Kitoblar</Link>,
          },
          {
            key: "6-2",
            icon: <FileOutlined />,
            label: <Link to="/admin/library-records">Library Record</Link>,
          },
        ],
      },
      {
        key: "7",
        icon: <FileOutlined />,
        label: <Link to="/admin/files">Fayllar</Link>,
      },
      {
        key: "8",
        icon: <IdcardOutlined />,
        label: <Link to="/admin/staff">Xodimlar</Link>,
      },
      {
        key: "9",
        icon: <BookOutlined />,
        label: <Link to="/admin/subjects">Fanlar</Link>,
      },
    ],

    teacher: [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: <Link to="/teacher/dashboard">Dashboard</Link>,
      },
      {
        key: "2",
        icon: <ApartmentOutlined />,
        label: <Link to="/teacher/classes">Mening guruhlarim</Link>,
      },
      {
        key: "3",
        icon: <BarChartOutlined />,
        label: <Link to="/teacher/grades">Baholar</Link>,
      },
      {
        key: "4",
        icon: <CalendarOutlined />,
        label: <Link to="/teacher/attendance">Davomat</Link>,
      },
      {
        key: "5",
        icon: <FileOutlined />,
        label: <Link to="/teacher/files">Fayllar</Link>,
      },
    ],

    student: [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: <Link to="/student/dashboard">Dashboard</Link>,
      },
      {
        key: "2",
        icon: <BarChartOutlined />,
        label: <Link to="/student/grades">Mening baholarim</Link>,
      },
      {
        key: "3",
        icon: <CalendarOutlined />,
        label: <Link to="/student/attendance">Davomat</Link>,
      },
      {
        key: "4",
        icon: <NotificationOutlined />,
        label: <Link to="/student/news">Yangiliklar</Link>,
      },
      {
        key: "5",
        icon: <FileOutlined />,
        label: <Link to="/student/files">Fayllar</Link>,
      },
    ],

    librarian: [
      {
        key: "1",
        icon: <ReadOutlined />,
        label: <Link to="/librarian/books">Kitoblar</Link>,
      },
      {
        key: "2",
        icon: <FileOutlined />,
        label: <Link to="/librarian/library-records">Library Record</Link>,
      },
    ],

    staff: [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: <Link to="/staff/dashboard">Dashboard</Link>,
      },
      {
        key: "2",
        icon: <FileOutlined />,
        label: <Link to="/staff/files">Fayllar</Link>,
      },
    ],
  };

const handleLogout = () => {
  dispatch(logout());
  message.info("Tizimdan chiqdingiz!");

    navigate("/login", { replace: true });
};

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div className="text-white text-center p-4 font-bold text-lg">
          {role?.toUpperCase()} Panel
        </div>
        <Menu theme="dark" mode="inline" items={menuByRole[role]} />
      </Sider>

      <Layout>
        <Header className="bg-blue-600 shadow flex justify-between items-center px-6">
          <h2 className="text-xl font-bold text-white">
            {role === "admin"
              ? "Maktab Admin Paneli"
              : `${role?.toUpperCase()} Paneli`}
          </h2>
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            Chiqish
          </Button>
        </Header>

        <Content className="m-4 p-6 bg-white shadow rounded-lg">
          <Outlet />
        </Content>

        <Footer style={{ textAlign: "center" }}>
          &copy; {new Date().getFullYear()} Maktab tizimi — {role} panel
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
