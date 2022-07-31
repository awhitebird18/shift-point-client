// function convertToHours12(dateObj) {
//   const dateObjFormatted = new Date(dateObj);
//   if (!dateObj) {
//     return;
//   }

//   let padHours = '';
//   let padMinutes = '';

//   dateObjFormatted.getHours() > 12
//     ? (padHours = (dateObjFormatted.getHours() - 12).toString().padStart(2, '0'))
//     : (padHours = dateObjFormatted.getHours().toString().padStart(2, '0'));

//   if (dateObjFormatted.getMinutes() < 10) {
//     padMinutes = dateObjFormatted.getMinutes().toString().padStart(2, '0');
//   } else {
//     padMinutes = dateObjFormatted.getMinutes().toString().padEnd(2, '0');
//   }

//   let time = `${padHours}:${padMinutes}`;

//   time = dateObjFormatted.getHours() >= 12 ? `${time} pm` : `${time} am`;

//   return time;
// }

// // Set Date Range given two datess
// function getTimecard(timecard) {
//   if (!timecard.start || !timecard.end || !timecard.earning || !timecard.hours) {
//     return;
//   }
//   const index = timesheetData.findIndex((el) => {
//     return el.id === timecard.id;
//   });

//   if (index === -1) {
//     timesheetData.push(timecard);
//   } else {
//     timesheetData.splice(index, 1, timecard);
//   }
// }

// const breakDeductions = breaksheetData.reduce((prev, curr) => {
//   if (curr.timesheet === timecard.id && curr.unpaid) {
//     return (prev += curr.hours);
//   }
//   return prev;
// }, 0);

// if (timeReg.test(input.value) && timeReg.test(timecard.end)) {
//   timecard.hours =
//     (new Date(`${dateFormatted} ${timecard.end}`).getTime() -
//       new Date(`${dateFormatted} ${input.value}`).getTime()) /
//       60 /
//       60 /
//       1000 -
//     breakDeductions;

//   if (timecard.hours < 0) {
//     timecard.hours =
//       (new Date(timecard.end).getTime() - new Date(`${dateFormatted} ${input.value}`).getTime()) /
//         60 /
//         60 /
//         1000 -
//       breakDeductions;
//   }
// }

// // const breakDeductions = breaksheetData.reduce((prev, curr) => {
// //   if (curr.timesheet === timesheetData[timecardIndex].id && curr.unpaid) {
// //     return (prev += curr.hours);
// //   }
// //   return prev;
// // }, 0);

// if (timeReg.test(timecard.start) && timeReg.test(input.value)) {
//   timecard.hours =
//     (new Date(`${dateFormatted} ${input.value}`).getTime() -
//       new Date(`${dateFormatted} ${timecard.start}`).getTime()) /
//       3600000 -
//     breakDeductions;

//   if (timecard.hours < 0) {
//     timecard.hours =
//       (new Date(
//         `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1} ${input.value}`
//       ).getTime() -
//         new Date(
//           `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${timecard.start}`
//         ).getTime()) /
//         3600000 -
//       breakDeductions;
//   }
// } else {
//   timecard.hours = '';
// }
