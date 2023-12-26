'use client';
import React from 'react';
import * as Progress from '@radix-ui/react-progress';

interface NutriProgressProps {
  value?: number;
  color?: string;
}

const NutriProgress: React.FC<NutriProgressProps> = ({ value, color }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value || 0), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Progress.Root
      className="relative overflow-hidden dark:bg-neutral-800 bg-neutral-300 rounded-full w-[260px] h-[18px]"
      style={{
        transform: 'translateZ(0)',
      }}
      value={progress}
    >
      <Progress.Indicator
        className={`${color} w-full h-full rounded-lg transition-transform ease-[cubic-bezier(0.65, 0, 0.35, 1)]`}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default NutriProgress;
