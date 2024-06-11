import React from "react";
import { Doughnut } from "react-chartjs-2";
import { countBy } from "lodash";
import { Status } from "../generatedCode/src/generatedCode/generated"; // Angepasster Pfad

interface IStatusChartProps {
  data: Status[];
}

const StatusChart: React.FC<IStatusChartProps> = ({ data }) => {
  const statusGrouped = countBy(data);
  const values = Object.keys(statusGrouped).map(key => {
    const statusKey = Number(key) as Status;
    return {
      key: (Status[statusKey]), // Assuming Status enum has keys like "_0", "_1"
      value: statusGrouped[key],
      color: statusKey === Status._0 ? "red" : "green" // Colors based on status value
    };
  });

  const chartData = {
    labels: values.map(v => v.key),
    datasets: [{
      data: values.map(v => v.value),
      backgroundColor: values.map(v => v.color)
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  if (Object.keys(statusGrouped).length === 0) {
    return <em>{("No data to display")}</em>;
  }

  return <Doughnut data={chartData} options={options} />;
};

export default StatusChart;
