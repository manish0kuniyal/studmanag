import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.year),
    datasets: [
      {
        label: 'Number of Jobs',
        data: data.map(d => d.totalJobs),
        fill: false,
        borderColor: '#9127c2',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">Number of Jobs Over Time</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
