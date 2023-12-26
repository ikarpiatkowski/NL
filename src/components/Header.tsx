'use client';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { FaUserAlt } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}
const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user, userDetails } = useUser();
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out successfully');
    }
  };
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-r from-indigo-500 via-green-500 to-red-500 p-6 overflow-y-auto`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-start justify-between">
        <div className="hidden md:flex gap-x-2 items-center">{children}</div>
        <div className="flex md:hidden gap-x-2 items-center">
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
        </div>

        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={handleLogout}
                className="dark:bg-neutral-800 dark:text-white text-black px-6 py-2"
              >
                Logout
              </Button>
              {userDetails?.avatar_url ? (
                <Image
                  src={userDetails?.avatar_url!}
                  onClick={() => router.push('/account')}
                  className="rounded-full cursor-pointer"
                  alt="avatar"
                  width={50}
                  height={50}
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
  );
};
export default Header;
