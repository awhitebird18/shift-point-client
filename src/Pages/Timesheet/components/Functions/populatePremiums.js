export const populatePremiums = (timedata, premiums, earningList) => {
  const updatedTimedata = timedata.map((timeEl) => {
    if (!timeEl.unsaved || !timeEl.start || !timeEl.end) return timeEl;

    premiums.forEach((premium) => {
      // Check if day is eligible
      const dayIsEligible = premium[timeEl.date.getDay()];

      if (!dayIsEligible) {
        return;
      }

      //   Check if position is eligible
      const positionIsEligible = premium.positions.findIndex((el) => {
        return el === timeEl.positionId;
      });

      if (positionIsEligible === -1) {
        return;
      }

      // Check is time is eligible
      const premiumStart = new Date(
        `${timeEl.date.getFullYear()}-${
          timeEl.date.getMonth() + 1
        }-${timeEl.date.getDate()} ${dayIsEligible.start}`
      );
      const premiumEnd = new Date(
        `${timeEl.date.getFullYear()}-${
          timeEl.date.getMonth() + 1
        }-${timeEl.date.getDate()} ${dayIsEligible.end}`
      );

      const premiumEarning = earningList.find((el) => {
        return el._id === premium.earningId;
      });

      const premiumEntry = {
        start: "",
        end: "",
        premiumId: premium._id,
        rate: premiumEarning.rate,
      };

      if (
        Math.abs(timeEl.start.getTime() - premiumStart.getTime()) >
        premium.threshold * 60 * 60 * 1000
      ) {
        return;
      }

      //   Handle Start
      if (
        timeEl.start.getTime() >= premiumStart.getTime() &&
        timeEl.start.getTime() < premiumEnd.getTime()
      ) {
        premiumEntry.start = timeEl.start;
      } else if (
        timeEl.start.getTime() < premiumStart.getTime() &&
        premiumStart.getTime() < timeEl.end.getTime()
      ) {
        if (premium.strict) {
          premiumEntry.start = premiumStart;
        } else {
          premiumEntry.start = timeEl.start;
        }
      } else {
        return;
      }

      // Handle End
      if (timeEl.end.getTime() <= premiumEnd.getTime()) {
        premiumEntry.end = timeEl.end;
      } else if (timeEl.end.getTime() > premiumEnd.getTime()) {
        if (premium.strict) {
          premiumEntry.end = premiumEnd;
        } else {
          premiumEntry.end = timeEl.end;
        }
      }

      const premiumIndex = timeEl.premiums.findIndex((premiumEl) => {
        return premiumEl.premiumId === premium._id;
      });

      if (premiumIndex === -1) {
        timeEl.premiums.push(premiumEntry);
      } else {
        timeEl.premiums.splice(premiumIndex, 1, premiumEntry);
      }
    });

    return timeEl;
  });

  return updatedTimedata;
};
