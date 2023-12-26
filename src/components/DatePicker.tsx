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
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export function DatePickerDemo() {
  const { selectedDate, setNewDate } = useDateStore();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const handleDateSelect = (newDate: any) => {
    const formattedDate = format(newDate, 'yyyy-MM-dd');
    setNewDate(newDate);
    router.push(`/dashboard/${formattedDate}`);
    router.refresh();
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
