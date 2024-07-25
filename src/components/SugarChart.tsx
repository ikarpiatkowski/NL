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
export const SugarChart = ({ sugars, sugarTarget }: any) => {
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
        label: 'Target sugar',
        borderColor: 'rgb(59 130 246)',
        borderWidth: 2,
        fill: false,
        data: [
          sugarTarget,
          sugarTarget,
          sugarTarget,
          sugarTarget,
          sugarTarget,
          sugarTarget,
          sugarTarget,
        ],
      },
      {
        type: 'bar' as const,
        label: 'Sugar consumed',
        backgroundColor: 'rgb(236 72 153)',
        data: [
          sugars.sugar7,
          sugars.sugar6,
          sugars.sugar5,
          sugars.sugar4,
          sugars.sugar3,
          sugars.sugar2,
          sugars.sugar1,
        ],
        borderColor: 'rgb(0 0 0)',
        borderWidth: 2,
      },
    ],
  };

  return <Chart type="bar" data={data} />;
};
