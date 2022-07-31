import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../State/index.js";

// Components
import { Modal } from "antd";

const ErrorModal = ({ errorMessage }) => {
  const dispatch = useDispatch();

  const { displayErrorMessage } = bindActionCreators(actionCreators, dispatch);

  return (
    <Modal
      title={errorMessage.title}
      style={{
        top: 20,
      }}
      visible={errorMessage.message}
      onOk={() => displayErrorMessage(null)}
      onCancel={() => displayErrorMessage(null)}
    >
      <p>{errorMessage.message}</p>
    </Modal>
  );
};

export default ErrorModal;
