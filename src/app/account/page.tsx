'use client';
import Header from '@/components/Header';

import { useUser } from '@/hooks/useUser';
import { DrawerDemo } from '@/components/Drawer';
import AccountContent from '@/components/AccountContent';
import EditTarget from '@/components/EditTarget';

const Account = () => {
  const { user } = useUser();

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
      <DrawerDemo />
      <AccountContent />
      {user?.id}
    </div>
  );
};

export default Account;
