import { useState } from "react";

// Components
import { Input, Form, Select, Checkbox } from "antd";
const { Option } = Select;

import { Button } from "../../../../Components";

// Styles
import styles from "./PremiumConfig.module.css";

import { days } from "../../../../Misc/timesheetUtils";

const PremiumConfig = ({
  premium,
  setPremiumList,
  showModal,
  positionList,
  earningList,
}) => {
  const [currentPremium, setCurrentPremium] = useState({ ...premium });
  const handleCancel = () => {
    showModal(null);
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
    let url = `${process.env.REACT_APP_BASE_URL}/premium`;
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

    showModal(null);
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
      return (
        <Option key={el._id} value={el._id}>
          {el.name}
        </Option>
      );
    });

  const timeFields = () => {
    const fields = [];
    for (let i = 0; i < 7; i++) {
      fields.push(
        <div key={i} className={styles.dateLabel}>
          {days[i].substring(0, 3)}
        </div>
      );
      fields.push(
        <Input
          key={`${i}a`}
          name={i}
          value={currentPremium[i] ? currentPremium[i].start : ""}
          onChange={(e) => handleSchedule(e, "start")}
          style={{ textAlign: "center" }}
        />
      );

      fields.push(
        <Input
          key={`${i}b`}
          name={i}
          value={currentPremium[i] ? currentPremium[i].end : ""}
          onChange={(e) => handleSchedule(e, "end")}
          style={{ textAlign: "center" }}
        />
      );
    }

    return fields;
  };

  return (
    <Form layout="vertical">
      <div className={styles.layout}>
        <div>
          <div className={styles.inputContainer}>
            <h4 className={styles.inputHeader}>Name</h4>
            <Input
              onChange={handleInputField}
              value={currentPremium.name}
              style={{ minWidth: "300px" }}
              name="name"
            />
          </div>
          <div className={styles.inputContainer}>
            <h4 className={styles.inputHeader}>Earning Code</h4>
            <Select
              value={currentPremium.earningId}
              onChange={(e) => handleEarningChange(e)}
              style={{ width: "100%" }}
            >
              {earningOptions}
            </Select>
          </div>

          <div>
            <div
              style={{
                display: "inline-block",
                width: "calc(50% - 1rem)",
                marginRight: "1rem",
              }}
            >
              <h4 className={styles.inputHeader}>Threshold (Hours)</h4>
              <Input
                onChange={handleInputField}
                value={currentPremium.threshold}
                style={{ width: "100px" }}
                name="threshold"
              />
            </div>

            <div
              label="Strict Apply"
              tooltip="Strict applies premiums based on premium schedule, else premiums will apply based on employee start and end times. "
              style={{ display: "inline-block", width: "50%" }}
            >
              <h4 className={styles.inputHeader}>Strict Apply</h4>
              <Checkbox
                onChange={handleCheckbox}
                checked={currentPremium?.strict}
              />
            </div>
          </div>
        </div>

        <div>
          <h4>Premium Schedule</h4>{" "}
          <div className={styles.schedule}>
            <div></div>
            <div>Start</div>
            <div>End</div>

            {timeFields()}
          </div>
        </div>

        <div className={styles.inputContainer}>
          <h3>Eligible Positions</h3>
          {eligiblePositions.map((el) => {
            return <div key={el._id}>{el.name}</div>;
          })}
        </div>
      </div>
      <div className={styles.formActions}>
        <Button
          type="secondary"
          onClick={handleCancel}
          style={{ maxWidth: "6rem", height: "2.5rem", marginLeft: "auto" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          style={{ maxWidth: "6rem", height: "2.5rem" }}
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default PremiumConfig;
