'use client';

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
export const BarChart = ({ days, caloriesTaget }: any) => {
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
        borderColor: 'rgb(59 130 246)',
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
        data: [
          days.day7,
          days.day6,
          days.day5,
          days.day4,
          days.day3,
          days.day2,
          days.day1,
        ],
        borderColor: 'rgb(0 0 0)',
        borderWidth: 2,
      },
    ],
  };

  return <Chart type="bar" data={data} />;
};
