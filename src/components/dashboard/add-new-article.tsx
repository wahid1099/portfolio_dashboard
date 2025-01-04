import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import RichTextEditor from "../../utils/rich-text-editor";
import { articleTags } from "../../constants";
import { useCreateNewArticleMutation } from "../../redux/features/articles/article.api";
import { toast } from "sonner";
import { isValidUrl } from "../../utils/url-validation";

interface IAddArticleDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface IArticleForm {
  title: string;
  image: string;
  tags: string[];
}

const AddArticleDrawer: React.FC<IAddArticleDrawerProps> = ({
  open,
  setOpen,
}) => {
  const [createNewArticle] = useCreateNewArticleMutation();
  const [form] = Form.useForm<IArticleForm>();
  const [richText, setRichText] = useState<string>("");

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
        const response = await createNewArticle(articleData).unwrap();
        if (response.success) {
          toast.success("Article successfully published");
          setRichText("");
          setOpen(false);
          form.resetFields();
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
      title="Create a new article"
      width={720}
      onClose={() => setOpen(false)}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" hideRequiredMark>
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
                { required: true, message: "Please enter thumbnail url" },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                addonBefore="http://"
                placeholder="Please enter url"
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
              rows={12}
            />
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default AddArticleDrawer;
