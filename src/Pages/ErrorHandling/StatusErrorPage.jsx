import { useSelector } from "react-redux";

// Components
import { Button, Result } from "antd";

const StatusErrorPage = () => {
  const { statusError } = useSelector((state) => {
    return state.statusError;
  });

  return (
    <Result
      {...statusError}
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default StatusErrorPage;
