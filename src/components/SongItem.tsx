'use client';

import Image from 'next/image';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';

import PlayButton from './PlayButton';

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        dark:bg-neutral-600/10 
        dark:hover:bg-neutral-600/20
        bg-neutral-900/10 
        hover:bg-neutral-900/20
        cursor-pointer 
        transition 
        p-2
      "
    >
      <div
        className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden
        "
      >
        <Image
          className="object-cover"
          src={imagePath || '/images/favfood.png'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <div className="flex">
          <p className="text-yellow-400 text-sm font-bold truncate pr-2">
            {data.energy}kcal
          </p>
          <p className="text-green-500 text-sm font-bold truncate pr-2">
            {data.protein}g
          </p>
          <p className="text-red-500 text-sm font-bold truncate pr-2">
            {data.fat}g
          </p>
          <p className="text-purple-500 text-sm font-bold truncate pr-2">
            {data.carbs}g
          </p>
          <p className="text-pink-500 text-sm font-bold truncate pr-2">
            {data.sugar}g
          </p>
        </div>
      </div>
      <div
        className="
          absolute 
          bottom-24 
          right-5
        "
      >
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
