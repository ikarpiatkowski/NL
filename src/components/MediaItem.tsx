'use client';
import Image from 'next/image';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        dark:bg-neutral-600/10 
        dark:hover:bg-neutral-600/20
        bg-neutral-900/10 
        hover:bg-neutral-900/20
        w-full 
        p-2 
        rounded-md
      "
    >
      <div
        className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
      >
        <Image
          fill
          src={imageUrl || '/images/favfood.png'}
          alt="MediaItem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="dark:text-white text-black truncate font-semibold">
          {data.title}
        </p>
        <p className="dark:text-neutral-400 text-neutral-600 text-sm truncate">
          {data.author}
        </p>
      </div>
    </div>
  );
};

export default MediaItem;
