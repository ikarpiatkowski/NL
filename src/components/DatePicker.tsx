'use client';
import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import useDateStore from '@/hooks/dataStore';
import { cn } from '@/lib/utils';
import { Button } from '@/componentsShadCn/ui/button';
import { Calendar } from '@/componentsShadCn/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/componentsShadCn/ui/popover';
import { useRouter } from 'next/navigation';

export function DatePickerDemo() {
  const { selectedDate, setNewDate } = useDateStore();
  // const [selectedDate, setNewDate] = React.useState<Date | undefined>(
  //   new Date()
  // );
  const router = useRouter();
  const handleDateSelect = (newDate: any) => {
    // Format the selected date to the desired format (e.g., '2023-12-12')
    const formattedDate = format(newDate, 'yyyy-MM-dd');

    // Set the new date in the state
    setNewDate(newDate);

    // Redirect to the '/dashboard' route with the selected date
    router.push(`/dashboard/${formattedDate}`);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !selectedDate && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, 'PPP')
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
