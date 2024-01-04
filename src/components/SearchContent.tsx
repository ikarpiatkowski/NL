'use client';

import { Song } from '@/types';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface SearchContentProps {
  songs: Song[];
  userId: String;
}

const SearchContent: React.FC<SearchContentProps> = ({ songs, userId }) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

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
    console.log(item);
    router.refresh();
  };
  if (songs.length === 0) {
    return (
      <div
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full 
          px-6 
          text-neutral-400
        "
      >
        No food found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6 mt-4">
      {songs.map((item: Song) => (
        <div key={item.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem
              onClick={() => {
                addFood(item);
                console.log(item);
              }}
              data={item}
            />
          </div>
          <LikeButton songId={item.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
