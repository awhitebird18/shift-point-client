export const calculateShiftHours = (timedata) => {
  return (timedata.end.getTime() - timedata.start.getTime()) / 60 / 60 / 1000;
};
