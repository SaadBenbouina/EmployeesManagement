import React from "react";
import { Doughnut } from "react-chartjs-2";
import { countBy } from "lodash";
import { Status } from "../generatedCode/src/generatedCode/generated"; // Angepasster Pfad
import { ChartData, ChartDataset } from "chart.js";

interface IStatusChartProps {
  data: Status[];
}

function StatusChart(props: IStatusChartProps) {
  const  data  = props;
  const statusGrouped = countBy(data);
  const values = [];
  const Colors: { [key: string]: string } = {
    Active: "green",
    Inactive: "red",
  };
    for (const key of Object.keys(statusGrouped)) {
    const label = key;
    const typedColorString = label as keyof typeof Colors;
    values.push({
      key: key,
      value: statusGrouped[key],
      color: Colors[typedColorString],
    });
  }
  const dataSet: ChartDataset<"doughnut", number[]> = {
    label: "Status",
    backgroundColor: values.map((x) => x.color),
    data: values.map((x) => x.value),
  };

  const dataSets: ChartDataset<"doughnut", number[]>[] = [];
  dataSets.push(dataSet);
  const chartData: ChartData<"doughnut"> = {
    labels: values.map((x) => x.key),
    datasets: dataSets,
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

  return (
    <>
      <Doughnut data={chartData} options={options} />
      { 
        <div className="d-flex justify-content-around mb-0 mt-3">
          {values.map((x) => (
            <div key={x.key}>
              {(x.key)}
              <h3 className="font-weight-bold" style={{ color: x.color }}>
                {x.value}
              </h3>
            </div>
          ))}
        </div>
      }
    </>
  );
}

export default StatusChart;
