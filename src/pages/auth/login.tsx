import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import { ILoginFormData } from "../../interfaces/login-form-data.type";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginUserMutation } from "../../redux/features/auth/auth.api";
import { setUser } from "../../redux/features/auth/auth.slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const [form] = useForm<ILoginFormData>();
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: ILoginFormData) => {
    try {
      const response = await loginUser(values).unwrap();

      const authInfo = {
        token: response.token,
        user: {
          _id: response.user._id,
          name: response.user.name,
          email: response.user.email,
        },
      };
      dispatch(setUser(authInfo));
      toast.success("Login success");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <div className="flex justify-center mb-7">
          <img
            src="https://img.icons8.com/clouds/100/000000/user-male-circle.png"
            alt="User Icon"
            className="w-20 h-20"
          />
        </div>
        <h1 className="text-3xl font-bold text-center mb-7 text-gray-800">
          Welcome Back!
        </h1>
        <Form
          className="space-y-6"
          form={form}
          name="login"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#b0b0b0" }} />}
              placeholder="Email"
              className="py-3 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#b0b0b0" }} />}
              placeholder="Password"
              className="py-3 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-3 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
