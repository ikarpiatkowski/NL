'use client';

import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/button';
import useEditModal from '@/hooks/useEditModal';

import Modal from './Modal';
import Input from './Input';

const EditFoodModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const editModal = useEditModal();
  const { foodId } = editModal;
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset, setValue } = useForm<FieldValues>();

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabaseClient
          .from('userFood')
          .select(
            'name, energy, protein, carb, fat, sugar, created_at, portion'
          )
          .eq('id', foodId);

        if (error) {
          setIsLoading(false);
          return toast.error('Failed to fetch food data');
        }

        if (data && data.length > 0) {
          const foodData = data[0];
          setValue('name', foodData.name);
          setValue('calories', foodData.energy.toString());
          setValue('protein', foodData.protein.toString());
          setValue('carb', foodData.carb.toString());
          setValue('fat', foodData.fat.toString());
          setValue('sugar', foodData.sugar.toString());
          setValue('portion', foodData.portion.toString());
          setValue('date', foodData.created_at);
        }
      } catch (error) {
        toast.error('Something went wrong while fetching food data');
      } finally {
        setIsLoading(false);
      }
    };

    if (foodId) {
      fetchFoodData();
    }
  }, [foodId, supabaseClient, setValue]);

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      editModal.onClose();
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
        .from('userFood')
        .update({
          name: values.name,
          energy: parseFloat(values.calories),
          protein: parseFloat(values.protein),
          carb: parseFloat(values.carb),
          fat: parseFloat(values.fat),
          sugar: parseFloat(values.sugar),
          portion: parseFloat(values.portion),
          created_at: values.date,
        })
        .eq('id', foodId)
        .select();

      if (error) {
        setIsLoading(false);
        return toast.error('Failed edit food');
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Food edited!');
      reset();
      editModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Edit food product"
      description="Change whatever you want!"
      isOpen={editModal.isOpen}
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
          Edit
        </Button>
      </form>
    </Modal>
  );
};

export default EditFoodModal;
