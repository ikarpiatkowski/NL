'use client';
import { HiBookOpen, HiArchive } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';
import { Song } from '@/types';
import useDateStore from '@/hooks/dataStore';

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}
const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname();
  const { selectedDate, setNewDate } = useDateStore();
  const splitDateUrl = selectedDate.toISOString().split('T')[0];
  const routes = useMemo(
    () => [
      {
        icon: HiBookOpen,
        label: 'Dashboard',
        href: '/dashboard',
        active: pathname === '/dashboard',
        classs: '',
      },
      {
        icon: BiSearch,
        label: 'Search',
        href: '/saved',
        active: pathname === '/saved',
        classs: '',
      },
      {
        icon: HiArchive,
        label: 'Saved',
        href: '/search',
        active: pathname === '/search',
        classs: '',
      },
    ],
    [pathname]
  );
  const mainRoute = useMemo(
    () => [
      {
        label: 'NourishLog',
        active: pathname === '/',
        href: '/',
        classs:
          'font-semibold tracking-tighter text-2xl bg-gradient-to-r from-indigo-500 via-green-500 to-red-500 inline-block text-transparent bg-clip-text',
      },
    ],
    [pathname]
  );
  return (
    <div className={twMerge(`flex h-full`)}>
      <div
        className="hidden 
          md:flex 
          flex-col 
          gap-y-2 
          bg-white
          dark:bg-black 
          h-full 
          w-[300px] 
          p-2"
      >
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {mainRoute.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full content-between">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2 mr-2">
        {children}
      </main>
    </div>
  );
};
export default Sidebar;
