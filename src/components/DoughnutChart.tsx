'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ protein, fat, carb, sugar }: any) {
  let percentageProtein = (
    (protein / (protein + fat + carb + sugar)) *
    100
  ).toFixed(1);
  let percentageFat = ((fat / (protein + fat + carb + sugar)) * 100).toFixed(1);
  let percentageCarbs = ((carb / (protein + fat + carb + sugar)) * 100).toFixed(
    1
  );
  let percentageSugar = (
    (sugar / (protein + fat + carb + sugar)) *
    100
  ).toFixed(1);

  const data = {
    labels: ['Protein', 'Fat', 'Carbs', 'Sugar'],
    datasets: [
      {
        label: '% of total',
        data: [
          percentageProtein,
          percentageFat,
          percentageCarbs,
          percentageSugar,
        ],
        backgroundColor: [
          'rgb(34 197 94)',
          'rgb(239 68 68)',
          'rgb(168 85 247)',
          'rgb(236 72 153)',
        ],
        borderColor: ['rgb(0, 0, 0)'],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
}
