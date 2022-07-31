// Components
import { Modal, Input, Form, Select, Typography, Checkbox } from "antd";
const { Title } = Typography;
const { Option } = Select;

// Styles
import styles from "./PremiumModal.module.css";

import { days } from "../../../../Misc/timesheetUtils";

const PremiumModal = ({
  currentPremium,
  setCurrentPremium,
  setPremiumList,
  isModalVisible,
  setIsModalVisible,
  positionList,
  earningList,
}) => {
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentPremium({});
  };

  const handleInputField = (e) => {
    setCurrentPremium((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSchedule = (e, type) => {
    const dayField = e.target.name;
    setCurrentPremium((prev) => {
      if (prev[dayField]) {
        prev[dayField] = { ...prev[dayField], [type]: e.target.value };
      } else {
        prev[dayField] = { [type]: e.target.value };
      }

      return { ...prev };
    });
  };

  const handleEarningChange = (e) => {
    setCurrentPremium((prev) => {
      return { ...prev, earningId: e };
    });
  };

  const handleCheckbox = (e) => {
    setCurrentPremium((prev) => {
      return { ...prev, strict: e.target.checked };
    });
  };

  const handleSave = () => {
    let url = "${process.env.REACT_APP_BASE_URL}premium";
    let method = "POST";

    if (currentPremium._id) {
      url = url.concat(`/${currentPremium._id}`);
      method = "PATCH";
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
        premium: currentPremium,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPremiumList((prev) => {
          const index = prev.findIndex((el) => {
            return el._id === data.premium._id;
          });

          if (index === -1) {
            prev.push(data.premium);
          } else {
            prev.splice(index, 1, data.premium);
          }

          return [...prev];
        });
      });

    setCurrentPremium({
      name: "",
      department: "",
      earning: "",
      primary: false,
      positions: [],
    });
    setIsModalVisible(false);
  };

  const eligiblePositions = positionList.filter((el) => {
    const premiumIndex = el.premium.findIndex((el) => {
      return el === currentPremium._id;
    });

    if (premiumIndex !== -1) return el;
  });

  const earningOptions = earningList
    .filter((el) => {
      return el.type === "Premium";
    })
    .map((el) => {
      return <Option value={el._id}>{el.name}</Option>;
    });

  const timeFields = () => {
    const fields = [];
    for (let i = 0; i < 7; i++) {
      fields.push(
        <div className={styles.dateLabel}>{days[i].substring(0, 3)}</div>
      );
      fields.push(
        <Input
          name={i}
          value={currentPremium[i] ? currentPremium[i].start : ""}
          onChange={(e) => handleSchedule(e, "start")}
        />
      );

      fields.push(
        <Input
          name={i}
          value={currentPremium[i] ? currentPremium[i].end : ""}
          onChange={(e) => handleSchedule(e, "end")}
        />
      );
    }

    return fields;
  };

  return (
    <Modal
      title={currentPremium._id ? "Edit Premium" : "New Premium"}
      visible={isModalVisible}
      onOk={handleSave}
      onCancel={handleCancel}
      okText={currentPremium._id ? "Update" : "Save"}
      layout="inline"
      width={725}
    >
      <Form layout="vertical">
        <div className={styles.layout}>
          <div>
            <Form.Item label="Name">
              <Input
                onChange={handleInputField}
                value={currentPremium.name}
                style={{ width: "300px" }}
                name="name"
              />
            </Form.Item>
            <Form.Item label="Earning Code">
              <Select
                value={currentPremium.earningId}
                onChange={(e) => handleEarningChange(e)}
              >
                {earningOptions}
              </Select>
            </Form.Item>

            <Form.Item>
              <Form.Item
                label="Threshold (Hours)"
                tooltip="Number of hours before and after shift start time that premium will apply."
                style={{ display: "inline-block", width: "50%" }}
              >
                <Input
                  onChange={handleInputField}
                  value={currentPremium.threshold}
                  style={{ width: "100px" }}
                  name="threshold"
                />
              </Form.Item>

              <Form.Item
                label="Strict Apply"
                tooltip="Strict applies premiums based on premium schedule, else premiums will apply based on employee start and end times. "
                style={{ display: "inline-block", width: "50%" }}
              >
                <Checkbox
                  onChange={handleCheckbox}
                  checked={currentPremium?.strict}
                />
              </Form.Item>
            </Form.Item>

            <div>
              <Title level={5}>Eligible Positions</Title>
              {eligiblePositions.map((el, index) => {
                return <div key={index}>{el.name}</div>;
              })}
            </div>
          </div>

          <Form.Item label="Premium Schedule">
            <div className={styles.schedule}>
              <div></div>
              <div>Start</div>
              <div>End</div>

              {timeFields()}
            </div>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default PremiumModal;
