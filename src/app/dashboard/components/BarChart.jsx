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

const BarChart = ({ day1, day2, day3, day4, day5, day6, day7 }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: [
        '7 days ago',
        '6 days ago',
        '5 days ago',
        '4 days ago',
        '3 days ago',
        'Yesterday',
        'Today',
      ],
      datasets: [
        {
          label: 'Calories consumed',
          data: [day7, day6, day5, day4, day3, day2, day1],
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
  }, [day1, day2, day3, day4, day5, day6, day7]);

  return (
    <>
      <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 rounded-lg dark:bg-neutral-900 bg-white">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default BarChart;
