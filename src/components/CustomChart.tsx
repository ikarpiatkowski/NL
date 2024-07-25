'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/componentsShadCn/ui/chart';

const chartConfig = {
  energy: {
    label: 'energy',
    color: '#facc15',
  },
  protein: {
    label: 'protein',
    color: '#a855f7',
  },
} satisfies ChartConfig;
export function CustomChart(calories: any) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={calories.calories}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="created_at"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 20)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="energy" fill="var(--color-energy)" radius={4} />
        <Bar dataKey="protein" fill="var(--color-protein)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
