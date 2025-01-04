import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import RichTextEditor from "../../utils/rich-text-editor";
import { technologiesOptions } from "../../constants";
import { toast } from "sonner";
import { isValidUrl } from "../../utils/url-validation";
import { IProject } from "../../interfaces/api.res.projects.type";
import { useCreateNewProjectMutation } from "../../redux/features/projects/projects.api";

interface IAddResultDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddProjectDrawer: React.FC<IAddResultDrawerProps> = ({
  open,
  setOpen,
}) => {
  const [createNewProject] = useCreateNewProjectMutation();
  const [form] = Form.useForm<IProject>();
  const [richText, setRichText] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (!isValidUrl(values.image)) {
        toast.error("Invalid thumbnail URL");
        return;
      } else if (!isValidUrl(values.live_preview)) {
        toast.error("Invalid live URL");
        return;
      } else if (!isValidUrl(values.source)) {
        toast.error("Invalid source URL");
        return;
      }

      const projectData = {
        ...values,
        description: richText,
      };

      try {
        const response = await createNewProject(projectData).unwrap();
        if (response.success) {
          toast.success("Project successfully added");
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
      title="Add New Project"
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
              rows={12}
            />
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default AddProjectDrawer;
