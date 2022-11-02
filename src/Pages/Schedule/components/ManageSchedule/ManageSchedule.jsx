import { useState } from "react";
import ScheduleList from "./ScheduleList";
import ScheduleAction from "./ScheduleAction";

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
