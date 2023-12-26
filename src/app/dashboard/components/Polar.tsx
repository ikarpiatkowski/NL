'use client';
import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Calories', 'Carbs', 'Fat', 'Sugar', 'Protein', 'Fiber'],
  datasets: [
    {
      label: '% of Daily Nutrition Values',
      data: [99, 70, 100, 55, 62, 83],
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(255, 159, 64)',
      ],
      borderWidth: 1,
    },
  ],
};

export function Polar() {
  return <PolarArea data={data} />;
}
