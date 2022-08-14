// Functions
import { useFetch } from "../../../Hooks";
import dayjs from "dayjs";

// Components
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import TileLayout from "../TileLayout/TileLayout";
Chart.register(...registerables);

const TimesheetStatusGraph = () => {
  const [timesheetRules] = useFetch("/timesheetrules");
  const [weeklyStats] = useFetch(
    `/timesheet/currentWeekHours`,
    { start: "0" },
    timesheetRules
  );

  const chartLabels = weeklyStats?.dailyTotals.map((el) => {
    return dayjs(el.date).format("MMM D");
  });

  const approvedData = weeklyStats?.dailyTotals.map((el) => {
    return el.approvedHours;
  });

  const pendingData = weeklyStats?.dailyTotals.map((el) => {
    return el.pendingHours;
  });

  return (
    <TileLayout title="Weekly Hours By Status">
      <div
        style={{
          height: "100%",
        }}
      >
        <Bar
          id="weeklyHoursStatus"
          datasetIdKey="weeklyHoursStatus"
          data={{
            labels: chartLabels,
            datasets: [
              {
                id: 1,
                label: "Approved Hours",
                data: approvedData,
                backgroundColor: "#40a9ff",
                stack: "Stack 0",
                borderRadius: 3,
              },
              {
                id: 2,
                label: "Pending Hours",
                data: pendingData,
                backgroundColor: "#ff7875",
                stack: "Stack 0",
                borderRadius: 3,
              },
            ],
          }}
          options={{
            // responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginsAtZero: true,
                stacked: true,
              },
              y: {
                beginsAtZero: true,
                stacked: true,
              },
            },
          }}
        />
      </div>
    </TileLayout>
  );
};

export default TimesheetStatusGraph;
