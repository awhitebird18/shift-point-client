const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const startDate = new Date(`2021-12-25 11:00 PM`);
const endDate = new Date(`2021-12-31 11:00 PM`);
const payDate = new Date(`2022-01-05 11:00 PM`);

const biWeekly = 26;
const weekly = 52;
const monthly = 12;
const semiMonthly = 24;

const payPeriods = [];

for (let i = 0; i < weekly; i++) {
  const payPeriod = {
    start: new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000 * i),
    end: new Date(endDate.getTime() + 7 * 24 * 60 * 60 * 1000 * i),
    pay: new Date(payDate.getTime() + 7 * 24 * 60 * 60 * 1000 * i),
    name: `OT Period ${i + 1}`,
  };
  payPeriods.push(payPeriod);
}

payPeriods.sort((a, b) => {
  return a.start.getTime() - b.start.getTime();
});

try {
  fetch("${process.env.REACT_APP_BASE_URL}overtimeschedule", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    cors: "no-cors",
    body: JSON.stringify(payPeriods),
  });
} catch (e) {}
