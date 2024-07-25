import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { format, subDays } from 'date-fns';

const getFoodEnergy = async (): Promise<any> => {
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
    .select('energy, protein, fat, carb, sugar, created_at, portion')
    .eq('user_id', sessionData.session?.user.id)
    .gte('created_at', format(Week, 'yyyy-MM-dd'))
    .lte('created_at', format(new Date(), 'yyyy-MM-dd'));

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getFoodEnergy;
