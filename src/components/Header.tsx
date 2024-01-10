'use client';

import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { FaUserAlt } from 'react-icons/fa';
import { HiBookOpen, HiHome, HiUserGroup } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

import Image from 'next/image';

import useAuthModal from '@/hooks/useAuthModal';

import { useUser } from '@/hooks/useUser';
import Box from './Box';
import Button from './Button';
import { IoIosHeart } from 'react-icons/io';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const { user } = useUser();

  return (
    <Box>
      <div
        className={twMerge(
          `h-fit bg-gradient-to-r from-indigo-500 via-green-500 to-red-500 p-6 overflow-y-auto`,
          className
        )}
      >
        <div className="w-full mb-4 flex items-center justify-between">
          <div className="hidden md:flex gap-x-2 items-center">{children}</div>
          <div className="flex md:hidden gap-x-4 items-center">
            <button
              onClick={() => router.push('/')}
              className="
              rounded-full 
              p-2 
            dark:bg-neutral-600/10 
            dark:hover:bg-neutral-600/20
            bg-neutral-900/10 
            hover:bg-neutral-900/20
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
            >
              <HiHome className="text-black" size={20} />
            </button>
            <button
              onClick={() => router.push('/search')}
              className="
              rounded-full 
              p-2 
            dark:bg-neutral-600/10 
            dark:hover:bg-neutral-600/20
            bg-neutral-900/10 
            hover:bg-neutral-900/20
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
            >
              <BiSearch className="text-black" size={20} />
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="
              rounded-full 
              p-2 
            dark:bg-neutral-600/10 
            dark:hover:bg-neutral-600/20
            bg-neutral-900/10 
            hover:bg-neutral-900/20
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
            >
              <HiBookOpen className="text-black" size={20} />
            </button>
            <button
              onClick={() => router.push('/liked')}
              className="
              rounded-full 
              p-2 
            dark:bg-neutral-600/10 
            dark:hover:bg-neutral-600/20
            bg-neutral-900/10 
            hover:bg-neutral-900/20
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
            >
              <IoIosHeart className="text-black" size={20} />
            </button>
            <button
              onClick={() => router.push('/community')}
              className="
              rounded-full 
              p-2 
            dark:bg-neutral-600/10 
            dark:hover:bg-neutral-600/20
            bg-neutral-900/10 
            hover:bg-neutral-900/20
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
            >
              <HiUserGroup className="text-black" size={20} />
            </button>
          </div>

          <div className="flex justify-between items-center gap-x-4">
            {user ? (
              <div className="flex gap-x-4 items-center">
                {user?.user_metadata.avatar_url ? (
                  <Image
                    src={user?.user_metadata.avatar_url!}
                    onClick={() => router.push('/account')}
                    className="rounded-full cursor-pointer"
                    alt="avatar"
                    width={44}
                    height={44}
                  />
                ) : (
                  <Button
                    onClick={() => router.push('/account')}
                    className="dark:bg-neutral-800 dark:text-white text-black"
                  >
                    <FaUserAlt />
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div>
                  <Button
                    onClick={authModal.onOpen}
                    className="dark:bg-neutral-800 dark:text-white text-black px-6 py-2"
                  >
                    Log in
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};
export default Header;
