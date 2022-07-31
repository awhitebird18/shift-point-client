const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const timesheetRules = [
  {
    overtime: [
      {
        province: "Ontario",
        weekly: 44,
        daily: null,
      },
      {
        province: "Manitoba",
        weekly: 40,
        daily: 8,
      },
    ],

    breaks: [
      {
        breakTypeId: 1,
        name: "Break AM",
        hours: 0.25,
        start: 2.5,
        unpaid: false,
        strict: true,
      },
      {
        breakTypeId: 2,
        name: "Lunch",
        hours: 0.5,
        start: 5,
        unpaid: true,
        strict: true,
      },
      {
        breakTypeId: 3,
        name: "Break PM",
        hours: 0.25,
        start: 7,
        unpaid: false,
        strict: true,
      },
      // {
      //   breakTypeId: 4,
      //   name: 'Late Break',
      //   hours: 0.25,
      //   start: 9,
      //   unpaid: false,
      //   strict: true,
      // },
    ],
    rounding: {
      unscheduled: {
        start: {
          unit: 15,
          type: "next",
        },
        end: {
          unit: 15,
          type: "previous",
        },
      },
    },

    shiftLimits: {
      min: 3,
      max: 12,
    },
  },
];

fetch("${process.env.REACT_APP_BASE_URL}timesheetrules", {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  method: "POST",
  cors: "no-cors",
  body: JSON.stringify(timesheetRules),
})
  .then((response) => {
    return response.json();
  })
  .then((el) => {});

// export default timesheetRulesTest;
