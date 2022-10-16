import { useState } from "react";
// Components
import { Form, Input, InputNumber, Select, Checkbox } from "antd";
import { Button } from "../../../../Components";
const { Option } = Select;
// Functions
import { v4 as uuidv4 } from "uuid";
// Styles
import styles from "./BreakTemplateConfig.module.css";

const BreakTemplateConfig = ({ breakEl, showModal, setTimesheetRules }) => {
  const [breakTemplate, setCurrentBreak] = useState({ ...breakEl });

  const handleSave = () => {
    const method = breakTemplate._id ? "PATCH" : "POST";
    const url = `${process.env.REACT_APP_BASE_URL}/timesheetrules/breaks/${
      method === "PATCH" ? breakTemplate._id : ""
    }`;

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: method,
      cors: "no-cors",
      body: JSON.stringify({ breakTemplate }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTimesheetRules((prev) => {
          const breakTemplates = [...prev.breakTemplates];

          const breakTemplateIndex = breakTemplates.findIndex((el) => {
            return el.templateId === data.data.templateId;
          });

          if (breakTemplateIndex === -1) {
            breakTemplates.push(data.data);
          } else {
            breakTemplates.splice(breakTemplateIndex, 1, data.data);
          }

          return { ...prev, breakTemplates: [...breakTemplates] };
        });

        showModal(null);
      });
  };

  const handleChange = (value, field, id) => {
    setCurrentBreak((prev) => {
      if (!id) {
        return { ...prev, [field]: value };
      }

      const breaksCopy = [...prev.breaks];

      const breakInstance = breaksCopy.find((breakEl) => {
        return breakEl._id === id;
      });

      if (!breakInstance) {
        return;
      }

      breakInstance[field] = value;

      return { ...prev, breaks: breaksCopy };
    });
  };

  const handleDeleteBreak = (id) => {
    setCurrentBreak((prev) => {
      const stateCopy = {
        ...prev,
        breaks: prev.breaks.filter((el) => {
          return el._id !== id;
        }),
      };

      return stateCopy;
    });
  };

  const handleAddBreak = () => {
    setCurrentBreak((prev) => {
      return { ...prev, breaks: [...prev.breaks, { _id: uuidv4() }] };
    });
  };

  const handleCancel = () => {
    showModal(null);
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Template Name">
        <Input
          value={breakTemplate.templateName}
          onChange={(e) => handleChange(e.target.value, "templateName")}
        />
      </Form.Item>
      {breakTemplate.breaks
        .sort((a, b) => {
          return a.start < b.start;
        })
        .map((breakEl) => {
          return (
            <div key={breakEl._id} className={styles.breakSection}>
              <Form.Item
                label="Name"
                style={{
                  width: "calc(50% - 1rem)",
                  marginRight: "1rem",
                  display: "inline-block",
                }}
                onChange={(e) => {
                  handleChange(e.target.value, "name", breakEl._id);
                }}
              >
                <Input value={breakEl.name} />
              </Form.Item>

              <Form.Item
                label="Unpaid?"
                style={{
                  width: "15%",
                  display: "inline-block",
                }}
              >
                <Checkbox
                  checked={breakEl.unpaid}
                  onChange={(e) => {
                    handleChange(e.target.checked, "unpaid", breakEl._id);
                  }}
                />
              </Form.Item>

              <Form.Item
                label={breakEl.unpaid ? "Deduct if not taken?" : " "}
                style={{ width: "35%", display: "inline-block" }}
              >
                {breakEl.unpaid && (
                  <Checkbox
                    checked={breakEl.strict}
                    onChange={(e) => {
                      handleChange(e.target.checked, "strict", breakEl._id);
                    }}
                  />
                )}
              </Form.Item>

              <Form.Item
                label="Start (Hours)"
                style={{ width: "25%", display: "inline-block" }}
              >
                <InputNumber
                  value={breakEl.start}
                  onChange={(e) => {
                    handleChange(e, "start", breakEl._id);
                  }}
                  bordered={false}
                />
              </Form.Item>

              <Form.Item
                label="Length (Mins)"
                style={{ width: "25%", display: "inline-block" }}
              >
                <InputNumber
                  value={breakEl.length}
                  onChange={(e) => {
                    handleChange(e, "length", breakEl._id);
                  }}
                  bordered={false}
                />
              </Form.Item>

              <Form.Item
                label="Punch Threshold (Mins)"
                style={{ width: "50%", display: "inline-block" }}
              >
                <InputNumber
                  value={breakEl.punchThreshold}
                  onChange={(e) => {
                    handleChange(e, "punchThreshold", breakEl._id);
                  }}
                  bordered={false}
                />
              </Form.Item>

              {breakEl.unpaid && (
                <Form.Item
                  label="Short Break Handling"
                  style={{
                    width: "calc(50% - 1rem)",
                    marginRight: "1rem",
                    display: "inline-block",
                  }}
                >
                  <Select
                    value={breakEl.enforceEarly}
                    onChange={(e) => {
                      handleChange(e, "enforceEarly", breakEl._id);
                    }}
                  >
                    <Option value={true}>
                      Deduct Break Length{" "}
                      {breakEl.length ? `(${breakEl.length} mins)` : ""}
                    </Option>
                    <Option value={false}>Deduct only time taken</Option>
                  </Select>
                </Form.Item>
              )}

              <Form.Item
                label="Long Break Handling"
                style={{ width: "50%", display: "inline-block" }}
              >
                <Select
                  value={breakEl.enforceLate}
                  onChange={(e) => {
                    handleChange(e, "enforceLate", breakEl._id);
                  }}
                >
                  {breakEl.unpaid ? (
                    <Option value={true}>
                      Deduct Break Length{" "}
                      {breakEl.length ? `(${breakEl.length} mins)` : ""}
                    </Option>
                  ) : (
                    <Option value={true}>No Excess deduction</Option>
                  )}
                  <Option value={false}>
                    Deduct {!breakEl.unpaid ? "excess" : "full"} time taken
                  </Option>
                </Select>
              </Form.Item>

              <div className={styles.deleteBreak}>
                <Button
                  type="secondary"
                  onClick={() => handleDeleteBreak(breakEl._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}

      <div style={{ marginBottom: "2rem" }}>
        <Button
          type="secondary"
          style={{ width: "100%" }}
          onClick={handleAddBreak}
        >
          + Add Break
        </Button>
      </div>

      <div className={styles.formActions}>
        <Button
          type="secondary"
          onClick={handleCancel}
          style={{ marginLeft: "auto" }}
        >
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Form>
  );
};

export default BreakTemplateConfig;
