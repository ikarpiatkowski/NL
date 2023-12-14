import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getFood = async ({ date }: { date: string }): Promise<any> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from('userFood')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .eq('created_at', date);

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getFood;
