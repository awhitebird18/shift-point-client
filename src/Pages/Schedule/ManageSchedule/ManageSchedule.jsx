import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import { BsCalendar4Week } from "react-icons/bs";
import ScheduleList from "./ScheduleList/ScheduleList";
import ScheduleAction from "./ScheduleAction";

// Styles
import styles from "./ManageSchedule.module.css";

const ManageSchedule = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <ScheduleAction setStep={setStep} />}
      {step === 2 && <ScheduleList setStep={setStep} />}
    </>
  );
};

export default ManageSchedule;
