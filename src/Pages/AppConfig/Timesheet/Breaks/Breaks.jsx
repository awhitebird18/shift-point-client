import { useState } from "react";

// Components
import Breakrow from "./Breakrow";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
} from "antd";
const { Option } = Select;
import { PlusOutlined } from "@ant-design/icons";

// Styles
import styles from "./Breaks.module.css";

// Functions
import { v4 as uuidv4 } from "uuid";

const Breaks = ({ breakTemplates, setTimesheetRules }) => {
  const [currentBreak, setCurrentBreak] = useState(null);
  const [modalIsVisible, setModalIsVisible] = useState(null);

  const showModal = () => {
    setCurrentBreak({ templateName: "", breaks: [], templateId: uuidv4() });
    setModalIsVisible(true);
  };

  const handleOk = () => {
    setModalIsVisible(false);
    setCurrentBreak(null);
  };

  const handleCancel = () => {
    setModalIsVisible(false);
    setCurrentBreak(null);
  };

  const handleAddBreak = () => {
    setCurrentBreak((prev) => {
      return { ...prev, breaks: [...prev.breaks, { _id: uuidv4() }] };
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

  const handleSave = () => {
    const method = currentBreak._id ? "PATCH" : "POST";
    const url = `${process.env.REACT_APP_BASE_URL}/timesheetrules/breaks/${
      method === "PATCH" ? currentBreak._id : ""
    }`;

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: method,
      cors: "no-cors",
      body: JSON.stringify({ currentBreak }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrentBreak(null);
        setModalIsVisible(false);
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
      });
  };

  return (
    <>
      <div className={`list-header--md ${styles.columns}`}>
        <div>Name</div>
        <div>Break Count</div>
        <div>Unpaid Minutes</div>
        <div>Paid Minutes</div>
        <div>Delete</div>
      </div>

      <div className="slideUpAnimation">
        <div>
          {breakTemplates.length > 0 ? (
            breakTemplates.map((breakEl, index) => {
              return (
                <Breakrow
                  key={index}
                  breakEl={breakEl}
                  setTimesheetRules={setTimesheetRules}
                  setCurrentBreak={setCurrentBreak}
                  setModalIsVisible={setModalIsVisible}
                />
              );
            })
          ) : (
            <div className={styles.row}>No Breaks Setup</div>
          )}
        </div>

        <div className={styles.addBreakTemplate}>
          <Button type="primary" onClick={showModal}>
            Add Break Template
          </Button>
        </div>
      </div>

      <Modal
        title={currentBreak?.name}
        width={750}
        visible={modalIsVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleAddBreak}
            icon={<PlusOutlined />}
          >
            Add Break
          </Button>,
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <div className={styles.container}>
          {currentBreak && (
            <Form layout="vertical">
              <Form.Item label="Template Name">
                <Input
                  value={currentBreak.templateName}
                  onChange={(e) => handleChange(e.target.value, "templateName")}
                />
              </Form.Item>
              {currentBreak.breaks
                .sort((a, b) => {
                  return a.start < b.start;
                })
                .map((breakEl) => {
                  return (
                    <div className={styles.breakSection}>
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
                            handleChange(
                              e.target.checked,
                              "unpaid",
                              breakEl._id
                            );
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
                              handleChange(
                                e.target.checked,
                                "strict",
                                breakEl._id
                              );
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
                            <Option value={false}>
                              Deduct only time taken
                            </Option>
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
                            Deduct {!breakEl.unpaid ? "excess" : "full"} time
                            taken
                          </Option>
                        </Select>
                      </Form.Item>

                      <div className={styles.deleteBreak}>
                        <Button
                          danger
                          onClick={() => handleDeleteBreak(breakEl._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </Form>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Breaks;
