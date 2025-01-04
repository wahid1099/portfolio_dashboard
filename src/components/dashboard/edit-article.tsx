import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import RichTextEditor from "../../utils/rich-text-editor";
import { articleTags } from "../../constants";
import { toast } from "sonner";
import { isValidUrl } from "../../utils/url-validation";
import { BlogPost } from "../../pages/dashboard/article";
import { useUpdateArticleMutation } from "../../redux/features/articles/article.api";

export interface IArticle {
  title: string;
  image: string;
  description: string;
  tags: string[];
}

interface IAddArticleDrawerProps {
  data: BlogPost | null;
  setData: Dispatch<SetStateAction<null | BlogPost>>;
}

interface IArticleForm {
  title: string;
  image: string;
  tags: string[];
}

const EditArticleDrawer: React.FC<IAddArticleDrawerProps> = ({
  data,
  setData,
}) => {
  const [form] = Form.useForm<IArticleForm>();
  const [richText, setRichText] = useState<string>("");
  const [updateArticle] = useUpdateArticleMutation();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        image: data.image,
        tags: data.tags,
      });
      setRichText(data.description || "");
    }
  }, [data, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (!isValidUrl(values.image)) {
        toast.error("Invalid thumbnail URL");
        return;
      }
      const articleData = {
        ...values,
        description: richText,
      };

      try {
        const response = await updateArticle({
          _id: data!._id as string,
          data: articleData,
        }).unwrap();

        if (response.success) {
          toast.success("Article successfully updated");
          setData(null);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Drawer
      title="Edit Article"
      width={720}
      onClose={() => setData(null)}
      open={!!data}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={() => setData(null)}>Cancel</Button>
          <Button onClick={handleSubmit} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
        initialValues={{
          title: data?.title,
          image: data?.image,
          tags: data?.tags,
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                { required: true, message: "Please enter article title" },
              ]}
            >
              <Input placeholder="Please enter article title" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="image"
              label="Thumbnail URL"
              rules={[
                { required: true, message: "Please enter thumbnail URL" },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                addonBefore="http://"
                placeholder="Please enter URL"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="tags"
              label="Tags"
              rules={[
                { required: true, message: "Please select at least one tag" },
              ]}
            >
              <Select
                showSearch
                mode="multiple"
                allowClear
                placeholder="Select tags"
                optionFilterProp="label"
                options={articleTags}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <p className="mb-2">Description</p>
            <RichTextEditor
              richText={richText}
              setRichText={setRichText}
              defaultRichText={data?.description}
              rows={12}
            />
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default EditArticleDrawer;
