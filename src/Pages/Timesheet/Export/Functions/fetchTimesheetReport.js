export const fetchTimesheetReport = async (parameters) => {
  delete parameters.reportType;
  delete parameters.report;
  delete parameters.dateRange;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  let queryStr = "?";

  for (let parameter in parameters) {
    queryStr += `${parameter}=${parameters[parameter]}&`;
  }

  const res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/report/timesheet${queryStr}`,
    {
      headers,
      method: "GET",
    }
  );

  const { data } = await res.json();

  return data;
};
