import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../State";

// Components
import PeriodSelect from "../PeriodSelect/PeriodSelect";

// Components
import Button from "../../../../Components/Button/Button";
import { Select } from "antd";
const { Option } = Select;
import { BsFilter } from "react-icons/bs";

// Styles
import styles from "./Main.module.css";

const FilterBar = ({
  dateRange,
  setDateRange,
  onSave,
  setShowExtendedFilters,
  timesheetFilter,
}) => {
  const dispatch = useDispatch();

  const { changeTimesheetSort, showModal } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleShowExportModal = (e) => {
    e.stopPropagation();
    showModal({ name: "TIMESHEET_EXPORT" });
  };

  const unsavedChanges = useSelector((state) => {
    return state.uiData.unsavedChanges;
  });

  const sortValue = useSelector((state) => {
    return state.filter.timesheetSort;
  });

  const filterButtonStyles =
    timesheetFilter.length > 0 && timesheetFilter[0].active
      ? "primary"
      : "secondary";

  return (
    <div className={styles.mainFilter}>
      <div className={`${styles.mainFilterLeft}`}>
        <Button
          onClick={() => setShowExtendedFilters((prev) => !prev)}
          type={filterButtonStyles}
          className={`hide--tablet ${styles.filter}`}
        >
          <BsFilter className={styles.icon} />
          Filter
        </Button>

        <Button type="secondary" className={`hide--tablet ${styles.sort}`}>
          <Select
            bordered={false}
            style={{
              zIndex: "2",
              width: "100%",
            }}
            onChange={(e) => changeTimesheetSort(e)}
            value={sortValue ? sortValue : "firstName"}
            defaultValue="firstName"
          >
            <Option value="firstName">Sort: First Name</Option>
            <Option value="lastName">Sort: Last Name</Option>
            <Option value="eeNum">Sort: Employee Number</Option>
            <Option value="homeDepartment">Sort: Department</Option>
          </Select>
        </Button>

        <Button
          type="secondary"
          className={styles.payPeriod}
          style={{ borderColor: "green !important" }}
        >
          <PeriodSelect
            setDateRange={setDateRange}
            style={{ zIndex: "2" }}
            dateRange={dateRange}
          />
        </Button>
      </div>

      <div className={styles.rightFilterSection}>
        <Button onClick={handleShowExportModal} type="secondary">
          Export
        </Button>
        <div className={styles.saveButton}>
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
