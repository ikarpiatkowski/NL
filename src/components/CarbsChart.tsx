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
export const CarbsChart = ({
  carbs1,
  carbs2,
  carbs3,
  carbs4,
  carbs5,
  carbs6,
  carbs7,
  carbsTarget,
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
        label: 'Target carbs',
        borderColor: 'rgb(59 130 246)',
        borderWidth: 2,
        fill: false,
        data: [
          carbsTarget,
          carbsTarget,
          carbsTarget,
          carbsTarget,
          carbsTarget,
          carbsTarget,
          carbsTarget,
        ],
      },
      {
        type: 'bar' as const,
        label: 'Carbs consumed',
        backgroundColor: 'rgb(168 85 247)',
        data: [carbs7, carbs6, carbs5, carbs4, carbs3, carbs2, carbs1],
        borderColor: 'rgb(0 0 0)',
        borderWidth: 2,
      },
    ],
  };

  return <Chart type="bar" data={data} />;
};
