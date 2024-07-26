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
export const FatChart = ({ fats, fatTarget }: any) => {
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
          fatTarget,
          fatTarget,
          fatTarget,
          fatTarget,
          fatTarget,
          fatTarget,
          fatTarget,
        ],
      },
      {
        type: 'bar' as const,
        label: 'Calories consumed',
        backgroundColor: 'rgb(239 68 68)',
        data: [
          fats.fat7,
          fats.fat6,
          fats.fat5,
          fats.fat4,
          fats.fat3,
          fats.fat2,
          fats.fat1,
        ],
        borderColor: 'rgb(0 0 0)',
        borderWidth: 2,
      },
    ],
  };

  return <Chart type="bar" data={data} />;
};
