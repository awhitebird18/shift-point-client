// React & Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../State";

// Styles
import styles from "./Row.module.css";

// Components
import BreaktypeSelect from "../BreakSelect/BreakSelect";
import { Menu, Dropdown, Checkbox, Input } from "antd";
import { BsInfoSquareFill, BsInfoSquare } from "react-icons/bs";

// Data and Helper Functions
import { convertToHours12 } from "../../../../Misc/timesheetUtils.js";
import { v4 as uuidv4 } from "uuid";

export default function BreaksheetRow({ breaksheetData }) {
  const dispatch = useDispatch();

  const { updateBreakField, updateBreakStatus, removeBreak, updateBreakTime } =
    bindActionCreators(actionCreators, dispatch);

  const addNewBreaksheet = () => {
    setBreaksheetData((prev) => {
      prev.push({
        ...breaksheetData,
        id: uuidv4(),
        start: breaksheetData.end ? breaksheetData.end : "",
        end: "",
        hours: "",
      });

      prev.sort((a, b) => {
        return a.start - b.start;
      });

      return [...prev];
    });
  };

  // Add/ Remove Dropdown menu
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={() => addNewBreaksheet()}>Add Break</div>
      </Menu.Item>
      <Menu.Divider />
      {breaksheetData.id && (
        <Menu.Item key="1">
          <div onClick={() => removeBreak(breaksheetData.id)}>Remove Break</div>
        </Menu.Item>
      )}
    </Menu>
  );

  // Set Break Icon
  const breakIcon = () => {
    const styles = {
      color: "#bfbfbf",
      fontSize: "1.8rem",
    };

    return breaksheetData.length > 0 ? (
      <BsInfoSquareFill style={styles} />
    ) : (
      <BsInfoSquare style={styles} />
    );
  };

  // Format Data
  const breaksheetDisplay = {
    ...breaksheetData,
    breakTypeId: breaksheetData.breakTypeId ? breaksheetData.breakTypeId : "",
    status: breaksheetData.status ? breaksheetData.status : "approved",
    remove: breaksheetData.remove ? breaksheetData.remove : "",
    start:
      Object.prototype.toString.call(breaksheetData.start) === "[object Date]"
        ? convertToHours12(breaksheetData.start)
        : breaksheetData.start
        ? breaksheetData.start
        : "",
    end:
      Object.prototype.toString.call(breaksheetData.end) === "[object Date]"
        ? convertToHours12(breaksheetData.end)
        : breaksheetData.end
        ? breaksheetData.end
        : "",
    hours:
      Object.prototype.toString.call(breaksheetData.start) ===
        "[object Date]" &&
      Object.prototype.toString.call(breaksheetData.end) === "[object Date]"
        ? (
            (breaksheetData.end.getTime() - breaksheetData.start.getTime()) /
            3600000
          ).toFixed(2)
        : "",
  };

  // Outputs correct status class
  function statusClasses() {
    if (!breaksheetDisplay.status) return "";

    return `${styles.status} ${styles[breaksheetDisplay.status]}`;
  }

  return (
    <tr className={`breaks row ${styles.columns}`}>
      <td className={styles.selects}>
        <BreaktypeSelect
          breakTypeId={breaksheetDisplay.breakTypeId}
          updateBreakField={updateBreakField}
          breaksheetData={breaksheetData}
        />
      </td>

      <td className={styles.time}>
        <Input
          style={{
            width: "100%",
            border: "1px solid var(--color-border)",
            textAlign: "center",
            height: "100%",
          }}
          bordered={false}
          value={breaksheetDisplay.start ? breaksheetDisplay.start : ""}
          onChange={(e) =>
            updateBreakTime(e.target.value, "start", {
              ...breaksheetData,
              id: breaksheetData.id ? breaksheetData.id : uuidv4(),
            })
          }
        />
      </td>

      <td className={styles.time}>
        <Input
          style={{
            width: "100%",
            border: "1px solid var(--color-border)",
            textAlign: "center",
            height: "100%",
          }}
          bordered={false}
          value={breaksheetDisplay.end ? breaksheetDisplay.end : ""}
          onChange={(e) =>
            updateBreakTime(e.target.value, "end", {
              ...breaksheetData,
              id: breaksheetData.id ? breaksheetData.id : uuidv4(),
            })
          }
        />
      </td>

      <td className={styles.time}>
        <Input
          style={{
            width: "100%",
            border: "1px solid var(--color-border)",
            textAlign: "center",
            height: "100%",
          }}
          bordered={false}
          placeholder={breaksheetDisplay.hours}
        />
      </td>

      <td className={styles.centerContent}>
        <Checkbox
          checked={breaksheetDisplay.unpaid}
          onChange={(e) =>
            updateBreakField(e.target.checked, "unpaid", {
              ...breaksheetData,
              id: breaksheetData.id ? breaksheetData.id : uuidv4(),
            })
          }
          name="unpaid"
        />
      </td>

      <td>
        {breaksheetDisplay.status && (
          <button
            name="status"
            className={statusClasses()}
            onClick={(e) =>
              updateBreakStatus(e.target.value, {
                ...breaksheetData,
                id: breaksheetData.id ? breaksheetData.id : uuidv4(),
              })
            }
          >
            {`${
              breaksheetDisplay.status.toString().toUpperCase()[0]
            }${breaksheetDisplay.status.toString().substring(1)}`}
          </button>
        )}
      </td>

      <td className={styles.time}>
        <button className={styles.infoButton}>
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottomRight"
            arrow={true}
          >
            <span onClick={(e) => e.preventDefault()}>{breakIcon()}</span>
          </Dropdown>
        </button>
      </td>
    </tr>
  );
}
