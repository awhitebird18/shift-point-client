export const getCurrentDate = () => {
  const currentTimestamp = new Date(Date.now());
  const currentYear = currentTimestamp.getFullYear();
  const currentMonth = currentTimestamp.getMonth();
  const currentDate = currentTimestamp.getDate();

  return new Date(currentYear, currentMonth, currentDate);
};
