function handleBreakChange(el, e) {
  setBreaksheetData((prev) => {
    let hours;
    const breakIndex = prev.findIndex((breakEl) => {
      return breakEl.id === el.id;
    });

    if (!breakIndex) {
      return prev;
    }

    if (e.target.name === 'breakTypeId') {
      prev[breakIndex] = { ...el, [e.target.name]: +e.target.value };
      return [...prev];
    }
    if (e.target.name === 'unpaid') {
      prev[breakIndex] = { ...el, [e.target.name]: e.target.checked };
      return [...prev];
    }

    if (e.target.name === 'start') {
      if (prev[breakIndex].end) {
        hours =
          (prev[breakIndex].end.getTime() -
            new Date(`${dateFormatted} ${e.target.value}`).getTime()) /
          60 /
          60 /
          1000;

        if (hours < 0) {
          hours =
            (prev[breakIndex].end.getTime() -
              new Date(`${dateFormatted} ${e.target.value}`).getTime()) /
            60 /
            60 /
            1000;
        }
      }
      const timeReg = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|am|PM|pm)$/;

      prev[breakIndex] = {
        ...el,
        [e.target.name]: timeReg.test(e.target.value)
          ? new Date(`${dateFormatted} ${e.target.value}`)
          : e.target.value,
        hours: hours && hours > 0 ? +hours.toFixed(2) : '',
        auto: false,
      };

      return [...prev];
    }

    if (e.target.name === 'end') {
      if (prev[breakIndex].start && typeof prev[breakIndex].start === 'object') {
        hours =
          (new Date(`${dateFormatted} ${e.target.value}`).getTime() -
            prev[breakIndex].start.getTime()) /
          60 /
          60 /
          1000;

        if (hours < 0) {
          hours =
            (new Date(
              `${date.getFullYear()}-${date.getMonth()}-${date.getDate() + 1} ${e.target.value}`
            ).getTime() -
              prev[breakIndex].start.getTime()) /
            60 /
            60 /
            1000;
        }
      }
      const timeReg = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|am|PM|pm)$/;

      prev[breakIndex] = {
        ...el,
        [e.target.name]: timeReg.test(e.target.value)
          ? new Date(`${dateFormatted} ${e.target.value}`)
          : e.target.value,
        hours: hours && hours > 0 ? +hours.toFixed(2) : '',
        auto: false,
      };

      return [...prev];
    }

    // if (e.target.name === 'hours') {
    //   set;
    // }

    return prev;
  });

  // const timeReg = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|am|PM|pm)$/;
  // if (timeReg.test(e.target.value)) {
  //   handleChange();
  // }
  const timeReg = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|am|PM|pm)$/;
  if (!timeReg.test(e.target.value)) {
    return;
  }
  setBreakChange((prev) => {
    return !prev;
  });

  if (e.target.name === 'start') {
    // const timeReg = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|am|PM|pm)$/;
    // if (!timeReg.test(e.target.value)) {
    //   return;
    // }
    // setTimecard((prev) => {
    //   const breakDeductions = breaksheetData.reduce((prev, curr) => {
    //     if (curr.timesheet === timecard.id && curr.unpaid) {
    //       return (prev += curr.hours);
    //     }
    //     return prev;
    //   }, 0);
    //   let hours = (prev.end.getTime() - prev.start.getTime()) / 60 / 60 / 1000 - breakDeductions;
    //   if (hours < 0) {
    //     hours = (prev.end.getTime() - prev.start.getTime()) / 60 / 60 / 1000 - breakDeductions;
    //   }
    //   return { ...prev, hours: hours ? +hours.toFixed(2) : '' };
    // });
  }
}

// calculate break deductions and recalculate timesheet hours when break changes
// useEffect(() => {
//   setTimecard((prev) => {
//     const breakDeductions = breaksheetData.reduce((prev, curr) => {
//       if (curr.timesheet === timecard.id && curr.unpaid) {
//         return (prev += curr.hours);
//       }
//       return prev;
//     }, 0);

//     if (!prev.end || !prev.start) {
//       return { ...prev };
//     }

//     if (typeof prev.end !== 'object' || typeof prev.start !== 'object') {
//       return;
//     }

//     return {
//       ...prev,
//       hours: (prev.end.getTime() - prev.start.getTime()) / 60 / 60 / 1000 - breakDeductions,
//     };
//   });
// }, [breakChange]);

// if (!evt) {
//   const breakDeductions = breaksheetData.reduce((prev, curr) => {
//     if (curr.timesheet === timecard[timecardIndex].id && curr.unpaid) {
//       return (prev += curr.hours);
//     }
//     return prev;
//   }, 0);

//   return {
//     ...prev,
//     hours: (prev.end.getTime() - prev.start.getTime()) / 60 / 60 / 1000 - breakDeductions,
//   };
// }

<td className={styles.date} onClick={() => handleOpenMenu()}>
  {index === 0 ? `${days[date.getDay()].substring(0, 3)} ${dateDisplay}` : ''}
  {showMenu && (
    <ul className={styles.contextMenu}>
      {/* <li className={styles.button}>Timesheet Actions</li> */}
      <li className={styles.button} onClick={() => addNewTimesheet(timecardDisplay)}>
        Add Timecard
      </li>
      <li className={`${styles.button} remove`} onClick={(e) => handleChange(e)}>
        Remove Timecard
      </li>
      <li className={`${styles.button} revert`}>Revert Timecard</li>
    </ul>
  )}
</td>;
