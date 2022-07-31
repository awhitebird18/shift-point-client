// React & Redux
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../State/index.js";
import { useFetch } from "../../../../Hooks";

// Styles
import styles from "./premiumModal.module.css";

// Components
import PremiumRow from "./PremiumRow";
import { Modal, Typography, Space } from "antd";
const { Title, Text } = Typography;

// Data and Functions
import {
  convertToHours12,
  days,
  months,
} from "../../../../Misc/timesheetUtils.js";
import { v4 as uuidv4 } from "uuid";
import { timeIsDateObj } from "../../Functions/timecardFunctions.js";

const PremiumModal = ({ premiumModalId }) => {
  const [premiumList] = useFetch("premium");
  // Need to create separate useSelector Calls
  let timesheetData = useSelector((state) => {
    return state.timedata.timesheet.find((el) => el.id === premiumModalId);
  });

  const date = timesheetData.date;

  const dateDisplay = `${months[date.getMonth()]} ${date.getDate()}`;

  // Redux Actions
  const dispatch = useDispatch();

  const { togglePremiumModal } = bindActionCreators(actionCreators, dispatch);

  const handleOk = () => {
    togglePremiumModal(null);
  };

  const handleCancel = () => {
    togglePremiumModal(null);
  };

  const timecardDisplay = {
    start:
      timesheetData &&
      Object.prototype.toString.call(timesheetData.start) === "[object Date]"
        ? convertToHours12(timesheetData.start)
        : timesheetData.start
        ? timesheetData.start
        : "",
    end:
      timesheetData &&
      Object.prototype.toString.call(timesheetData.end) === "[object Date]"
        ? convertToHours12(timesheetData.end)
        : timesheetData.end
        ? timesheetData.end
        : "",
  };

  return (
    <Modal
      title=""
      visible={premiumModalId}
      onOk={handleOk}
      onCancel={handleCancel}
      className={styles.modal}
      width={650}
    >
      <div className={styles.breakHeader}>
        <Title style={{ marginBottom: "0.2rem", display: "inline" }} level={4}>
          Employee Premiums
        </Title>

        <Space direction="vertical" style={{ display: "block" }}>
          <Text style={{ display: "inline" }} type="secondary">
            {`${days[date.getDay()]} ${dateDisplay}`}
            {", "}
            {timecardDisplay &&
              `${timecardDisplay.start ? timecardDisplay.start : ""} - ${
                timecardDisplay.end ? timecardDisplay.end : ""
              }`}
          </Text>
          <Text type="secondary">Kermit the Frog</Text>
        </Space>
      </div>
      <table>
        <thead>
          <tr className={styles.row}>
            <th className={styles.td}>Premium Type</th>
            <th className={styles.td}>Start</th>
            <th className={styles.td}>End</th>
            <th className={styles.td}>Hours</th>
            <th className={styles.td}>Status</th>
            <th className={styles.td}>More</th>
          </tr>
        </thead>
        <tbody>
          {timesheetData.premiums.map((premium, index) => {
            return (
              <PremiumRow
                key={index}
                date={premium.date}
                premiumData={premium}
                premiumList={premiumList}
              />
            );
          })}
        </tbody>
        <tfoot>
          <tr className={styles.rowSummary}>
            <td className={styles.td}></td>
            <td className={styles.breakHours}>Premium Hours</td>
            <td className={styles.summaryHours}></td>
            <td className={styles.td}></td>
            <td className={styles.td}></td>
          </tr>
        </tfoot>
      </table>
    </Modal>
  );
};

export default PremiumModal;
