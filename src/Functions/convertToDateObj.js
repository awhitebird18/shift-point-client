import dayjs from "dayjs";

export const convertTimeToDate = (shift) => {
  const shiftCopy = { ...shift };

  if (!dayjs.isDayjs(shiftCopy.start)) {
    shiftCopy.start = dayjs(
      `${shiftCopy.date.format("MM-DD-YYYY")} ${shiftCopy.start}`,
      "MM-DD-YYYY hh:mm"
    );
  }

  if (!dayjs.isDayjs(shiftCopy.end)) {
    shiftCopy.end = dayjs(
      `${shiftCopy.date.format("MM-DD-YYYY")} ${shiftCopy.end}`,
      "MM-DD-YYYY hh:mm"
    );
  }

  if (+shiftCopy.start.format("HH") > 12 && shift.end.slice(-2) === "am") {
    shiftCopy.end = shiftCopy.end.add(1, "day");
  }

  return shiftCopy;
};
