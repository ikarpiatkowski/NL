'use client';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ energy }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Calories (Energy)',
          data: [110, 16, 59, 119, 113, 28, energy],
          borderColor: 'rgb(139 92 246)',
          backgroundColor: 'rgb(139 92 246)',
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: 'top',
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, [energy]);

  return (
    <>
      <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 rounded-lg dark:bg-neutral-900 bg-white">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default BarChart;
