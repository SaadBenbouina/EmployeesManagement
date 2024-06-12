import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import { groupBy } from "lodash";
import { Person } from "../generatedCode/src/generatedCode/generated"; // Adjust this import path based on your project structure
import { ChartData, ChartDataset } from "chart.js";

// Register the components
Chart.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

interface ICountPerDepartmentBarChartProps {
  data: Person[];
}

function CountPerDepartmentBarChart(props: ICountPerDepartmentBarChartProps) {
  const { data } = props;

  const groupedByDepartment = groupBy(data, 'departement');
  const values: { key: string; value: number }[] = [];

  for (const key of Object.keys(groupedByDepartment)) {
    values.push({
      key: key,
      value: groupedByDepartment[key].length,
    });
  }

  const dataSet: ChartDataset<"bar", number[]> = {
    label: "Number of Persons",
    backgroundColor: "#4CAF50", // Adjust color as needed
    borderColor: "#4CAF50",
    data: values.map((x) => x.value),
  };

  const chartData: ChartData<"bar"> = {
    labels: values.map((x) => x.key),
    datasets: [dataSet],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  if (values.length === 0) {
    return <em>No data to display</em>;
  }

  return (
    <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default CountPerDepartmentBarChart;
