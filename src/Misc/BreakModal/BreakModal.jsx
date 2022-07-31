// React & Redux
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../State/index.js';

// Styles
import styles from './breakModal.module.css';

// Components
import BreaksheetRow from './BreaksheetRow';
import { Modal, Typography, Space } from 'antd';
const { Title, Text } = Typography;

// Data and Functions
import { convertToHours12, days, months } from '../../../../Misc/timesheetUtils.js';
import { v4 as uuidv4 } from 'uuid';
import { timeIsDateObj } from '../../Functions/timecardFunctions.js';

const BreakModal = ({ breakModalId }) => {
  // Need to create separate useSelector Calls
  let { timesheetData, breaksheetData } = useSelector((state) => {
    const timesheetData = state.timedata.timesheet.find((el) => el.id === breakModalId);

    const breaksheetData = state.timedata.breaksheet.filter(
      (el) => el.timesheet === breakModalId && !el.remove
    );

    return {
      timesheetData,
      breaksheetData,
    };
  });

  const date = timesheetData.date;

  const dateDisplay = `${months[date.getMonth()]} ${date.getDate()}`;

  // If no breaksheet, set an empty breaksheet
  if (!breaksheetData || breaksheetData.length === 0) {
    breaksheetData.push({
      id: uuidv4(),
      breakTypeId: '',
      start: '',
      end: '',
      unpaid: false,
      status: 'pending',
      eeNum: timesheetData.eeNum,
      timesheet: timesheetData.id,
      date,
    });
  }

  // Redux Actions
  const dispatch = useDispatch();

  const { toggleBreakModal } = bindActionCreators(actionCreators, dispatch);

  const handleOk = () => {
    toggleBreakModal(null);
  };

  const handleCancel = () => {
    toggleBreakModal(null);
  };

  const breakDeductions = breaksheetData.reduce((prev, curr) => {
    // FIX: This breaks is adjusting start/end times while marked as unpaid
    if (curr.unpaid && timeIsDateObj(curr)) {
      const hours = (curr.end.getTime() - curr.start.getTime()) / 60 / 60 / 1000;
      return (prev += hours);
    }

    return prev;
  }, 0);

  const timecardDisplay = {
    start:
      timesheetData && Object.prototype.toString.call(timesheetData.start) === '[object Date]'
        ? convertToHours12(timesheetData.start)
        : timesheetData.start
        ? timesheetData.start
        : '',
    end:
      timesheetData && Object.prototype.toString.call(timesheetData.end) === '[object Date]'
        ? convertToHours12(timesheetData.end)
        : timesheetData.end
        ? timesheetData.end
        : '',
  };

  return (
    <Modal
      title=""
      visible={breakModalId}
      onOk={handleOk}
      onCancel={handleCancel}
      className={styles.modal}
      width={650}
    >
      <div className={styles.breakHeader}>
        <Title style={{ marginBottom: '0.2rem', display: 'inline' }} level={4}>
          Employee Breaksheet
        </Title>

        <Space direction="vertical" style={{ display: 'block' }}>
          <Text style={{ display: 'inline' }} type="secondary">
            {`${days[date.getDay()]} ${dateDisplay}`}
            {', '}
            {timecardDisplay &&
              `${timecardDisplay.start ? timecardDisplay.start : ''} - ${
                timecardDisplay.end ? timecardDisplay.end : ''
              }`}
          </Text>
          <Text type="secondary">Kermit the Frog</Text>
        </Space>
      </div>
      <table>
        <thead>
          <tr className={styles.row}>
            <th className={styles.td}>Break Type</th>
            <th className={styles.td}>Start</th>
            <th className={styles.td}>End</th>
            <th className={styles.td}>Hours</th>
            <th className={styles.td}>Unpaid</th>
            <th className={styles.td}>Status</th>
            <th className={styles.td}>More</th>
          </tr>
        </thead>
        <tbody>
          {breaksheetData.map((breakRow, index) => {
            return (
              <BreaksheetRow
                key={index}
                date={breakRow.date}
                timesheetData={timesheetData}
                breaksheetData={breakRow}
              />
            );
          })}
        </tbody>
        <tfoot>
          <tr className={styles.rowSummary}>
            <td className={styles.td}></td>
            <td className={styles.breakHours}>Unpaid Break Hours</td>
            <td className={styles.summaryHours}>{breakDeductions}</td>
            <td className={styles.td}></td>
            <td className={styles.td}></td>
          </tr>
        </tfoot>
      </table>
    </Modal>
  );
};

export default BreakModal;
