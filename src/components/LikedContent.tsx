'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Song } from '@/types';
import { useUser } from '@/hooks/useUser';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';

interface LikedContentProps {
  songs: Song[];
  userId: string;
}

const LikedContent: React.FC<LikedContentProps> = ({ songs, userId }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No favourited foods.
      </div>
    );
  }

  const addFood = async (item: any) => {
    const { error: supabaseError } = await supabaseClient
      .from('userFood')
      .insert({
        energy: item.energy,
        protein: item.protein,
        fat: item.fat,
        carb: item.carb,
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
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((item: any) => (
        <div key={item.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem
              onClick={() => {
                addFood(item);
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

export default LikedContent;
