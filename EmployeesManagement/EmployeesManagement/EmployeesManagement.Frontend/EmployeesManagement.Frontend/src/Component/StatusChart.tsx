import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { countBy } from "lodash";
import { Status } from "../generatedCode/src/generatedCode/generated"; // Adjust this import path based on your project structure
import { ChartData, ChartDataset } from "chart.js";

// Register the components
Chart.register(ArcElement, Tooltip, Legend);

interface IStatusChartProps {
  data: Status[];
}

function StatusChart(props: IStatusChartProps) {
  const { data } = props;
  const statusGrouped = countBy(data);
  const values: { key: string; value: number; color: string }[] = [];
  const Colors: { [key: string]: string } = {
    _0: "green",
    _1: "red",
  };

  for (const key of Object.keys(statusGrouped)) {
    values.push({
      key: key,
      value: statusGrouped[key],
      color: Colors[key] || "gray", // Default color 
    });
  }

  const dataSet: ChartDataset<"doughnut", number[]> = {
    label: "Status",
    backgroundColor: values.map((x) => x.color),
    data: values.map((x) => x.value),
  };

  const chartData: ChartData<"doughnut"> = {
    labels: values.map((x) => x.key),
    datasets: [dataSet],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  if (Object.keys(statusGrouped).length === 0) {
    return <em>No data to display</em>;
  }

  return (
    <>
      <div style={{ width: '300px', height: '400px', margin: '0 auto' }}>
        <Doughnut data={chartData} options={options} />
      </div>
      
    </>
  );
}

export default StatusChart;
