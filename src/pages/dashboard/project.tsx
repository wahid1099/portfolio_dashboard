import { Table, Button, Space, Popconfirm, Tag, FloatButton } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import ErrorElement from "../../components/error";
import Loading from "../../components/loading";
import dateFormatter from "../../utils/date-formatter";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useState } from "react";
import { IProject } from "../../interfaces/api.res.projects.type";
import {
  useDeleteProjectMutation,
  useFetchAllProjectsQuery,
} from "../../redux/features/projects/projects.api";
import AddProjectDrawer from "../../components/dashboard/add-new-project";
import EditProjectDrawer from "../../components/dashboard/edit-project";

export interface BlogPost {
  key: number;
  title: string;
  tags: string[];
  createdAt: string;
  imageUrl: string;
  image: string;
  _id: string;
  description: string;
}

export default function ProjectManagement() {
  const {
    data: projects,
    isLoading,
    isError,
  } = useFetchAllProjectsQuery(undefined);

  const [deleteProject] = useDeleteProjectMutation();

  const [openAddNewProjectDrawer, setOpenAddNewProjectDrawer] =
    useState<boolean>(false);

  const [clickedForEdit, setClickedForEdit] = useState<IProject | null>(null);

  const handleDelete = async (_id: string) => {
    try {
      const response = await deleteProject({ _id }).unwrap();
      if (response.success) {
        toast.success("Project successfully deleted");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const columns: ColumnsType<IProject> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageUrl: string, record: IProject) => (
        <img
          src={imageUrl}
          alt={record.title}
          style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
        />
      ),
      width: 100,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <strong>{text.slice(0, 45)} ...</strong>,
    },
    {
      title: "Technologies",
      dataIndex: "technologies",
      key: "tags",
      render: (tags) =>
        tags.map((tag: string) => <Tag color="processing">{tag}</Tag>),
    },
    {
      title: "Date",
      dataIndex: "createAt",
      key: "createdAt",
      render: (_, record) => <p>{dateFormatter(record.createdAt)}</p>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => setClickedForEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this post?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isError) return <ErrorElement />;

  return (
    <>
      {isLoading && <Loading />}
      <div style={{ padding: "24px" }}>
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
        >
          Manage Projects
        </h1>
        <Table
          columns={columns}
          dataSource={projects}
          rowKey="key"
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
        />
      </div>
      <FloatButton
        onClick={() => setOpenAddNewProjectDrawer(true)}
        icon={<Plus />}
        tooltip={<div>Add new Projects</div>}
      />
      <AddProjectDrawer
        open={openAddNewProjectDrawer}
        setOpen={setOpenAddNewProjectDrawer}
      />
      {clickedForEdit && (
        <EditProjectDrawer setData={setClickedForEdit} data={clickedForEdit} />
      )}
    </>
  );
}
