'use client';

import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/button';
import useEditTargets from '@/hooks/useEditTargets';

import Modal from './Modal';
import Input from './Input';

const EditFoodTargets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const editTargetModal = useEditTargets();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset, setValue } = useForm<FieldValues>();

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabaseClient
          .from('users')
          .select(
            'calories_target, protein_target, carbs_target, fat_target, sugar_target'
          )
          .eq('id', user?.id);

        if (error) {
          setIsLoading(false);
          return toast.error('Failed to fetch nutrition targets data');
        }

        if (data && data.length > 0) {
          const foodData = data[0];
          setValue('calories', foodData.calories_target.toString());
          setValue('protein', foodData.protein_target.toString());
          setValue('carb', foodData.carbs_target.toString());
          setValue('fat', foodData.fat_target.toString());
          setValue('sugar', foodData.sugar_target.toString());
        }
      } catch (error) {
        toast.error(
          'Something went wrong while fetching nutrition targets data'
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (user?.id) {
      fetchFoodData();
    }
  }, [user?.id, supabaseClient, setValue]);

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      editTargetModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      if (!user) {
        toast.error('Missing fields');
        return;
      }

      const { error } = await supabaseClient
        .from('users')
        .update({
          calories_target: parseFloat(values.calories_target),
          protein_target: parseFloat(values.protein_target),
          carbs_target: parseFloat(values.carbs_target),
          fat_target: parseFloat(values.fat_target),
          sugar_target: parseFloat(values.sugar_target),
        })
        .eq('id', user.id)
        .select();

      if (error) {
        setIsLoading(false);
        return toast.error('Failed edit nutrition targets');
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Nutrition targets edited!');
      reset();
      editTargetModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Edit nutrition target values"
      description="Change whatever you want!"
      isOpen={editTargetModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <p className="w-20 text-yellow-400 font-bold">Calories</p>
          <Input
            id="calories"
            disabled={isLoading}
            {...register('calories_target', { required: false })}
            placeholder="2500"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <p className="w-20 text-green-500 font-bold">Protein</p>
          <Input
            id="protein"
            disabled={isLoading}
            {...register('protein_target', { required: false })}
            placeholder="60"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <p className="w-20 text-red-500 font-bold">Fat</p>
          <Input
            id="fat"
            disabled={isLoading}
            {...register('fat_target', { required: false })}
            placeholder="100"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <p className="w-20 text-purple-500 font-bold">Carbs</p>
          <Input
            id="carb"
            disabled={isLoading}
            {...register('carbs_target', { required: false })}
            placeholder="360"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <p className="w-20 text-pink-500 font-bold">Sugar</p>
          <Input
            id="sugar"
            disabled={isLoading}
            {...register('sugar_target', { required: false })}
            placeholder="40"
          />
        </div>
        <Button className="mt-6" disabled={isLoading} type="submit">
          Edit
        </Button>
      </form>
    </Modal>
  );
};

export default EditFoodTargets;
