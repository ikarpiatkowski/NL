'use client';

import React, { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import useEditModal from '@/hooks/useEditModal';

const EditFoodModal = ({ id }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const editModal = useEditModal();
  const { foodId } = editModal;
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FieldValues>();

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
          carbs: parseFloat(values.carbs),
          fat: parseFloat(values.fat),
          sugar: parseFloat(values.sugar),
          created_at: values.date,
        })
        .eq('id', foodId)
        .select();
      console.log(id);
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="name"
          disabled={isLoading}
          {...register('name', { required: true })}
          placeholder="Food Name"
        />
        <Input
          id="calories"
          disabled={isLoading}
          {...register('calories', { required: false })}
          placeholder="Calories"
        />
        <Input
          id="protein"
          disabled={isLoading}
          {...register('protein', { required: false })}
          placeholder="Protein"
        />
        <Input
          id="fat"
          disabled={isLoading}
          {...register('fat', { required: false })}
          placeholder="Fat"
        />
        <Input
          id="carbs"
          disabled={isLoading}
          {...register('carbs', { required: false })}
          placeholder="Carbs"
        />
        <Input
          id="sugar"
          disabled={isLoading}
          {...register('sugar', { required: false })}
          placeholder="Sugar"
        />
        <Input
          id="date"
          disabled={isLoading}
          {...register('date', { required: true })}
          placeholder="Date (YYYY-MM-DD)"
        />
        <Button disabled={isLoading} type="submit">
          Edit
        </Button>
      </form>
    </Modal>
  );
};

export default EditFoodModal;
