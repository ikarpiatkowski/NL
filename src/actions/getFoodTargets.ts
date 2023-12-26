import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getFoodTargets = async (): Promise<any> => {
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
    .from('users')
    .select(
      'calories_target, carbs_target, fat_target, protein_target, sugar_target'
    )
    .eq('id', sessionData.session?.user.id);

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getFoodTargets;
