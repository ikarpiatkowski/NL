'use client';

import { useRouter } from 'next/navigation';
import { AiOutlinePlus } from 'react-icons/ai';

import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import useSubscribeModal from '@/hooks/useSubscribeModal';
import { Song } from '@/types';

import MediaItem from './MediaItem';
import { ModeToggle } from './ModeToggle';
import toast from 'react-hot-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
interface LibraryProps {
  songs: Song[];
  userId: string;
}

const Library: React.FC<LibraryProps> = ({ songs, userId }) => {
  const { user, subscription } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const subscribeModal = useSubscribeModal();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    if (!subscription) {
      return subscribeModal.onOpen();
    }
    return uploadModal.onOpen();
  };

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

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <p className="dark:text-neutral-400 text-neutral-700 font-medium text-md">
            Your custom foods
          </p>
        </div>
        <ModeToggle />
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="dark:text-neutral-400 text-neutral-700 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem
            onClick={() => {
              addFood(item);
              console.log(item);
            }}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};
export default Library;
