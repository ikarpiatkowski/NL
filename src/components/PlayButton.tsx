import { FaHeart } from 'react-icons/fa';

const PlayButton = () => {
  return (
    <button
      className="
        transition 
        opacity-0 
        rounded-full 
        flex 
        items-center 
        justify-center 
        dark:bg-neutral-600
        bg-neutral-200
        p-4 
        drop-shadow-md 
        translate
        translate-y-1/4
        group-hover:opacity-100 
        group-hover:translate-y-0
        hover:scale-110
      "
    >
      <FaHeart className="dark:text-white text-black" />
    </button>
  );
};

export default PlayButton;
