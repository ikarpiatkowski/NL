'use client';

import * as Progress from '@radix-ui/react-progress';
import { useEffect, useState } from 'react';

interface NutriProgressProps {
  value?: number;
  color?: string;
}

const NutriProgress: React.FC<NutriProgressProps> = ({ value, color }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(value || 0);
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
