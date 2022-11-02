import TileLayout from "../TileLayout/TileLayout";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { useFetch } from "../../../../hooks";

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
      // contentStyles={{
      //   position: "relative !important",
      //   overflow: "hidden !important",
      //   width: "50%",
      // }}
    >
      <div
        style={{
          height: "100%",
        }}
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
                  borderRadius: 3,
                },
              ],
            }}
            options={{
              // responsive: true,
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
      </div>
    </TileLayout>
  );
};

export default TimesheetEarningGraph;
