import { useState, useEffect } from "react";

import axios from "axios";

const useFetch = (type, queryObj, dependancy) => {
  const [data, setData] = useState();

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
    async function fetchData() {
      if (queryObj && queryStr === "?") {
        return;
      }

      const url = `${type}${queryStr !== "?" ? queryStr : ""}`;

      if (isApiSubscribed) {
        try {
          let { data } = await axios.get(url);

          data = data.data;

          setData(data);
        } catch (e) {}
      }
    }

    fetchData();

    return () => {
      isApiSubscribed = false;
    };
  }, [dependancy ? dependancy : null]);

  return [data, setData];
};

export default useFetch;
