'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const chartData = [
  { date: '2024-04-01', weight: 93, caloriesProcentage: 0 },
  { date: '2024-04-02', weight: 92, caloriesProcentage: 10 },
  { date: '2024-04-03', weight: 91, caloriesProcentage: 20 },
  { date: '2024-04-04', weight: 92, caloriesProcentage: 15 },
  { date: '2024-04-05', weight: 91, caloriesProcentage: 25 },
  { date: '2024-04-06', weight: 90, caloriesProcentage: 30 },
  { date: '2024-04-07', weight: 91, caloriesProcentage: 20 },
  { date: '2024-04-08', weight: 90, caloriesProcentage: 35 },
  { date: '2024-04-09', weight: 89, caloriesProcentage: 5 },
  { date: '2024-04-10', weight: 88, caloriesProcentage: 15 },
  { date: '2024-04-11', weight: 89, caloriesProcentage: 30 },
  { date: '2024-04-12', weight: 88, caloriesProcentage: 10 },
  { date: '2024-04-13', weight: 87, caloriesProcentage: 40 },
  { date: '2024-04-14', weight: 88, caloriesProcentage: 20 },
  { date: '2024-04-15', weight: 87, caloriesProcentage: 15 },
  { date: '2024-04-16', weight: 88, caloriesProcentage: 10 },
  { date: '2024-04-17', weight: 87, caloriesProcentage: 35 },
  { date: '2024-04-18', weight: 86, caloriesProcentage: 40 },
  { date: '2024-04-19', weight: 85, caloriesProcentage: 20 },
  { date: '2024-04-20', weight: 84, caloriesProcentage: 10 },
  { date: '2024-04-21', weight: 85, caloriesProcentage: 25 },
  { date: '2024-04-22', weight: 84, caloriesProcentage: 15 },
  { date: '2024-04-23', weight: 83, caloriesProcentage: 30 },
  { date: '2024-04-24', weight: 82, caloriesProcentage: 25 },
  { date: '2024-04-25', weight: 81, caloriesProcentage: 35 },
  { date: '2024-04-26', weight: 80, caloriesProcentage: 5 },
  { date: '2024-04-27', weight: 79, caloriesProcentage: 45 },
  { date: '2024-04-28', weight: 78, caloriesProcentage: 20 },
  { date: '2024-04-29', weight: 77, caloriesProcentage: 30 },
  { date: '2024-04-30', weight: 76, caloriesProcentage: 40 },
  { date: '2024-05-01', weight: 77, caloriesProcentage: 20 },
  { date: '2024-05-02', weight: 76, caloriesProcentage: 35 },
  { date: '2024-05-03', weight: 75, caloriesProcentage: 10 },
  { date: '2024-05-04', weight: 74, caloriesProcentage: 45 },
  { date: '2024-05-05', weight: 73, caloriesProcentage: 40 },
  { date: '2024-05-06', weight: 72, caloriesProcentage: 50 },
  { date: '2024-05-07', weight: 73, caloriesProcentage: 30 },
  { date: '2024-05-08', weight: 72, caloriesProcentage: 25 },
  { date: '2024-05-09', weight: 71, caloriesProcentage: 20 },
  { date: '2024-05-10', weight: 70, caloriesProcentage: 35 },
  { date: '2024-05-11', weight: 69, caloriesProcentage: 25 },
  { date: '2024-05-12', weight: 68, caloriesProcentage: 30 },
  { date: '2024-05-13', weight: 67, caloriesProcentage: 15 },
  { date: '2024-05-14', weight: 66, caloriesProcentage: 55 },
  { date: '2024-05-15', weight: 65, caloriesProcentage: 40 },
  { date: '2024-05-16', weight: 64, caloriesProcentage: 45 },
  { date: '2024-05-17', weight: 63, caloriesProcentage: 50 },
  { date: '2024-05-18', weight: 62, caloriesProcentage: 35 },
  { date: '2024-05-19', weight: 61, caloriesProcentage: 20 },
  { date: '2024-05-20', weight: 60, caloriesProcentage: 30 },
  { date: '2024-05-21', weight: 59, caloriesProcentage: 10 },
  { date: '2024-05-22', weight: 58, caloriesProcentage: 15 },
  { date: '2024-05-23', weight: 57, caloriesProcentage: 25 },
  { date: '2024-05-24', weight: 56, caloriesProcentage: 20 },
  { date: '2024-05-25', weight: 55, caloriesProcentage: 30 },
  { date: '2024-05-26', weight: 54, caloriesProcentage: 15 },
  { date: '2024-05-27', weight: 53, caloriesProcentage: 60 },
  { date: '2024-05-28', weight: 52, caloriesProcentage: 10 },
  { date: '2024-05-29', weight: 51, caloriesProcentage: 15 },
  { date: '2024-05-30', weight: 50, caloriesProcentage: 25 },
  { date: '2024-05-31', weight: 49, caloriesProcentage: 30 },
  { date: '2024-06-01', weight: 48, caloriesProcentage: 20 },
  { date: '2024-06-02', weight: 47, caloriesProcentage: 45 },
  { date: '2024-06-03', weight: 46, caloriesProcentage: 10 },
  { date: '2024-06-04', weight: 45, caloriesProcentage: 40 },
  { date: '2024-06-05', weight: 44, caloriesProcentage: 10 },
  { date: '2024-06-06', weight: 43, caloriesProcentage: 30 },
  { date: '2024-06-07', weight: 42, caloriesProcentage: 35 },
  { date: '2024-06-08', weight: 41, caloriesProcentage: 30 },
  { date: '2024-06-09', weight: 40, caloriesProcentage: 50 },
  { date: '2024-06-10', weight: 39, caloriesProcentage: 20 },
  { date: '2024-06-11', weight: 38, caloriesProcentage: 10 },
  { date: '2024-06-12', weight: 37, caloriesProcentage: 45 },
  { date: '2024-06-13', weight: 36, caloriesProcentage: 10 },
  { date: '2024-06-14', weight: 35, caloriesProcentage: 40 },
  { date: '2024-06-15', weight: 34, caloriesProcentage: 35 },
  { date: '2024-06-16', weight: 33, caloriesProcentage: 30 },
  { date: '2024-06-17', weight: 32, caloriesProcentage: 55 },
  { date: '2024-06-18', weight: 31, caloriesProcentage: 15 },
  { date: '2024-06-19', weight: 30, caloriesProcentage: 25 },
  { date: '2024-06-20', weight: 29, caloriesProcentage: 50 },
  { date: '2024-06-21', weight: 28, caloriesProcentage: 20 },
  { date: '2024-06-22', weight: 27, caloriesProcentage: 25 },
  { date: '2024-06-23', weight: 26, caloriesProcentage: 60 },
  { date: '2024-06-24', weight: 25, caloriesProcentage: 10 },
  { date: '2024-06-25', weight: 24, caloriesProcentage: 15 },
  { date: '2024-06-26', weight: 23, caloriesProcentage: 40 },
  { date: '2024-06-27', weight: 22, caloriesProcentage: 55 },
  { date: '2024-06-28', weight: 21, caloriesProcentage: 20 },
  { date: '2024-06-29', weight: 20, caloriesProcentage: 10 },
  { date: '2024-06-30', weight: 19, caloriesProcentage: 50 },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  weight: {
    label: 'weight',
    color: 'hsl(var(--chart-1))',
  },
  caloriesProcentage: {
    label: 'caloriesProcentage',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function WeightChart() {
  const [timeRange, setTimeRange] = React.useState('90d');

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Weight + % of calories</CardTitle>
          <CardDescription>
            Showing total weight value and % of calories for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillWeight" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-weight)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-weight)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="fillCaloriesProcentage"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-caloriesProcentage)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-caloriesProcentage)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="weight"
              type="natural"
              fill="url(#fillCaloriesProcentage)"
              stroke="var(--color-caloriesProcentage)"
              stackId="a"
            />
            <Area
              dataKey="caloriesProcentage"
              type="natural"
              fill="url(#fillWeight)"
              stroke="var(--color-weight)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
