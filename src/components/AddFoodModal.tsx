'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/componentsShadCn/ui/button';

import Modal from './Modal';
import Input from './Input';
import useAddFood from '@/hooks/useAddFood';

const AddFoodModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const addFoodModal = useAddFood();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      addFoodModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      if (!user) {
        toast.error('Missing fields');
        return;
      }

      const { data, error } = await supabaseClient
        .from('userFood')
        .insert({
          name: values.name,
          energy: parseFloat(values.calories),
          protein: parseFloat(values.protein),
          carb: parseFloat(values.carb),
          fat: parseFloat(values.fat),
          sugar: parseFloat(values.sugar),
          portion: parseFloat(values.portion),
          created_at: values.date,
          user_id: user.id,
        })
        .select();

      if (error) {
        setIsLoading(false);
        return toast.error('Failed adding food');
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Food added!');
      reset();
      addFoodModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add food product"
      description="Change whatever you want!"
      isOpen={addFoodModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <p className="w-20 font-bold">Name</p>
          <Input
            id="name"
            disabled={isLoading}
            {...register('name', { required: true })}
            placeholder="Food Name"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <p className="w-20 text-gray-500 font-bold">Portion</p>
          <Input
            id="portion"
            disabled={isLoading}
            {...register('portion', { required: true })}
            placeholder="Portion (in g)"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <p className="w-20 text-yellow-400 font-bold">Calories</p>
          <Input
            id="calories"
            disabled={isLoading}
            {...register('calories', { required: false })}
            placeholder="Calories"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <p className="w-20 text-green-500 font-bold">Protein</p>
          <Input
            id="protein"
            disabled={isLoading}
            {...register('protein', { required: false })}
            placeholder="Protein"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <p className="w-20 text-red-500 font-bold">Fat</p>
          <Input
            id="fat"
            disabled={isLoading}
            {...register('fat', { required: false })}
            placeholder="Fat"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <p className="w-20 text-purple-500 font-bold">Carbs</p>
          <Input
            id="carb"
            disabled={isLoading}
            {...register('carb', { required: false })}
            placeholder="Carbs"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <p className="w-20 text-pink-500 font-bold">Sugar</p>
          <Input
            id="sugar"
            disabled={isLoading}
            {...register('sugar', { required: false })}
            placeholder="Sugar"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <p className="w-20 font-bold">Date</p>
          <Input
            id="date"
            disabled={isLoading}
            {...register('date', { required: true })}
            placeholder="Date (YYYY-MM-DD)"
          />
        </div>
        <Button className="mt-6" disabled={isLoading} type="submit">
          Add
        </Button>
      </form>
    </Modal>
  );
};

export default AddFoodModal;
