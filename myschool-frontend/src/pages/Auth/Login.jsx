import { Form, Input, Button, message } from "antd";
import { useLoginMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
  try {
    const data = await login(values).unwrap();
    dispatch(setCredentials({ user: data.user, token: data.token }));

    message.success("Tizimga muvaffaqiyatli kirdingiz!");

    const role = data?.user?.role;

    setTimeout(() => {
      switch (role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "teacher":
          navigate("/teacher/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        case "librarian":
          navigate("/librarian/books");
          break;
        case "staff":
          navigate("/staff/dashboard");
          break;
        default:
          navigate("/");
      }
    }, 100);

  } catch (error) {
    message.error("Login yoki parol xato!");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Parol" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
