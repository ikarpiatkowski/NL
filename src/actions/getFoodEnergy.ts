import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { format, subDays } from 'date-fns';
const getFoodEnergy = async ({ date }: { date: string }): Promise<any> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }
  const Week = subDays(new Date(), 7);
  const { data, error } = await supabase
    .from('userFood')
    .select('energy, created_at')
    .eq('user_id', sessionData.session?.user.id)
    // .eq('created_at', format(new Date(), 'yyyy-MM-dd'))
    .gte('created_at', format(Week, 'yyyy-MM-dd'))
    .lte('created_at', format(new Date(), 'yyyy-MM-dd'));
  // .range('created_at', {
  //   gt: format(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'), // Get data from the past 7 days
  //   lte: new Date(), // Up to the current date

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getFoodEnergy;
