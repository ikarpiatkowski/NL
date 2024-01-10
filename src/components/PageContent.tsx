'use client';

import { Song } from '@/types';
import SongItem from '@/components/SongItem';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface PageContentProps {
  songs: Song[];
  userId: String;
}

const PageContent: React.FC<PageContentProps> = ({ songs, userId }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No foods available.</div>;
  }
  const addFood = async (item: any) => {
    const { error: supabaseError } = await supabaseClient
      .from('userFood')
      .insert({
        energy: item.energy,
        protein: item.protein,
        fat: item.fat,
        carbs: item.carbs,
        sugar: item.sugar,
        name: item.title,
        user_id: userId,
      });

    if (supabaseError) {
      return toast.error(supabaseError.message);
    } else {
      toast.success('Food added successfully');
    }
    router.refresh();
  };
  return (
    <div
      className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8 
        gap-4 
        mt-4
        mx-4
      "
    >
      {songs.map((item) => (
        <SongItem
          onClick={() => {
            addFood(item);
          }}
          key={item.id}
          data={item}
        />
      ))}
    </div>
  );
};

export default PageContent;
