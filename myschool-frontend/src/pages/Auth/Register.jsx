import { Form, Input, Button, message } from "antd";
import { useRegisterMutation } from "../../features/auth/authApi";
import {useNavigate} from "react-router-dom"

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      await register(values).unwrap();
      message.success("Ro‘yxatdan muvaffaqiyatli o‘tdingiz!");
      navigate("/");
    } catch (error) {
      message.error("Ro‘yxatdan o‘tishda xatolik yuz berdi!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Ro‘yxatdan o‘tish</h2>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Ism" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Parol" name="password" rules={[{ required: true, min: 6 }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Parolni tasdiqlash" name="confirm" dependencies={["password"]} rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Parollar mos emas!");
              },
            }),
          ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Ro‘yxatdan o‘tish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
