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
export const ProteinChart = ({ proteins, proteinTarget }: any) => {
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
          proteinTarget,
          proteinTarget,
          proteinTarget,
          proteinTarget,
          proteinTarget,
          proteinTarget,
          proteinTarget,
        ],
      },
      {
        type: 'bar' as const,
        label: 'Calories consumed',
        backgroundColor: 'rgb(34 197 94)',
        data: [
          proteins.protein7,
          proteins.protein6,
          proteins.protein5,
          proteins.protein4,
          proteins.protein3,
          proteins.protein2,
          proteins.protein1,
        ],
        borderColor: 'rgb(0 0 0)',
        borderWidth: 2,
      },
    ],
  };

  return <Chart type="bar" data={data} />;
};
