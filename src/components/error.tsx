import { Button, Result } from "antd";
import { FC } from "react";

const ErrorElement: FC = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button onClick={() => window.location.reload()} type="primary">
          Reload
        </Button>
      }
    />
  );
};

export default ErrorElement;
