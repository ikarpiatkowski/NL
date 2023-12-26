import { cookies } from 'next/headers';

import FetchNutriValues from '@/components/FetchNutriValues';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const SearchPage = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  return (
    <>
      <FetchNutriValues userId={sessionData.session?.user.id!} />
    </>
  );
};

export default SearchPage;
