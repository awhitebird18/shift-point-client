// React & Redux
import { useState, useEffect, useMemo } from "react";
import TimecardLayout from "./TimecardLayout/TimecardLayout";
import { useFetch } from "../../Hooks";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../State/index.js";

// Components
import Filters from "./Filters/Filters";
import Modal from "./ExtendedTimecard/ExtendedTimecard";
import ModuleHeader from "./ModuleHeader/ModuleHeader";

// Styles
import styles from "./index.module.css";

// Data and Functions
import { getCurrentDate } from "./Functions/getCurrentDate";
import { timesheetFiltersSchema } from "../../Schemas/timesheetFiltersSchema";
import { convertToOptionsArr } from "./Functions/convertToOptions";
import { updateTimedata, updateBreakdata } from "./Functions/saveTimesheet.js";
import { timecardSchema } from "../../Schemas/timecardSchema.js";

const Timesheet = () => {
  let { timesheetDate, timecardId, isLoading } = useSelector((state) => {
    return state.uiData;
  });

  let { timesheet, breaksheet, timesheetrules } = useSelector((state) => {
    return state.timedata;
  });

  let { timesheetFilter } = useSelector((state) => {
    return state.filter;
  });
  let { timesheetSort } = useSelector((state) => {
    return state.filter;
  });

  const [dateRange, setDateRange] = useState({
    start: timesheetDate ? timesheetDate : getCurrentDate(),
    end: timesheetDate ? timesheetDate : getCurrentDate(),
  });
  const [timesheetFilters, setTimesheetFilters] = useState(
    timesheetFiltersSchema
  );
  const [departments] = useFetch("/department");
  const [earningCodes] = useFetch("/earning");
  const [premiums] = useFetch("/premium");
  const [employeeData] = useFetch("/employee");

  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const earningOptions = useMemo(() => {
    return convertToOptionsArr(earningCodes);
  }, [earningCodes]);

  const dateRangeHelper = useMemo(() => {
    let date = new Date(dateRange.start);
    const obj = [];

    while (date.getTime() <= dateRange.end.getTime()) {
      obj.push(new Date(date));

      date.setDate(date.getDate() + 1);
    }

    return obj;
  }, [dateRange]);

  const dispatch = useDispatch();

  const { fetchTimedata, storeTimedata, setIsLoading, fetchData } =
    bindActionCreators(actionCreators, dispatch);

  // Fetches timedata upon date change
  useEffect(() => {
    if (!employeeData || !dateRangeHelper || !dateRange) {
      return;
    }

    // setIsLoading(true);
    fetchTimedata(dateRange, "/timesheet", dateRangeHelper, employeeData);
    fetchTimedata(dateRange, "/breaksheet");
    fetchData("timesheetrules");

    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 300);
  }, [dateRange, employeeData, dateRangeHelper]);

  // Save Timesheets
  const onSave = async () => {
    setIsLoading(true);

    //Update Timesheet
    const updatedTimesheet = await updateTimedata(
      timesheet,
      breaksheet,
      employeeData,
      dateRangeHelper,
      earningCodes,
      premiums,
      timesheetrules
    );

    const updatedBreaksheet = updateBreakdata(breaksheet);

    // Save Timesheets
    fetch(`${process.env.REACT_APP_BASE_URL}/timesheet`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      cors: "no-cors",
      body: JSON.stringify(updatedTimesheet),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const result = [
          ...updatedTimesheet
            .filter((el) => {
              return !el.remove;
            })
            .map((el) => {
              return { ...el, unsaved: false };
            }),
        ];

        employeeData?.forEach((employee) => {
          dateRangeHelper.forEach((date) => {
            const index = result.findIndex((timedata) => {
              return (
                timedata.date.getTime() === date.getTime() &&
                employee.eeNum === timedata.eeNum
              );
            });

            if (index === -1) {
              result.push({
                ...timecardSchema,
                date,
                eeNum: employee.eeNum,
              });
            }
          });
        });

        storeTimedata(result, "timesheet");
      });

    // Save Breaks
    fetch(`${process.env.REACT_APP_BASE_URL}/breaksheet`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      cors: "no-cors",
      body: JSON.stringify(updatedBreaksheet),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const result = data.breaksheetsUpdated.map((el) => {
          return {
            ...el,
            date: new Date(el.date),
            start: el.start ? new Date(el.start) : "",
            end: el.end ? new Date(el.end) : "",
            auto: false,
          };
        });

        result.sort((a, b) => {
          return a.start - b.start;
        });
        storeTimedata(result, "breaksheet");

        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      });
  };

  // Filter Employees

  useEffect(() => {
    let employeesCopy = [];

    for (let i = 0; i < timesheetFilter.length; i++) {
      if (!timesheetFilter[i].active) {
        continue;
      }

      const tempArr = employeeData.filter((employee) => {
        if (timesheetFilter[i].subtype === "contains") {
          return employee[timesheetFilter[i].type]
            .toLowerCase()
            .includes(timesheetFilter[i].value.toLowerCase());
        } else if (timesheetFilter[i].subtype === "notcontains") {
          return !employee[timesheetFilter[i].type]
            .toLowerCase()
            .includes(timesheetFilter[i].value.toLowerCase());
        } else if (timesheetFilter[i].subtype === "exactly") {
          return (
            employee[timesheetFilter[i].type].toLowerCase() ===
            timesheetFilter[i].value.toLowerCase()
          );
        }
      });

      employeesCopy = employeesCopy.concat(tempArr);
    }

    const employeesFilteredMax = employeeData
      ?.filter((employee) => {
        let passed = true;
        const resultsArr = [];
        for (let i = 0; i < timesheetFilter.length; i++) {
          if (!timesheetFilter[i].active) {
            continue;
          }

          const { type, subtype, value, combinator } = timesheetFilter[i];

          if (timesheetFilter[i].type === "status") {
            const result = timesheet.some((el, index, arr) => {
              if (subtype === "is") {
                if (value === "empty") {
                  return !el.status && el.eeNum === employee.eeNum;
                }

                return el.status === value && el.eeNum === employee.eeNum;
              } else if (subtype === "isNot") {
                // Handle Empty/ Not Empty
                if (value === "empty") {
                  return el.status !== "" && el.eeNum === employee.eeNum;
                }
                // if (value === "notEmpty") {
                //   return (
                //     (el.status &&
                //       el.status !== statusFilter[0].value &&
                //       !el.unsaved) ||
                //     el.unsaved
                //   );
                // }
                // Else Do not return specified status
                return (
                  el.status &&
                  el.status !== value &&
                  el.eeNum === employee.eeNum
                );
              }
            });

            if (!result) {
              passed = false;
            }
            continue;
          }

          // Strings
          if (subtype === "contains") {
            employee[type]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
              ? resultsArr.push(true)
              : resultsArr.push(false);
          }

          if (subtype === "notcontains") {
            !employee[type]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
              ? resultsArr.push(true)
              : resultsArr.push(false);
          }

          if (subtype === "is" && type !== "status") {
            employee[type].toString().toLowerCase() === value.toLowerCase()
              ? resultsArr.push(true)
              : resultsArr.push(false);
          }
          if (subtype === "isNot") {
            employee[type].toString().toLowerCase() !== value.toLowerCase()
              ? resultsArr.push(true)
              : resultsArr.push(false);
          }

          if (subtype === "startsWith") {
            employee[type]
              .toString()
              .toLowerCase()
              .startsWith(value.toLowerCase())
              ? resultsArr.push(true)
              : resultsArr.push(false);
          }

          // Arrays
          if (subtype === "isAnyOf" && type === "positionId") {
            value.some((a) => {
              return employee.positions.find((position) => {
                return position.positionId === a;
              });
            })
              ? resultsArr.push(true)
              : resultsArr.push(false);
          }

          if (subtype === "isNotAnyOf" && type === "positionId") {
            value.some((a) => {
              return employee.positions.find((position) => {
                return position.positionId === a;
              });
            })
              ? resultsArr.push(true)
              : resultsArr.push(false);
          }

          if (subtype === "isAnyOf") {
            value.some((a) => a === employee.homeDepartment)
              ? resultsArr.push(true)
              : resultsArr.push(false);
          }

          if (subtype === "isNotAnyOf") {
            value.some((a) => a === employee.homeDepartment)
              ? resultsArr.push(true)
              : resultsArr.push(false);
          }

          if (combinator === "and") {
            if (resultsArr.some((a) => a !== true)) {
              passed = false;
              break;
            }
          } else if (i === timesheetFilter.length - 1) {
            if (resultsArr.every((a) => a === false)) {
              passed = false;
            }
          }
        }

        if (passed === true) {
          return employee;
        }
      })
      .sort((a, b) => {
        if (timesheetSort) {
          if (
            timesheetSort === "firstName" ||
            timesheetSort === "lastName" ||
            timesheetSort === "homeDepartment"
          ) {
            return a[timesheetSort]
              .toString()
              .localeCompare(b[timesheetSort].toString());
          } else {
            return a[timesheetSort] - b[timesheetSort];
          }
        } else {
          return a.firstName.localeCompare(b.firstName);
        }
      });

    setFilteredEmployees(employeesFilteredMax);
  }, [employeeData, timesheetFilter, timesheet, timesheetSort]);

  return (
    <div className={styles.slideIn}>
      <ModuleHeader />

      {departments && (
        <Filters
          dateRange={dateRange}
          setDateRange={setDateRange}
          setTimesheetFilters={setTimesheetFilters}
          onSave={onSave}
          departments={departments}
        />
      )}

      <div className={styles.timecardContainer}>
        {departments &&
          filteredEmployees?.map((employee, index) => {
            return (
              <TimecardLayout
                key={index}
                employee={employee}
                dateRange={dateRange}
                dateRangeHelper={dateRangeHelper}
                departments={departments}
                earningOptions={earningOptions}
              />
            );
          })}
      </div>

      {timecardId && <Modal timecardId={timecardId} />}
    </div>
  );
};

export default Timesheet;
