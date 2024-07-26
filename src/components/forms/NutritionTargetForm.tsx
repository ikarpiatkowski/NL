'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const FormSchema = z.object({
  calories: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  protein: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  fat: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  sugar: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  carbs: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      calories: '',
      protein: '',
      fat: '',
      sugar: '',
      carbs: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 space-x-4"
      >
        <FormField
          control={form.control}
          name="calories"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-yellow-500 font-bold">
                Calories Target
              </FormLabel>
              <FormControl>
                <Input
                  className="caret-yellow-500"
                  placeholder="🔥"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your calories target.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="protein"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green-500 font-bold">
                Protein Target
              </FormLabel>
              <FormControl>
                <Input placeholder="🍗" {...field} />
              </FormControl>
              <FormDescription>This is your protein target.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fat"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-red-500 font-bold">
                Fat Target
              </FormLabel>
              <FormControl>
                <Input placeholder="🥑" {...field} />
              </FormControl>
              <FormDescription>This is your fat target.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="carbs"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-purple-600 font-bold">
                Carbs Target
              </FormLabel>
              <FormControl>
                <Input placeholder="🍞" {...field} />
              </FormControl>
              <FormDescription>This is your carbs target.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sugar"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-pink-500 font-bold">
                Sugar Target
              </FormLabel>
              <FormControl>
                <Input placeholder="🍭" {...field} />
              </FormControl>
              <FormDescription>This is your sugar target.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
