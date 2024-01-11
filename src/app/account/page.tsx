'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import toast from 'react-hot-toast';

import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { DrawerDemo } from '@/components/Drawer';
import AccountContent from '@/components/AccountContent';
import EditTarget from '@/components/EditTarget';
import Button from '@/components/Button';

const Account = () => {
  const router = useRouter();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();

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
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Account Settings
          </h1>
        </div>
      </Header>
      <EditTarget />
      <AccountContent />
      <Button
        onClick={handleLogout}
        className="dark:bg-neutral-800 dark:text-white text-black m-4 w-[200px]"
      >
        Logout
      </Button>
    </div>
  );
};

export default Account;
