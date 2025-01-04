import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="h-screen bg-black/15 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
}
