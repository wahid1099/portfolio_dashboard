import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import RichTextEditor from "../../utils/rich-text-editor";
import {
  useEditAboutMutation,
  useFetchAboutQuery,
} from "../../redux/features/about/about.api";
import Loading from "../../components/loading";
import { toast } from "sonner";
import ErrorElement from "../../components/error";

interface ProfileFormValues {
  name: string;
  bio: string;
  designation: string;
}

const About: React.FC = () => {
  const { data: about, isLoading, isError } = useFetchAboutQuery(undefined);
  const [updateAbout] = useEditAboutMutation();
  const [form] = Form.useForm<ProfileFormValues>();
  const [richText, setRichText] = useState<string>("");

  useEffect(() => {
    if (about) {
      form.setFieldsValue({
        name: about?.name,
        bio: about?.bio,
        designation: about?.designation,
      });
      setRichText(about.description);
    }
  }, [about, form]);

  const onFinish = async (values: ProfileFormValues) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value !== undefined)
    );

    try {
      const response = await updateAbout({
        ...filteredValues,
        description: richText,
      }).unwrap();
      if (response.success) {
        toast.success("About successfully updated");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  if (isError) return <ErrorElement />;

  return (
    <>
      {isLoading && <Loading />}
      <Form
        form={form}
        name="profile"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: about?.name || "",
          bio: about?.bio || "",
          designation: about?.designation || "",
        }}
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="bio"
          label="Bio"
          rules={[{ required: true, message: "Please input your bio!" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="designation"
          label="Designation"
          rules={[
            { required: true, message: "Please input your designation!" },
          ]}
        >
          <Input />
        </Form.Item>

        {!!about && (
          <RichTextEditor
            richText={richText}
            setRichText={setRichText}
            defaultRichText={about?.description || ""}
            rows={10}
          />
        )}

        <Form.Item className="pt-10">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default About;
