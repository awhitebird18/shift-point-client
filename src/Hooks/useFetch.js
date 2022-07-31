import dayjs from "dayjs";
import { useState, useEffect } from "react";

const useFetch = (type, auth, dependancy, misc, queryObj) => {
  const [data, setData] = useState([]);

  let queryStr = `?`;

  if (queryObj) {
    for (const query in queryObj) {
      if (queryObj[query]) {
        queryStr += `${query}=${queryObj[query]}`;
      }
    }
  }

  useEffect(() => {
    let isApiSubscribed = true;

    if (queryObj && queryStr === "?") {
      return;
    }

    fetch(
      `${process.env.REACT_APP_BASE_URL}${type}${
        queryStr !== "?" ? queryStr : ""
      }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (isApiSubscribed) {
          // Can move sort to server via req.query
          if (misc === "sort") {
            data.data.sort(function (a, b) {
              let nameA;
              let nameB;
              if (type === "employee") {
                nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
                nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
              } else {
                nameA = a.name.toUpperCase(); // ignore upper and lowercase
                nameB = b.name.toUpperCase(); // ignore upper and lowercase
              }

              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            });
          }

          if (misc === "timeToObj") {
            data.data = data.data.map((el) => {
              return { ...el, time: dayjs(el.time) };
            });
          }

          if (misc === "convertDates") {
            data.data = data.data
              .map((el) => {
                return {
                  ...el,
                  start: new Date(el.start),
                  end: new Date(el.end),
                };
              })
              .sort((a, b) => a.start - b.start);
          }

          if (Array.isArray(data.data)) {
            setData([...data.data]);
          } else {
            setData(data.data);
          }
        }
      });

    return () => {
      isApiSubscribed = false;
    };
  }, [dependancy]);

  return [data, setData];
};

export default useFetch;
