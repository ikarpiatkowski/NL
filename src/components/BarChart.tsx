'use client';
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);
export const BarChart = ({
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  caloriesTaget,
}: any) => {
  const labels = [
    '7 days ago',
    '6 days ago',
    '5 days ago',
    '4 days ago',
    '3 days ago',
    'Yesterday',
    'Today',
  ];

  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Target calories',
        borderColor: 'rgb(239 68 68)',
        borderWidth: 2,
        fill: false,
        data: [
          caloriesTaget,
          caloriesTaget,
          caloriesTaget,
          caloriesTaget,
          caloriesTaget,
          caloriesTaget,
          caloriesTaget,
        ],
      },
      {
        type: 'bar' as const,
        label: 'Calories consumed',
        backgroundColor: 'rgb(250 204 21)',
        data: [day7, day6, day5, day4, day3, day2, day1],
        borderColor: 'rgb(0 0 0)',
        borderWidth: 2,
      },
    ],
  };

  return <Chart type="bar" data={data} />;
};
