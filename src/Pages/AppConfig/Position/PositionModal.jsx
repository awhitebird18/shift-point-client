// Components
import { Modal, Input, Form, Select } from "antd";
const { Option } = Select;

const PositionModal = ({
  currentPosition,
  setCurrentPosition,
  departmentList,
  earningList,
  isModalVisible,
  setIsModalVisible,
  setPositionList,
  premiumList,
}) => {
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentPosition({
      name: "",
      departmentId: "",
      earningId: "",
      primary: false,
    });
  };

  const handleSave = () => {
    let url = `${process.env.REACT_APP_BASE_URL}/position`;
    let method = currentPosition._id ? "PATCH" : "POST";

    if (method === "PATCH") {
      url = url.concat(`/${currentPosition._id}`);
    }

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: method,
      cors: "no-cors",
      // Set employee here
      body: JSON.stringify({
        position: currentPosition,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPositionList((prev) => {
          if (method === "PATCH") {
            const index = prev.findIndex((el) => {
              return el._id === data.position._id;
            });

            prev.splice(index, 1, data.position);
          } else {
            prev.push(data.position);
          }

          return [...prev];
        });

        setCurrentPosition({
          name: "",
          departmentId: "",
          earningId: "",
          primary: false,
        });
        setIsModalVisible(false);
      });
  };

  const departmentOptions = departmentList.map((el, index) => {
    return (
      <Option key={index} value={el._id}>
        {el.name}
      </Option>
    );
  });

  departmentOptions.unshift(<Option key="undefined" value=""></Option>);

  const earningOptions = earningList.map((el, index) => {
    return (
      <Option key={index} value={el._id}>
        {el.name}
      </Option>
    );
  });

  earningOptions.unshift(<Option key="undefined" value=""></Option>);

  const handlePrimary = (e) => {
    setCurrentPosition((prev) => {
      return { ...prev, primary: e.target.checked };
    });
  };

  const handleDepartment = (e) => {
    setCurrentPosition((prev) => {
      return { ...prev, departmentId: e };
    });
  };
  const handlePositionName = (e) => {
    setCurrentPosition((prev) => {
      return { ...prev, name: e.target.value };
    });
  };
  const handleEarning = (e) => {
    setCurrentPosition((prev) => {
      return { ...prev, earningId: e };
    });
  };

  const premiumOptions = premiumList.map((premium) => {
    return (
      <Option key={premium._id} value={premium._id}>
        {premium.name}
      </Option>
    );
  });

  const handleChange = (e) => {
    setCurrentPosition((prev) => {
      return { ...prev, premium: e };
    });
  };

  return (
    <Modal
      title={currentPosition._id ? "Edit Position" : "New Position"}
      visible={isModalVisible}
      onOk={handleSave}
      onCancel={handleCancel}
      okText={currentPosition._id ? "Update" : "Save"}
    >
      <Form layout="vertical">
        <Form.Item label="Position Name">
          <Input onChange={handlePositionName} value={currentPosition.name} />
        </Form.Item>

        <Form.Item>
          <Form.Item
            label="Department"
            style={{ display: "inline-block", width: "50%" }}
          >
            <Select
              defaultValue=""
              onChange={handleDepartment}
              value={currentPosition.departmentId}
              style={{ width: "200px" }}
            >
              {departmentOptions && departmentOptions.length > 0
                ? departmentOptions
                : ""}
            </Select>
          </Form.Item>
          <Form.Item
            label="Earning"
            style={{ display: "inline-block", width: "50%" }}
          >
            <Select
              defaultValue=""
              onChange={handleEarning}
              value={currentPosition.earningId}
              style={{ width: "200px" }}
            >
              {earningOptions && earningOptions.length > 0
                ? earningOptions
                : ""}
            </Select>
          </Form.Item>
        </Form.Item>

        <Form.Item label="Premiums">
          <Select
            mode="tags"
            style={{
              width: "300px",
            }}
            placeholder="Select Eligible Positions"
            onChange={handleChange}
            value={currentPosition.premium}
          >
            {premiumOptions}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PositionModal;
