'use client';

import uniqid from 'uniqid';
import React, { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';

import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      energy: 0,
      protein: 0,
      fat: 0,
      carb: 0,
      sugar: 0,
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const uniqueID = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        console.log(songError);
        return toast.error('Failed food upload (polish characters)');
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Failed image upload');
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          energy: values.energy,
          protein: values.protein,
          fat: values.fat,
          carb: values.carb,
          sugar: values.sugar,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Food created!');
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add custom food"
      description="Of your choice"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <p className="w-20font-bold">Food name</p>
          <Input
            id="title"
            disabled={isLoading}
            {...register('title', { required: true })}
            placeholder="Food Name"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <p className="w-20 text-yellow-400 font-bold">Calories</p>
          <Input
            id="energy"
            disabled={isLoading}
            {...register('energy', { required: false })}
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
        <div>
          <div className="pb-1">Select an image of food</div>
          <Input
            placeholder="test"
            disabled={isLoading}
            type="file"
            accept="image/*"
            id="image"
            {...register('image', { required: false })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
