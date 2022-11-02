import React, { useEffect } from "react";
import { CSVDownload } from "react-csv";

const DownloadCSV = ({ data, setData }) => {
  useEffect(() => {
    return () => {
      setData(null);
    };
  }, []);

  return <CSVDownload data={data} />;
};

export default DownloadCSV;
