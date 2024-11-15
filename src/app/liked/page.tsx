import Image from 'next/image';

import getLikedSongs from '@/actions/getLikedSongs';
import Header from '@/components/Header';
import LikedContent from '@/components/LikedContent';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();

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
    <div
      className="
      bg-neutral-100
      dark:bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header>
        <div
          className="
              flex 
              flex-col 
              md:flex-row 
              items-center 
              gap-x-5
            "
        >
          <div className="relative h-32 w-32 lg:h-44 lg:w-44">
            <Image
              className="object-cover"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              src="/images/favfood.png"
              alt="Playlist"
            />
          </div>
          <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
            <p className="hidden md:block font-semibold text-sm">
              Saved from custom users foods
            </p>
            <h1
              className="
                  text-white 
                  text-4xl 
                  sm:text-5xl 
                  lg:text-7xl 
                  font-bold
                "
            >
              Favorites
            </h1>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} userId={sessionData.session?.user.id!} />
    </div>
  );
};

export default Liked;
