// Components
import TileLayout from "../TileLayout/TileLayout";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

// Functions
import { useFetch } from "../../../Hooks";

const TimesheetEarningGraph = () => {
  const [timesheetRules] = useFetch("/timesheetrules");
  const [weeklyStats] = useFetch(
    `/timesheet/weeklyEarningBreakdown`,
    { start: "0" },
    timesheetRules
  );

  const chartLabels = weeklyStats?.map((el) => {
    return el.earningName;
  });

  const earningHours = weeklyStats?.map((el) => {
    return el.hours;
  });

  return (
    <TileLayout
      title="Weekly Hours By Earning"
      contentStyles={{ position: "relative" }}
    >
      {weeklyStats && (
        <Bar
          id="earningType"
          datasetIdKey="earningType"
          data={{
            labels: chartLabels,
            datasets: [
              {
                id: 1,
                label: "Total Hours",
                data: earningHours,
                backgroundColor: "#40a9ff",
                borderRadius: 5,
              },
            ],
          }}
          options={{
            response: true,
            maintainAspectRatio: false,

            scales: {
              x: {
                beginsAtZero: true,
                color: "white",
              },
              y: {
                beginsAtZero: true,
                borderWidth: 0,
              },
            },
          }}
        />
      )}
    </TileLayout>
  );
};

export default TimesheetEarningGraph;
