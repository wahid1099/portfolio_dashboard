import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import RichTextEditor from "../../utils/rich-text-editor";
import { technologiesOptions } from "../../constants";
import { toast } from "sonner";
import { isValidUrl } from "../../utils/url-validation";
import { IProject } from "../../interfaces/api.res.projects.type";
import { useUpdateProjectMutation } from "../../redux/features/projects/projects.api";

interface IAddArticleDrawerProps {
  data: IProject | null;
  setData: Dispatch<SetStateAction<null | IProject>>;
}

const EditProjectDrawer: React.FC<IAddArticleDrawerProps> = ({
  data,
  setData,
}) => {
  const [form] = Form.useForm<IProject>();
  const [richText, setRichText] = useState<string>("");
  const [updateProject] = useUpdateProjectMutation();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        image: data.image,
        technologies: data.technologies,
        description: data.description,
        live_preview: data.live_preview,
        source: data.source,
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
      const projectData = {
        ...values,
        description: richText,
      };

      console.log(projectData);

      try {
        const response = await updateProject({
          _id: data!._id as string,
          data: projectData,
        }).unwrap();

        if (response.success) {
          toast.success("Project successfully updated");
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
      title="Edit Project"
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
          technologies: data?.technologies,
          description: data?.description,
          live_preview: data?.live_preview,
          source: data?.source,
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                { required: true, message: "Please enter project title" },
              ]}
            >
              <Input placeholder="Please enter project title" />
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
              name="live_preview"
              label="Live URL"
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
              name="source"
              label="Source URL"
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
              name="technologies"
              label="Technologies"
              rules={[
                {
                  required: true,
                  message: "Please select at least one tech stack",
                },
              ]}
            >
              <Select
                showSearch
                mode="multiple"
                allowClear
                placeholder="Select tags"
                optionFilterProp="label"
                options={technologiesOptions}
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

export default EditProjectDrawer;
