'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import toast from 'react-hot-toast';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import AccountContent from '@/components/AccountContent';
import EditTarget from '@/components/EditTarget';
import Button from '@/components/Button';
import { InputForm } from '@/components/forms/NutritionTargetForm';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GoalsForm } from '@/components/forms/GoalsForm';
import { LossGainSelector } from '@/components/LossGainSelector';
import { WieghtForm } from '@/components/forms/WieghtForm';
import { useUser } from '@/hooks/useUser';

const Account = () => {
  const router = useRouter();
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
  const { user } = useUser();
  const UserWeightValue = async () => {
    const supabaseClient = useSupabaseClient();

    let { data: userWeight } = await supabaseClient
      .from('userWeight')
      .select('*')
      .eq('id', user?.id)
      .order('date', { ascending: false });

    return (
      <div>
        {userWeight &&
          userWeight.map((weight: any) => (
            <p key={weight.id}>
              {weight.weight}kg from {weight.date}
            </p>
          ))}
      </div>
    );
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
      <div className="m-4 space-y-2">
        <UserWeightValue />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Target Calories 🍴</AccordionTrigger>
            <AccordionContent>
              <InputForm />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Your Goals 🔥</AccordionTrigger>
            <AccordionContent>
              <GoalsForm />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Your info 🔎</AccordionTrigger>
            <AccordionContent>
              <WieghtForm />
              <LossGainSelector />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <EditTarget />
        <AccountContent />
        <Button
          onClick={handleLogout}
          className="dark:bg-neutral-800 dark:text-white text-black w-[200px]"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Account;
